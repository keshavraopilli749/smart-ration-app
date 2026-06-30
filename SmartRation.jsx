import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  teal:       "#0B6E6A",
  tealLight:  "#E6F4F3",
  tealMid:    "#14948E",
  tealDark:   "#085450",
  blue:       "#1D4ED8",
  blueLight:  "#EFF6FF",
  green:      "#15803D",
  greenLight: "#F0FDF4",
  amber:      "#B45309",
  amberLight: "#FFFBEB",
  red:        "#B91C1C",
  redLight:   "#FEF2F2",
  purple:     "#6D28D9",
  purpleLight:"#F5F3FF",
  ink:        "#0F172A",
  slate:      "#475569",
  muted:      "#94A3B8",
  line:       "#E2E8F0",
  bg:         "#F8FAFC",
  white:      "#FFFFFF",
};

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const i18n = {
  en: {
    appName: "Smart Ration",
    tagline: "Digital PDS Service",
    home: "Home", bookSlot: "Book a slot", myBooking: "My booking",
    notifications: "Notifications", profile: "Profile",
    goodMorning: "Good morning", goodAfternoon: "Good afternoon", goodEvening: "Good evening",
    rationReady: "Your monthly ration is ready",
    rationReadyDesc: "June 2026 allocation is available at your linked shop.",
    collectBefore: "Collect before", atShop: "At",
    atAGlance: "At a glance", refresh: "Refresh",
    rationStatus: "Ration status", readyToCollect: "Ready to collect",
    stockAvailable: "Stock is available", nextBooking: "Next booking",
    noSlotBooked: "No slot booked", bookNow: "Book now",
    familyMembers: "Family members",
    skipQueue: "Skip the queue. Book your slot.",
    skipQueueDesc: "Choose a convenient time and collect your ration without waiting.",
    recentNotifications: "Recent notifications",
    quickActions: "Quick actions",
    viewDigitalToken: "View digital token", showAtShop: "Show at your ration shop",
    rationCardDetails: "Ration card details", viewFamily: "View family information",
    helpSupport: "Help & support",
    helpline: "Helpline: 1800-111-155",
    needHelp: "Need help?",
    bookCollection: "Book a collection slot",
    bookCollectionDesc: "Select your shop, date and a convenient time.",
    chooseShop: "Choose shop", selectSlot: "Select slot", confirm: "Confirm",
    state: "State", district: "District", rationShop: "Ration shop",
    linkedShop: "Linked shop", kmAway: "km away",
    continueBtn: "Continue", back: "Back", editSlot: "Edit slot",
    chooseDate: "Choose a date", availableSlots: "Available time slots",
    available: "Available", fillingFast: "Filling fast", slotFull: "Full",
    slotsLeft: "slots left",
    reviewConfirm: "Review and confirm",
    reviewDesc: "Please check the details before confirming.",
    confirmBooking: "Confirm booking",
    shopLabel: "Ration shop", dateLabel: "Date", timeLabel: "Time",
    cardHolder: "Card holder", rationCard: "Ration card",
    slotReserved: "Your slot is reserved for 10 minutes.",
    arriveEarly: "Please arrive 5 minutes early with your ration card.",
    myBookingTitle: "Your digital token",
    showQR: "Show this QR code when you arrive at the ration shop.",
    bookingId: "Booking ID", verifiedToken: "Verified digital token",
    downloadToken: "Download token", reschedule: "Reschedule",
    cancelBooking: "Cancel booking",
    arriveNote: "Arrive 5 minutes early",
    slotHeld: "Your slot is held for 15 minutes after scheduled time.",
    noBooking: "No upcoming booking",
    noBookingDesc: "Book a collection slot to skip the queue.",
    confirmed: "Confirmed",
    updatesTitle: "Notifications",
    updatesDesc: "Important updates about your ration and bookings.",
    all: "All", unread: "Unread", markAllRead: "Mark all as read",
    accountTitle: "My profile",
    accountDesc: "Manage your personal and ration card details.",
    verifiedHolder: "Verified card holder",
    mobile: "Mobile number", address: "Address", language: "Language",
    english: "English", hindi: "Hindi",
    familyCard: "Family members", membersLinked: "members linked",
    familyHead: "Family head", spouse: "Spouse", son: "Son", daughter: "Daughter",
    helpSupportBtn: "Help & support",
    languageBtn: "Language",
    logout: "Log out",
    editProfile: "Edit profile",
    viewAs: "View as",
    citizen: "Citizen", shopkeeper: "Shopkeeper", administrator: "Administrator",
  },
  hi: {
    appName: "स्मार्ट राशन",
    tagline: "डिजिटल PDS सेवा",
    home: "होम", bookSlot: "स्लॉट बुक करें", myBooking: "मेरी बुकिंग",
    notifications: "सूचनाएं", profile: "प्रोफ़ाइल",
    goodMorning: "सुप्रभात", goodAfternoon: "नमस्कार", goodEvening: "शुभ संध्या",
    rationReady: "आपका मासिक राशन तैयार है",
    rationReadyDesc: "जून 2026 का आवंटन आपकी लिंक्ड दुकान पर उपलब्ध है।",
    collectBefore: "पहले लें", atShop: "दुकान पर",
    atAGlance: "एक नज़र में", refresh: "रीफ्रेश",
    rationStatus: "राशन स्थिति", readyToCollect: "संग्रह के लिए तैयार",
    stockAvailable: "स्टॉक उपलब्ध है", nextBooking: "अगली बुकिंग",
    noSlotBooked: "कोई स्लॉट बुक नहीं", bookNow: "अभी बुक करें",
    familyMembers: "परिवार के सदस्य",
    skipQueue: "कतार से बचें। अपना स्लॉट बुक करें।",
    skipQueueDesc: "सुविधाजनक समय चुनें और बिना प्रतीक्षा किए राशन लें।",
    recentNotifications: "हाल की सूचनाएं",
    quickActions: "त्वरित कार्य",
    viewDigitalToken: "डिजिटल टोकन देखें", showAtShop: "दुकान पर दिखाएं",
    rationCardDetails: "राशन कार्ड विवरण", viewFamily: "परिवार की जानकारी देखें",
    helpSupport: "सहायता",
    helpline: "हेल्पलाइन: 1800-111-155",
    needHelp: "मदद चाहिए?",
    bookCollection: "संग्रह स्लॉट बुक करें",
    bookCollectionDesc: "अपनी दुकान, तारीख और समय चुनें।",
    chooseShop: "दुकान चुनें", selectSlot: "स्लॉट चुनें", confirm: "पुष्टि करें",
    state: "राज्य", district: "जिला", rationShop: "राशन की दुकान",
    linkedShop: "लिंक्ड दुकान", kmAway: "किमी दूर",
    continueBtn: "जारी रखें", back: "वापस", editSlot: "स्लॉट बदलें",
    chooseDate: "तारीख चुनें", availableSlots: "उपलब्ध समय स्लॉट",
    available: "उपलब्ध", fillingFast: "जल्दी भर रहा है", slotFull: "भरा हुआ",
    slotsLeft: "स्लॉट बचे",
    reviewConfirm: "समीक्षा और पुष्टि",
    reviewDesc: "पुष्टि करने से पहले विवरण जांचें।",
    confirmBooking: "बुकिंग पुष्टि करें",
    shopLabel: "राशन की दुकान", dateLabel: "तारीख", timeLabel: "समय",
    cardHolder: "कार्डधारक", rationCard: "राशन कार्ड",
    slotReserved: "आपका स्लॉट 10 मिनट के लिए आरक्षित है।",
    arriveEarly: "कृपया 5 मिनट पहले राशन कार्ड लेकर आएं।",
    myBookingTitle: "आपका डिजिटल टोकन",
    showQR: "राशन की दुकान पर यह QR कोड दिखाएं।",
    bookingId: "बुकिंग ID", verifiedToken: "सत्यापित डिजिटल टोकन",
    downloadToken: "टोकन डाउनलोड करें", reschedule: "पुनर्निर्धारित करें",
    cancelBooking: "बुकिंग रद्द करें",
    arriveNote: "5 मिनट पहले पहुंचें",
    slotHeld: "स्लॉट निर्धारित समय के 15 मिनट बाद तक रहता है।",
    noBooking: "कोई आगामी बुकिंग नहीं",
    noBookingDesc: "कतार से बचने के लिए स्लॉट बुक करें।",
    confirmed: "पुष्टि हो गई",
    updatesTitle: "सूचनाएं",
    updatesDesc: "राशन और बुकिंग के बारे में महत्वपूर्ण अपडेट।",
    all: "सभी", unread: "अपठित", markAllRead: "सभी पढ़ा हुआ मार्क करें",
    accountTitle: "मेरी प्रोफ़ाइल",
    accountDesc: "अपनी व्यक्तिगत और राशन कार्ड जानकारी प्रबंधित करें।",
    verifiedHolder: "सत्यापित कार्डधारक",
    mobile: "मोबाइल नंबर", address: "पता", language: "भाषा",
    english: "English", hindi: "हिन्दी",
    familyCard: "परिवार के सदस्य", membersLinked: "सदस्य जुड़े हुए",
    familyHead: "परिवार के मुखिया", spouse: "जीवनसाथी", son: "पुत्र", daughter: "पुत्री",
    helpSupportBtn: "सहायता",
    languageBtn: "भाषा",
    logout: "लॉग आउट",
    editProfile: "प्रोफ़ाइल संपादित करें",
    viewAs: "के रूप में देखें",
    citizen: "नागरिक", shopkeeper: "दुकानदार", administrator: "प्रशासक",
  }
};

const extendLocale = (overrides) => ({ ...i18n.en, ...overrides });

i18n.bn = extendLocale({
  appName: "স্মার্ট রেশন",
  tagline: "ডিজিটাল পিডিএস পরিষেবা",
  home: "হোম",
  bookSlot: "স্লট বুক করুন",
  myBooking: "আমার বুকিং",
  notifications: "নোটিফিকেশন",
  profile: "প্রোফাইল",
  goodMorning: "সুপ্রভাত",
  goodAfternoon: "শুভ অপরাহ্ণ",
  goodEvening: "শুভ সন্ধ্যা",
  atAGlance: "এক নজরে",
  refresh: "রিফ্রেশ",
  skipQueue: "সারি এড়িয়ে চলুন। আপনার স্লট বুক করুন।",
  skipQueueDesc: "সুবিধাজনক সময় বেছে নিন এবং অপেক্ষা না করে রেশন নিন।",
  recentNotifications: "সাম্প্রতিক নোটিফিকেশন",
  quickActions: "দ্রুত কাজ",
  bookCollection: "সংগ্রহ স্লট বুক করুন",
  bookCollectionDesc: "আপনার দোকান, তারিখ এবং সুবিধাজনক সময় নির্বাচন করুন।",
  chooseShop: "দোকান নির্বাচন করুন",
  selectSlot: "স্লট নির্বাচন করুন",
  confirm: "নিশ্চিত করুন",
  continueBtn: "চালিয়ে যান",
  back: "ফিরে যান",
  editSlot: "স্লট সম্পাদনা",
  chooseDate: "তারিখ নির্বাচন করুন",
  availableSlots: "উপলব্ধ সময় স্লট",
  reviewConfirm: "পর্যালোচনা ও নিশ্চিত করুন",
  reviewDesc: "নিশ্চিত করার আগে বিবরণ যাচাই করুন।",
  confirmBooking: "বুকিং নিশ্চিত করুন",
  noBooking: "কোনো আসন্ন বুকিং নেই",
  noBookingDesc: "সারি এড়াতে একটি সংগ্রহ স্লট বুক করুন।",
  updatesTitle: "নোটিফিকেশন",
  updatesDesc: "আপনার রেশন এবং বুকিং সম্পর্কে গুরুত্বপূর্ণ আপডেট।",
  accountTitle: "আমার প্রোফাইল",
  accountDesc: "আপনার ব্যক্তিগত এবং রেশন কার্ডের বিবরণ পরিচালনা করুন।",
  viewAs: "দেখুন",
  languageBtn: "ভাষা",
  citizen: "নাগরিক",
  shopkeeper: "দোকানদার",
  administrator: "প্রশাসক",
  helpSupport: "সহায়তা",
  helpSupportBtn: "সহায়তা",
  needHelp: "সাহায্য দরকার?",
});

i18n.ta = extendLocale({
  appName: "ஸ்மார்ட் ரேஷன்",
  tagline: "டிஜிட்டல் PDS சேவை",
  home: "முகப்பு",
  bookSlot: "ஸ்லாட் பதிவு",
  myBooking: "என் பதிவு",
  notifications: "அறிவிப்புகள்",
  profile: "சுயவிவரம்",
  goodMorning: "காலை வணக்கம்",
  goodAfternoon: "மதிய வணக்கம்",
  goodEvening: "மாலை வணக்கம்",
  atAGlance: "ஒரு பார்வையில்",
  refresh: "புதுப்பிக்க",
  skipQueue: "வரிசையைத் தவிர்க்கவும். உங்கள் ஸ்லாட்டை பதிவு செய்யுங்கள்.",
  skipQueueDesc: "சௌகரியமான நேரத்தைத் தேர்ந்தெடுத்து காத்திருக்காமல் ரேஷன் பெறுங்கள்.",
  recentNotifications: "சமீபத்திய அறிவிப்புகள்",
  quickActions: "விரைவு செயல்கள்",
  bookCollection: "சேகரிப்பு ஸ்லாட் பதிவு",
  bookCollectionDesc: "உங்கள் கடை, தேதி மற்றும் வசதியான நேரத்தைத் தேர்வுசெய்க.",
  chooseShop: "கடையைத் தேர்வுசெய்க",
  selectSlot: "ஸ்லாட்டைத் தேர்வுசெய்க",
  confirm: "உறுதிப்படுத்துக",
  continueBtn: "தொடரவும்",
  back: "திரும்ப",
  editSlot: "ஸ்லாட்டை மாற்று",
  chooseDate: "தேதியைத் தேர்வுசெய்க",
  availableSlots: "கிடைக்கும் நேர ஸ்லாட்கள்",
  reviewConfirm: "பரிசீலித்து உறுதிப்படுத்துக",
  reviewDesc: "உறுதிப்படுத்துவதற்கு முன் விவரங்களைச் சரிபார்க்கவும்.",
  confirmBooking: "பதிவை உறுதிப்படுத்துக",
  noBooking: "வரவிருக்கும் பதிவு இல்லை",
  noBookingDesc: "வரிசையைத் தவிர்க்க ஒரு சேகரிப்பு ஸ்லாட்டை பதிவு செய்யுங்கள்.",
  updatesTitle: "அறிவிப்புகள்",
  updatesDesc: "உங்கள் ரேஷன் மற்றும் பதிவுகள் பற்றிய முக்கிய புதுப்பிப்புகள்.",
  accountTitle: "என் சுயவிவரம்",
  accountDesc: "உங்கள் தனிப்பட்ட மற்றும் ரேஷன் அட்டை விவரங்களை நிர்வகிக்கவும்.",
  viewAs: "பார்வை",
  languageBtn: "மொழி",
  citizen: "குடிமகன்",
  shopkeeper: "கடைkeeper",
  administrator: "நிர்வாகி",
  helpSupport: "உதவி",
  helpSupportBtn: "உதவி",
  needHelp: "உதவி வேண்டுமா?",
});

i18n.te = extendLocale({
  appName: "స్మార్ట్ రేషన్",
  tagline: "డిజిటల్ PDS సేవ",
  home: "హోమ్",
  bookSlot: "స్లాట్ బుక్ చేయండి",
  myBooking: "నా బుకింగ్",
  notifications: "నోటిఫికేషన్లు",
  profile: "ప్రొఫైల్",
  goodMorning: "శుభోదయం",
  goodAfternoon: "శుభ మద్యాహ్నం",
  goodEvening: "శుభ సాయంత్రం",
  atAGlance: "ఒక చూపులో",
  refresh: "రిఫ్రెష్",
  skipQueue: "క్యూను దాటండి. మీ స్లాట్ బుక్ చేయండి.",
  skipQueueDesc: "సౌకర్యమైన సమయాన్ని ఎంచుకుని వేచి లేకుండా రేషన్ తీసుకోండి.",
  recentNotifications: "తాజా నోటిఫికేషన్లు",
  quickActions: "త్వరిత చర్యలు",
  bookCollection: "సేకరణ స్లాట్ బుక్ చేయండి",
  bookCollectionDesc: "మీ దుకాణం, తేదీ మరియు సౌకర్యమైన సమయాన్ని ఎంచుకోండి.",
  chooseShop: "దుకాణం ఎంచుకోండి",
  selectSlot: "స్లాట్ ఎంచుకోండి",
  confirm: "నిర్ధారించండి",
  continueBtn: "కొనసాగించండి",
  back: "వెనుకకు",
  editSlot: "స్లాట్ మార్చండి",
  chooseDate: "తేదీ ఎంచుకోండి",
  availableSlots: "అందుబాటులో ఉన్న సమయ స్లాట్లు",
  reviewConfirm: "పరిశీలించి నిర్ధారించండి",
  reviewDesc: "నిర్ధారించేముందు వివరాలను తనిఖీ చేయండి.",
  confirmBooking: "బుకింగ్‌ను నిర్ధారించండి",
  noBooking: "రాబోయే బుకింగ్ లేదు",
  noBookingDesc: "క్యూను దాటడానికి ఒక సేకరణ స్లాట్ బుక్ చేయండి.",
  updatesTitle: "నోటిఫికేషన్లు",
  updatesDesc: "మీ రేషన్ మరియు బుకింగ్స్ గురించి ముఖ్యమైన అప్డేట్లు.",
  accountTitle: "నా ప్రొఫైల్",
  accountDesc: "మీ వ్యక్తిగత మరియు రేషన్ కార్డు వివరాలను నిర్వహించండి.",
  viewAs: "వీక్షణ",
  languageBtn: "భాష",
  citizen: "నాగరికుడు",
  shopkeeper: "దుకాణదారు",
  administrator: "అడ్మినిస్ట్రేటర్",
  helpSupport: "సహాయం",
  helpSupportBtn: "సహాయం",
  needHelp: "సహాయం కావాలా?",
});

