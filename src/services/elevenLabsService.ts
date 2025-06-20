// ElevenLabs Text-to-Speech Service for Greek language
// Provides high-quality voice synthesis for taxi calls

export interface VoiceOptions {
  voiceId?: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  useSpeakerBoost?: boolean;
}

export interface TTSResponse {
  success: boolean;
  audioUrl?: string;
  audioBuffer?: ArrayBuffer;
  error?: string;
}

export class ElevenLabsService {
  private static API_KEY = typeof process !== 'undefined' ? process.env.ELEVENLABS_API_KEY : undefined;
  private static BASE_URL = 'https://api.elevenlabs.io/v1';

  // Greek voice IDs (these would be actual ElevenLabs voice IDs)
  static readonly GREEK_VOICES = {
    MARIA: 'maria_greek_female', // Professional female voice
    DIMITRIS: 'dimitris_greek_male', // Professional male voice
    SOFIA: 'sofia_greek_warm', // Warm, friendly female voice
    KOSTAS: 'kostas_greek_deep' // Deep, authoritative male voice
  };

  /**
   * Convert Greek text to speech using ElevenLabs
   */
  static async generateSpeech(
    greekText: string,
    options: VoiceOptions = {}
  ): Promise<TTSResponse> {
    try {
      const {
        voiceId = this.GREEK_VOICES.MARIA,
        stability = 0.5,
        similarityBoost = 0.75,
        style = 0.0,
        useSpeakerBoost = true
      } = options;

      // Mock response for development
      console.log('🎤 Generating Greek TTS for:', greekText.substring(0, 50) + '...');
      console.log('🗣️ Using voice:', voiceId);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In development, return mock success
      return {
        success: true,
        audioUrl: `https://mock-audio-url.com/greek-tts-${Date.now()}.mp3`,
        audioBuffer: new ArrayBuffer(1024) // Mock audio buffer
      };

      // Production code:
      /*
      const response = await fetch(`${this.BASE_URL}/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.API_KEY!
        },
        body: JSON.stringify({
          text: greekText,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: stability,
            similarity_boost: similarityBoost,
            style: style,
            use_speaker_boost: useSpeakerBoost
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      const audioBuffer = await response.arrayBuffer();
      
      return {
        success: true,
        audioBuffer: audioBuffer
      };
      */

    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generate taxi call audio with professional Greek voice
   */
  static async generateTaxiCallAudio(
    driverName: string,
    rideDetails: {
      pickupLocation: string;
      dropoffLocation: string;
      requestedTime: string;
      userPhone: string;
      passengerCount: number;
    }
  ): Promise<TTSResponse> {
    const script = `
Καλησπέρα ${driverName}. Σας καλεί το Touristas AI για μια νέα παραγγελία ταξί.

Έχουμε έναν πελάτη που χρειάζεται μεταφορά:

Σημείο παραλαβής: ${rideDetails.pickupLocation}
Προορισμός: ${rideDetails.dropoffLocation}
Ώρα παραλαβής: ${rideDetails.requestedTime}
Αριθμός επιβατών: ${rideDetails.passengerCount}
Τηλέφωνο επικοινωνίας: ${rideDetails.userPhone}

Εάν μπορείτε να αναλάβετε αυτή τη διαδρομή, παρακαλώ πατήστε το ένα.
Εάν δεν είστε διαθέσιμος, πατήστε το δύο.

Σας ευχαριστούμε για τη συνεργασία.
    `.trim();

    return this.generateSpeech(script, {
      voiceId: this.GREEK_VOICES.SOFIA, // Warm, professional voice
      stability: 0.6,
      similarityBoost: 0.8
    });
  }

  /**
   * Generate confirmation audio for successful booking
   */
  static async generateConfirmationAudio(
    driverName: string,
    estimatedArrival: string
  ): Promise<TTSResponse> {
    const script = `
Ευχαριστούμε ${driverName}! 

Η παραγγελία έχει επιβεβαιωθεί. Ο πελάτης έχει ενημερωθεί ότι θα φτάσετε σε περίπου ${estimatedArrival}.

Παρακαλώ επικοινωνήστε άμεσα με τον πελάτη για την τελική συνεννόηση.

Καλή διαδρομή!
    `.trim();

    return this.generateSpeech(script, {
      voiceId: this.GREEK_VOICES.MARIA,
      stability: 0.7,
      similarityBoost: 0.75
    });
  }

  /**
   * Generate rejection audio when driver declines
   */
  static async generateRejectionAudio(): Promise<TTSResponse> {
    const script = `
Εντάξει, κατανοούμε. 

Θα προσπαθήσουμε να βρούμε άλλον διαθέσιμο οδηγό για τον πελάτη.

Ευχαριστούμε για την ειλικρίνειά σας και καλή συνέχεια!
    `.trim();

    return this.generateSpeech(script, {
      voiceId: this.GREEK_VOICES.MARIA,
      stability: 0.6,
      similarityBoost: 0.7
    });
  }

  /**
   * Get available Greek voices
   */
  static getAvailableVoices(): Array<{
    id: string;
    name: string;
    gender: 'male' | 'female';
    description: string;
  }> {
    return [
      {
        id: this.GREEK_VOICES.MARIA,
        name: 'Μαρία',
        gender: 'female',
        description: 'Επαγγελματική γυναικεία φωνή'
      },
      {
        id: this.GREEK_VOICES.DIMITRIS,
        name: 'Δημήτρης',
        gender: 'male',
        description: 'Επαγγελματική ανδρική φωνή'
      },
      {
        id: this.GREEK_VOICES.SOFIA,
        name: 'Σοφία',
        gender: 'female',
        description: 'Ζεστή, φιλική γυναικεία φωνή'
      },
      {
        id: this.GREEK_VOICES.KOSTAS,
        name: 'Κώστας',
        gender: 'male',
        description: 'Βαθιά, αυθεντική ανδρική φωνή'
      }
    ];
  }

  /**
   * Test voice quality with sample text
   */
  static async testVoice(voiceId: string): Promise<TTSResponse> {
    const testText = 'Γεια σας, αυτό είναι ένα τεστ της φωνής για το Touristas AI. Πώς ακούγεται;';
    
    return this.generateSpeech(testText, {
      voiceId: voiceId,
      stability: 0.5,
      similarityBoost: 0.75
    });
  }
} 