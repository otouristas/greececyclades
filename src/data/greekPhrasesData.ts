// Define the structure for our phrase data
export interface Phrase {
  id: number;
  english: string;
  greek: string;
  pronunciation: string;
  category: string;
  audioUrl: string;
}

// Categories for phrases
export const phraseCategories = [
  { id: 'all', name: 'All Phrases' },
  { id: 'greetings', name: 'Greetings' },
  { id: 'basics', name: 'Basic Phrases' },
  { id: 'dining', name: 'Dining' },
  { id: 'transportation', name: 'Transportation' },
  { id: 'accommodation', name: 'Accommodation' },
  { id: 'emergencies', name: 'Emergencies' },
  { id: 'shopping', name: 'Shopping' },
  { id: 'sightseeing', name: 'Sightseeing' }
];

// Complete list of Greek phrases
export const greekPhrases: Phrase[] = [
  {
    id: 1,
    english: 'Hello',
    greek: 'Γειά σου',
    pronunciation: 'YAH-soo',
    category: 'greetings',
    audioUrl: '/audio/phrases/hello.mp3'
  },
  {
    id: 2,
    english: 'Good morning',
    greek: 'Καλημέρα',
    pronunciation: 'ka-lee-MER-ah',
    category: 'greetings',
    audioUrl: '/audio/phrases/good-morning.mp3'
  },
  {
    id: 3,
    english: 'Good evening',
    greek: 'Καλησπέρα',
    pronunciation: 'ka-lee-SPER-ah',
    category: 'greetings',
    audioUrl: '/audio/phrases/good-evening.mp3'
  },
  {
    id: 4,
    english: 'Goodbye',
    greek: 'Αντίο',
    pronunciation: 'an-DEE-o',
    category: 'greetings',
    audioUrl: '/audio/phrases/goodbye.mp3'
  },
  {
    id: 5,
    english: 'Please',
    greek: 'Παρακαλώ',
    pronunciation: 'para-ka-LO',
    category: 'basics',
    audioUrl: '/audio/phrases/please.mp3'
  },
  {
    id: 6,
    english: 'Thank you',
    greek: 'Ευχαριστώ',
    pronunciation: 'ef-kha-ree-STO',
    category: 'basics',
    audioUrl: '/audio/phrases/thank-you.mp3'
  },
  {
    id: 7,
    english: 'You\'re welcome',
    greek: 'Παρακαλώ',
    pronunciation: 'para-ka-LO',
    category: 'basics',
    audioUrl: '/audio/phrases/youre-welcome.mp3'
  },
  {
    id: 8,
    english: 'Yes',
    greek: 'Ναι',
    pronunciation: 'ne',
    category: 'basics',
    audioUrl: '/audio/phrases/yes.mp3'
  },
  {
    id: 9,
    english: 'No',
    greek: 'Όχι',
    pronunciation: 'OH-hee',
    category: 'basics',
    audioUrl: '/audio/phrases/no.mp3'
  },
  {
    id: 10,
    english: 'Excuse me',
    greek: 'Με συγχωρείτε',
    pronunciation: 'me seen-ho-REE-te',
    category: 'basics',
    audioUrl: '/audio/phrases/excuse-me.mp3'
  },
  {
    id: 11,
    english: 'I don\'t understand',
    greek: 'Δεν καταλαβαίνω',
    pronunciation: 'then ka-ta-la-VE-no',
    category: 'basics',
    audioUrl: '/audio/phrases/dont-understand.mp3'
  },
  {
    id: 12,
    english: 'Do you speak English?',
    greek: 'Μιλάτε αγγλικά;',
    pronunciation: 'mi-LA-te an-gli-KA',
    category: 'basics',
    audioUrl: '/audio/phrases/speak-english.mp3'
  },
  {
    id: 13,
    english: 'The bill, please',
    greek: 'Τον λογαριασμό, παρακαλώ',
    pronunciation: 'ton lo-ga-ree-a-SMO, para-ka-LO',
    category: 'dining',
    audioUrl: '/audio/phrases/bill-please.mp3'
  },
  {
    id: 14,
    english: 'Where is the bathroom?',
    greek: 'Πού είναι η τουαλέτα;',
    pronunciation: 'poo EE-ne ee twa-LE-ta',
    category: 'basics',
    audioUrl: '/audio/phrases/where-bathroom.mp3'
  },
  {
    id: 15,
    english: 'How much does it cost?',
    greek: 'Πόσο κοστίζει;',
    pronunciation: 'PO-so ko-STEE-zi',
    category: 'shopping',
    audioUrl: '/audio/phrases/how-much.mp3'
  },
  {
    id: 16,
    english: 'One coffee, please',
    greek: 'Έναν καφέ, παρακαλώ',
    pronunciation: 'E-nan ka-FE, para-ka-LO',
    category: 'dining',
    audioUrl: '/audio/phrases/one-coffee.mp3'
  },
  {
    id: 17,
    english: 'Where is the beach?',
    greek: 'Πού είναι η παραλία;',
    pronunciation: 'poo EE-ne ee para-LEE-a',
    category: 'sightseeing',
    audioUrl: '/audio/phrases/where-beach.mp3'
  },
  {
    id: 18,
    english: 'I would like a table for two',
    greek: 'Θα ήθελα ένα τραπέζι για δύο',
    pronunciation: 'tha EE-the-la E-na tra-PE-zi yia THEE-o',
    category: 'dining',
    audioUrl: '/audio/phrases/table-for-two.mp3'
  },
  {
    id: 19,
    english: 'What time is it?',
    greek: 'Τι ώρα είναι;',
    pronunciation: 'tee O-ra EE-ne',
    category: 'basics',
    audioUrl: '/audio/phrases/what-time.mp3'
  },
  {
    id: 20,
    english: 'How do I get to the port?',
    greek: 'Πώς πάω στο λιμάνι;',
    pronunciation: 'pos PA-o sto lee-MA-nee',
    category: 'transportation',
    audioUrl: '/audio/phrases/how-to-port.mp3'
  },
  {
    id: 21,
    english: 'I need a taxi',
    greek: 'Χρειάζομαι ένα ταξί',
    pronunciation: 'hree-A-zo-me E-na ta-KSEE',
    category: 'transportation',
    audioUrl: '/audio/phrases/need-taxi.mp3'
  },
  {
    id: 22,
    english: 'I would like to rent a car',
    greek: 'Θα ήθελα να νοικιάσω ένα αυτοκίνητο',
    pronunciation: 'tha EE-the-la na ni-kee-A-so E-na af-to-KEE-ni-to',
    category: 'transportation',
    audioUrl: '/audio/phrases/rent-car.mp3'
  },
  {
    id: 23,
    english: 'I have a reservation',
    greek: 'Έχω μια κράτηση',
    pronunciation: 'E-ho MEE-a KRA-tee-see',
    category: 'accommodation',
    audioUrl: '/audio/phrases/have-reservation.mp3'
  },
  {
    id: 24,
    english: 'Can you help me?',
    greek: 'Μπορείτε να με βοηθήσετε;',
    pronunciation: 'bo-REE-te na me vo-ee-THEE-se-te',
    category: 'emergencies',
    audioUrl: '/audio/phrases/can-help.mp3'
  },
  {
    id: 25,
    english: 'I need a doctor',
    greek: 'Χρειάζομαι έναν γιατρό',
    pronunciation: 'hree-A-zo-me E-nan yia-TRO',
    category: 'emergencies',
    audioUrl: '/audio/phrases/need-doctor.mp3'
  },
  {
    id: 26,
    english: 'Where is the nearest pharmacy?',
    greek: 'Πού είναι το πλησιέστερο φαρμακείο;',
    pronunciation: 'poo EE-ne to plee-see-E-ste-ro far-ma-KEE-o',
    category: 'emergencies',
    audioUrl: '/audio/phrases/nearest-pharmacy.mp3'
  },
  {
    id: 27,
    english: 'I\'m lost',
    greek: 'Έχω χαθεί',
    pronunciation: 'E-ho ha-THEE',
    category: 'emergencies',
    audioUrl: '/audio/phrases/im-lost.mp3'
  },
  {
    id: 28,
    english: 'What do you recommend?',
    greek: 'Τι προτείνετε;',
    pronunciation: 'tee pro-TEE-ne-te',
    category: 'dining',
    audioUrl: '/audio/phrases/what-recommend.mp3'
  },
  {
    id: 29,
    english: 'Is there a menu in English?',
    greek: 'Υπάρχει μενού στα αγγλικά;',
    pronunciation: 'ee-PAR-hee me-NOO sta an-gli-KA',
    category: 'dining',
    audioUrl: '/audio/phrases/menu-english.mp3'
  },
  {
    id: 30,
    english: 'What time does the ferry leave?',
    greek: 'Τι ώρα φεύγει το πλοίο;',
    pronunciation: 'tee O-ra FEV-yee to PLEE-o',
    category: 'transportation',
    audioUrl: '/audio/phrases/ferry-leave.mp3'
  },
  {
    id: 31,
    english: 'One ticket to Santorini, please',
    greek: 'Ένα εισιτήριο για τη Σαντορίνη, παρακαλώ',
    pronunciation: 'E-na ee-see-TEE-ree-o yia tee san-to-REE-nee, para-ka-LO',
    category: 'transportation',
    audioUrl: '/audio/phrases/ticket-santorini.mp3'
  },
  {
    id: 32,
    english: 'Is breakfast included?',
    greek: 'Περιλαμβάνεται το πρωινό;',
    pronunciation: 'pe-ri-lam-VA-ne-te to pro-ee-NO',
    category: 'accommodation',
    audioUrl: '/audio/phrases/breakfast-included.mp3'
  },
  {
    id: 33,
    english: 'What time is check-out?',
    greek: 'Τι ώρα είναι το check-out;',
    pronunciation: 'tee O-ra EE-ne to check-out',
    category: 'accommodation',
    audioUrl: '/audio/phrases/checkout-time.mp3'
  },
  {
    id: 34,
    english: 'Is there Wi-Fi?',
    greek: 'Υπάρχει Wi-Fi;',
    pronunciation: 'ee-PAR-hee Wi-Fi',
    category: 'accommodation',
    audioUrl: '/audio/phrases/is-wifi.mp3'
  },
  {
    id: 35,
    english: 'Can I pay by credit card?',
    greek: 'Μπορώ να πληρώσω με πιστωτική κάρτα;',
    pronunciation: 'bo-RO na plee-RO-so me pis-to-ti-KEE KAR-ta',
    category: 'shopping',
    audioUrl: '/audio/phrases/pay-credit-card.mp3'
  },
  {
    id: 36,
    english: 'I\'m just looking',
    greek: 'Απλά κοιτάζω',
    pronunciation: 'a-PLA kee-TA-zo',
    category: 'shopping',
    audioUrl: '/audio/phrases/just-looking.mp3'
  },
  {
    id: 37,
    english: 'What time does it open?',
    greek: 'Τι ώρα ανοίγει;',
    pronunciation: 'tee O-ra a-NEE-yee',
    category: 'sightseeing',
    audioUrl: '/audio/phrases/what-time-open.mp3'
  },
  {
    id: 38,
    english: 'How much is the entrance fee?',
    greek: 'Πόσο είναι το εισιτήριο εισόδου;',
    pronunciation: 'PO-so EE-ne to ee-see-TEE-ree-o ee-SO-doo',
    category: 'sightseeing',
    audioUrl: '/audio/phrases/entrance-fee.mp3'
  },
  {
    id: 39,
    english: 'Can I take a photo here?',
    greek: 'Μπορώ να βγάλω φωτογραφία εδώ;',
    pronunciation: 'bo-RO na VGA-lo fo-to-gra-FEE-a e-THO',
    category: 'sightseeing',
    audioUrl: '/audio/phrases/take-photo.mp3'
  },
  {
    id: 40,
    english: 'Cheers!',
    greek: 'Γειά μας!',
    pronunciation: 'YAH mas',
    category: 'dining',
    audioUrl: '/audio/phrases/cheers.mp3'
  }
];
