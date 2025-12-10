/**
 * Touristas AI - Voice Interface
 * Implements Tier 3 from thenextbigthing.md
 * 
 * Enables hands-free travel planning for mobile users
 * Uses Web Speech API for recognition + synthesis
 */

// ============================================
// TYPES
// ============================================

export interface VoiceConfig {
  language: 'en-US' | 'el-GR' | 'de-DE' | 'fr-FR' | 'ru-RU';
  continuous: boolean;
  interimResults: boolean;
  voiceName?: string;
  rate: number; // 0.5 - 2
  pitch: number; // 0 - 2
}

export interface VoiceRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  isSupported: boolean;
  error: string | null;
}

// ============================================
// VOICE RECOGNITION (Speech-to-Text)
// ============================================

class TouristasVoiceRecognition {
  private recognition: SpeechRecognition | null = null;
  private isSupported: boolean = false;
  private config: VoiceConfig;
  private onResultCallback: ((result: VoiceRecognitionResult) => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;
  private onStateChangeCallback: ((state: VoiceState) => void) | null = null;

  constructor(config?: Partial<VoiceConfig>) {
    this.config = {
      language: 'en-US',
      continuous: false,
      interimResults: true,
      rate: 1,
      pitch: 1,
      ...config,
    };

    this.initRecognition();
  }

  private initRecognition(): void {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.isSupported = true;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = this.config.language;
      this.recognition.continuous = this.config.continuous;
      this.recognition.interimResults = this.config.interimResults;

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;
        const isFinal = result.isFinal;

        if (this.onResultCallback) {
          this.onResultCallback({ transcript, confidence, isFinal });
        }
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        const errorMessage = this.getErrorMessage(event.error);
        if (this.onErrorCallback) {
          this.onErrorCallback(errorMessage);
        }
        this.updateState({ isListening: false, error: errorMessage });
      };

      this.recognition.onend = () => {
        this.updateState({ isListening: false });
      };

      this.recognition.onstart = () => {
        this.updateState({ isListening: true, error: null });
      };
    }
  }

  private getErrorMessage(error: string): string {
    const errorMessages: Record<string, string> = {
      'no-speech': "I didn't hear anything. Try again?",
      'audio-capture': "No microphone found. Please check your settings.",
      'not-allowed': "Microphone access denied. Please enable it in your browser.",
      'network': "Network error. Please check your connection.",
      'aborted': "Voice input was cancelled.",
      'language-not-supported': "This language is not supported.",
    };
    return errorMessages[error] || `Voice error: ${error}`;
  }

  private updateState(partial: Partial<VoiceState>): void {
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback({
        isListening: false,
        isSpeaking: false,
        isSupported: this.isSupported,
        error: null,
        ...partial,
      });
    }
  }

  public start(): void {
    if (this.recognition && this.isSupported) {
      try {
        this.recognition.start();
      } catch (e) {
        // Already started
      }
    }
  }

  public stop(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  public onResult(callback: (result: VoiceRecognitionResult) => void): void {
    this.onResultCallback = callback;
  }

  public onError(callback: (error: string) => void): void {
    this.onErrorCallback = callback;
  }

  public onStateChange(callback: (state: VoiceState) => void): void {
    this.onStateChangeCallback = callback;
  }

  public setLanguage(language: VoiceConfig['language']): void {
    this.config.language = language;
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }

  public getIsSupported(): boolean {
    return this.isSupported;
  }
}

// ============================================
// VOICE SYNTHESIS (Text-to-Speech)
// ============================================

class TouristasVoiceSynthesis {
  private synthesis: SpeechSynthesis | null = null;
  private isSupported: boolean = false;
  private config: VoiceConfig;
  private voices: SpeechSynthesisVoice[] = [];
  private onStateChangeCallback: ((state: VoiceState) => void) | null = null;

  constructor(config?: Partial<VoiceConfig>) {
    this.config = {
      language: 'en-US',
      continuous: false,
      interimResults: true,
      rate: 1,
      pitch: 1,
      ...config,
    };

    this.initSynthesis();
  }

  private initSynthesis(): void {
    if (typeof window === 'undefined') return;

    if ('speechSynthesis' in window) {
      this.isSupported = true;
      this.synthesis = window.speechSynthesis;
      
      // Load voices
      this.loadVoices();
      if (this.synthesis.onvoiceschanged !== undefined) {
        this.synthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices(): void {
    if (this.synthesis) {
      this.voices = this.synthesis.getVoices();
    }
  }

  private getPreferredVoice(): SpeechSynthesisVoice | undefined {
    // Try to find a Greek-accented English voice for authenticity
    const languageCode = this.config.language.split('-')[0];
    
    // Priority: Natural/Premium voices first
    const preferredVoice = this.voices.find(v => 
      v.lang.startsWith(languageCode) && 
      (v.name.includes('Natural') || v.name.includes('Premium') || v.name.includes('Enhanced'))
    );
    
    if (preferredVoice) return preferredVoice;
    
    // Fallback to any matching language
    return this.voices.find(v => v.lang.startsWith(languageCode));
  }

  public speak(text: string, onEnd?: () => void): void {
    if (!this.synthesis || !this.isSupported) return;

    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.config.language;
    utterance.rate = this.config.rate;
    utterance.pitch = this.config.pitch;
    
    const voice = this.getPreferredVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      this.updateState({ isSpeaking: true });
    };

    utterance.onend = () => {
      this.updateState({ isSpeaking: false });
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.updateState({ isSpeaking: false, error: 'Speech synthesis error' });
    };

    this.synthesis.speak(utterance);
  }

  public stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.updateState({ isSpeaking: false });
    }
  }

