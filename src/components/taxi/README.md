# 🚕 Sifnos Taxi Auto-Caller

A revolutionary AI-powered feature that allows users to book local Sifnos taxis via natural language, automated voice calls with Greek TTS, and SMS confirmations. No apps, no Uber - just local human taxis, AI-automated.

## ✨ Features

### 🗣️ Natural Language Processing
- Parse taxi requests in Greek or English
- Extract pickup/dropoff locations, time, phone number, passenger count
- Handle conversational requests like "Θέλω ταξί από το ξενοδοχείο μου στην Apollonia στις 8μμ"

### 🎤 Voice Recognition
- Browser-based speech recognition (Greek language support)
- Real-time transcription of spoken requests
- Fallback to text input

### 🤖 AI-Powered Driver Selection
- Intelligent matching based on location, availability, and ratings
- Real-time driver status tracking
- Automatic fallback to next available driver

### 📞 Automated Voice Calls
- **Twilio Voice API** integration for calling drivers
- **ElevenLabs TTS** for high-quality Greek voice synthesis
- Interactive voice response (IVR) for driver confirmation
- Professional Greek scripts with natural pronunciation

### 📱 SMS Notifications
- Instant SMS confirmations to users with driver details
- Driver notifications with ride information
- Booking reference codes for tracking

## 🏗️ Architecture

```
User Input (Greek/English)
    ↓
Natural Language Parser
    ↓
Driver Selection Algorithm
    ↓
Greek TTS Generation (ElevenLabs)
    ↓
Voice Call to Driver (Twilio)
    ↓
Driver Response (DTMF)
    ↓
SMS Confirmations (User + Driver)
```

## 🧱 Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | React + TypeScript | User interface and voice input |
| **NLP** | Custom parser + OpenAI | Natural language understanding |
| **Voice Calls** | Twilio Voice API | Automated calls to drivers |
| **Text-to-Speech** | ElevenLabs API | High-quality Greek voice synthesis |
| **SMS** | Twilio SMS API | Confirmations and notifications |
| **Database** | Supabase | Driver data and booking records |
| **Backend** | Next.js API Routes | Serverless functions |

## 📂 File Structure

```
src/
├── components/taxi/
│   ├── TaxiAutoCaller.tsx      # Main UI component
│   └── README.md               # This documentation
├── services/
│   ├── taxiService.ts          # Core taxi booking logic
│   ├── twilioService.ts        # Voice & SMS integration
│   └── elevenLabsService.ts    # Greek TTS service
└── pages/api/taxi/
    ├── book.ts                 # Booking API endpoint
    └── voice-response.ts       # Driver response handler
```

## 🚀 Usage Examples

### Basic Request (English)
```
"Can you call me a taxi from Kamares port to Plathys Gialos beach? My number is 697XXXXXXX"
```

### Advanced Request (Greek)
```
"Θέλω ταξί από το Narlis Hotel στην Apollonia στις 8μμ για 4 άτομα. Το τηλέφωνό μου είναι 694XXXXXXX"
```

### Voice Input
Users can click the microphone button and speak their request in either language.

## 🔧 Configuration

### Environment Variables
```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number

# ElevenLabs Configuration
ELEVENLABS_API_KEY=your_api_key

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Driver Database Schema
```sql
CREATE TABLE taxi_drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle TEXT NOT NULL,
  location TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  rating DECIMAL(2,1) DEFAULT 5.0,
  price_per_km DECIMAL(4,2) NOT NULL,
  languages TEXT[] DEFAULT '{"Greek", "English"}',
  specialties TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 User Experience Flow

1. **Input**: User describes their taxi need in natural language
2. **Processing**: AI parses location, time, contact details
3. **Matching**: System finds best available driver
4. **Calling**: Automated voice call to driver in Greek
5. **Confirmation**: Driver responds via phone keypad (1=Yes, 2=No)
6. **Notification**: SMS sent to both user and driver
7. **Tracking**: Booking reference provided for follow-up

## 🔮 Future Enhancements

### Phase 2 Features
- **Real-time GPS tracking** of taxi location
- **Payment integration** with Stripe/PayPal
- **Multi-language support** (German, French, Italian)
- **Driver ratings system** with user feedback
- **Scheduled bookings** for future rides

### Phase 3 Features
- **WhatsApp integration** for bookings
- **Voice AI conversations** instead of DTMF
- **Dynamic pricing** based on demand
- **Fleet management** dashboard for operators
- **Tourist package deals** with hotels/restaurants

## 🌟 Unique Selling Points

1. **No App Required**: Works through web browser
2. **Local Focus**: Exclusively for Sifnos island
3. **Human Drivers**: Real local taxi drivers, not ride-share
4. **Greek Language**: Native language support with proper pronunciation
5. **Instant Booking**: No waiting for app downloads or registrations
6. **Tourist-Friendly**: Perfect for visitors without local knowledge

## 🛡️ Security & Privacy

- **No personal data storage** beyond booking session
- **Encrypted communications** for all API calls
- **GDPR compliant** data handling
- **Secure payment processing** (when implemented)
- **Driver verification** through local authorities

## 📊 Analytics & Monitoring

- **Booking success rates** by time/location
- **Driver response times** and acceptance rates
- **User satisfaction** through follow-up SMS
- **System performance** monitoring
- **Cost optimization** for voice/SMS usage

---

**Built with ❤️ for Sifnos travelers by Touristas AI** 