i18n.mr = extendLocale({
  appName: "स्मार्ट रेशन",
  tagline: "डिजिटल PDS सेवा",
  home: "होम",
  bookSlot: "स्लॉट बुक करा",
  myBooking: "माझी बुकिंग",
  notifications: "सूचना",
  profile: "प्रोफाइल",
  goodMorning: "सुप्रभात",
  goodAfternoon: "नमस्कार",
  goodEvening: "शुभ संध्या",
  atAGlance: "एका नजरेत",
  refresh: "रीफ्रेश",
  skipQueue: "रांग टाळा. तुमचा स्लॉट बुक करा.",
  skipQueueDesc: "सोयीची वेळ निवडा आणि वाट न पाहता रेशन घ्या.",
  recentNotifications: "अलीकडील सूचना",
  quickActions: "त्वरित कृती",
  bookCollection: "संग्रह स्लॉट बुक करा",
  bookCollectionDesc: "तुमचे दुकान, तारीख आणि सोयीची वेळ निवडा.",
  chooseShop: "दुकान निवडा",
  selectSlot: "स्लॉट निवडा",
  confirm: "पुष्टी करा",
  continueBtn: "सुरू ठेवा",
  back: "मागे",
  editSlot: "स्लॉट बदला",
  chooseDate: "तारीख निवडा",
  availableSlots: "उपलब्ध वेळ स्लॉट",
  reviewConfirm: "पुनरावलोकन आणि पुष्टी",
  reviewDesc: "पुष्टी करण्यापूर्वी तपशील तपासा.",
  confirmBooking: "बुकिंग पुष्टी करा",
  noBooking: "कोणतीही आगामी बुकिंग नाही",
  noBookingDesc: "रांग टाळण्यासाठी संग्रह स्लॉट बुक करा.",
  updatesTitle: "सूचना",
  updatesDesc: "तुमच्या रेशन आणि बुकिंगबद्दल महत्त्वाच्या अद्यतनां.",
  accountTitle: "माझे प्रोफाइल",
  accountDesc: "तुमची वैयक्तिक आणि रेशन कार्ड माहिती व्यवस्थापित करा.",
  viewAs: "म्हणून पहा",
  languageBtn: "भाषा",
  citizen: "नागरिक",
  shopkeeper: "दुकानदार",
  administrator: "प्रशासक",
  helpSupport: "मदत",
  helpSupportBtn: "मदत",
  needHelp: "मदत हवी आहे?",
});

i18n.gu = extendLocale({
  appName: "સ્માર્ટ રેશન",
  tagline: "ડિજિટલ PDS સેવા",
  home: "હોમ",
  bookSlot: "સ્લોટ બુક કરો",
  myBooking: "મારી બુકિંગ",
  notifications: "સૂચનાઓ",
  profile: "પ્રોફાઇલ",
  goodMorning: "સુપ્રભાત",
  goodAfternoon: "સુસંધ્યા",
  goodEvening: "શુભ સાંજ",
  atAGlance: "એક નજરમાં",
  refresh: "રિફ્રેશ",
  skipQueue: "કતાર ટાળો. તમારો સ્લોટ બુક કરો.",
  skipQueueDesc: "અનુકૂળ સમય પસંદ કરો અને રાહ જોયા વિના રેશન લો.",
  recentNotifications: "તાજેતરની સૂચનાઓ",
  quickActions: "ઝડપી ક્રિયાઓ",
  bookCollection: "સંગ્રહ સ્લોટ બુક કરો",
  bookCollectionDesc: "તમારું દુકાન, તારીખ અને અનુકૂળ સમય પસંદ કરો.",
  chooseShop: "દુકાન પસંદ કરો",
  selectSlot: "સ્લોટ પસંદ કરો",
  confirm: "ખાતરી કરો",
  continueBtn: "ચાલુ રાખો",
  back: "પાછળ",
  editSlot: "સ્લોટ બદલો",
  chooseDate: "તારીખ પસંદ કરો",
  availableSlots: "ઉપલબ્ધ સમય સ્લોટ",
  reviewConfirm: "પુનઃચકાસણી અને ખાતરી",
  reviewDesc: "ખાતરી કરતા પહેલા વિગતો તપાસો.",
  confirmBooking: "બુકિંગ ખાતરી કરો",
  noBooking: "કોઈ આવનાર બુકિંગ નથી",
  noBookingDesc: "કતાર ટાળવા માટે સંગ્રહ સ્લોટ બુક કરો.",
  updatesTitle: "સૂચનાઓ",
  updatesDesc: "તમારા રેશન અને બુકિંગ વિશે મહત્વપૂર્ણ અપડેટ્સ.",
  accountTitle: "મારી પ્રોફાઇલ",
  accountDesc: "તમારી વ્યક્તિગત અને રેશન કાર્ડ માહિતી સંચાલિત કરો.",
  viewAs: "રૂપે જુઓ",
  languageBtn: "ભાષા",
  citizen: "નાગરિક",
  shopkeeper: "દુકાનદાર",
  administrator: "પ્રશાસક",
  helpSupport: "મદદ",
  helpSupportBtn: "મદદ",
  needHelp: "મદદ જોઈએ છે?",
});

i18n.kn = extendLocale({
  appName: "ಸ್ಮಾರ್ಟ್ ರೇಷನ್",
  tagline: "ಡಿಜಿಟಲ್ PDS ಸೇವೆ",
  home: "ಮುಖಪುಟ",
  bookSlot: "ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ",
  myBooking: "ನನ್ನ ಬುಕಿಂಗ್",
  notifications: "ಅಧಿಸೂಚನೆಗಳು",
  profile: "ಪ್ರೊಫೈಲ್",
  goodMorning: "ಶುಭೋದಯ",
  goodAfternoon: "ಶುಭ ಮಧ್ಯಾಹ್ನ",
  goodEvening: "ಶುಭ ಸಂಜೆ",
  atAGlance: "ಒಂದು ನೋಟದಲ್ಲಿ",
  refresh: "ರಿಫ್ರೆಶ್",
  skipQueue: "ಸರಿಯನ್ನು ತಪ್ಪಿಸಿ. ನಿಮ್ಮ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ.",
  skipQueueDesc: "ಸೌಲಭ್ಯಕರ ಸಮಯ ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ಕಾಯದೇ ರೇಷನ್ ತೆಗೆದುಕೊಳ್ಳಿ.",
  recentNotifications: "ಇತ್ತೀಚಿನ ಅಧಿಸೂಚನೆಗಳು",
  quickActions: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು",
  bookCollection: "ಸಂಗ್ರಹ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ",
  bookCollectionDesc: "ನಿಮ್ಮ ಅಂಗಡಿ, ದಿನಾಂಕ ಮತ್ತು ಅನುಕೂಲಕರ ಸಮಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
  chooseShop: "ಅಂಗಡಿ ಆಯ್ಕೆ ಮಾಡಿ",
  selectSlot: "ಸ್ಲಾಟ್ ಆಯ್ಕೆ ಮಾಡಿ",
  confirm: "ಖಚಿತಪಡಿಸಿ",
  continueBtn: "ಮುಂದುವರಿಸಿ",
  back: "ಹಿಂದೆ",
  editSlot: "ಸ್ಲಾಟ್ ಬದಲಿಸಿ",
  chooseDate: "ದಿನಾಂಕ ಆಯ್ಕೆ ಮಾಡಿ",
  availableSlots: "ಲಭ್ಯವಿರುವ ಸಮಯ ಸ್ಲಾಟ್‌ಗಳು",
  reviewConfirm: "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಖಚಿತಪಡಿಸಿ",
  reviewDesc: "ಖಚಿತಪಡಿಸುವ ಮೊದಲು ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
  confirmBooking: "ಬುಕಿಂಗ್ ಖಚಿತಪಡಿಸಿ",
  noBooking: "ಯಾವುದೇ ಮುಂದಿನ ಬುಕಿಂಗ್ ಇಲ್ಲ",
  noBookingDesc: "ಸರಿಯನ್ನು ತಪ್ಪಿಸಲು ಸಂಗ್ರಹ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ.",
  updatesTitle: "ಅಧಿಸೂಚನೆಗಳು",
  updatesDesc: "ನಿಮ್ಮ ರೇಷನ್ ಮತ್ತು ಬುಕಿಂಗ್‌ಗಳ ಬಗ್ಗೆ ಪ್ರಮುಖ ಅಪ್ಡೇಟ್ಗಳು.",
  accountTitle: "ನನ್ನ ಪ್ರೊಫೈಲ್",
  accountDesc: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮತ್ತು ರೇಷನ್ ಕಾರ್ಡ್ ಮಾಹಿತಿಯನ್ನು ನಿರ್ವಹಿಸಿ.",
  viewAs: "ಇದಾಗಿ ನೋಡಿ",
  languageBtn: "ಭಾಷೆ",
  citizen: "ನಾಗರಿಕ",
  shopkeeper: "ಅಂಗಡಿ ಮಾಲೀಕ",
  administrator: "ನಿರ್ವಾಹಕ",
  helpSupport: "ಸಹಾಯ",
  helpSupportBtn: "ಸಹಾಯ",
  needHelp: "ಸಹಾಯ ಬೇಕೆ?",
});

i18n.ml = extendLocale({
  appName: "സ്മാർട്ട് റേഷൻ",
  tagline: "ഡിജിറ്റൽ PDS സേവനം",
  home: "ഹോം",
  bookSlot: "സ്ലോട്ട് ബുക്ക് ചെയ്യുക",
  myBooking: "എന്റെ ബുക്കിംഗ്",
  notifications: "അറിയിപ്പുകൾ",
  profile: "പ്രൊഫൈൽ",
  goodMorning: "സുപ്രഭാതം",
  goodAfternoon: "ശുഭ മധ്യാഹ്നം",
  goodEvening: "ശുഭ സന്ധ്യ",
  atAGlance: "ഒരു നോട്ടത്തിൽ",
  refresh: "പുതുക്കുക",
  skipQueue: "ക്യൂ ഒഴിവാക്കൂ. നിങ്ങളുടെ സ്ലോട്ട് ബുക്ക് ചെയ്യൂ.",
  skipQueueDesc: "സൗകര്യപ്രദമായ സമയം തിരഞ്ഞെടുക്കുക, കാത്തുനിൽക്കാതെ റേഷൻ നേടുക.",
  recentNotifications: "പുതിയ അറിയിപ്പുകൾ",
  quickActions: "വേഗ പ്രവർത്തനങ്ങൾ",
  bookCollection: "ശേഖരണ സ്ലോട്ട് ബുക്ക് ചെയ്യുക",
  bookCollectionDesc: "നിങ്ങളുടെ കട, തീയതി, അനുയോജ്യമായ സമയം തിരഞ്ഞെടുക്കുക.",
  chooseShop: "കട തിരഞ്ഞെടുക്കുക",
  selectSlot: "സ്ലോട്ട് തിരഞ്ഞെടുക്കുക",
  confirm: "സ്ഥിരീകരിക്കുക",
  continueBtn: "തുടരുക",
  back: "പിന്നോട്ട്",
  editSlot: "സ്ലോട്ട് മാറ്റുക",
  chooseDate: "തീയതി തിരഞ്ഞെടുക്കുക",
  availableSlots: "ലഭ്യമായ സമയം സ്ലോട്ടുകൾ",
  reviewConfirm: "പരിശോധിച്ച് സ്ഥിരീകരിക്കുക",
  reviewDesc: "സ്ഥിരീകരിക്കുന്നതിന് മുമ്പ് വിശദാംശങ്ങൾ പരിശോധിക്കുക.",
  confirmBooking: "ബുക്കിംഗ് സ്ഥിരീകരിക്കുക",
  noBooking: "ആസന്നമായ ബുക്കിംഗ് ഇല്ല",
  noBookingDesc: "ക്യൂ ഒഴിവാക്കാൻ ഒരു ശേഖരണ സ്ലോട്ട് ബുക്ക് ചെയ്യുക.",
  updatesTitle: "അറിയിപ്പുകൾ",
  updatesDesc: "നിങ്ങളുടെ റേഷൻ, ബുക്കിംഗ് എന്നിവയേക്കുറിച്ചുള്ള പ്രധാന അപ്ഡേറ്റുകൾ.",
  accountTitle: "എന്റെ പ്രൊഫൈൽ",
  accountDesc: "നിങ്ങളുടെ വ്യക്തിഗതവും റേഷൻ കാർഡ് വിവരങ്ങളും നിയന്ത്രിക്കുക.",
  viewAs: "ആയി കാണുക",
  languageBtn: "ഭാഷ",
  citizen: "പൗരൻ",
  shopkeeper: "കടക്കാരൻ",
  administrator: "അഡ്മിനിസ്ട്രേറ്റർ",
  helpSupport: "സഹായം",
  helpSupportBtn: "സഹായം",
  needHelp: "സഹായം വേണോ?",
});

i18n.pa = extendLocale({
  appName: "ਸਮਾਰਟ ਰੇਸ਼ਨ",
  tagline: "ਡਿਜ਼ਿਟਲ PDS ਸੇਵਾ",
  home: "ਹੋਮ",
  bookSlot: "ਸਲੌਟ ਬੁੱਕ ਕਰੋ",
  myBooking: "ਮੇਰੀ ਬੁੱਕਿੰਗ",
  notifications: "ਸੂਚਨਾਵਾਂ",
  profile: "ਪ੍ਰੋਫ਼ਾਈਲ",
  goodMorning: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ",
  goodAfternoon: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ",
  goodEvening: "ਸ਼ੁਭ ਸ਼ਾਮ",
  atAGlance: "ਇੱਕ ਨਜ਼ਰ ਵਿੱਚ",
  refresh: "ਤਾਜ਼ਾ ਕਰੋ",
  skipQueue: "ਕਤਾਰ ਤੋਂ ਬਚੋ। ਆਪਣਾ ਸਲੌਟ ਬੁੱਕ ਕਰੋ।",
  skipQueueDesc: "ਸੁਵਿਧਾਜਨਕ ਸਮਾਂ ਚੁਣੋ ਅਤੇ ਉਡੀਕ ਬਿਨਾਂ ਰੇਸ਼ਨ ਲਵੋ।",
  recentNotifications: "ਹਾਲੀਆ ਸੂਚਨਾਵਾਂ",
  quickActions: "ਤੇਜ਼ ਕਾਰਵਾਈਆਂ",
  bookCollection: "ਇਕੱਠ ਸਲੌਟ ਬੁੱਕ ਕਰੋ",
  bookCollectionDesc: "ਆਪਣੀ ਦੁਕਾਨ, ਮਿਤੀ ਅਤੇ ਸੁਵਿਧਾਜਨਕ ਸਮਾਂ ਚੁਣੋ।",
  chooseShop: "ਦੁਕਾਨ ਚੁਣੋ",
  selectSlot: "ਸਲੌਟ ਚੁਣੋ",
  confirm: "ਪੁਸ਼ਟੀ ਕਰੋ",
  continueBtn: "ਜਾਰੀ ਰੱਖੋ",
  back: "ਵਾਪਸ",
  editSlot: "ਸਲੌਟ ਬਦਲੋ",
  chooseDate: "ਮਿਤੀ ਚੁਣੋ",
  availableSlots: "ਉਪਲਬਧ ਸਮਾਂ ਸਲੌਟ",
  reviewConfirm: "ਸਮੀਖਿਆ ਅਤੇ ਪੁਸ਼ਟੀ",
  reviewDesc: "ਪੁਸ਼ਟੀ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਵੇਰਵੇ ਚੈੱਕ ਕਰੋ।",
  confirmBooking: "ਬੁੱਕਿੰਗ ਪੁਸ਼ਟੀ ਕਰੋ",
  noBooking: "ਕੋਈ ਆਉਣ ਵਾਲੀ ਬੁੱਕਿੰਗ ਨਹੀਂ",
  noBookingDesc: "ਕਤਾਰ ਤੋਂ ਬਚਣ ਲਈ ਇਕੱਠ ਸਲੌਟ ਬੁੱਕ ਕਰੋ।",
  updatesTitle: "ਸੂਚਨਾਵਾਂ",
  updatesDesc: "ਤੁਹਾਡੇ ਰੇਸ਼ਨ ਅਤੇ ਬੁੱਕਿੰਗ ਬਾਰੇ ਮਹੱਤਵਪੂਰਨ ਅਪਡੇਟਸ।",
  accountTitle: "ਮੇਰਾ ਪ੍ਰੋਫ਼ਾਈਲ",
  accountDesc: "ਆਪਣੀ ਨਿੱਜੀ ਅਤੇ ਰੇਸ਼ਨ ਕਾਰਡ ਜਾਣਕਾਰੀ ਸੰਭਾਲੋ।",
  viewAs: "ਵਜੋਂ ਵੇਖੋ",
  languageBtn: "ਭਾਸ਼ਾ",
  citizen: "ਨਾਗਰਿਕ",
  shopkeeper: "ਦੁਕਾਨਦਾਰ",
  administrator: "ਪ੍ਰਸ਼ਾਸਕ",
  helpSupport: "ਮਦਦ",
  helpSupportBtn: "ਮਦਦ",
  needHelp: "ਮਦਦ ਚਾਹੀਦੀ ਹੈ?",
});