  private updateState(partial: Partial<VoiceState>): void {
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback({
        isListening: false,
        isSpeaking: false,
        isSupported: this.isSupported,
        error: null,
        ...partial,
      });
    }
  }

  public onStateChange(callback: (state: VoiceState) => void): void {
    this.onStateChangeCallback = callback;
  }

  public setLanguage(language: VoiceConfig['language']): void {
    this.config.language = language;
  }

  public getIsSupported(): boolean {
    return this.isSupported;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }
}

// ============================================
// TOURISTAS VOICE ASSISTANT
// ============================================

export class TouristasVoiceAssistant {
  private recognition: TouristasVoiceRecognition;
  private synthesis: TouristasVoiceSynthesis;
  private conversationCallback: ((message: string) => Promise<string>) | null = null;
  private state: VoiceState = {
    isListening: false,
    isSpeaking: false,
    isSupported: false,
    error: null,
  };

  constructor(config?: Partial<VoiceConfig>) {
    this.recognition = new TouristasVoiceRecognition(config);
    this.synthesis = new TouristasVoiceSynthesis(config);

    // Wire up recognition to synthesis
    this.recognition.onResult(async (result) => {
      if (result.isFinal && this.conversationCallback) {
        // User finished speaking, process their message
        const response = await this.conversationCallback(result.transcript);
        
        // Speak the response
        this.synthesis.speak(response, () => {
          // After speaking, optionally continue listening
          // this.recognition.start();
        });
      }
    });

    this.state.isSupported = 
      this.recognition.getIsSupported() && 
      this.synthesis.getIsSupported();
  }

  public setConversationHandler(
    callback: (message: string) => Promise<string>
  ): void {
    this.conversationCallback = callback;
  }

  public startListening(): void {
    this.synthesis.stop(); // Stop speaking before listening
    this.recognition.start();
  }

  public stopListening(): void {
    this.recognition.stop();
  }

  public speak(text: string): void {
    this.synthesis.speak(text);
  }

  public stopSpeaking(): void {
    this.synthesis.stop();
  }

  public setLanguage(language: VoiceConfig['language']): void {
    this.recognition.setLanguage(language);
    this.synthesis.setLanguage(language);
  }

  public getState(): VoiceState {
    return this.state;
  }

  public isSupported(): boolean {
    return this.state.isSupported;
  }

  // Quick voice commands for travel
  public getQuickCommands(): string[] {
    return [
      "Show me ferries to Naxos",
      "Find hotels in Santorini",
      "What's the weather tomorrow?",
      "Book a sunset cruise",
      "Rent a car in Mykonos",
      "Plan my 3-day trip",
      "Which island is best for beaches?",
      "Cancel my ferry booking",
    ];
  }
}

// ============================================
// VOICE RESPONSE FORMATTER
// ============================================

export function formatForVoice(text: string): string {
  // Convert markdown/emoji to spoken text
  let spoken = text;
  
  // Remove emojis
  spoken = spoken.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
  
  // Convert markdown bold to emphasis
  spoken = spoken.replace(/\*\*(.*?)\*\*/g, '$1');
  
  // Convert bullet points
  spoken = spoken.replace(/^[-•]\s*/gm, '');
  
  // Convert prices
  spoken = spoken.replace(/€(\d+)/g, '$1 euros');
  
  // Convert times
  spoken = spoken.replace(/(\d{1,2}):(\d{2})/g, '$1 $2');
  
  // Expand abbreviations
  spoken = spoken.replace(/\bmin\b/g, 'minutes');
  spoken = spoken.replace(/\bhr\b/g, 'hour');
  spoken = spoken.replace(/\bhrs\b/g, 'hours');
  spoken = spoken.replace(/\bkm\b/g, 'kilometers');
  
  // Clean up extra whitespace
  spoken = spoken.replace(/\s+/g, ' ').trim();
  
  return spoken;
}

// ============================================
// GREETING GENERATOR
// ============================================

export function getVoiceGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return "Kalimera! Good morning! I'm Touristas, your Cyclades travel assistant. How can I help you today?";
  } else if (hour < 18) {
    return "Yia sou! Good afternoon! I'm Touristas. Where would you like to explore in the Cyclades?";
  } else {
    return "Kalispera! Good evening! I'm Touristas. Planning a Greek island adventure?";
  }
}

// ============================================
// EXPORT SINGLETON
// ============================================

let voiceAssistantInstance: TouristasVoiceAssistant | null = null;

export function getVoiceAssistant(config?: Partial<VoiceConfig>): TouristasVoiceAssistant {
  if (!voiceAssistantInstance) {
    voiceAssistantInstance = new TouristasVoiceAssistant(config);
  }
  return voiceAssistantInstance;
}
