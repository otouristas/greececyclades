# 🍽️ Restaurant Auto-Booker

**Revolutionary AI-powered restaurant reservation system for Sifnos, Greece**

## Overview

The Restaurant Auto-Booker is an innovative AI system that automatically calls Sifnos restaurants in Greek to make reservations on behalf of tourists. It features natural language processing, Greek text-to-speech, voice calls, and SMS confirmations.

## Features

### 🤖 **Natural Language Processing**
- Parse English and Greek reservation requests
- Extract restaurant names, dates, times, party size, and special requests
- Handle conversational input like "Book me a table for 4 at Drimoni tomorrow at sunset"

### 🏛️ **Real Sifnos Restaurants**
- **Drimoni Restaurant** - Elegant beachfront dining at Plathys Gialos
- **Meropi Restaurant** - Traditional Sifnian taverna in Apollonia  
- **Cantina Sifnos** - Modern Greek cuisine and cocktails
- **Omega3 Restaurant** - Fresh seafood at Kamares port

### 📞 **AI Voice Calling**
- Generate professional Greek call scripts
- High-quality Greek TTS with multiple voice options
- Automated phone calls to restaurant owners
- DTMF response handling (Press 1 for Yes, 2 for No)

### 📱 **SMS Integration**
- Confirmation SMS to customers in Greek
- Booking reference numbers
- Real-time status updates

### 🎤 **Voice Recognition**
- Browser-based speech recognition
- Support for Greek and English input
- Real-time transcription

## Technical Architecture

```
User Input → Natural Language Parser → Restaurant Selection → Greek TTS → Voice Call → SMS Confirmation
```

### Core Services

1. **RestaurantService** (`src/services/restaurantService.ts`)
   - Natural language parsing
   - Restaurant database management
   - Booking logic and validation
   - Greek call script generation

2. **TwilioService** (`src/services/twilioService.ts`)
   - Voice call automation
   - SMS messaging
   - DTMF response handling

3. **ElevenLabsService** (`src/services/elevenLabsService.ts`)
   - High-quality Greek TTS
   - Multiple voice personalities
   - Audio buffer generation

### API Endpoints

- `POST /api/restaurants/book` - Process booking requests
- `POST /api/restaurants/voice-response` - Handle restaurant responses

## Usage Examples

### English Requests
```
"Book a table for 2 at Drimoni tomorrow at 8pm with sunset view"
"Table for 6 at Cantina tonight, vegetarian options needed"
"Reserve dinner for 4 people at Meropi on Friday at 9pm"
```

### Greek Requests
```
"Θέλω τραπέζι για 4 άτομα στο Drimoni αύριο στις 8 το βράδυ"
"Κράτηση για 3 άτομα στο Omega3 αύριο μεσημέρι"
"Τραπέζι για 2 στη Meropi σήμερα στις 9 το βράδυ"
```

## Restaurant Database

Each restaurant includes:
- Contact information
- Location and cuisine type
- Specialties and features
- Operating hours
- Price range and ratings
- Availability status

## Process Flow

1. **Input Processing**: Parse natural language request
2. **Restaurant Matching**: Find best restaurant match
3. **Script Generation**: Create Greek call script
4. **Voice Synthesis**: Generate TTS audio
5. **Phone Call**: Automated call to restaurant
6. **Response Handling**: Process restaurant confirmation
7. **SMS Confirmation**: Send booking details to customer

## Integration

The Restaurant Auto-Booker is integrated into the main Touristas AI platform as a dedicated tab, accessible via:
- Desktop sidebar navigation
- Mobile tab navigation
- Quick action buttons in chat
- Landing page feature showcase

## Future Enhancements

- Multi-island restaurant support
- Real-time availability checking
- Menu integration and dietary preferences
- Photo recognition for special occasions
- Integration with hotel concierge services
- WhatsApp booking confirmations

## Demo Mode

The current implementation runs in demo mode with:
- Mock restaurant database
- Simulated API calls
- Console logging for development
- Responsive UI for all devices

This system represents a breakthrough in AI-powered local service automation for Greek island tourism. 