i18n.or = extendLocale({
  appName: "ସ୍ମାର୍ଟ ରେସନ",
  tagline: "ଡିଜିଟାଲ୍ PDS ସେବା",
  home: "ହୋମ",
  bookSlot: "ସ୍ଲଟ୍ ବୁକ୍ କରନ୍ତୁ",
  myBooking: "ମୋର ବୁକିଂ",
  notifications: "ସୂଚନା",
  profile: "ପ୍ରୋଫାଇଲ୍",
  goodMorning: "ସୁପ୍ରଭାତ",
  goodAfternoon: "ଶୁଭ ଅପରାହ୍ନ",
  goodEvening: "ଶୁଭ ସନ୍ଧ୍ୟା",
  atAGlance: "ଏକ ନଜରରେ",
  refresh: "ରିଫ୍ରେଶ",
  skipQueue: "ଧାରିକୁ ଏଡ଼ାନ୍ତୁ। ଆପଣଙ୍କ ସ୍ଲଟ୍ ବୁକ୍ କରନ୍ତୁ।",
  skipQueueDesc: "ସୁବିଧାଜନକ ସମୟ ବାଛନ୍ତୁ ଏବଂ ଅପେକ୍ଷା ବିନା ରେସନ୍ ନିଅନ୍ତୁ।",
  recentNotifications: "ସମ୍ପ୍ରତିକ ସୂଚନା",
  quickActions: "ଦ୍ରୁତ କାର୍ଯ୍ୟ",
  bookCollection: "ସଂଗ୍ରହ ସ୍ଲଟ୍ ବୁକ୍ କରନ୍ତୁ",
  bookCollectionDesc: "ଆପଣଙ୍କ ଦୋକାନ, ତାରିଖ ଏବଂ ସୁବିଧାଜନକ ସମୟ ଚୟନ କରନ୍ତୁ।",
  chooseShop: "ଦୋକାନ ଚୟନ କରନ୍ତୁ",
  selectSlot: "ସ୍ଲଟ୍ ଚୟନ କରନ୍ତୁ",
  confirm: "ନିଶ୍ଚିତ କରନ୍ତୁ",
  continueBtn: "ଜାରି ରଖନ୍ତୁ",
  back: "ପଛକୁ",
  editSlot: "ସ୍ଲଟ୍ ପରିବର୍ତ୍ତନ",
  chooseDate: "ତାରିଖ ଚୟନ କରନ୍ତୁ",
  availableSlots: "ଉପଲବ୍ଧ ସମୟ ସ୍ଲଟ୍",
  reviewConfirm: "ପରୀକ୍ଷା କରି ନିଶ୍ଚିତ କରନ୍ତୁ",
  reviewDesc: "ନିଶ୍ଚିତ କରିବା ପୂର୍ବରୁ ବିବରଣୀ ଯାଞ୍ଚ କରନ୍ତୁ।",
  confirmBooking: "ବୁକିଂ ନିଶ୍ଚିତ କରନ୍ତୁ",
  noBooking: "କୌଣସି ଆସନ୍ତା ବୁକିଂ ନାହିଁ",
  noBookingDesc: "ଧାରିକୁ ଏଡ଼ାଇବା ପାଇଁ ଏକ ସଂଗ୍ରହ ସ୍ଲଟ୍ ବୁକ୍ କରନ୍ତୁ।",
  updatesTitle: "ସୂଚନା",
  updatesDesc: "ଆପଣଙ୍କ ରେସନ୍ ଏବଂ ବୁକିଂ ସମ୍ପର୍କିତ ଗୁରୁତ୍ତ୍ୱପୂର୍ଣ୍ଣ ଅପଡେଟ୍।",
  accountTitle: "ମୋର ପ୍ରୋଫାଇଲ୍",
  accountDesc: "ଆପଣଙ୍କ ବ୍ୟକ୍ତିଗତ ଏବଂ ରେସନ୍ କାର୍ଡ ବିବରଣୀ ପରିଚାଳନା କରନ୍ତୁ।",
  viewAs: "ଭାବେ ଦେଖନ୍ତୁ",
  languageBtn: "ଭାଷା",
  citizen: "ନାଗରିକ",
  shopkeeper: "ଦୋକାନୀ",
  administrator: "ପ୍ରଶାସକ",
  helpSupport: "ସହାୟତା",
  helpSupportBtn: "ସହାୟତା",
  needHelp: "ସହାୟତା ଦରକାର?",
});

i18n.ur = extendLocale({
  appName: "سمارٹ راشن",
  tagline: "ڈیجیٹل PDS سروس",
  home: "ہوم",
  bookSlot: "سلاٹ بک کریں",
  myBooking: "میری بکنگ",
  notifications: "اطلاعات",
  profile: "پروفائل",
  goodMorning: "صبح بخیر",
  goodAfternoon: "دوپہر بخیر",
  goodEvening: "شام بخیر",
  atAGlance: "ایک نظر میں",
  refresh: "ریفریش",
  skipQueue: "قطار سے بچیں۔ اپنا سلاٹ بک کریں۔",
  skipQueueDesc: "موزوں وقت منتخب کریں اور انتظار کے بغیر راشن لیں۔",
  recentNotifications: "حالیہ اطلاعات",
  quickActions: "فوری کارروائیاں",
  bookCollection: "کلیکشن سلاٹ بک کریں",
  bookCollectionDesc: "اپنی دکان، تاریخ اور موزوں وقت منتخب کریں۔",
  chooseShop: "دکان منتخب کریں",
  selectSlot: "سلاٹ منتخب کریں",
  confirm: "تصدیق کریں",
  continueBtn: "جاری رکھیں",
  back: "واپس",
  editSlot: "سلاٹ تبدیل کریں",
  chooseDate: "تاریخ منتخب کریں",
  availableSlots: "دستیاب وقت کے سلاٹس",
  reviewConfirm: "جائزہ اور تصدیق",
  reviewDesc: "تصدیق کرنے سے پہلے تفصیلات چیک کریں۔",
  confirmBooking: "بکنگ کی تصدیق کریں",
  noBooking: "کوئی آنے والی بکنگ نہیں",
  noBookingDesc: "قطار سے بچنے کے لیے کلیکشن سلاٹ بک کریں۔",
  updatesTitle: "اطلاعات",
  updatesDesc: "آپ کے راشن اور بکنگ کے بارے میں اہم اپڈیٹس۔",
  accountTitle: "میرا پروفائل",
  accountDesc: "اپنی ذاتی اور راشن کارڈ معلومات منظم کریں۔",
  viewAs: "کے طور پر دیکھیں",
  languageBtn: "زبان",
  citizen: "شہری",
  shopkeeper: "دکان دار",
  administrator: "منتظم",
  helpSupport: "مدد",
  helpSupportBtn: "مدد",
  needHelp: "مدد چاہیے؟",
});

i18n.as = extendLocale({
  appName: "স্মার্ট ৰেশন",
  tagline: "ডিজিটেল PDS সেৱা",
  home: "হোম",
  bookSlot: "স্লট বুক কৰক",
  myBooking: "মোৰ বুকিং",
  notifications: "অধিসূচনা",
  profile: "প্ৰ'ফাইল",
  goodMorning: "সুপ্ৰভাত",
  goodAfternoon: "নমস্কাৰ",
  goodEvening: "শুভ সন্ধ্যা",
  atAGlance: "এটা দৃষ্টিত",
  refresh: "ৰিফ্ৰেশ",
  skipQueue: "পংক্তি এৰক। আপোনাৰ স্লট বুক কৰক।",
  skipQueueDesc: "সুবিধাজনক সময় বাছক আৰু অপেক্ষা নকৰাকৈ ৰেশন লওক।",
  recentNotifications: "সাম্প্ৰতিক অধিসূচনা",
  quickActions: "দ্ৰুত কাৰ্য",
  bookCollection: "সংগ্ৰহ স্লট বুক কৰক",
  bookCollectionDesc: "আপোনাৰ দোকান, তাৰিখ আৰু সুবিধাজনক সময় নিৰ্বাচন কৰক।",
  chooseShop: "দোকান নিৰ্বাচন কৰক",
  selectSlot: "স্লট নিৰ্বাচন কৰক",
  confirm: "নিশ্চিত কৰক",
  continueBtn: "চালিয়ে যাওক",
  back: "পিছলৈ",
  editSlot: "স্লট সলনি কৰক",
  chooseDate: "তাৰিখ নিৰ্বাচন কৰক",
  availableSlots: "উপলব্ধ সময় স্লট",
  reviewConfirm: "পুনৰীক্ষণ আৰু নিশ্চিত কৰক",
  reviewDesc: "নিশ্চিত কৰাৰ আগতে বিৱৰণ পৰীক্ষা কৰক।",
  confirmBooking: "বুকিং নিশ্চিত কৰক",
  noBooking: "কোনো আগন্তুক বুকিং নাই",
  noBookingDesc: "পংক্তি এৰিবলৈ এটা সংগ্ৰহ স্লট বুক কৰক।",
  updatesTitle: "অধিসূচনা",
  updatesDesc: "আপোনাৰ ৰেশন আৰু বুকিং সম্পৰ্কে গুৰুত্বপূর্ণ আপডেট।",
  accountTitle: "মোৰ প্ৰ'ফাইল",
  accountDesc: "আপোনাৰ ব্যক্তিগত আৰু ৰেশন কাৰ্ড তথ্য পৰিচালনা কৰক।",
  viewAs: "হিচাপে চাওক",
  languageBtn: "ভাষা",
  citizen: "নাগৰিক",
  shopkeeper: "দোকানী",
  administrator: "প্ৰশাসক",
  helpSupport: "সহায়",
  helpSupportBtn: "সহায়",
  needHelp: "সহায় লাগে নেকি?",
});

i18n.te = i18n.te; // no-op to keep lint-free if language pack already assigned above

const LANG_OPTIONS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "ur", label: "اردو" },
  { code: "as", label: "অসমীয়া" },
];

const getLangLabel = (code) => LANG_OPTIONS.find(option => option.code === code)?.label || code;

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const SLOTS = [
  { time: "09:00 AM", left: 5 }, { time: "09:30 AM", left: 0 },
  { time: "10:00 AM", left: 3 }, { time: "10:30 AM", left: 8 },
  { time: "11:00 AM", left: 2 }, { time: "11:30 AM", left: 0 },
  { time: "12:00 PM", left: 6 }, { time: "02:00 PM", left: 4 },
];

const DAYS = [
  { day: "MON", date: "29", label: "29 Jun", note: "Today" },
  { day: "TUE", date: "30", label: "30 Jun", note: "Tomorrow" },
  { day: "WED", date: "01", label: "01 Jul", note: "Available" },
  { day: "THU", date: "02", label: "02 Jul", note: "Available" },
  { day: "FRI", date: "03", label: "03 Jul", note: "Available" },
];

const SHOP_BOOKINGS = [
  { time:"09:00 AM", id:"SR-48265", name:"Neha Verma",   card:"DL •••• 1902", status:"Waiting" },
  { time:"09:00 AM", id:"SR-48268", name:"Arun Kumar",   card:"DL •••• 7338", status:"Waiting" },
  { time:"09:30 AM", id:"SR-48271", name:"Maya Devi",    card:"DL •••• 5129", status:"Arrived" },
  { time:"10:00 AM", id:"SR-48291", name:"Ravi Sharma",  card:"DL •••• 4821", status:"Upcoming" },
  { time:"10:00 AM", id:"SR-48296", name:"Imran Khan",   card:"DL •••• 2904", status:"Upcoming" },
  { time:"10:30 AM", id:"SR-48302", name:"Priya Singh",  card:"DL •••• 3310", status:"Upcoming" },
];

const CHART_DATA = [
  { day:"Mon", bookings:62, completed:50 },
  { day:"Tue", bookings:75, completed:61 },
  { day:"Wed", bookings:68, completed:58 },
  { day:"Thu", bookings:88, completed:72 },
  { day:"Fri", bookings:78, completed:64 },
  { day:"Sat", bookings:54, completed:44 },
  { day:"Sun", bookings:42, completed:34 },
];

const NOTIFICATIONS = [
  { icon:"📦", type:"success", title:"Ration stock is now available", msg:"Your June allocation is ready at Shastri Nagar Fair Price Shop.", time:"Today · 8:30 AM", unread:true },
  { icon:"📅", type:"info",    title:"Book early to avoid the rush",  msg:"Morning collection slots for this week are filling up fast.", time:"Yesterday · 4:15 PM", unread:true },
  { icon:"📢", type:"amber",   title:"Shop holiday notice",           msg:"Your ration shop will remain closed on Sunday, 5 July.", time:"27 Jun · 10:00 AM", unread:true },
  { icon:"✅", type:"success", title:"Ration collected successfully", msg:"Your May 2026 ration collection was completed.", time:"04 Jun · 11:22 AM", unread:false },
];

// ─── CONTEXT ───────────────────────────────────────────────────────────────────
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

// ─── ICONS (inline SVG, no external deps) ─────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor", ...p }) => {
  const paths = {
    home: "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z M9 21V12h6v9",
    calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    qr: "M3 3h6v6H3V3zm12 0h6v6h-6V3zM3 15h6v6H3v-6zm9-12h1v1h-1V3zm2 0h1v1h-1V3zm-1 2h1v1h-1V5zm2 0h1v1h-1V5zm-2 2h1v1h-1V7zm-1 4h1v1h-1v-1zm4-4h1v1h-1V7zm-1 2h1v1h-1V9zm2 0h1v1h-1V9zm-2 2h1v1h-1v-1zm2 0h1v1h-1v-1zm-1 2h1v1h-1v-1zm-2 0h1v1h-1v-1zm0 2h1v1h-1v-1zm2 2h1v1h-1v-1zm-4 0h1v1h-1v-1zm0-2h1v1h-1v-1zm-2 0h1v1h-1v-1zm0 2h1v1h-1v-1z",
    bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    search: "M21 21l-5.5-5.5M11 19a8 8 0 110-16 8 8 0 010 16z",
    check: "M20 6L9 17l-5-5",
    x: "M18 6L6 18M6 6l12 12",
    chevronR: "M9 18l6-6-6-6",
    chevronL: "M15 18l-6-6 6-6",
    chevronD: "M6 9l6 6 6-6",
    menu: "M3 12h18M3 6h18M3 18h18",
    logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
    map: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    store: "M3 9l1-6h16l1 6H3zm0 0v12h18V9 M9 9v12 M15 9v12",
    package: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10v-10",
    users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
    dashboard: "M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 5a4 4 0 100-8 4 4 0 000 8z",
    scan: "M4 7V4h3M17 4h3v3M4 17v3h3M17 20h3v-3 M9 9h6v6H9z",
    box: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12",
    chart: "M18 20V10 M12 20V4 M6 20v-6",
    refresh: "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
    download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
    clock: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
    phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.18 19.79 19.79 0 01.18 3.91 2 2 0 012 1.72h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9a16 16 0 006 6l.75-.75a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
    card: "M1 4h22v16H1V4z M1 10h22",
    globe: "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
    help: "M12 22a10 10 0 100-20 10 10 0 000 20z M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3 M12 17h.01",
    zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    arrowUR: "M7 17L17 7 M7 7h10v10",
    sliders: "M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 9h6",
    clipCheck: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M13 5a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2z M9 12l2 2 4-4",
    calOff: "M21 21l-4.35-4.35M16.5 16.5A9 9 0 013.5 3.5 M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v7",
    building: "M3 21h18 M3 7v14 M21 7v14 M9 21V3h6v18 M9 3H3v4h6V3zm6 0h6v4h-6V3zM9 10h6 M9 14h6 M9 18h6",
    megaphone: "M11 5L6 9H2v6h4l5 4V5z M15.54 8.46a5 5 0 010 7.07 M19.07 4.93a10 10 0 010 14.14",
    checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" {...p}>
      {(paths[name] || "").split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : "M" + d} />
      ))}
    </svg>
  );
};

// ─── SHARED UI COMPONENTS ──────────────────────────────────────────────────────
const Avatar = ({ initials, size = 36, color = T.teal, bg = T.tealLight }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", background: bg,
    color, fontSize: size * 0.32, fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    letterSpacing: "0.5px",
  }}>{initials}</div>
);

const Badge = ({ children, color = T.teal, bg = T.tealLight }) => (
  <span style={{
    display:"inline-flex", alignItems:"center", gap:4,
    padding:"3px 8px", borderRadius:20, fontSize:10, fontWeight:700,
    letterSpacing:"0.4px", color, background:bg,
  }}>{children}</span>
);

const StatusBadge = ({ status }) => {
  const map = {
    Waiting:  { color: T.amber,  bg: T.amberLight },
    Arrived:  { color: T.green,  bg: T.greenLight },
    Upcoming: { color: T.blue,   bg: T.blueLight },
    Active:   { color: T.green,  bg: T.greenLight },
  };
  const s = map[status] || map.Upcoming;
  return <Badge color={s.color} bg={s.bg}>{status}</Badge>;
};

const Toast = ({ toast }) => {
  if (!toast) return null;
  const colors = { success: T.green, info: T.blue, error: T.red };
  return (
    <div role="alert" aria-live="polite" style={{
      position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)",
      background: T.ink, color:"#fff", borderRadius:10, padding:"12px 20px",
      display:"flex", alignItems:"center", gap:10, zIndex:9999,
      boxShadow:"0 8px 32px rgba(0,0,0,0.22)", fontSize:13, fontWeight:500,
      whiteSpace:"nowrap",
    }}>
      <span style={{ color: colors[toast.type] || T.green }}>
        <Icon name={toast.type === "error" ? "x" : "checkCircle"} size={16} color="currentColor" />
      </span>
      {toast.message}
    </div>
  );
};

const Skeleton = ({ w = "100%", h = 16, r = 6 }) => (
  <div style={{
    width: w, height: h, borderRadius: r, background: T.line,
    animation: "shimmer 1.4s infinite",
  }} />
);

// ─── BRAND ────────────────────────────────────────────────────────────────────
const Brand = ({ compact = false }) => {
  const { t } = useApp();
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <img src="./smart-ration.png" alt="Smart Ration logo" style={{ width:40, height:40, borderRadius:12, objectFit:"cover", boxShadow:"0 12px 28px rgba(15,23,42,0.12)" }} />
      {!compact && (
        <div>
          <div style={{ fontWeight:800, fontSize:15, color:T.ink, letterSpacing:"-0.4px" }}>{t.appName}</div>
          <div style={{ fontSize:10, color:T.muted, marginTop:1 }}>{t.tagline}</div>
        </div>
      )}
    </div>
  );
};

// ─── CITIZEN SIDEBAR ──────────────────────────────────────────────────────────
const CitizenSidebar = ({ view, setView, open, onClose }) => {
  const { t, notifCount } = useApp();
  const navItems = [
    { id:"home", icon:"home", label:t.home },
    { id:"book", icon:"calendar", label:t.bookSlot },
    { id:"booking", icon:"qr", label:t.myBooking },
    { id:"notifications", icon:"bell", label:t.notifications, badge: notifCount },
    { id:"profile", icon:"user", label:t.profile },
  ];
  return (
    <>
      {open && <div onClick={onClose} style={{
        position:"fixed", inset:0, background:"rgba(15,23,42,0.45)", zIndex:29,
      }} aria-hidden="true" />}
      <aside role="navigation" aria-label="Main navigation" style={{
        position:"fixed", top:0, bottom:0, left:0, width:260,
        background:T.white, borderRight:`1px solid ${T.line}`,
        display:"flex", flexDirection:"column", padding:"0 14px", zIndex:30,
        transform: open ? "none" : "translateX(-100%)",
        transition:"transform 0.22s ease",
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:78, padding:"0 8px" }}>
          <Brand />
          <button onClick={onClose} aria-label="Close menu" style={{
            background:"transparent", border:"none", cursor:"pointer", padding:6, borderRadius:8,
            color:T.slate,
          }}>
            <Icon name="x" size={18} color="currentColor" />
          </button>
        </div>
        <div style={{ margin:"0 8px 18px", padding:16, borderRadius:18, background:T.tealLight, border:`1px solid ${T.teal}` }}>
          <p style={{ fontSize:10, fontWeight:800, letterSpacing:"0.12em", margin:0, color:T.tealDark }}>{t.rationReady}</p>
          <p style={{ fontSize:16, fontWeight:800, margin:"10px 0 4px", color:T.ink }}>Collect before 05 Jul</p>
          <p style={{ fontSize:11, color:T.slate, margin:0 }}>{t.atShop} Shastri Nagar FPS</p>
        </div>
        <p style={{ fontSize:9.5, fontWeight:800, letterSpacing:"1.2px", color:T.muted, padding:"0 10px 6px" }}>
          QUICK ACCESS
        </p>
        <nav>
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setView(item.id); onClose(); }}
              aria-current={view === item.id ? "page" : undefined}
              style={{
                width:"100%", display:"flex", alignItems:"center", gap:12,
                padding:"12px 14px", borderRadius:12, border:"none", cursor:"pointer",
                background: view===item.id ? T.tealLight : "transparent",
                color: view===item.id ? T.tealDark : T.slate,
                fontWeight: view===item.id ? 700 : 500, fontSize:13,
                textAlign:"left", marginBottom:4, transition:"all 0.14s",
              }}>
              <Icon name={item.icon} size={18} color="currentColor" />
              <span style={{ flex:1 }}>{item.label}</span>
              {item.badge > 0 && (
                <span style={{
                  background:T.red, color:"#fff", fontSize:10, fontWeight:700,
                  borderRadius:10, padding:"1px 6px",
                }}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>
        <div style={{ marginTop:"auto", margin:"auto 8px 16px", background:T.tealLight, borderRadius:14, padding:16, color:T.tealDark }}>
          <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
            <Icon name="help" size={18} color={T.teal} />
            <div>
              <div style={{ fontWeight:700, fontSize:11, marginBottom:4 }}>{t.needHelp}</div>
              <p style={{ fontSize:11, color:T.slate, margin:0, lineHeight:1.5 }}>Call 1800-111-155 or visit your linked FPS.</p>
            </div>
          </div>
        </div>
        <button style={{
          display:"flex", alignItems:"center", gap:10, padding:"14px 10px",
          background:"transparent", border:"none", cursor:"pointer",
          color:T.slate, fontWeight:600, fontSize:12,
          borderRadius:0,
        }}>
          <Icon name="logout" size={16} color="currentColor" />
          {t.logout}
        </button>
        <div style={{ fontSize:9, color:T.muted, textAlign:"center", paddingBottom:10 }}>Premium dashboard</div>
      </aside>
    </>
  );
};

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
const Topbar = ({ onMenu }) => {
  const { role, setRole, setLang, lang, t, notifCount, setView } = useApp();
  return (
    <header className="premium-topbar" style={{
      position:"sticky", top:0, zIndex:20,
      background:"rgba(255,255,255,0.98)", backdropFilter:"blur(14px)",
      borderBottom:`1px solid ${T.line}`,
      display:"flex", alignItems:"center", height:72, padding:"0 24px", gap:14,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        <button onClick={onMenu} aria-label="Open navigation menu" style={{
          background:"transparent", border:"none", cursor:"pointer", padding:8,
          borderRadius:10, color:T.slate, display:"flex",
        }}>
          <Icon name="menu" size={20} color="currentColor" />
        </button>
        <Brand compact />
      </div>
      <div style={{ flex:1, display:"flex", alignItems:"center", gap:12, minWidth:0 }}>
        <div style={{
          flex:1, minWidth:0, display:"flex", alignItems:"center", gap:10,
          background:T.bg, border:`1px solid ${T.line}`, borderRadius:16, padding:"10px 14px",
        }}>
          <Icon name="search" size={16} color={T.muted} />
          <input
            type="search"
            placeholder="Ask Smart Ration or find a shop"
            aria-label="Search or ask the assistant"
            style={{
              width:"100%", background:"transparent", border:"none", outline:"none",
              color:T.ink, fontSize:13, fontWeight:500,
            }}
          />
        </div>
        <Badge color={T.tealDark} bg={T.tealLight}>{t.readyToCollect}</Badge>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:11, color:T.muted }}>{t.viewAs}</span>
          <select value={role} onChange={e => setRole(e.target.value)}
            aria-label="Switch demo role"
            style={{
              fontSize:11, fontWeight:600, color:T.ink, background:T.bg,
              border:`1px solid ${T.line}`, borderRadius:10, padding:"6px 22px 6px 10px",
              cursor:"pointer", appearance:"none",
            }}>
            <option value="citizen">{t.citizen}</option>
            <option value="shopkeeper">{t.shopkeeper}</option>
            <option value="admin">{t.administrator}</option>
          </select>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:3, minWidth:110 }}>
          <span style={{ fontSize:9, color:T.muted, textAlign:"right" }}>{LANG_OPTIONS.length} languages</span>
          <select value={lang} onChange={e => setLang(e.target.value)}
            aria-label="Switch language"
            style={{
              width:"100%", display:"flex", alignItems:"center", gap:5, padding:"6px 10px",
              background:T.bg, border:`1px solid ${T.line}`, borderRadius:10,
              cursor:"pointer", color:T.slate, fontSize:11, fontWeight:600,
            }}>
            {LANG_OPTIONS.map(option => (
              <option key={option.code} value={option.code}>{option.label}</option>
            ))}
          </select>
        </div>
        <button onClick={() => setView && setView("notifications")}
          aria-label={`Notifications, ${notifCount} unread`}
          style={{
            position:"relative", background:"transparent", border:"none",
            cursor:"pointer", padding:8, borderRadius:10, color:T.slate, display:"flex",
          }}>
          <Icon name="bell" size={20} color="currentColor" />
          {notifCount > 0 && (
            <span aria-hidden="true" style={{
              position:"absolute", top:4, right:4, width:8, height:8,
              background:T.red, borderRadius:"50%", border:`2px solid ${T.white}`,
            }} />
          )}
        </button>
        <Avatar initials="RS" size={34} />
      </div>
    </header>
  );
};

// ─── PAGE INTRO ───────────────────────────────────────────────────────────────
const PageIntro = ({ eyebrow, title, desc, onBack }) => (
  <div style={{ marginBottom:24 }}>
    {onBack && (
      <button onClick={onBack} style={{
        display:"flex", alignItems:"center", gap:4, background:"transparent",
        border:"none", cursor:"pointer", color:T.teal, fontSize:12, fontWeight:600,
        padding:"0 0 12px", marginBottom:4,
      }}>
        <Icon name="chevronL" size={16} color="currentColor" /> Back
      </button>
    )}
    {eyebrow && <p style={{ fontSize:9.5, fontWeight:800, letterSpacing:"1.4px", color:T.teal, margin:"0 0 5px" }}>{eyebrow}</p>}
    <h1 style={{ fontSize:26, fontWeight:800, letterSpacing:"-0.6px", color:T.ink, margin:"0 0 5px" }}>{title}</h1>
    {desc && <p style={{ fontSize:13, color:T.slate, margin:0 }}>{desc}</p>}
  </div>
);

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, iconColor, iconBg, label, value, sub, subColor, action, onAction, loading, delay = 0 }) => (
  <div className="premium-surface" style={{
    background:T.white, border:`1px solid ${T.line}`, borderRadius:16,
    padding:"18px 20px", display:"flex", gap:14, alignItems:"flex-start",
    boxShadow:"0 10px 28px rgba(15,23,42,0.04)",
    animation:`riseIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both`,
    animationDelay:`${delay}ms`,
  }}>
    <div style={{
      width:44, height:44, borderRadius:11, background:iconBg,
      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
      boxShadow:"inset 0 1px 0 rgba(255,255,255,0.7)",
    }}>
      <Icon name={icon} size={20} color={iconColor} />
    </div>
    <div style={{ flex:1, minWidth:0 }}>
      {loading ? (
        <><Skeleton h={10} w="60%" /><div style={{height:6}}/><Skeleton h={18} w="80%" /></>
      ) : (
        <>
          <p style={{ fontSize:9, fontWeight:800, letterSpacing:"0.8px", color:T.muted, margin:"0 0 6px" }}>{label}</p>
          <p style={{ fontSize:17, fontWeight:800, color:T.ink, margin:"0 0 5px" }}>{value}</p>
          {sub && <p style={{ fontSize:10, color:subColor||T.muted, margin:0 }}>{sub}</p>}
          {action && (
            <button onClick={onAction} style={{
              display:"inline-flex", alignItems:"center", gap:3, marginTop:5,
              background:"transparent", border:"none", cursor:"pointer",
              color:T.blue, fontSize:10, fontWeight:700, padding:0,
            }}>
              {action} <Icon name="arrowUR" size={13} color="currentColor" />
            </button>
          )}
        </>
      )}
    </div>
  </div>
);

// ─── HOME VIEW ────────────────────────────────────────────────────────────────
const HomeView = () => {
  const { t, setView, showToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const loadingTimerRef = useRef(null);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t.goodMorning : hour < 17 ? t.goodAfternoon : t.goodEvening;

  useEffect(() => {
    loadingTimerRef.current = setTimeout(() => setLoading(false), 900);
    return () => {
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    };
  }, []);

  const refreshDashboard = () => {
    if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    setLoading(true);
    loadingTimerRef.current = setTimeout(() => setLoading(false), 800);
    showToast({ message:"Workspace refreshed", type:"info" });
  };

  const askAssistant = (text) => {
    if (!text.trim()) return;
    const next = text.toLowerCase();
    if (next.includes("book")) setView("book");
    else if (next.includes("token") || next.includes("booking")) setView("booking");
    else if (next.includes("profile") || next.includes("family")) setView("profile");
    else setView("notifications");
    showToast({ message:`Assistant opened: ${text}`, type:"info" });
    setPrompt("");
  };

  return (
    <div style={{
      maxWidth:1120,
      margin:"0 auto",
      padding:"8px 0 24px",
      position:"relative",
    }}>
      <div style={{
        position:"absolute", inset:"-20px -40px auto",
        height:240, pointerEvents:"none", opacity:0.85,
        background:"radial-gradient(circle at 18% 12%, rgba(20,148,142,0.18), transparent 30%), radial-gradient(circle at 82% 8%, rgba(29,78,216,0.16), transparent 26%), radial-gradient(circle at 55% 0%, rgba(16,185,129,0.10), transparent 22%)",
        filter:"blur(10px)",
      }} />
      <PageIntro eyebrow={`MONDAY, 29 JUNE`} title={t.rationReady} desc={t.rationReadyDesc} />

      <div style={{
        background:`linear-gradient(135deg, rgba(8,84,80,0.98) 0%, rgba(20,148,142,0.92) 44%, rgba(29,78,216,0.85) 100%)`,
        borderRadius:24, color:"#fff", padding:"28px 30px", marginBottom:22,
        position:"relative", overflow:"hidden", boxShadow:"0 24px 70px rgba(15,23,42,0.18)",
        animation:"riseIn 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) both",
      }}>
        <div style={{ position:"relative", zIndex:2, display:"grid", gridTemplateColumns:"1.4fr 0.95fr", gap:20, alignItems:"start" }}>
          <div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:16 }}>
              <Badge color="#dafaf7" bg="rgba(255,255,255,0.12)">{t.rationReady}</Badge>
              <Badge color="#dbeafe" bg="rgba(255,255,255,0.10)">June allocation</Badge>
            </div>
            <h2 style={{ fontWeight:800, fontSize:34, lineHeight:1.03, margin:"0 0 12px", letterSpacing:"-0.9px" }}>
              Your ration is ready. Collect it on time.
            </h2>
            <p style={{ fontSize:14, color:"rgba(237, 247, 247, 0.95)", margin:"0 0 24px", maxWidth:560 }}>
              Track your collection window, check latest slots, and open your digital token from one premium dashboard.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,minmax(0,1fr))", gap:12, marginBottom:22 }}>
              <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:18, padding:18, border:"1px solid rgba(255,255,255,0.14)" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.72)", margin:0 }}>Next slot</p>
                <p style={{ fontSize:22, fontWeight:800, margin:"10px 0 4px" }}>10:30 AM</p>
                <p style={{ fontSize:11, color:"rgba(255,255,255,0.78)", margin:0 }}>Best window today</p>
              </div>
              <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:18, padding:18, border:"1px solid rgba(255,255,255,0.14)" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.72)", margin:0 }}>Family covered</p>
                <p style={{ fontSize:22, fontWeight:800, margin:"10px 0 4px" }}>4 members</p>
                <p style={{ fontSize:11, color:"rgba(255,255,255,0.78)", margin:0 }}>Verified ration card</p>
              </div>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
              <button onClick={() => setView("book")} style={{
                display:"inline-flex", alignItems:"center", gap:8, padding:"14px 18px",
                background:"#fff", color:T.tealDark, border:"none", borderRadius:16,
                cursor:"pointer", fontSize:12, fontWeight:800, boxShadow:"0 10px 24px rgba(15,23,42,0.18)",
              }}>
                {t.bookSlot} <Icon name="chevronR" size={16} color="currentColor" />
              </button>
              <button onClick={() => setView("booking")} style={{
                display:"inline-flex", alignItems:"center", gap:8, padding:"14px 18px",
                background:"rgba(255,255,255,0.15)", color:"#fff", border:"1px solid rgba(255,255,255,0.22)", borderRadius:16,
                cursor:"pointer", fontSize:12, fontWeight:700,
              }}>
                {t.viewDigitalToken}
              </button>
            </div>
          </div>

          <div className="premium-surface" style={{
            background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.16)",
            borderRadius:20, padding:22, backdropFilter:"blur(12px)",
            boxShadow:"0 18px 36px rgba(8,15,35,0.14)",
          }}>
            <div style={{ marginBottom:18 }}>
              <p style={{ fontSize:10, letterSpacing:"1.2px", margin:"0 0 6px", color:"rgba(255,255,255,0.72)", fontWeight:800 }}>AI assistant</p>
              <h3 style={{ margin:0, fontSize:18, fontWeight:800 }}>Quick actions</h3>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px", background:"rgba(255,255,255,0.12)", borderRadius:16, border:"1px solid rgba(255,255,255,0.16)" }}>
              <Icon name="scan" size={18} color="#fff" />
              <input
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") askAssistant(prompt); }}
                placeholder="Ask the assistant what to do next"
                style={{
                  width:"100%", background:"transparent", border:"none", outline:"none",
                  color:"#fff", fontSize:13, fontWeight:500,
                }}
              />
            </div>
            <div style={{ display:"grid", gap:10, marginTop:18 }}>
              <button onClick={() => askAssistant(prompt || "Book my slot")} style={{
                width:"100%", padding:"12px 14px", borderRadius:14,
                background:T.teal, color:"#fff", border:"none", cursor:"pointer",
                fontSize:12, fontWeight:700,
              }}>
                Open assistant
              </button>
              <button onClick={() => setView("notifications")} style={{
                width:"100%", padding:"12px 14px", borderRadius:14,
                background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.16)",
                color:"#fff", cursor:"pointer", fontSize:12, fontWeight:700,
              }}>
                Review notifications
              </button>
            </div>
          </div>
        </div>
        <div className="hero-orb" style={{
          position:"absolute", inset:"auto -40px -60px auto", width:240, height:240,
          borderRadius:"50%", background:"radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 55%, transparent 70%)",
        }} />
      </div>

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <h2 style={{ fontSize:15, fontWeight:800, margin:0, color:T.ink }}>{t.atAGlance}</h2>
          <p style={{ fontSize:11, color:T.muted, margin:"4px 0 0" }}>Priority cards keep the rest out of the way.</p>
        </div>
        <button onClick={refreshDashboard} className="premium-button"
          style={{
            display:"inline-flex", alignItems:"center", gap:6, background:"#fff",
            border:`1px solid ${T.line}`, cursor:"pointer", color:T.teal, fontSize:11,
            fontWeight:700, padding:"9px 12px", borderRadius:999, boxShadow:"0 10px 22px rgba(15,23,42,0.04)",
          }}>
          <Icon name="refresh" size={14} color="currentColor" /> {t.refresh}
        </button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:14, marginBottom:22 }}>
        <StatCard loading={loading} delay={0} icon="package" iconColor={T.green} iconBg={T.greenLight}
          label={t.rationStatus} value={t.readyToCollect} sub={`● ${t.stockAvailable}`} subColor={T.green} />
        <StatCard loading={loading} delay={90} icon="calendar" iconColor={T.blue} iconBg={T.blueLight}
          label={t.nextBooking} value={t.noSlotBooked} action={t.bookNow} onAction={() => setView("book")} />
        <StatCard loading={loading} delay={180} icon="users" iconColor={T.amber} iconBg={T.amberLight}
          label={t.familyMembers} value="4 Members" sub="3 adults · 1 child" />
      </div>

      <div className="premium-surface" style={{
        background:"rgba(255,255,255,0.86)", border:`1px solid rgba(226,232,240,0.9)`, borderRadius:20,
        display:"flex", alignItems:"center", gap:16, padding:"18px 20px", marginBottom:22,
        flexWrap:"wrap", boxShadow:"0 18px 44px rgba(15,23,42,0.06)", backdropFilter:"blur(10px)",
        animation:"riseIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        animationDelay:"120ms",
      }}>
        <div style={{ width:46, height:46, borderRadius:14, background:"linear-gradient(135deg, #ecfeff 0%, #dbeafe 100%)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon name="zap" size={20} color={T.teal} />
        </div>
        <div style={{ flex:1, minWidth:180 }}>
          <h3 style={{ fontSize:14, fontWeight:800, margin:"0 0 4px", color:T.ink }}>{t.skipQueue}</h3>
          <p style={{ fontSize:11, color:T.slate, margin:0 }}>{t.skipQueueDesc}</p>
        </div>
        <button onClick={() => setView("book")} className="premium-button" style={{
          display:"inline-flex", alignItems:"center", gap:7, padding:"11px 16px",
          background:`linear-gradient(135deg, ${T.teal} 0%, ${T.tealMid} 100%)`, color:"#fff", border:"none", borderRadius:999,
          cursor:"pointer", fontSize:12, fontWeight:800, boxShadow:"0 12px 26px rgba(11,110,106,0.22)",
        }}>
          {t.bookSlot} <Icon name="chevronR" size={16} color="currentColor" />
        </button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1.55fr 1fr", gap:16, alignItems:"start" }}>
        <div className="premium-surface" style={{
          background:"rgba(255,255,255,0.86)", border:`1px solid rgba(226,232,240,0.9)`, borderRadius:20,
          boxShadow:"0 18px 44px rgba(15,23,42,0.06)", overflow:"hidden", backdropFilter:"blur(10px)",
          animation:"riseIn 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both",
          animationDelay:"180ms",
        }}>
          <div style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"16px 20px", borderBottom:`1px solid ${T.line}`,
          }}>
            <div>
              <h3 style={{ fontSize:14, fontWeight:800, margin:0, color:T.ink }}>{t.recentNotifications}</h3>
              <p style={{ fontSize:10, color:T.muted, margin:"3px 0 0" }}>Signals the assistant should surface first.</p>
            </div>
            <button onClick={() => setView("notifications")} style={{
              background:"transparent", border:"none", cursor:"pointer",
              color:T.teal, fontSize:11, fontWeight:800,
            }}>View all</button>
          </div>
          {NOTIFICATIONS.slice(0,2).map((n, i) => (
            <div key={i} style={{
              display:"flex", gap:12, padding:"15px 20px",
              borderBottom: i<1 ? `1px solid ${T.line}` : "none",
              position:"relative",
            }}>
              <div style={{
                width:40, height:40, borderRadius:12, flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center",
                background: n.type==="success"?T.greenLight : n.type==="info"?T.blueLight : T.amberLight,
                fontSize:16,
              }}>{n.icon}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:12, fontWeight:800, margin:"0 0 3px", color:T.ink }}>{n.title}</p>
                <p style={{ fontSize:10, color:T.slate, margin:"0 0 4px", lineHeight:1.5 }}>{n.msg}</p>
                <p style={{ fontSize:9, color:T.muted, margin:0 }}>{n.time}</p>
              </div>
              {n.unread && <span style={{
                position:"absolute", right:18, top:18,
                width:6, height:6, borderRadius:"50%", background:T.blue,
              }} aria-label="Unread" />}
            </div>
          ))}
        </div>

        <div className="premium-surface" style={{
          background:"rgba(255,255,255,0.86)", border:`1px solid rgba(226,232,240,0.9)`, borderRadius:20,
          boxShadow:"0 18px 44px rgba(15,23,42,0.06)", overflow:"hidden", backdropFilter:"blur(10px)",
          animation:"riseIn 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both",
          animationDelay:"260ms",
        }}>
          <div style={{ padding:"16px 20px", borderBottom:`1px solid ${T.line}` }}>
            <h3 style={{ fontSize:14, fontWeight:800, margin:0, color:T.ink }}>{t.quickActions}</h3>
            <p style={{ fontSize:10, color:T.muted, margin:"3px 0 0" }}>Guided actions with one-step completion.</p>
          </div>
          {[
            { icon:"qr", title:t.viewDigitalToken, sub:t.showAtShop, action:()=>setView("booking") },
            { icon:"card", title:t.rationCardDetails, sub:t.viewFamily, action:()=>setView("profile") },
            { icon:"help", title:t.helpSupport, sub:"1800-111-155", action:()=>showToast({message:"Helpline number copied",type:"info"}) },
          ].map((item, i) => (
            <button key={i} onClick={item.action} style={{
              width:"100%", display:"flex", alignItems:"center", gap:12,
              padding:"14px 20px", background:"transparent", border:"none",
              borderBottom: i<2 ? `1px solid ${T.line}` : "none",
              cursor:"pointer", textAlign:"left",
            }}>
              <div style={{
                width:36, height:36, borderRadius:11, background:"linear-gradient(135deg, rgba(20,148,142,0.12) 0%, rgba(29,78,216,0.08) 100%)",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <Icon name={item.icon} size={16} color={T.teal} />
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:12, fontWeight:800, margin:"0 0 2px", color:T.ink }}>{item.title}</p>
                <p style={{ fontSize:10, color:T.muted, margin:0 }}>{item.sub}</p>
              </div>
              <Icon name="chevronR" size={15} color={T.muted} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── BOOK VIEW ────────────────────────────────────────────────────────────────
const Stepper = ({ step }) => {
  const { t } = useApp();
  const steps = [t.chooseShop, t.selectSlot, t.confirm];
  return (
    <div style={{ display:"flex", marginBottom:24, gap:0 }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display:"flex", flex:1, alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, whiteSpace:"nowrap" }}>
            <div style={{
              width:24, height:24, borderRadius:"50%", display:"flex",
              alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700,
              background: step > i+1 ? T.teal : step === i+1 ? T.teal : T.line,
              color: step >= i+1 ? "#fff" : T.muted,
              transition:"all 0.2s",
            }}>
              {step > i+1 ? <Icon name="check" size={13} color="#fff" /> : i+1}
            </div>
            <span style={{ fontSize:11, fontWeight:600, color: step >= i+1 ? T.teal : T.muted }}>
              {s}
            </span>
          </div>
          {i < 2 && <div style={{ flex:1, height:1, background: step > i+1 ? T.teal : T.line, margin:"0 8px", transition:"background 0.3s" }} />}
        </div>
      ))}
    </div>
  );
};

const BookView = () => {
  const { t, showToast, setView, setBooking, booking } = useApp();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("01 Jul");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});

  const validateStep2 = () => {
    const e = {};
    if (!time) e.time = "Please select a time slot.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const confirm = () => {
    setBooking({ date, time, id:"SR-2026-48291", shop:"Shastri Nagar Fair Price Shop" });
    setView("booking");
    showToast({ message:"Slot confirmed! Show QR at the shop.", type:"success" });
  };

  return (
    <div style={{ maxWidth:1000, margin:"0 auto" }}>
      <PageIntro title={t.bookCollection} desc={t.bookCollectionDesc} onBack={() => setView("home")} />
      <Stepper step={step} />
      <div style={{ display:"grid", gridTemplateColumns:"minmax(0,1fr) 250px", gap:18, alignItems:"start" }}>
        {/* Main form */}
        <div style={{ background:T.white, border:`1px solid ${T.line}`, borderRadius:14, padding:"24px 26px" }}>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <div style={{ display:"flex", gap:12, marginBottom:22 }}>
                <div style={{
                  width:28, height:28, borderRadius:7, background:T.tealLight,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:T.teal, fontWeight:800, fontSize:12, flexShrink:0,
                }}>1</div>
                <div>
                  <h2 style={{ fontSize:16, fontWeight:700, margin:"0 0 3px", color:T.ink }}>Choose your ration shop</h2>
                  <p style={{ fontSize:11, color:T.muted, margin:0 }}>Your linked shop is selected automatically.</p>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:18 }}>
                {[{label:t.state, value:"Delhi"}, {label:t.district, value:"Central Delhi"}].map(f => (
                  <label key={f.label} style={{ display:"block" }}>
                    <span style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.5px", display:"block", marginBottom:6 }}>{f.label.toUpperCase()}</span>
                    <div style={{
                      border:`1px solid ${T.line}`, borderRadius:8, padding:"9px 12px",
                      background:T.bg, display:"flex", alignItems:"center", gap:8,
                    }}>
                      <Icon name="map" size={14} color={T.muted} />
                      <select defaultValue={f.value} style={{ background:"transparent", border:"none", fontSize:12, color:T.ink, flex:1, outline:"none" }}>
                        <option>{f.value}</option>
                      </select>
                    </div>
                  </label>
                ))}
              </div>
              <label>
                <span style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.5px", display:"block", marginBottom:8 }}>RATION SHOP</span>
                <div style={{
                  border:`1.5px solid ${T.teal}`, borderRadius:11, padding:"14px 16px",
                  background:T.tealLight, display:"flex", gap:12, alignItems:"center",
                }}>
                  <div style={{
                    width:8, height:8, borderRadius:"50%", border:`2px solid ${T.teal}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <div style={{ width:4, height:4, borderRadius:"50%", background:T.teal }} />
                  </div>
                  <div style={{
                    width:38, height:38, borderRadius:9, background:"#d2f0ed",
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <Icon name="store" size={18} color={T.teal} />
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontWeight:700, fontSize:13, margin:"0 0 3px", color:T.tealDark }}>Shastri Nagar Fair Price Shop</p>
                    <p style={{ fontSize:10, color:T.slate, margin:"0 0 5px" }}>FPS ID: DL-CEN-1042</p>
                    <p style={{ fontSize:10, color:T.slate, margin:0, display:"flex", alignItems:"center", gap:4 }}>
                      <Icon name="map" size={11} color={T.muted} /> 12, Main Market, Shastri Nagar · 1.2 {t.kmAway}
                    </p>
                  </div>
                  <Badge color={T.teal} bg="#d2f0ed">
                    <Icon name="check" size={10} color={T.teal} /> {t.linkedShop}
                  </Badge>
                </div>
              </label>
              <div style={{ display:"flex", justifyContent:"flex-end", marginTop:24, paddingTop:18, borderTop:`1px solid ${T.line}` }}>
                <button onClick={() => setStep(2)} style={{
                  display:"inline-flex", alignItems:"center", gap:8, padding:"11px 20px",
                  background:T.teal, color:"#fff", border:"none", borderRadius:9,
                  cursor:"pointer", fontSize:12, fontWeight:700,
                }}>
                  {t.continueBtn} <Icon name="chevronR" size={15} color="#fff" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <div style={{ display:"flex", gap:12, marginBottom:22 }}>
                <div style={{ width:28, height:28, borderRadius:7, background:T.tealLight, display:"flex", alignItems:"center", justifyContent:"center", color:T.teal, fontWeight:800, fontSize:12, flexShrink:0 }}>2</div>
                <div>
                  <h2 style={{ fontSize:16, fontWeight:700, margin:"0 0 3px", color:T.ink }}>Select date & time</h2>
                  <p style={{ fontSize:11, color:T.muted, margin:0 }}>Slots are available for the next 5 working days.</p>
                </div>
              </div>

              <p style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.5px", margin:"0 0 8px" }}>CHOOSE A DATE</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:7, marginBottom:22 }}>
                {DAYS.map(d => (
                  <button key={d.label} onClick={() => setDate(d.label)} style={{
                    padding:"10px 4px", border:`1.5px solid ${date===d.label ? T.teal : T.line}`,
                    borderRadius:9, background: date===d.label ? T.tealLight : T.white,
                    cursor:"pointer", textAlign:"center",
                  }}>
                    <p style={{ fontSize:8, fontWeight:800, letterSpacing:"0.6px", color: date===d.label ? T.teal : T.muted, margin:"0 0 4px" }}>{d.day}</p>
                    <p style={{ fontSize:18, fontWeight:800, color: date===d.label ? T.teal : T.ink, margin:"0 0 3px" }}>{d.date}</p>
                    <p style={{ fontSize:8, color: date===d.label ? T.teal : T.muted, margin:0 }}>{d.note}</p>
                  </button>
                ))}
              </div>

              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                <p style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.5px", margin:0 }}>AVAILABLE TIME SLOTS</p>
                <div style={{ display:"flex", gap:12 }}>
                  {[{dot:T.teal, label:"Available"},{dot:T.amber, label:"Filling fast"}].map(l => (
                    <span key={l.label} style={{ display:"flex", alignItems:"center", gap:5, fontSize:9, color:T.muted }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:l.dot, display:"inline-block" }} />{l.label}
                    </span>
                  ))}
                </div>
              </div>

              {errors.time && <p style={{ fontSize:11, color:T.red, background:T.redLight, borderRadius:7, padding:"8px 12px", marginBottom:10 }}>⚠ {errors.time}</p>}

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:8, marginBottom:20 }}>
                {SLOTS.map(s => {
                  const few = s.left > 0 && s.left <= 3;
                  const full = s.left === 0;
                  const sel = time === s.time;
                  return (
                    <button key={s.time} disabled={full} onClick={() => { setTime(s.time); setErrors({}); }}
                      style={{
                        border:`1.5px solid ${sel ? T.teal : few ? T.amber : T.line}`,
                        borderRadius:9, background: sel ? T.tealLight : full ? T.bg : T.white,
                        padding:"10px 10px", textAlign:"left", cursor: full ? "not-allowed" : "pointer",
                        opacity: full ? 0.55 : 1,
                        display:"grid", gridTemplateColumns:"18px 1fr",
                        alignItems:"center", gap:6,
                      }}>
                      <Icon name="clock" size={14} color={sel ? T.teal : T.muted} />
                      <div>
                        <p style={{ fontWeight:700, fontSize:11, color: sel ? T.teal : full ? T.muted : T.ink, margin:"0 0 2px", textDecoration: full?"line-through":"none" }}>{s.time}</p>
                        <p style={{ fontSize:8, color: full ? T.muted : few ? T.amber : T.slate, margin:0 }}>
                          {full ? t.slotFull : `${s.left} ${t.slotsLeft}`}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div style={{ display:"flex", justifyContent:"space-between", paddingTop:18, borderTop:`1px solid ${T.line}` }}>
                <button onClick={() => setStep(1)} style={{
                  display:"inline-flex", alignItems:"center", gap:6, padding:"10px 16px",
                  background:T.white, border:`1px solid ${T.line}`, borderRadius:9,
                  cursor:"pointer", fontSize:12, fontWeight:600, color:T.slate,
                }}>
                  <Icon name="chevronL" size={14} color="currentColor" /> {t.back}
                </button>
                <button onClick={() => { if(validateStep2()) setStep(3); }} style={{
                  display:"inline-flex", alignItems:"center", gap:8, padding:"11px 20px",
                  background:T.teal, color:"#fff", border:"none", borderRadius:9,
                  cursor:"pointer", fontSize:12, fontWeight:700,
                }}>
                  Review booking <Icon name="chevronR" size={15} color="#fff" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <div style={{ display:"flex", gap:12, marginBottom:22 }}>
                <div style={{ width:28, height:28, borderRadius:7, background:T.tealLight, display:"flex", alignItems:"center", justifyContent:"center", color:T.teal, fontWeight:800, fontSize:12, flexShrink:0 }}>3</div>
                <div>
                  <h2 style={{ fontSize:16, fontWeight:700, margin:"0 0 3px", color:T.ink }}>{t.reviewConfirm}</h2>
                  <p style={{ fontSize:11, color:T.muted, margin:0 }}>{t.reviewDesc}</p>
                </div>
              </div>
              <div style={{ border:`1px solid ${T.line}`, borderRadius:12, overflow:"hidden", marginBottom:16 }}>
                <div style={{ background:T.bg, padding:"14px 16px", display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ width:34, height:34, borderRadius:8, background:T.tealLight, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Icon name="store" size={16} color={T.teal} />
                  </div>
                  <div>
                    <p style={{ fontSize:8, fontWeight:800, letterSpacing:"0.5px", color:T.muted, margin:"0 0 3px" }}>RATION SHOP</p>
                    <p style={{ fontSize:12, fontWeight:700, margin:"0 0 2px", color:T.ink }}>Shastri Nagar Fair Price Shop</p>
                    <p style={{ fontSize:10, color:T.muted, margin:0 }}>12, Main Market, Shastri Nagar</p>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
                  {[
                    { icon:"calendar", label:"DATE", value:`${date}, 2026` },
                    { icon:"clock", label:"TIME", value:time },
                    { icon:"user", label:"CARD HOLDER", value:"Ravi Sharma" },
                    { icon:"card", label:"RATION CARD", value:"DL •••• 4821" },
                  ].map((row, i) => (
                    <div key={i} style={{
                      display:"flex", gap:10, padding:"14px 16px", alignItems:"center",
                      borderTop:`1px solid ${T.line}`,
                      borderRight: i%2===0 ? `1px solid ${T.line}` : "none",
                    }}>
                      <Icon name={row.icon} size={15} color={T.teal} />
                      <div>
                        <p style={{ fontSize:8, fontWeight:800, letterSpacing:"0.5px", color:T.muted, margin:"0 0 3px" }}>{row.label}</p>
                        <p style={{ fontSize:11, fontWeight:700, color:T.ink, margin:0 }}>{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                background:T.blueLight, border:`1px solid #bfdbfe`, borderRadius:9,
                padding:"11px 14px", display:"flex", gap:9, marginBottom:20, alignItems:"flex-start",
              }}>
                <Icon name="shield" size={16} color={T.blue} />
                <p style={{ fontSize:11, color:"#1e40af", margin:0, lineHeight:1.6 }}>
                  <strong>{t.slotReserved}</strong><br />{t.arriveEarly}
                </p>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", paddingTop:18, borderTop:`1px solid ${T.line}` }}>
                <button onClick={() => setStep(2)} style={{
                  display:"inline-flex", alignItems:"center", gap:6, padding:"10px 16px",
                  background:T.white, border:`1px solid ${T.line}`, borderRadius:9,
                  cursor:"pointer", fontSize:12, fontWeight:600, color:T.slate,
                }}>
                  <Icon name="chevronL" size={14} color="currentColor" /> {t.editSlot}
                </button>
                <button onClick={confirm} style={{
                  display:"inline-flex", alignItems:"center", gap:8, padding:"11px 22px",
                  background:T.teal, color:"#fff", border:"none", borderRadius:9,
                  cursor:"pointer", fontSize:12, fontWeight:700,
                }}>
                  <Icon name="check" size={15} color="#fff" /> {t.confirmBooking}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Aside */}
        <div style={{ display:"grid", gap:12 }}>
          <div style={{ background:T.white, border:`1px solid ${T.line}`, borderRadius:14, padding:18 }}>
            <h3 style={{ fontSize:13, fontWeight:700, margin:"0 0 16px", color:T.ink }}>Booking summary</h3>
            {[
              { icon:"store", label:"SHOP", value:"Shastri Nagar FPS" },
              { icon:"calendar", label:"DATE", value: step > 1 ? `${date}, 2026` : "Not selected" },
              { icon:"clock", label:"TIME", value: step > 1 && time ? time : "Not selected" },
            ].map((row, i) => (
              <div key={i} style={{ display:"flex", gap:9, margin:i>0?"12px 0 0":0 }}>
                <Icon name={row.icon} size={15} color={T.teal} />
                <div>
                  <p style={{ fontSize:8, fontWeight:800, letterSpacing:"0.5px", color:T.muted, margin:"0 0 3px" }}>{row.label}</p>
                  <p style={{ fontSize:11, fontWeight:700, color: row.value.includes("Not") ? T.muted : T.ink, margin:0 }}>{row.value}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop:`1px solid ${T.line}`, marginTop:14, paddingTop:12 }}>
              <p style={{ fontSize:9, color:T.slate, margin:0, display:"flex", alignItems:"center", gap:5 }}>
                <Icon name="shield" size={13} color={T.teal} /> Secure government service
              </p>
            </div>
          </div>
          <div style={{
            background:"#fffbeb", border:`1px solid #fde68a`, borderRadius:12, padding:14,
            display:"flex", gap:9,
          }}>
            <Icon name="help" size={16} color={T.amber} />
            <div>
              <p style={{ fontSize:11, fontWeight:700, margin:"0 0 4px", color:T.amber }}>Booking help</p>
              <p style={{ fontSize:10, color:"#78541a", margin:"0 0 6px", lineHeight:1.5 }}>
                Slots can be rescheduled up to 2 hours before your visit.
              </p>
              <a href="tel:1800111155" style={{ fontSize:10, fontWeight:700, color:"#92400e" }}>
                Call 1800-111-155
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── QR TOKEN VIEW ────────────────────────────────────────────────────────────
const BookingTokenView = () => {
  const { t, booking, setView, setBooking, showToast } = useApp();

  if (!booking) return (
    <div style={{ maxWidth:600, margin:"80px auto", textAlign:"center" }}>
      <PageIntro eyebrow="MY BOOKING" title={t.myBookingTitle} />
      <div style={{
        background:T.white, border:`1px solid ${T.line}`, borderRadius:16,
        padding:"48px 32px",
      }}>
        <div style={{
          width:64, height:64, borderRadius:16, background:T.tealLight,
          display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px",
        }}>
          <Icon name="calendar" size={30} color={T.teal} />
        </div>
        <h2 style={{ fontSize:18, fontWeight:700, color:T.ink, margin:"0 0 8px" }}>{t.noBooking}</h2>
        <p style={{ fontSize:13, color:T.slate, margin:"0 0 24px" }}>{t.noBookingDesc}</p>
        <button onClick={() => setView("book")} style={{
          display:"inline-flex", alignItems:"center", gap:8, padding:"12px 22px",
          background:T.teal, color:"#fff", border:"none", borderRadius:9,
          cursor:"pointer", fontSize:13, fontWeight:700,
        }}>
          {t.bookSlot} <Icon name="chevronR" size={16} color="#fff" />
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:900, margin:"0 auto" }}>
      <PageIntro eyebrow="MY BOOKING" title={t.myBookingTitle} desc={t.showQR} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 260px", gap:20, alignItems:"start" }}>
        {/* Token card */}
        <div style={{ background:T.white, border:`1px solid ${T.line}`, borderRadius:16, overflow:"hidden" }}>
          <div style={{
            background:T.teal, padding:"16px 22px",
            display:"flex", justifyContent:"space-between", alignItems:"center",
          }}>
            <Brand />
            <Badge color="#fff" bg="rgba(255,255,255,0.2)">
              <Icon name="checkCircle" size={11} color="#fff" /> {t.confirmed}
            </Badge>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", minHeight:240 }}>
            {/* QR */}
            <div style={{
              borderRight:`1.5px dashed ${T.line}`,
              display:"flex", flexDirection:"column", alignItems:"center",
              justifyContent:"center", padding:24, gap:10,
            }}>
              {/* Simulated QR pattern */}
              <div style={{
                width:130, height:130, border:`2px solid ${T.ink}`,
                borderRadius:8, padding:6, background:T.white,
                display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:1.5,
              }}>
                {Array.from({length:49}).map((_, i) => {
                  const row=Math.floor(i/7), col=i%7;
                  const corner = (row<3&&col<3)||(row<3&&col>3)||(row>3&&col<3);
                  const edge = corner && (row===0||row===2||col===0||col===2);
                  const inner = corner && row===1&&col===1;
                  const filled = edge||inner||Math.random()>0.6;
                  return <div key={i} style={{ background: filled ? T.ink : "transparent", borderRadius:1 }} />;
                })}
              </div>
              <p style={{ fontSize:9, color:T.muted, margin:0, textAlign:"center" }}>Scan at the ration shop</p>
            </div>
            {/* Details */}
            <div style={{ padding:"22px 24px" }}>
              <p style={{ fontSize:8, fontWeight:800, letterSpacing:"1px", color:T.muted, margin:"0 0 4px" }}>{t.bookingId}</p>
              <h2 style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.5px", color:T.ink, margin:"0 0 16px" }}>{booking.id}</h2>
              <div style={{ borderTop:`1px solid ${T.line}`, paddingTop:14 }}>
                <p style={{ fontSize:8, fontWeight:800, letterSpacing:"0.8px", color:T.muted, margin:"0 0 4px" }}>RATION SHOP</p>
                <p style={{ fontSize:13, fontWeight:700, margin:"0 0 3px", color:T.ink }}>{booking.shop}</p>
                <p style={{ fontSize:10, color:T.muted, margin:"0 0 14px" }}>12, Main Market, Shastri Nagar</p>
                <div style={{ display:"flex", gap:20 }}>
                  {[{label:"DATE", val:`${booking.date}, 2026`},{label:"TIME", val:booking.time}].map(r=>(
                    <div key={r.label}>
                      <p style={{ fontSize:8, fontWeight:800, letterSpacing:"0.8px", color:T.muted, margin:"0 0 4px" }}>{r.label}</p>
                      <p style={{ fontSize:12, fontWeight:700, color:T.ink, margin:0 }}>{r.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{
            background:T.tealLight, padding:"11px 22px",
            display:"flex", alignItems:"center", gap:8,
          }}>
            <Icon name="shield" size={14} color={T.teal} />
            <span style={{ fontSize:10, color:T.teal, fontWeight:600 }}>{t.verifiedToken}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display:"grid", gap:14 }}>
          <div style={{ background:T.white, border:`1px solid ${T.line}`, borderRadius:14, padding:18 }}>
            <h3 style={{ fontSize:13, fontWeight:700, margin:"0 0 14px", color:T.ink }}>Booking actions</h3>
            {[
              { icon:"download", label:t.downloadToken, action:()=>showToast({message:"Token downloaded",type:"success"}) },
              { icon:"refresh", label:t.reschedule, action:()=>setView("book") },
            ].map((a,i)=>(
              <button key={i} onClick={a.action} style={{
                width:"100%", display:"flex", alignItems:"center", gap:10, padding:"11px 14px",
                background:T.bg, border:`1px solid ${T.line}`, borderRadius:9,
                cursor:"pointer", fontSize:12, fontWeight:600, color:T.ink,
                marginBottom:8, textAlign:"left",
              }}>
                <Icon name={a.icon} size={15} color={T.teal} /> {a.label}
              </button>
            ))}
            <button onClick={() => { setBooking(null); showToast({message:"Booking cancelled",type:"info"}); }} style={{
              width:"100%", display:"flex", alignItems:"center", gap:10, padding:"11px 14px",
              background:"#fff1f1", border:`1px solid #fecaca`, borderRadius:9,
              cursor:"pointer", fontSize:12, fontWeight:600, color:T.red, textAlign:"left",
            }}>
              <Icon name="x" size={15} color={T.red} /> {t.cancelBooking}
            </button>
          </div>
          <div style={{
            background:T.white, border:`1px solid ${T.line}`, borderRadius:12,
            padding:"14px 16px", display:"flex", gap:12, alignItems:"flex-start",
          }}>
            <Icon name="clock" size={18} color={T.teal} />
            <div>
              <p style={{ fontSize:12, fontWeight:700, margin:"0 0 4px", color:T.ink }}>{t.arriveNote}</p>
              <p style={{ fontSize:10, color:T.slate, margin:0, lineHeight:1.5 }}>{t.slotHeld}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── NOTIFICATIONS VIEW ───────────────────────────────────────────────────────
const NotificationsView = () => {
  const { t, setNotifCount } = useApp();
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState(NOTIFICATIONS);
  const filtered = filter==="unread" ? items.filter(n=>n.unread) : items;

  const markAllRead = () => {
    setItems(items.map(n=>({...n, unread:false})));
    setNotifCount(0);
  };

  return (
    <div style={{ maxWidth:700, margin:"0 auto" }}>
      <PageIntro eyebrow="UPDATES" title={t.updatesTitle} desc={t.updatesDesc} />
      <div style={{ background:T.white, border:`1px solid ${T.line}`, borderRadius:14 }}>
        <div style={{
          display:"flex", alignItems:"center", padding:"14px 18px",
          borderBottom:`1px solid ${T.line}`, gap:8, flexWrap:"wrap",
        }}>
          {["all","unread"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{
              padding:"6px 12px", borderRadius:20, border:"none", cursor:"pointer", fontSize:11, fontWeight:700,
              background: filter===f ? T.teal : T.bg,
              color: filter===f ? "#fff" : T.slate,
            }}>
              {f==="all" ? `${t.all} ${items.length}` : `${t.unread} ${items.filter(n=>n.unread).length}`}
            </button>
          ))}
          <button onClick={markAllRead} style={{
            marginLeft:"auto", display:"flex", alignItems:"center", gap:5,
            background:"transparent", border:"none", cursor:"pointer",
            color:T.teal, fontSize:11, fontWeight:700,
          }}>
            <Icon name="check" size={14} color="currentColor" /> {t.markAllRead}
          </button>
        </div>
        {filtered.map((n, i) => (
          <div key={i} style={{
            display:"flex", gap:13, padding:"16px 20px", position:"relative",
            borderBottom: i<filtered.length-1 ? `1px solid ${T.line}` : "none",
            background: n.unread ? "#fafcff" : T.white,
          }}>
            <div style={{
              width:38, height:38, borderRadius:10, flexShrink:0, fontSize:18,
              display:"flex", alignItems:"center", justifyContent:"center",
              background: n.type==="success"?T.greenLight : n.type==="info"?T.blueLight : T.amberLight,
            }}>{n.icon}</div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:13, fontWeight:700, margin:"0 0 4px", color:T.ink }}>{n.title}</p>
              <p style={{ fontSize:11, color:T.slate, margin:"0 0 5px" }}>{n.msg}</p>
              <p style={{ fontSize:10, color:T.muted, margin:0 }}>{n.time}</p>
            </div>
            {n.unread && <span style={{
              position:"absolute", right:18, top:20, width:7, height:7,
              borderRadius:"50%", background:T.blue,
            }} aria-label="Unread" />}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PROFILE VIEW ─────────────────────────────────────────────────────────────
const ProfileView = () => {
  const { t, lang, setLang } = useApp();
  return (
    <div style={{ maxWidth:900, margin:"0 auto" }}>
      <PageIntro eyebrow="ACCOUNT" title={t.accountTitle} desc={t.accountDesc} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:18, alignItems:"start" }}>
        {/* Main card */}
        <div style={{ background:T.white, border:`1px solid ${T.line}`, borderRadius:14 }}>
          <div style={{
            display:"flex", gap:16, alignItems:"center", padding:"22px 24px",
            borderBottom:`1px solid ${T.line}`,
          }}>
            <Avatar initials="RS" size={60} />
            <div style={{ flex:1 }}>
              <h2 style={{ fontSize:18, fontWeight:800, margin:"0 0 4px", color:T.ink }}>Ravi Sharma</h2>
              <Badge color={T.teal} bg={T.tealLight}>
                <Icon name="shield" size={11} color={T.teal} /> {t.verifiedHolder}
              </Badge>
            </div>
            <button style={{
              padding:"8px 14px", background:T.bg, border:`1px solid ${T.line}`,
              borderRadius:8, cursor:"pointer", fontSize:11, fontWeight:600, color:T.slate,
            }}>{t.editProfile}</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
            {[
              { icon:"phone", label:t.mobile, value:"+91 98••• ••210" },
              { icon:"card", label:"Ration card", value:"DL-CEN-2019-4821" },
              { icon:"map", label:t.address, value:"24-B, Shastri Nagar, New Delhi" },
              { icon:"globe", label:t.language, value: lang==="en" ? t.english : t.hindi },
            ].map((row, i)=>(
              <div key={i} style={{
                display:"flex", gap:12, padding:"16px 24px", alignItems:"center",
                borderTop:`1px solid ${T.line}`,
                borderRight: i%2===0 ? `1px solid ${T.line}` : "none",
              }}>
                <Icon name={row.icon} size={16} color={T.teal} />
                <div>
                  <p style={{ fontSize:8, fontWeight:800, letterSpacing:"0.6px", color:T.muted, margin:"0 0 4px" }}>{row.label.toUpperCase()}</p>
                  <p style={{ fontSize:12, fontWeight:700, color:T.ink, margin:0 }}>{row.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar cards */}
        <div style={{ display:"grid", gap:14 }}>
          {/* Family */}
          <div style={{ background:T.white, border:`1px solid ${T.line}`, borderRadius:14, padding:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
              <div>
                <h3 style={{ fontSize:14, fontWeight:700, margin:0, color:T.ink }}>{t.familyCard}</h3>
                <p style={{ fontSize:10, color:T.muted, margin:"3px 0 0" }}>4 {t.membersLinked}</p>
              </div>
            </div>
            {[["RS","Ravi Sharma",t.familyHead],["SS","Sunita Sharma",t.spouse],["AS","Aarav Sharma",t.son],["MS","Meera Sharma",t.daughter]].map(m=>(
              <div key={m[0]} style={{
                display:"flex", alignItems:"center", gap:10, padding:"10px 0",
                borderBottom:`1px solid ${T.line}`,
              }}>
                <Avatar initials={m[0]} size={32} />
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:12, fontWeight:700, margin:0, color:T.ink }}>{m[1]}</p>
                  <p style={{ fontSize:10, color:T.muted, margin:"2px 0 0" }}>{m[2]}</p>
                </div>
                <Icon name="shield" size={14} color={T.teal} />
              </div>
            ))}
          </div>

          {/* Settings */}
          <div style={{ background:T.white, border:`1px solid ${T.line}`, borderRadius:14, overflow:"hidden" }}>
            {[
              { icon:"help", label:t.helpSupportBtn, action:()=>{} },
              { icon:"globe", label:t.languageBtn, action:()=>{} },
              { icon:"logout", label:t.logout, color:T.red, action:()=>{} },
            ].map((item,i)=>(
              item.icon === "globe" ? (
                <div key={i} style={{
                  width:"100%", display:"flex", alignItems:"center", gap:12,
                  padding:"14px 18px", background:"transparent",
                  borderBottom: i<2 ? `1px solid ${T.line}` : "none",
                  color:item.color||T.slate, fontSize:13, fontWeight:600,
                }}>
                  <Icon name={item.icon} size={16} color={item.color||T.slate} />
                  <span style={{ flex:1 }}>{item.label}</span>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3 }}>
                    <span style={{ fontSize:10, color:T.muted }}>{LANG_OPTIONS.length} available</span>
                    <select value={lang} onChange={e => setLang(e.target.value)} aria-label="Switch language"
                      style={{
                        fontSize:12, fontWeight:600, color:T.ink, background:T.bg,
                        border:`1px solid ${T.line}`, borderRadius:7, padding:"6px 10px",
                        cursor:"pointer",
                      }}>
                      {LANG_OPTIONS.map(option => <option key={option.code} value={option.code}>{option.label}</option>)}
                    </select>
                  </div>
                </div>
              ) : (
                <button key={i} onClick={item.action} style={{
                  width:"100%", display:"flex", alignItems:"center", gap:12,
                  padding:"14px 18px", background:"transparent",
                  border:"none", borderBottom: i<2 ? `1px solid ${T.line}` : "none",
                  cursor:"pointer", color:item.color||T.slate, fontSize:13, fontWeight:600,
                  textAlign:"left",
                }}>
                  <Icon name={item.icon} size={16} color={item.color||T.slate} />
                  <span style={{ flex:1 }}>{item.label}</span>
                  <Icon name="chevronR" size={15} color={item.color||T.muted} />
                </button>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── CITIZEN APP ──────────────────────────────────────────────────────────────
const CitizenApp = () => {
  const { view, setView } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="app-shell" style={{ minHeight:"100vh", background:T.bg }}>
      <CitizenSidebar view={view} setView={setView} open={menuOpen} onClose={()=>setMenuOpen(false)} />
      <div style={{ marginLeft:240, minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        <Topbar onMenu={()=>setMenuOpen(true)} />
        <main className="app-main" style={{ flex:1, padding:"32px 36px 60px" }}>
          {view==="home"         && <HomeView />}
          {view==="book"         && <BookView />}
          {view==="booking"      && <BookingTokenView />}
          {view==="notifications"&& <NotificationsView />}
          {view==="profile"      && <ProfileView />}
        </main>
      </div>
    </div>
  );
};

// ─── PORTAL SHELL (Shopkeeper + Admin) ───────────────────────────────────────
const PortalShell = ({ navItems, title, subtitle, userInitials, children }) => {
  const { role, setRole, t, lang, setLang } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="portal-shell" style={{ display:"flex", minHeight:"100vh", background:T.bg }}>
      {/* Dark sidebar */}
      <aside className="premium-sidebar" style={{
        width:228, background:"#0d2f2d", position:"fixed", top:0, bottom:0,
        display:"flex", flexDirection:"column", padding:"20px 14px",
        transform: menuOpen?"none":"translateX(-100%)",
        transition:"transform 0.22s",
        zIndex:40,
      }}>
        <Brand />
        <div style={{
          background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:8, padding:"8px 12px", margin:"20px 0 14px",
          display:"flex", gap:8, alignItems:"center", fontSize:9, color:"#b9d7d4",
        }}>
          <Icon name="shield" size={13} color="#b9d7d4" /> {title}
        </div>
        <nav style={{ display:"grid", gap:3 }}>
          {navItems.map((item, i) => (
            <button key={i} style={{
              display:"flex", alignItems:"center", gap:10, padding:"10px 11px",
              borderRadius:8, border:"none", cursor:"pointer", textAlign:"left",
              background: i===0 ? "rgba(255,255,255,0.12)" : "transparent",
              color: i===0 ? "#fff" : "#aac3c0", fontSize:11, fontWeight:600,
            }}>
              <Icon name={item.icon} size={17} color="currentColor" />
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{
          marginTop:"auto", borderTop:"1px solid rgba(255,255,255,0.1)",
          paddingTop:14, display:"flex", gap:10, alignItems:"center",
        }}>
          <Avatar initials={userInitials} size={32} bg="rgba(255,255,255,0.14)" color="#fff" />
          <div>
            <p style={{ fontSize:10, fontWeight:700, color:"#fff", margin:0 }}>
              {role==="admin" ? "Anita Kapoor" : "Suresh Kumar"}
            </p>
            <p style={{ fontSize:8, color:"#91aca9", margin:"2px 0 0" }}>{title}</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ marginLeft:0, flex:1, display:"flex", flexDirection:"column" }}>
        <header style={{
          background:T.white, borderBottom:`1px solid ${T.line}`,
          display:"flex", alignItems:"center", height:64, padding:"0 28px", gap:14,
          position:"sticky", top:0, zIndex:20,
        }}>
          <button onClick={()=>setMenuOpen(!menuOpen)} style={{
            background:"transparent", border:"none", cursor:"pointer",
            padding:6, borderRadius:8, color:T.slate,
          }}>
            <Icon name="menu" size={20} color="currentColor" />
          </button>
          <div>
            <p style={{ fontSize:14, fontWeight:800, margin:0, color:T.ink }}>{title}</p>
            <p style={{ fontSize:10, color:T.muted, margin:"2px 0 0" }}>{subtitle}</p>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <span style={{ fontSize:11, color:T.muted }}>{t.viewAs}</span>
              <select value={role} onChange={e=>setRole(e.target.value)}
                style={{ fontSize:11, fontWeight:600, color:T.ink, background:T.bg, border:`1px solid ${T.line}`, borderRadius:7, padding:"6px 8px", cursor:"pointer" }}>
                <option value="citizen">{t.citizen}</option>
                <option value="shopkeeper">{t.shopkeeper}</option>
                <option value="admin">{t.administrator}</option>
              </select>
            </div>
            <button onClick={()=>setLang(lang==="en"?"hi":"en")} style={{
              padding:"6px 10px", background:T.bg, border:`1px solid ${T.line}`, borderRadius:7,
              cursor:"pointer", color:T.slate, fontSize:11, fontWeight:600, display:"flex", alignItems:"center", gap:5,
            }}>
              <Icon name="globe" size={14} color="currentColor" /> {lang==="en"?"हि":"EN"}
            </button>
            <div style={{ position:"relative" }}>
              <button style={{
                background:"transparent", border:"none", cursor:"pointer",
                padding:6, borderRadius:8, color:T.slate, display:"flex",
              }}>
                <Icon name="bell" size={20} color="currentColor" />
                <span style={{
                  position:"absolute", top:4, right:4, width:7, height:7,
                  background:T.red, borderRadius:"50%", border:`2px solid ${T.white}`,
                }} />
              </button>
            </div>
            <Avatar initials={userInitials} size={32} />
          </div>
        </header>
        <main style={{ flex:1, padding:28 }}>
          {children}
        </main>
      </div>
    </div>
  );
};

// ─── SHOPKEEPER APP ───────────────────────────────────────────────────────────
const ShopkeeperApp = () => {
  const { t } = useApp();
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [search, setSearch] = useState("");
  const scanTimerRef = useRef(null);
  const filtered = SHOP_BOOKINGS.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.id.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => () => {
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
  }, []);

  const doScan = () => {
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    setScanning(true);
    scanTimerRef.current = setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 1800);
  };

  const navItems = [
    { icon:"dashboard", label:"Overview" }, { icon:"calendar", label:"Today's bookings" },
    { icon:"scan", label:"Scan QR token" }, { icon:"box", label:"Stock status" },
    { icon:"clipCheck", label:"Collection log" },
  ];

  return (
    <PortalShell navItems={navItems} title="Shopkeeper portal" subtitle="Shastri Nagar Fair Price Shop" userInitials="SK">
      <div style={{ maxWidth:1300, margin:"0 auto" }}>
        <PageIntro eyebrow="MONDAY, 29 JUNE" title="Good morning, Suresh"
          desc="Here's today's collection activity at your shop." />

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
          {[
            { icon:"calendar", color:T.blue, bg:T.blueLight, label:"TODAY'S BOOKINGS", val:"48", sub:"12 remaining" },
            { icon:"clock", color:T.amber, bg:T.amberLight, label:"WAITING", val:"8", sub:"Current queue" },
            { icon:"checkCircle", color:T.green, bg:T.greenLight, label:"COMPLETED", val:"36", sub:"75% complete" },
            { icon:"box", color:T.purple, bg:T.purpleLight, label:"STOCK STATUS", val:"Available", sub:"Updated 9:12 AM" },
          ].map((s,i)=>(
            <div key={i} style={{
              background:T.white, border:`1px solid ${T.line}`, borderRadius:12,
              padding:"16px 18px", display:"flex", gap:12, alignItems:"center",
            }}>
              <div style={{ width:40, height:40, borderRadius:10, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon name={s.icon} size={18} color={s.color} />
              </div>
              <div>
                <p style={{ fontSize:8.5, fontWeight:800, letterSpacing:"0.7px", color:T.muted, margin:"0 0 5px" }}>{s.label}</p>
                <p style={{ fontSize:18, fontWeight:800, color:T.ink, margin:"0 0 3px", letterSpacing:"-0.5px" }}>{s.val}</p>
                <p style={{ fontSize:9.5, color:T.muted, margin:0 }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display:"grid", gridTemplateColumns:"minmax(0,1fr) 270px", gap:18 }}>
          {/* Bookings table */}
          <div style={{ background:T.white, border:`1px solid ${T.line}`, borderRadius:14 }}>
            <div style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"16px 20px", borderBottom:`1px solid ${T.line}`, gap:12, flexWrap:"wrap",
            }}>
              <div>
                <h3 style={{ fontSize:14, fontWeight:700, margin:0, color:T.ink }}>Today's slot list</h3>
                <p style={{ fontSize:10, color:T.muted, margin:"3px 0 0" }}>{SHOP_BOOKINGS.length} upcoming citizens</p>
              </div>
              <div style={{
                display:"flex", alignItems:"center", gap:7, border:`1px solid ${T.line}`,
                borderRadius:8, padding:"7px 10px", background:T.bg,
              }}>
                <Icon name="sliders" size={13} color={T.muted} />
                <input
                  value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Search booking or name…"
                  aria-label="Search bookings"
                  style={{
                    border:"none", background:"transparent", fontSize:11,
                    color:T.ink, outline:"none", width:180,
                  }}
                />
              </div>
            </div>
            <div style={{ overflowX:"auto" }}>
              <div style={{
                display:"grid", minWidth:680,
                gridTemplateColumns:"90px 100px 1.3fr 1fr 90px 60px",
                background:T.bg, padding:"9px 18px",
                fontSize:8.5, fontWeight:800, letterSpacing:"0.5px", color:T.muted,
              }}>
                {["TIME","BOOKING","CITIZEN","RATION CARD","STATUS","ACTION"].map(h=>(
                  <span key={h}>{h}</span>
                ))}
              </div>
              {filtered.map((b,i)=>(
                <div key={b.id} style={{
                  display:"grid", minWidth:680,
                  gridTemplateColumns:"90px 100px 1.3fr 1fr 90px 60px",
                  padding:"12px 18px", borderTop:`1px solid ${T.line}`,
                  alignItems:"center", fontSize:11,
                  background: b.status==="Arrived" ? "#f0fdf4" : T.white,
                }}>
                  <span style={{ fontWeight:700, color:T.ink }}>{b.time}</span>
                  <span style={{ color:T.slate }}>{b.id}</span>
                  <span style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <Avatar initials={b.name.split(" ").map(x=>x[0]).join("")} size={26} />
                    <strong style={{ color:T.ink }}>{b.name}</strong>
                  </span>
                  <span style={{ color:T.slate }}>{b.card}</span>
                  <StatusBadge status={b.status} />
                  <button onClick={doScan} style={{
                    background:"transparent", border:"none", cursor:"pointer",
                    color:T.teal, fontSize:10, fontWeight:700, textAlign:"left",
                  }}>Scan</button>
                </div>
              ))}
              {filtered.length===0 && (
                <div style={{ padding:"32px 20px", textAlign:"center", color:T.muted, fontSize:13 }}>
                  No bookings match your search.
                </div>
              )}
            </div>
          </div>

          {/* Right panel */}
          <div style={{ display:"grid", gap:14 }}>
            {/* Scanner */}
            <button onClick={doScan} style={{
              background:`linear-gradient(140deg, ${T.teal}, ${T.tealMid})`,
              border:"none", borderRadius:14, padding:22, textAlign:"left",
              cursor:"pointer", color:"#fff",
            }}>
              <div style={{
                width:44, height:44, borderRadius:10, background:"rgba(255,255,255,0.14)",
                display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14,
              }}>
                <Icon name="scan" size={22} color="#fff" />
              </div>
              <h3 style={{ fontSize:15, fontWeight:800, margin:"0 0 6px" }}>Scan QR token</h3>
              <p style={{ fontSize:10, color:"#cce9e6", margin:"0 0 14px", lineHeight:1.6 }}>
                Verify a citizen's booking and mark their ration as collected.
              </p>
              <span style={{ fontSize:10, fontWeight:700, display:"flex", alignItems:"center", gap:5 }}>
                Open scanner <Icon name="arrowUR" size={13} color="currentColor" />
              </span>
            </button>

            {/* Stock */}
            <div style={{ background:T.white, border:`1px solid ${T.line}`, borderRadius:14 }}>
              <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"14px 16px", borderBottom:`1px solid ${T.line}`,
              }}>
                <div>
                  <h3 style={{ fontSize:13, fontWeight:700, margin:0, color:T.ink }}>Stock overview</h3>
                  <p style={{ fontSize:9, color:T.muted, margin:"3px 0 0" }}>Today's availability</p>
                </div>
                <button style={{ background:T.bg, border:`1px solid ${T.line}`, borderRadius:7, padding:"5px 8px", cursor:"pointer", color:T.slate }}>
                  <Icon name="sliders" size={14} color="currentColor" />
                </button>
              </div>
              {[["Rice","420 kg",72,"#0f766e"],["Wheat","310 kg",58,"#0f766e"],["Sugar","96 kg",34,"#d97706"],["Kerosene","180 L",64,"#0f766e"]].map(([name,qty,pct,color])=>(
                <div key={name} style={{ display:"grid", gridTemplateColumns:"80px 1fr 30px", gap:8, padding:"10px 14px", alignItems:"center" }}>
                  <div>
                    <p style={{ fontSize:10, fontWeight:700, margin:"0 0 2px", color:T.ink }}>{name}</p>
                    <p style={{ fontSize:8, color:T.muted, margin:0 }}>{qty} remaining</p>
                  </div>
                  <div style={{ height:5, borderRadius:10, background:T.line, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:10 }} />
                  </div>
                  <span style={{ fontSize:9, color:T.muted, textAlign:"right" }}>{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QR Scan modal */}
      {(scanning || scanned) && (
        <div style={{
          position:"fixed", inset:0, background:"rgba(15,23,42,0.6)",
          display:"flex", alignItems:"center", justifyContent:"center", zIndex:100,
        }} role="dialog" aria-modal="true" aria-label="QR Verification">
          <div style={{
            background:T.white, borderRadius:18, padding:32, width:340,
            position:"relative", textAlign:"center",
            boxShadow:"0 24px 64px rgba(15,23,42,0.28)",
          }}>
            <button onClick={()=>{setScanned(false);setScanning(false);}} style={{
              position:"absolute", top:14, right:14, background:T.bg,
              border:"none", cursor:"pointer", borderRadius:8, padding:6, color:T.slate,
            }}>
              <Icon name="x" size={16} color="currentColor" />
            </button>
            {scanning ? (
              <div style={{ padding:"20px 0" }}>
                <div style={{
                  width:80, height:80, borderRadius:"50%", background:T.tealLight,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  margin:"0 auto 16px",
                }}>
                  <Icon name="scan" size={36} color={T.teal} />
                </div>
                <p style={{ fontSize:14, fontWeight:700, color:T.ink, margin:"0 0 6px" }}>Scanning…</p>
                <p style={{ fontSize:11, color:T.muted }}>Hold the QR code in front of the camera</p>
                <div style={{
                  width:200, height:4, background:T.line, borderRadius:2,
                  margin:"20px auto 0", overflow:"hidden",
                }}>
                  <div style={{
                    height:"100%", width:"60%", background:T.teal, borderRadius:2,
                    animation:"scan-progress 1.8s ease-in-out infinite",
                  }} />
                </div>
              </div>
            ) : (
              <>
                <div style={{
                  width:56, height:56, borderRadius:"50%", background:T.greenLight,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  margin:"0 auto 12px",
                }}>
                  <Icon name="check" size={26} color={T.green} />
                </div>
                <p style={{ fontSize:10, fontWeight:800, letterSpacing:"1px", color:T.green, margin:"0 0 8px" }}>VALID BOOKING</p>
                <h2 style={{ fontSize:19, fontWeight:800, margin:"0 0 4px", color:T.ink }}>Ravi Sharma</h2>
                <p style={{ fontSize:11, color:T.muted, margin:"0 0 18px" }}>Booking SR-2026-48291 · 10:00 AM</p>
                <div style={{
                  background:T.bg, borderRadius:9, padding:"11px 14px",
                  display:"flex", gap:10, alignItems:"center", marginBottom:18, textAlign:"left",
                }}>
                  <Icon name="card" size={18} color={T.teal} />
                  <div>
                    <p style={{ fontSize:8, fontWeight:800, letterSpacing:"0.6px", color:T.muted, margin:"0 0 3px" }}>RATION CARD</p>
                    <p style={{ fontSize:12, fontWeight:700, color:T.ink, margin:0 }}>DL-CEN-2019-4821</p>
                  </div>
                </div>
                <button onClick={()=>{setScanned(false);}} style={{
                  width:"100%", display:"flex", alignItems:"center", justifyContent:"center",
                  gap:8, padding:"13px", background:T.teal, color:"#fff",
                  border:"none", borderRadius:10, cursor:"pointer", fontSize:13, fontWeight:700,
                }}>
                  <Icon name="package" size={16} color="#fff" /> Mark ration as collected
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </PortalShell>
  );
};

// ─── ADMIN APP ────────────────────────────────────────────────────────────────
const AdminApp = () => {
  const { t } = useApp();
  const [timeRange, setTimeRange] = useState("This week");
  const [shopSearch, setShopSearch] = useState("");

  const navItems = [
    { icon:"dashboard", label:"Overview" }, { icon:"calendar", label:"Manage slots" },
    { icon:"store", label:"Ration shops" }, { icon:"users", label:"Manage users" },
    { icon:"calOff", label:"Holidays" }, { icon:"chart", label:"Reports" },
  ];

  const shopRows = [
    ["Shastri Nagar FPS","Central Delhi","48","36","75%"],
    ["Karol Bagh FPS #118","Central Delhi","62","54","87%"],
    ["Rohini Sector 7 FPS","North West","56","51","91%"],
    ["Lajpat Nagar FPS","South East","44","40","90%"],
  ].filter(r => r[0].toLowerCase().includes(shopSearch.toLowerCase()) || r[1].toLowerCase().includes(shopSearch.toLowerCase()));

  return (
    <PortalShell navItems={navItems} title="Administration" subtitle="National Food Security Service" userInitials="AK">
      <div style={{ maxWidth:1380, margin:"0 auto" }}>
        <PageIntro eyebrow="SYSTEM OVERVIEW" title="Service dashboard"
          desc="Live performance across the Smart Ration network." />

        {/* Admin stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
          {[
            { icon:"users", color:T.blue, bg:T.blueLight, label:"TOTAL USERS", val:"24,862", sub:"↑ 8.2% this month", subColor:T.green },
            { icon:"store", color:T.purple, bg:T.purpleLight, label:"RATION SHOPS", val:"142", sub:"138 currently active" },
            { icon:"calendar", color:T.amber, bg:T.amberLight, label:"TODAY'S BOOKINGS", val:"1,284", sub:"Across all districts" },
            { icon:"checkCircle", color:T.green, bg:T.greenLight, label:"COMPLETION RATE", val:"87.4%", sub:"↑ 2.1% vs yesterday", subColor:T.green },
          ].map((s,i)=>(
            <div key={i} style={{
              background:T.white, border:`1px solid ${T.line}`, borderRadius:12,
              padding:"16px 18px", display:"flex", gap:12, alignItems:"center",
            }}>
              <div style={{ width:40, height:40, borderRadius:10, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon name={s.icon} size={18} color={s.color} />
              </div>
              <div>
                <p style={{ fontSize:8.5, fontWeight:800, letterSpacing:"0.7px", color:T.muted, margin:"0 0 5px" }}>{s.label}</p>
                <p style={{ fontSize:18, fontWeight:800, color:T.ink, margin:"0 0 3px", letterSpacing:"-0.5px" }}>{s.val}</p>
                <p style={{ fontSize:9.5, color:s.subColor||T.muted, margin:0, fontWeight:s.subColor?600:400 }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart + Activity */}
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr 0.8fr", gap:18, marginBottom:18 }}>
          {/* Chart */}
          <div style={{ background:T.white, border:`1px solid ${T.line}`, borderRadius:14, padding:"20px 22px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div>
                <h3 style={{ fontSize:14, fontWeight:700, margin:0, color:T.ink }}>Weekly collection activity</h3>
                <p style={{ fontSize:10, color:T.muted, margin:"3px 0 0" }}>Bookings vs completed collections</p>
              </div>
              <select value={timeRange} onChange={e=>setTimeRange(e.target.value)}
                style={{ fontSize:11, color:T.ink, background:T.bg, border:`1px solid ${T.line}`, borderRadius:7, padding:"6px 10px", cursor:"pointer" }}>
                {["This week","Last week","This month"].map(v=><option key={v}>{v}</option>)}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={CHART_DATA} barGap={4} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke={T.line} vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize:10, fill:T.muted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:10, fill:T.muted }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius:8, border:`1px solid ${T.line}`, fontSize:11 }} />
                <Bar dataKey="bookings" fill="#b6ded9" radius={[4,4,0,0]} name="Bookings" />
                <Bar dataKey="completed" fill={T.teal} radius={[4,4,0,0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display:"flex", gap:16, justifyContent:"center", marginTop:10 }}>
              {[{color:"#b6ded9",label:"Bookings"},{color:T.teal,label:"Completed"}].map(l=>(
                <span key={l.label} style={{ display:"flex", alignItems:"center", gap:6, fontSize:10, color:T.muted }}>
                  <span style={{ width:10, height:10, borderRadius:2, background:l.color, display:"inline-block" }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div style={{ background:T.white, border:`1px solid ${T.line}`, borderRadius:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 18px", borderBottom:`1px solid ${T.line}` }}>
              <div>
                <h3 style={{ fontSize:14, fontWeight:700, margin:0, color:T.ink }}>Recent activity</h3>
                <p style={{ fontSize:10, color:T.muted, margin:"3px 0 0" }}>System-wide updates</p>
              </div>
              <button style={{ background:"transparent", border:"none", cursor:"pointer", color:T.teal, fontSize:11, fontWeight:700 }}>View all</button>
            </div>
            {[
              { icon:"store", title:"New shop registered", desc:"Karol Bagh FPS #118", time:"12 min ago" },
              { icon:"users", title:"User verification", desc:"28 new users verified", time:"35 min ago" },
              { icon:"calOff", title:"Holiday added", desc:"Eid al-Adha · 30 June", time:"1 hr ago" },
              { icon:"box", title:"Low stock alert", desc:"Sugar · Rohini Sector 7", time:"2 hrs ago" },
            ].map((item,i)=>(
              <div key={i} style={{
                display:"flex", gap:10, padding:"13px 18px",
                borderBottom: i<3?`1px solid ${T.line}`:"none",
              }}>
                <div style={{
                  width:30, height:30, borderRadius:8, background:T.bg,
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                }}>
                  <Icon name={item.icon} size={14} color={T.teal} />
                </div>
                <div>
                  <p style={{ fontSize:11, fontWeight:700, margin:"0 0 2px", color:T.ink }}>{item.title}</p>
                  <p style={{ fontSize:10, color:T.muted, margin:"0 0 2px" }}>{item.desc}</p>
                  <p style={{ fontSize:9, color:"#b0bac8", margin:0 }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shop performance table */}
        <div style={{ background:T.white, border:`1px solid ${T.line}`, borderRadius:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 20px", borderBottom:`1px solid ${T.line}`, flexWrap:"wrap", gap:10 }}>
            <div>
              <h3 style={{ fontSize:14, fontWeight:700, margin:0, color:T.ink }}>Shop performance</h3>
              <p style={{ fontSize:10, color:T.muted, margin:"3px 0 0" }}>Highest volume shops today</p>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:7, border:`1px solid ${T.line}`, borderRadius:8, padding:"7px 10px", background:T.bg }}>
              <Icon name="sliders" size={13} color={T.muted} />
              <input value={shopSearch} onChange={e=>setShopSearch(e.target.value)}
                placeholder="Search shops…" aria-label="Search shops"
                style={{ border:"none", background:"transparent", fontSize:11, color:T.ink, outline:"none", width:150 }} />
            </div>
          </div>
          <div style={{ overflowX:"auto" }}>
            <div style={{
              display:"grid", minWidth:680,
              gridTemplateColumns:"1.6fr 1.2fr 0.7fr 0.7fr 0.7fr 0.7fr",
              background:T.bg, padding:"9px 20px",
              fontSize:8.5, fontWeight:800, letterSpacing:"0.5px", color:T.muted,
            }}>
              {["SHOP","DISTRICT","BOOKINGS","COMPLETED","RATE","STATUS"].map(h=><span key={h}>{h}</span>)}
            </div>
            {shopRows.map((row,i)=>(
              <div key={i} style={{
                display:"grid", minWidth:680,
                gridTemplateColumns:"1.6fr 1.2fr 0.7fr 0.7fr 0.7fr 0.7fr",
                padding:"13px 20px", borderTop:`1px solid ${T.line}`,
                alignItems:"center", fontSize:12,
              }}>
                <span style={{ display:"flex", alignItems:"center", gap:9 }}>
                  <div style={{ width:30, height:30, borderRadius:7, background:T.tealLight, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Icon name="store" size={14} color={T.teal} />
                  </div>
                  <strong style={{ color:T.ink }}>{row[0]}</strong>
                </span>
                <span style={{ color:T.slate }}>{row[1]}</span>
                <span style={{ color:T.slate }}>{row[2]}</span>
                <span style={{ color:T.slate }}>{row[3]}</span>
                <span style={{ fontWeight:700, color:T.ink }}>{row[4]}</span>
                <StatusBadge status="Active" />
              </div>
            ))}
            {shopRows.length===0 && (
              <div style={{ padding:"28px", textAlign:"center", color:T.muted, fontSize:13 }}>No shops match your search.</div>
            )}
          </div>
        </div>
      </div>
    </PortalShell>
  );
};

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function SmartRation() {
  const [role, setRole] = useState("citizen");
  const [view, setView] = useState("home");
  const [lang, setLang] = useState("en");
  const [toast, setToast] = useState(null);
  const [booking, setBooking] = useState(null);
  const [notifCount, setNotifCount] = useState(3);
  const t = i18n[lang] || i18n.en;
  const toastTimerRef = useRef(null);

  const showToast = useCallback((msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }, []);

  // Reset view when role changes
  useEffect(() => { setView("home"); }, [role]);

  const ctx = { role, setRole, view, setView, lang, setLang, t, showToast, booking, setBooking, notifCount, setNotifCount };

  return (
    <AppCtx.Provider value={ctx}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { font-family: 'Inter', -apple-system, sans-serif; font-size: 14px; background: linear-gradient(180deg, #f7fbfd 0%, #eef4f9 100%); color: ${T.ink}; }
        body { min-height: 100vh; }
        body::before {
          content: '';
          position: fixed;
          inset: -20% -10% auto;
          height: 40vh;
          pointer-events: none;
          background: radial-gradient(circle at 20% 20%, rgba(20,148,142,0.10), transparent 28%), radial-gradient(circle at 80% 10%, rgba(29,78,216,0.08), transparent 24%);
          filter: blur(18px);
          animation: driftGlow 16s ease-in-out infinite alternate;
          z-index: -1;
        }
        #root { min-height: 100vh; background: radial-gradient(circle at top, rgba(20,148,142,0.07), transparent 26%), radial-gradient(circle at 80% 6%, rgba(29,78,216,0.05), transparent 20%); }
        button { font-family: inherit; }
        input, select { font-family: inherit; }
        :focus-visible { outline: 2px solid ${T.teal}; outline-offset: 2px; }
        .app-shell { animation: pageEnter 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        .app-main { animation: contentEnter 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        .premium-topbar {
          box-shadow: 0 10px 28px rgba(15,23,42,0.04);
          animation: topbarDrop 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .premium-sidebar {
          box-shadow: 18px 0 40px rgba(2,6,23,0.12);
        }
        .premium-surface {
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }
        .premium-surface:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(15,23,42,0.10);
          border-color: rgba(20,148,142,0.20);
        }
        .premium-button {
          transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
        }
        .premium-button:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 16px 34px rgba(15,23,42,0.18) !important;
          filter: saturate(1.04);
        }
        .premium-chip {
          transition: transform 160ms ease, background 160ms ease, box-shadow 160ms ease;
        }
        .premium-chip:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,0.18) !important;
          box-shadow: 0 12px 24px rgba(15,23,42,0.08);
        }
        .hero-orb {
          animation: floatOrb 8s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-color: ${T.line}; }
          50% { background-color: #f1f5f9; }
          100% { background-color: ${T.line}; }
        }
        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes contentEnter {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes topbarDrop {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(18px) scale(0.985); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes driftGlow {
          0% { transform: translate3d(-1%, 0, 0) scale(1); }
          100% { transform: translate3d(1.5%, 3%, 0) scale(1.04); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -10px, 0) scale(1.02); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 12px 28px rgba(8,15,35,0.12); }
          50% { box-shadow: 0 18px 36px rgba(8,15,35,0.18); }
        }
        @keyframes scan-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
        }
        @media (max-width: 900px) {
          .citizen-sidebar { transform: none !important; }
        }
      `}</style>
      {role === "citizen"     && <CitizenApp />}
      {role === "shopkeeper"  && <ShopkeeperApp />}
      {role === "admin"       && <AdminApp />}
      <Toast toast={toast} />
    </AppCtx.Provider>
  );
}
