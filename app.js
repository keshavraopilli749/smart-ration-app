// main.jsx
import React2 from "react";
import { createRoot } from "react-dom/client";

// ../SmartRation.jsx
import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
var T = {
  teal: "#0B6E6A",
  tealLight: "#E6F4F3",
  tealMid: "#14948E",
  tealDark: "#085450",
  blue: "#1D4ED8",
  blueLight: "#EFF6FF",
  green: "#15803D",
  greenLight: "#F0FDF4",
  amber: "#B45309",
  amberLight: "#FFFBEB",
  red: "#B91C1C",
  redLight: "#FEF2F2",
  purple: "#6D28D9",
  purpleLight: "#F5F3FF",
  ink: "#0F172A",
  slate: "#475569",
  muted: "#94A3B8",
  line: "#E2E8F0",
  bg: "#F8FAFC",
  white: "#FFFFFF"
};
var i18n = {
  en: {
    appName: "Smart Ration",
    tagline: "Digital PDS Service",
    home: "Home",
    bookSlot: "Book a slot",
    myBooking: "My booking",
    notifications: "Notifications",
    profile: "Profile",
    goodMorning: "Good morning",
    goodAfternoon: "Good afternoon",
    goodEvening: "Good evening",
    rationReady: "Your monthly ration is ready",
    rationReadyDesc: "June 2026 allocation is available at your linked shop.",
    collectBefore: "Collect before",
    atShop: "At",
    atAGlance: "At a glance",
    refresh: "Refresh",
    rationStatus: "Ration status",
    readyToCollect: "Ready to collect",
    stockAvailable: "Stock is available",
    nextBooking: "Next booking",
    noSlotBooked: "No slot booked",
    bookNow: "Book now",
    familyMembers: "Family members",
    skipQueue: "Skip the queue. Book your slot.",
    skipQueueDesc: "Choose a convenient time and collect your ration without waiting.",
    recentNotifications: "Recent notifications",
    quickActions: "Quick actions",
    viewDigitalToken: "View digital token",
    showAtShop: "Show at your ration shop",
    rationCardDetails: "Ration card details",
    viewFamily: "View family information",
    helpSupport: "Help & support",
    helpline: "Helpline: 1800-111-155",
    needHelp: "Need help?",
    bookCollection: "Book a collection slot",
    bookCollectionDesc: "Select your shop, date and a convenient time.",
    chooseShop: "Choose shop",
    selectSlot: "Select slot",
    confirm: "Confirm",
    state: "State",
    district: "District",
    rationShop: "Ration shop",
    linkedShop: "Linked shop",
    kmAway: "km away",
    continueBtn: "Continue",
    back: "Back",
    editSlot: "Edit slot",
    chooseDate: "Choose a date",
    availableSlots: "Available time slots",
    available: "Available",
    fillingFast: "Filling fast",
    slotFull: "Full",
    slotsLeft: "slots left",
    reviewConfirm: "Review and confirm",
    reviewDesc: "Please check the details before confirming.",
    confirmBooking: "Confirm booking",
    shopLabel: "Ration shop",
    dateLabel: "Date",
    timeLabel: "Time",
    cardHolder: "Card holder",
    rationCard: "Ration card",
    slotReserved: "Your slot is reserved for 10 minutes.",
    arriveEarly: "Please arrive 5 minutes early with your ration card.",
    myBookingTitle: "Your digital token",
    showQR: "Show this QR code when you arrive at the ration shop.",
    bookingId: "Booking ID",
    verifiedToken: "Verified digital token",
    downloadToken: "Download token",
    reschedule: "Reschedule",
    cancelBooking: "Cancel booking",
    arriveNote: "Arrive 5 minutes early",
    slotHeld: "Your slot is held for 15 minutes after scheduled time.",
    noBooking: "No upcoming booking",
    noBookingDesc: "Book a collection slot to skip the queue.",
    confirmed: "Confirmed",
    updatesTitle: "Notifications",
    updatesDesc: "Important updates about your ration and bookings.",
    all: "All",
    unread: "Unread",
    markAllRead: "Mark all as read",
    accountTitle: "My profile",
    accountDesc: "Manage your personal and ration card details.",
    verifiedHolder: "Verified card holder",
    mobile: "Mobile number",
    address: "Address",
    language: "Language",
    english: "English",
    hindi: "Hindi",
    familyCard: "Family members",
    membersLinked: "members linked",
    familyHead: "Family head",
    spouse: "Spouse",
    son: "Son",
    daughter: "Daughter",
    helpSupportBtn: "Help & support",
    languageBtn: "Language",
    logout: "Log out",
    editProfile: "Edit profile",
    viewAs: "View as",
    citizen: "Citizen",
    shopkeeper: "Shopkeeper",
    administrator: "Administrator"
  },
  hi: {
    appName: "\u0938\u094D\u092E\u093E\u0930\u094D\u091F \u0930\u093E\u0936\u0928",
    tagline: "\u0921\u093F\u091C\u093F\u091F\u0932 PDS \u0938\u0947\u0935\u093E",
    home: "\u0939\u094B\u092E",
    bookSlot: "\u0938\u094D\u0932\u0949\u091F \u092C\u0941\u0915 \u0915\u0930\u0947\u0902",
    myBooking: "\u092E\u0947\u0930\u0940 \u092C\u0941\u0915\u093F\u0902\u0917",
    notifications: "\u0938\u0942\u091A\u0928\u093E\u090F\u0902",
    profile: "\u092A\u094D\u0930\u094B\u092B\u093C\u093E\u0907\u0932",
    goodMorning: "\u0938\u0941\u092A\u094D\u0930\u092D\u093E\u0924",
    goodAfternoon: "\u0928\u092E\u0938\u094D\u0915\u093E\u0930",
    goodEvening: "\u0936\u0941\u092D \u0938\u0902\u0927\u094D\u092F\u093E",
    rationReady: "\u0906\u092A\u0915\u093E \u092E\u093E\u0938\u093F\u0915 \u0930\u093E\u0936\u0928 \u0924\u0948\u092F\u093E\u0930 \u0939\u0948",
    rationReadyDesc: "\u091C\u0942\u0928 2026 \u0915\u093E \u0906\u0935\u0902\u091F\u0928 \u0906\u092A\u0915\u0940 \u0932\u093F\u0902\u0915\u094D\u0921 \u0926\u0941\u0915\u093E\u0928 \u092A\u0930 \u0909\u092A\u0932\u092C\u094D\u0927 \u0939\u0948\u0964",
    collectBefore: "\u092A\u0939\u0932\u0947 \u0932\u0947\u0902",
    atShop: "\u0926\u0941\u0915\u093E\u0928 \u092A\u0930",
    atAGlance: "\u090F\u0915 \u0928\u091C\u093C\u0930 \u092E\u0947\u0902",
    refresh: "\u0930\u0940\u092B\u094D\u0930\u0947\u0936",
    rationStatus: "\u0930\u093E\u0936\u0928 \u0938\u094D\u0925\u093F\u0924\u093F",
    readyToCollect: "\u0938\u0902\u0917\u094D\u0930\u0939 \u0915\u0947 \u0932\u093F\u090F \u0924\u0948\u092F\u093E\u0930",
    stockAvailable: "\u0938\u094D\u091F\u0949\u0915 \u0909\u092A\u0932\u092C\u094D\u0927 \u0939\u0948",
    nextBooking: "\u0905\u0917\u0932\u0940 \u092C\u0941\u0915\u093F\u0902\u0917",
    noSlotBooked: "\u0915\u094B\u0908 \u0938\u094D\u0932\u0949\u091F \u092C\u0941\u0915 \u0928\u0939\u0940\u0902",
    bookNow: "\u0905\u092D\u0940 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902",
    familyMembers: "\u092A\u0930\u093F\u0935\u093E\u0930 \u0915\u0947 \u0938\u0926\u0938\u094D\u092F",
    skipQueue: "\u0915\u0924\u093E\u0930 \u0938\u0947 \u092C\u091A\u0947\u0902\u0964 \u0905\u092A\u0928\u093E \u0938\u094D\u0932\u0949\u091F \u092C\u0941\u0915 \u0915\u0930\u0947\u0902\u0964",
    skipQueueDesc: "\u0938\u0941\u0935\u093F\u0927\u093E\u091C\u0928\u0915 \u0938\u092E\u092F \u091A\u0941\u0928\u0947\u0902 \u0914\u0930 \u092C\u093F\u0928\u093E \u092A\u094D\u0930\u0924\u0940\u0915\u094D\u0937\u093E \u0915\u093F\u090F \u0930\u093E\u0936\u0928 \u0932\u0947\u0902\u0964",
    recentNotifications: "\u0939\u093E\u0932 \u0915\u0940 \u0938\u0942\u091A\u0928\u093E\u090F\u0902",
    quickActions: "\u0924\u094D\u0935\u0930\u093F\u0924 \u0915\u093E\u0930\u094D\u092F",
    viewDigitalToken: "\u0921\u093F\u091C\u093F\u091F\u0932 \u091F\u094B\u0915\u0928 \u0926\u0947\u0916\u0947\u0902",
    showAtShop: "\u0926\u0941\u0915\u093E\u0928 \u092A\u0930 \u0926\u093F\u0916\u093E\u090F\u0902",
    rationCardDetails: "\u0930\u093E\u0936\u0928 \u0915\u093E\u0930\u094D\u0921 \u0935\u093F\u0935\u0930\u0923",
    viewFamily: "\u092A\u0930\u093F\u0935\u093E\u0930 \u0915\u0940 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0926\u0947\u0916\u0947\u0902",
    helpSupport: "\u0938\u0939\u093E\u092F\u0924\u093E",
    helpline: "\u0939\u0947\u0932\u094D\u092A\u0932\u093E\u0907\u0928: 1800-111-155",
    needHelp: "\u092E\u0926\u0926 \u091A\u093E\u0939\u093F\u090F?",
    bookCollection: "\u0938\u0902\u0917\u094D\u0930\u0939 \u0938\u094D\u0932\u0949\u091F \u092C\u0941\u0915 \u0915\u0930\u0947\u0902",
    bookCollectionDesc: "\u0905\u092A\u0928\u0940 \u0926\u0941\u0915\u093E\u0928, \u0924\u093E\u0930\u0940\u0916 \u0914\u0930 \u0938\u092E\u092F \u091A\u0941\u0928\u0947\u0902\u0964",
    chooseShop: "\u0926\u0941\u0915\u093E\u0928 \u091A\u0941\u0928\u0947\u0902",
    selectSlot: "\u0938\u094D\u0932\u0949\u091F \u091A\u0941\u0928\u0947\u0902",
    confirm: "\u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0947\u0902",
    state: "\u0930\u093E\u091C\u094D\u092F",
    district: "\u091C\u093F\u0932\u093E",
    rationShop: "\u0930\u093E\u0936\u0928 \u0915\u0940 \u0926\u0941\u0915\u093E\u0928",
    linkedShop: "\u0932\u093F\u0902\u0915\u094D\u0921 \u0926\u0941\u0915\u093E\u0928",
    kmAway: "\u0915\u093F\u092E\u0940 \u0926\u0942\u0930",
    continueBtn: "\u091C\u093E\u0930\u0940 \u0930\u0916\u0947\u0902",
    back: "\u0935\u093E\u092A\u0938",
    editSlot: "\u0938\u094D\u0932\u0949\u091F \u092C\u0926\u0932\u0947\u0902",
    chooseDate: "\u0924\u093E\u0930\u0940\u0916 \u091A\u0941\u0928\u0947\u0902",
    availableSlots: "\u0909\u092A\u0932\u092C\u094D\u0927 \u0938\u092E\u092F \u0938\u094D\u0932\u0949\u091F",
    available: "\u0909\u092A\u0932\u092C\u094D\u0927",
    fillingFast: "\u091C\u0932\u094D\u0926\u0940 \u092D\u0930 \u0930\u0939\u093E \u0939\u0948",
    slotFull: "\u092D\u0930\u093E \u0939\u0941\u0906",
    slotsLeft: "\u0938\u094D\u0932\u0949\u091F \u092C\u091A\u0947",
    reviewConfirm: "\u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0914\u0930 \u092A\u0941\u0937\u094D\u091F\u093F",
    reviewDesc: "\u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0935\u093F\u0935\u0930\u0923 \u091C\u093E\u0902\u091A\u0947\u0902\u0964",
    confirmBooking: "\u092C\u0941\u0915\u093F\u0902\u0917 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0947\u0902",
    shopLabel: "\u0930\u093E\u0936\u0928 \u0915\u0940 \u0926\u0941\u0915\u093E\u0928",
    dateLabel: "\u0924\u093E\u0930\u0940\u0916",
    timeLabel: "\u0938\u092E\u092F",
    cardHolder: "\u0915\u093E\u0930\u094D\u0921\u0927\u093E\u0930\u0915",
    rationCard: "\u0930\u093E\u0936\u0928 \u0915\u093E\u0930\u094D\u0921",
    slotReserved: "\u0906\u092A\u0915\u093E \u0938\u094D\u0932\u0949\u091F 10 \u092E\u093F\u0928\u091F \u0915\u0947 \u0932\u093F\u090F \u0906\u0930\u0915\u094D\u0937\u093F\u0924 \u0939\u0948\u0964",
    arriveEarly: "\u0915\u0943\u092A\u092F\u093E 5 \u092E\u093F\u0928\u091F \u092A\u0939\u0932\u0947 \u0930\u093E\u0936\u0928 \u0915\u093E\u0930\u094D\u0921 \u0932\u0947\u0915\u0930 \u0906\u090F\u0902\u0964",
    myBookingTitle: "\u0906\u092A\u0915\u093E \u0921\u093F\u091C\u093F\u091F\u0932 \u091F\u094B\u0915\u0928",
    showQR: "\u0930\u093E\u0936\u0928 \u0915\u0940 \u0926\u0941\u0915\u093E\u0928 \u092A\u0930 \u092F\u0939 QR \u0915\u094B\u0921 \u0926\u093F\u0916\u093E\u090F\u0902\u0964",
    bookingId: "\u092C\u0941\u0915\u093F\u0902\u0917 ID",
    verifiedToken: "\u0938\u0924\u094D\u092F\u093E\u092A\u093F\u0924 \u0921\u093F\u091C\u093F\u091F\u0932 \u091F\u094B\u0915\u0928",
    downloadToken: "\u091F\u094B\u0915\u0928 \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
    reschedule: "\u092A\u0941\u0928\u0930\u094D\u0928\u093F\u0930\u094D\u0927\u093E\u0930\u093F\u0924 \u0915\u0930\u0947\u0902",
    cancelBooking: "\u092C\u0941\u0915\u093F\u0902\u0917 \u0930\u0926\u094D\u0926 \u0915\u0930\u0947\u0902",
    arriveNote: "5 \u092E\u093F\u0928\u091F \u092A\u0939\u0932\u0947 \u092A\u0939\u0941\u0902\u091A\u0947\u0902",
    slotHeld: "\u0938\u094D\u0932\u0949\u091F \u0928\u093F\u0930\u094D\u0927\u093E\u0930\u093F\u0924 \u0938\u092E\u092F \u0915\u0947 15 \u092E\u093F\u0928\u091F \u092C\u093E\u0926 \u0924\u0915 \u0930\u0939\u0924\u093E \u0939\u0948\u0964",
    noBooking: "\u0915\u094B\u0908 \u0906\u0917\u093E\u092E\u0940 \u092C\u0941\u0915\u093F\u0902\u0917 \u0928\u0939\u0940\u0902",
    noBookingDesc: "\u0915\u0924\u093E\u0930 \u0938\u0947 \u092C\u091A\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u094D\u0932\u0949\u091F \u092C\u0941\u0915 \u0915\u0930\u0947\u0902\u0964",
    confirmed: "\u092A\u0941\u0937\u094D\u091F\u093F \u0939\u094B \u0917\u0908",
    updatesTitle: "\u0938\u0942\u091A\u0928\u093E\u090F\u0902",
    updatesDesc: "\u0930\u093E\u0936\u0928 \u0914\u0930 \u092C\u0941\u0915\u093F\u0902\u0917 \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u092E\u0939\u0924\u094D\u0935\u092A\u0942\u0930\u094D\u0923 \u0905\u092A\u0921\u0947\u091F\u0964",
    all: "\u0938\u092D\u0940",
    unread: "\u0905\u092A\u0920\u093F\u0924",
    markAllRead: "\u0938\u092D\u0940 \u092A\u0922\u093C\u093E \u0939\u0941\u0906 \u092E\u093E\u0930\u094D\u0915 \u0915\u0930\u0947\u0902",
    accountTitle: "\u092E\u0947\u0930\u0940 \u092A\u094D\u0930\u094B\u092B\u093C\u093E\u0907\u0932",
    accountDesc: "\u0905\u092A\u0928\u0940 \u0935\u094D\u092F\u0915\u094D\u0924\u093F\u0917\u0924 \u0914\u0930 \u0930\u093E\u0936\u0928 \u0915\u093E\u0930\u094D\u0921 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u092A\u094D\u0930\u092C\u0902\u0927\u093F\u0924 \u0915\u0930\u0947\u0902\u0964",
    verifiedHolder: "\u0938\u0924\u094D\u092F\u093E\u092A\u093F\u0924 \u0915\u093E\u0930\u094D\u0921\u0927\u093E\u0930\u0915",
    mobile: "\u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930",
    address: "\u092A\u0924\u093E",
    language: "\u092D\u093E\u0937\u093E",
    english: "English",
    hindi: "\u0939\u093F\u0928\u094D\u0926\u0940",
    familyCard: "\u092A\u0930\u093F\u0935\u093E\u0930 \u0915\u0947 \u0938\u0926\u0938\u094D\u092F",
    membersLinked: "\u0938\u0926\u0938\u094D\u092F \u091C\u0941\u0921\u093C\u0947 \u0939\u0941\u090F",
    familyHead: "\u092A\u0930\u093F\u0935\u093E\u0930 \u0915\u0947 \u092E\u0941\u0916\u093F\u092F\u093E",
    spouse: "\u091C\u0940\u0935\u0928\u0938\u093E\u0925\u0940",
    son: "\u092A\u0941\u0924\u094D\u0930",
    daughter: "\u092A\u0941\u0924\u094D\u0930\u0940",
    helpSupportBtn: "\u0938\u0939\u093E\u092F\u0924\u093E",
    languageBtn: "\u092D\u093E\u0937\u093E",
    logout: "\u0932\u0949\u0917 \u0906\u0909\u091F",
    editProfile: "\u092A\u094D\u0930\u094B\u092B\u093C\u093E\u0907\u0932 \u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930\u0947\u0902",
    viewAs: "\u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0926\u0947\u0916\u0947\u0902",
    citizen: "\u0928\u093E\u0917\u0930\u093F\u0915",
    shopkeeper: "\u0926\u0941\u0915\u093E\u0928\u0926\u093E\u0930",
    administrator: "\u092A\u094D\u0930\u0936\u093E\u0938\u0915"
  }
};
var extendLocale = (overrides) => ({ ...i18n.en, ...overrides });
i18n.bn = extendLocale({
  appName: "\u09B8\u09CD\u09AE\u09BE\u09B0\u09CD\u099F \u09B0\u09C7\u09B6\u09A8",
  tagline: "\u09A1\u09BF\u099C\u09BF\u099F\u09BE\u09B2 \u09AA\u09BF\u09A1\u09BF\u098F\u09B8 \u09AA\u09B0\u09BF\u09B7\u09C7\u09AC\u09BE",
  home: "\u09B9\u09CB\u09AE",
  bookSlot: "\u09B8\u09CD\u09B2\u099F \u09AC\u09C1\u0995 \u0995\u09B0\u09C1\u09A8",
  myBooking: "\u0986\u09AE\u09BE\u09B0 \u09AC\u09C1\u0995\u09BF\u0982",
  notifications: "\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8",
  profile: "\u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2",
  goodMorning: "\u09B8\u09C1\u09AA\u09CD\u09B0\u09AD\u09BE\u09A4",
  goodAfternoon: "\u09B6\u09C1\u09AD \u0985\u09AA\u09B0\u09BE\u09B9\u09CD\u09A3",
  goodEvening: "\u09B6\u09C1\u09AD \u09B8\u09A8\u09CD\u09A7\u09CD\u09AF\u09BE",
  atAGlance: "\u098F\u0995 \u09A8\u099C\u09B0\u09C7",
  refresh: "\u09B0\u09BF\u09AB\u09CD\u09B0\u09C7\u09B6",
  skipQueue: "\u09B8\u09BE\u09B0\u09BF \u098F\u09A1\u09BC\u09BF\u09AF\u09BC\u09C7 \u099A\u09B2\u09C1\u09A8\u0964 \u0986\u09AA\u09A8\u09BE\u09B0 \u09B8\u09CD\u09B2\u099F \u09AC\u09C1\u0995 \u0995\u09B0\u09C1\u09A8\u0964",
  skipQueueDesc: "\u09B8\u09C1\u09AC\u09BF\u09A7\u09BE\u099C\u09A8\u0995 \u09B8\u09AE\u09AF\u09BC \u09AC\u09C7\u099B\u09C7 \u09A8\u09BF\u09A8 \u098F\u09AC\u0982 \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE \u09A8\u09BE \u0995\u09B0\u09C7 \u09B0\u09C7\u09B6\u09A8 \u09A8\u09BF\u09A8\u0964",
  recentNotifications: "\u09B8\u09BE\u09AE\u09CD\u09AA\u09CD\u09B0\u09A4\u09BF\u0995 \u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8",
  quickActions: "\u09A6\u09CD\u09B0\u09C1\u09A4 \u0995\u09BE\u099C",
  bookCollection: "\u09B8\u0982\u0997\u09CD\u09B0\u09B9 \u09B8\u09CD\u09B2\u099F \u09AC\u09C1\u0995 \u0995\u09B0\u09C1\u09A8",
  bookCollectionDesc: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09A6\u09CB\u0995\u09BE\u09A8, \u09A4\u09BE\u09B0\u09BF\u0996 \u098F\u09AC\u0982 \u09B8\u09C1\u09AC\u09BF\u09A7\u09BE\u099C\u09A8\u0995 \u09B8\u09AE\u09AF\u09BC \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8\u0964",
  chooseShop: "\u09A6\u09CB\u0995\u09BE\u09A8 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8",
  selectSlot: "\u09B8\u09CD\u09B2\u099F \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8",
  confirm: "\u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09C1\u09A8",
  continueBtn: "\u099A\u09BE\u09B2\u09BF\u09AF\u09BC\u09C7 \u09AF\u09BE\u09A8",
  back: "\u09AB\u09BF\u09B0\u09C7 \u09AF\u09BE\u09A8",
  editSlot: "\u09B8\u09CD\u09B2\u099F \u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09A8\u09BE",
  chooseDate: "\u09A4\u09BE\u09B0\u09BF\u0996 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8",
  availableSlots: "\u0989\u09AA\u09B2\u09AC\u09CD\u09A7 \u09B8\u09AE\u09AF\u09BC \u09B8\u09CD\u09B2\u099F",
  reviewConfirm: "\u09AA\u09B0\u09CD\u09AF\u09BE\u09B2\u09CB\u099A\u09A8\u09BE \u0993 \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09C1\u09A8",
  reviewDesc: "\u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09BE\u09B0 \u0986\u0997\u09C7 \u09AC\u09BF\u09AC\u09B0\u09A3 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C1\u09A8\u0964",
  confirmBooking: "\u09AC\u09C1\u0995\u09BF\u0982 \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09C1\u09A8",
  noBooking: "\u0995\u09CB\u09A8\u09CB \u0986\u09B8\u09A8\u09CD\u09A8 \u09AC\u09C1\u0995\u09BF\u0982 \u09A8\u09C7\u0987",
  noBookingDesc: "\u09B8\u09BE\u09B0\u09BF \u098F\u09A1\u09BC\u09BE\u09A4\u09C7 \u098F\u0995\u099F\u09BF \u09B8\u0982\u0997\u09CD\u09B0\u09B9 \u09B8\u09CD\u09B2\u099F \u09AC\u09C1\u0995 \u0995\u09B0\u09C1\u09A8\u0964",
  updatesTitle: "\u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8",
  updatesDesc: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09B0\u09C7\u09B6\u09A8 \u098F\u09AC\u0982 \u09AC\u09C1\u0995\u09BF\u0982 \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09C7 \u0997\u09C1\u09B0\u09C1\u09A4\u09CD\u09AC\u09AA\u09C2\u09B0\u09CD\u09A3 \u0986\u09AA\u09A1\u09C7\u099F\u0964",
  accountTitle: "\u0986\u09AE\u09BE\u09B0 \u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2",
  accountDesc: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF\u0997\u09A4 \u098F\u09AC\u0982 \u09B0\u09C7\u09B6\u09A8 \u0995\u09BE\u09B0\u09CD\u09A1\u09C7\u09B0 \u09AC\u09BF\u09AC\u09B0\u09A3 \u09AA\u09B0\u09BF\u099A\u09BE\u09B2\u09A8\u09BE \u0995\u09B0\u09C1\u09A8\u0964",
  viewAs: "\u09A6\u09C7\u0996\u09C1\u09A8",
  languageBtn: "\u09AD\u09BE\u09B7\u09BE",
  citizen: "\u09A8\u09BE\u0997\u09B0\u09BF\u0995",
  shopkeeper: "\u09A6\u09CB\u0995\u09BE\u09A8\u09A6\u09BE\u09B0",
  administrator: "\u09AA\u09CD\u09B0\u09B6\u09BE\u09B8\u0995",
  helpSupport: "\u09B8\u09B9\u09BE\u09AF\u09BC\u09A4\u09BE",
  helpSupportBtn: "\u09B8\u09B9\u09BE\u09AF\u09BC\u09A4\u09BE",
  needHelp: "\u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF \u09A6\u09B0\u0995\u09BE\u09B0?"
});
i18n.ta = extendLocale({
  appName: "\u0BB8\u0BCD\u0BAE\u0BBE\u0BB0\u0BCD\u0B9F\u0BCD \u0BB0\u0BC7\u0BB7\u0BA9\u0BCD",
  tagline: "\u0B9F\u0BBF\u0B9C\u0BBF\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD PDS \u0B9A\u0BC7\u0BB5\u0BC8",
  home: "\u0BAE\u0BC1\u0B95\u0BAA\u0BCD\u0BAA\u0BC1",
  bookSlot: "\u0BB8\u0BCD\u0BB2\u0BBE\u0B9F\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1",
  myBooking: "\u0B8E\u0BA9\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1",
  notifications: "\u0B85\u0BB1\u0BBF\u0BB5\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD",
  profile: "\u0B9A\u0BC1\u0BAF\u0BB5\u0BBF\u0BB5\u0BB0\u0BAE\u0BCD",
  goodMorning: "\u0B95\u0BBE\u0BB2\u0BC8 \u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
  goodAfternoon: "\u0BAE\u0BA4\u0BBF\u0BAF \u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
  goodEvening: "\u0BAE\u0BBE\u0BB2\u0BC8 \u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
  atAGlance: "\u0B92\u0BB0\u0BC1 \u0BAA\u0BBE\u0BB0\u0BCD\u0BB5\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD",
  refresh: "\u0BAA\u0BC1\u0BA4\u0BC1\u0BAA\u0BCD\u0BAA\u0BBF\u0B95\u0BCD\u0B95",
  skipQueue: "\u0BB5\u0BB0\u0BBF\u0B9A\u0BC8\u0BAF\u0BC8\u0BA4\u0BCD \u0BA4\u0BB5\u0BBF\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD. \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BB8\u0BCD\u0BB2\u0BBE\u0B9F\u0BCD\u0B9F\u0BC8 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
  skipQueueDesc: "\u0B9A\u0BCC\u0B95\u0BB0\u0BBF\u0BAF\u0BAE\u0BBE\u0BA9 \u0BA8\u0BC7\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0B95\u0BBE\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0BAE\u0BB2\u0BCD \u0BB0\u0BC7\u0BB7\u0BA9\u0BCD \u0BAA\u0BC6\u0BB1\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
  recentNotifications: "\u0B9A\u0BAE\u0BC0\u0BAA\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF \u0B85\u0BB1\u0BBF\u0BB5\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD",
  quickActions: "\u0BB5\u0BBF\u0BB0\u0BC8\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BB2\u0BCD\u0B95\u0BB3\u0BCD",
  bookCollection: "\u0B9A\u0BC7\u0B95\u0BB0\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1 \u0BB8\u0BCD\u0BB2\u0BBE\u0B9F\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1",
  bookCollectionDesc: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0B9F\u0BC8, \u0BA4\u0BC7\u0BA4\u0BBF \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB5\u0B9A\u0BA4\u0BBF\u0BAF\u0BBE\u0BA9 \u0BA8\u0BC7\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0B95.",
  chooseShop: "\u0B95\u0B9F\u0BC8\u0BAF\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0B95",
  selectSlot: "\u0BB8\u0BCD\u0BB2\u0BBE\u0B9F\u0BCD\u0B9F\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0B95",
  confirm: "\u0B89\u0BB1\u0BC1\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95",
  continueBtn: "\u0BA4\u0BCA\u0B9F\u0BB0\u0BB5\u0BC1\u0BAE\u0BCD",
  back: "\u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BCD\u0BAA",
  editSlot: "\u0BB8\u0BCD\u0BB2\u0BBE\u0B9F\u0BCD\u0B9F\u0BC8 \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0BC1",
  chooseDate: "\u0BA4\u0BC7\u0BA4\u0BBF\u0BAF\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0B95",
  availableSlots: "\u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BA8\u0BC7\u0BB0 \u0BB8\u0BCD\u0BB2\u0BBE\u0B9F\u0BCD\u0B95\u0BB3\u0BCD",
  reviewConfirm: "\u0BAA\u0BB0\u0BBF\u0B9A\u0BC0\u0BB2\u0BBF\u0BA4\u0BCD\u0BA4\u0BC1 \u0B89\u0BB1\u0BC1\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95",
  reviewDesc: "\u0B89\u0BB1\u0BC1\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0BB5\u0BA4\u0BB1\u0BCD\u0B95\u0BC1 \u0BAE\u0BC1\u0BA9\u0BCD \u0BB5\u0BBF\u0BB5\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0B9A\u0BCD \u0B9A\u0BB0\u0BBF\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.",
  confirmBooking: "\u0BAA\u0BA4\u0BBF\u0BB5\u0BC8 \u0B89\u0BB1\u0BC1\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95",
  noBooking: "\u0BB5\u0BB0\u0BB5\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B87\u0BB2\u0BCD\u0BB2\u0BC8",
  noBookingDesc: "\u0BB5\u0BB0\u0BBF\u0B9A\u0BC8\u0BAF\u0BC8\u0BA4\u0BCD \u0BA4\u0BB5\u0BBF\u0BB0\u0BCD\u0B95\u0BCD\u0B95 \u0B92\u0BB0\u0BC1 \u0B9A\u0BC7\u0B95\u0BB0\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1 \u0BB8\u0BCD\u0BB2\u0BBE\u0B9F\u0BCD\u0B9F\u0BC8 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
  updatesTitle: "\u0B85\u0BB1\u0BBF\u0BB5\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD",
  updatesDesc: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BB0\u0BC7\u0BB7\u0BA9\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0BAA\u0BB1\u0BCD\u0BB1\u0BBF\u0BAF \u0BAE\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BAF \u0BAA\u0BC1\u0BA4\u0BC1\u0BAA\u0BCD\u0BAA\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD.",
  accountTitle: "\u0B8E\u0BA9\u0BCD \u0B9A\u0BC1\u0BAF\u0BB5\u0BBF\u0BB5\u0BB0\u0BAE\u0BCD",
  accountDesc: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0BA9\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB0\u0BC7\u0BB7\u0BA9\u0BCD \u0B85\u0B9F\u0BCD\u0B9F\u0BC8 \u0BB5\u0BBF\u0BB5\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0BA8\u0BBF\u0BB0\u0BCD\u0BB5\u0B95\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.",
  viewAs: "\u0BAA\u0BBE\u0BB0\u0BCD\u0BB5\u0BC8",
  languageBtn: "\u0BAE\u0BCA\u0BB4\u0BBF",
  citizen: "\u0B95\u0BC1\u0B9F\u0BBF\u0BAE\u0B95\u0BA9\u0BCD",
  shopkeeper: "\u0B95\u0B9F\u0BC8keeper",
  administrator: "\u0BA8\u0BBF\u0BB0\u0BCD\u0BB5\u0BBE\u0B95\u0BBF",
  helpSupport: "\u0B89\u0BA4\u0BB5\u0BBF",
  helpSupportBtn: "\u0B89\u0BA4\u0BB5\u0BBF",
  needHelp: "\u0B89\u0BA4\u0BB5\u0BBF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BBE?"
});
i18n.te = extendLocale({
  appName: "\u0C38\u0C4D\u0C2E\u0C3E\u0C30\u0C4D\u0C1F\u0C4D \u0C30\u0C47\u0C37\u0C28\u0C4D",
  tagline: "\u0C21\u0C3F\u0C1C\u0C3F\u0C1F\u0C32\u0C4D PDS \u0C38\u0C47\u0C35",
  home: "\u0C39\u0C4B\u0C2E\u0C4D",
  bookSlot: "\u0C38\u0C4D\u0C32\u0C3E\u0C1F\u0C4D \u0C2C\u0C41\u0C15\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  myBooking: "\u0C28\u0C3E \u0C2C\u0C41\u0C15\u0C3F\u0C02\u0C17\u0C4D",
  notifications: "\u0C28\u0C4B\u0C1F\u0C3F\u0C2B\u0C3F\u0C15\u0C47\u0C37\u0C28\u0C4D\u0C32\u0C41",
  profile: "\u0C2A\u0C4D\u0C30\u0C4A\u0C2B\u0C48\u0C32\u0C4D",
  goodMorning: "\u0C36\u0C41\u0C2D\u0C4B\u0C26\u0C2F\u0C02",
  goodAfternoon: "\u0C36\u0C41\u0C2D \u0C2E\u0C26\u0C4D\u0C2F\u0C3E\u0C39\u0C4D\u0C28\u0C02",
  goodEvening: "\u0C36\u0C41\u0C2D \u0C38\u0C3E\u0C2F\u0C02\u0C24\u0C4D\u0C30\u0C02",
  atAGlance: "\u0C12\u0C15 \u0C1A\u0C42\u0C2A\u0C41\u0C32\u0C4B",
  refresh: "\u0C30\u0C3F\u0C2B\u0C4D\u0C30\u0C46\u0C37\u0C4D",
  skipQueue: "\u0C15\u0C4D\u0C2F\u0C42\u0C28\u0C41 \u0C26\u0C3E\u0C1F\u0C02\u0C21\u0C3F. \u0C2E\u0C40 \u0C38\u0C4D\u0C32\u0C3E\u0C1F\u0C4D \u0C2C\u0C41\u0C15\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F.",
  skipQueueDesc: "\u0C38\u0C4C\u0C15\u0C30\u0C4D\u0C2F\u0C2E\u0C48\u0C28 \u0C38\u0C2E\u0C2F\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C41\u0C28\u0C3F \u0C35\u0C47\u0C1A\u0C3F \u0C32\u0C47\u0C15\u0C41\u0C02\u0C21\u0C3E \u0C30\u0C47\u0C37\u0C28\u0C4D \u0C24\u0C40\u0C38\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F.",
  recentNotifications: "\u0C24\u0C3E\u0C1C\u0C3E \u0C28\u0C4B\u0C1F\u0C3F\u0C2B\u0C3F\u0C15\u0C47\u0C37\u0C28\u0C4D\u0C32\u0C41",
  quickActions: "\u0C24\u0C4D\u0C35\u0C30\u0C3F\u0C24 \u0C1A\u0C30\u0C4D\u0C2F\u0C32\u0C41",
  bookCollection: "\u0C38\u0C47\u0C15\u0C30\u0C23 \u0C38\u0C4D\u0C32\u0C3E\u0C1F\u0C4D \u0C2C\u0C41\u0C15\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  bookCollectionDesc: "\u0C2E\u0C40 \u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02, \u0C24\u0C47\u0C26\u0C40 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C38\u0C4C\u0C15\u0C30\u0C4D\u0C2F\u0C2E\u0C48\u0C28 \u0C38\u0C2E\u0C2F\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F.",
  chooseShop: "\u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F",
  selectSlot: "\u0C38\u0C4D\u0C32\u0C3E\u0C1F\u0C4D \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F",
  confirm: "\u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  continueBtn: "\u0C15\u0C4A\u0C28\u0C38\u0C3E\u0C17\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  back: "\u0C35\u0C46\u0C28\u0C41\u0C15\u0C15\u0C41",
  editSlot: "\u0C38\u0C4D\u0C32\u0C3E\u0C1F\u0C4D \u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C02\u0C21\u0C3F",
  chooseDate: "\u0C24\u0C47\u0C26\u0C40 \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F",
  availableSlots: "\u0C05\u0C02\u0C26\u0C41\u0C2C\u0C3E\u0C1F\u0C41\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28 \u0C38\u0C2E\u0C2F \u0C38\u0C4D\u0C32\u0C3E\u0C1F\u0C4D\u0C32\u0C41",
  reviewConfirm: "\u0C2A\u0C30\u0C3F\u0C36\u0C40\u0C32\u0C3F\u0C02\u0C1A\u0C3F \u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  reviewDesc: "\u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C02\u0C1A\u0C47\u0C2E\u0C41\u0C02\u0C26\u0C41 \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C28\u0C41 \u0C24\u0C28\u0C3F\u0C16\u0C40 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F.",
  confirmBooking: "\u0C2C\u0C41\u0C15\u0C3F\u0C02\u0C17\u0C4D\u200C\u0C28\u0C41 \u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  noBooking: "\u0C30\u0C3E\u0C2C\u0C4B\u0C2F\u0C47 \u0C2C\u0C41\u0C15\u0C3F\u0C02\u0C17\u0C4D \u0C32\u0C47\u0C26\u0C41",
  noBookingDesc: "\u0C15\u0C4D\u0C2F\u0C42\u0C28\u0C41 \u0C26\u0C3E\u0C1F\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C12\u0C15 \u0C38\u0C47\u0C15\u0C30\u0C23 \u0C38\u0C4D\u0C32\u0C3E\u0C1F\u0C4D \u0C2C\u0C41\u0C15\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F.",
  updatesTitle: "\u0C28\u0C4B\u0C1F\u0C3F\u0C2B\u0C3F\u0C15\u0C47\u0C37\u0C28\u0C4D\u0C32\u0C41",
  updatesDesc: "\u0C2E\u0C40 \u0C30\u0C47\u0C37\u0C28\u0C4D \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2C\u0C41\u0C15\u0C3F\u0C02\u0C17\u0C4D\u0C38\u0C4D \u0C17\u0C41\u0C30\u0C3F\u0C02\u0C1A\u0C3F \u0C2E\u0C41\u0C16\u0C4D\u0C2F\u0C2E\u0C48\u0C28 \u0C05\u0C2A\u0C4D\u0C21\u0C47\u0C1F\u0C4D\u0C32\u0C41.",
  accountTitle: "\u0C28\u0C3E \u0C2A\u0C4D\u0C30\u0C4A\u0C2B\u0C48\u0C32\u0C4D",
  accountDesc: "\u0C2E\u0C40 \u0C35\u0C4D\u0C2F\u0C15\u0C4D\u0C24\u0C3F\u0C17\u0C24 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C30\u0C47\u0C37\u0C28\u0C4D \u0C15\u0C3E\u0C30\u0C4D\u0C21\u0C41 \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C28\u0C41 \u0C28\u0C3F\u0C30\u0C4D\u0C35\u0C39\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F.",
  viewAs: "\u0C35\u0C40\u0C15\u0C4D\u0C37\u0C23",
  languageBtn: "\u0C2D\u0C3E\u0C37",
  citizen: "\u0C28\u0C3E\u0C17\u0C30\u0C3F\u0C15\u0C41\u0C21\u0C41",
  shopkeeper: "\u0C26\u0C41\u0C15\u0C3E\u0C23\u0C26\u0C3E\u0C30\u0C41",
  administrator: "\u0C05\u0C21\u0C4D\u0C2E\u0C3F\u0C28\u0C3F\u0C38\u0C4D\u0C1F\u0C4D\u0C30\u0C47\u0C1F\u0C30\u0C4D",
  helpSupport: "\u0C38\u0C39\u0C3E\u0C2F\u0C02",
  helpSupportBtn: "\u0C38\u0C39\u0C3E\u0C2F\u0C02",
  needHelp: "\u0C38\u0C39\u0C3E\u0C2F\u0C02 \u0C15\u0C3E\u0C35\u0C3E\u0C32\u0C3E?"
});
i18n.mr = extendLocale({
  appName: "\u0938\u094D\u092E\u093E\u0930\u094D\u091F \u0930\u0947\u0936\u0928",
  tagline: "\u0921\u093F\u091C\u093F\u091F\u0932 PDS \u0938\u0947\u0935\u093E",
  home: "\u0939\u094B\u092E",
  bookSlot: "\u0938\u094D\u0932\u0949\u091F \u092C\u0941\u0915 \u0915\u0930\u093E",
  myBooking: "\u092E\u093E\u091D\u0940 \u092C\u0941\u0915\u093F\u0902\u0917",
  notifications: "\u0938\u0942\u091A\u0928\u093E",
  profile: "\u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932",
  goodMorning: "\u0938\u0941\u092A\u094D\u0930\u092D\u093E\u0924",
  goodAfternoon: "\u0928\u092E\u0938\u094D\u0915\u093E\u0930",
  goodEvening: "\u0936\u0941\u092D \u0938\u0902\u0927\u094D\u092F\u093E",
  atAGlance: "\u090F\u0915\u093E \u0928\u091C\u0930\u0947\u0924",
  refresh: "\u0930\u0940\u092B\u094D\u0930\u0947\u0936",
  skipQueue: "\u0930\u093E\u0902\u0917 \u091F\u093E\u0933\u093E. \u0924\u0941\u092E\u091A\u093E \u0938\u094D\u0932\u0949\u091F \u092C\u0941\u0915 \u0915\u0930\u093E.",
  skipQueueDesc: "\u0938\u094B\u092F\u0940\u091A\u0940 \u0935\u0947\u0933 \u0928\u093F\u0935\u0921\u093E \u0906\u0923\u093F \u0935\u093E\u091F \u0928 \u092A\u093E\u0939\u0924\u093E \u0930\u0947\u0936\u0928 \u0918\u094D\u092F\u093E.",
  recentNotifications: "\u0905\u0932\u0940\u0915\u0921\u0940\u0932 \u0938\u0942\u091A\u0928\u093E",
  quickActions: "\u0924\u094D\u0935\u0930\u093F\u0924 \u0915\u0943\u0924\u0940",
  bookCollection: "\u0938\u0902\u0917\u094D\u0930\u0939 \u0938\u094D\u0932\u0949\u091F \u092C\u0941\u0915 \u0915\u0930\u093E",
  bookCollectionDesc: "\u0924\u0941\u092E\u091A\u0947 \u0926\u0941\u0915\u093E\u0928, \u0924\u093E\u0930\u0940\u0916 \u0906\u0923\u093F \u0938\u094B\u092F\u0940\u091A\u0940 \u0935\u0947\u0933 \u0928\u093F\u0935\u0921\u093E.",
  chooseShop: "\u0926\u0941\u0915\u093E\u0928 \u0928\u093F\u0935\u0921\u093E",
  selectSlot: "\u0938\u094D\u0932\u0949\u091F \u0928\u093F\u0935\u0921\u093E",
  confirm: "\u092A\u0941\u0937\u094D\u091F\u0940 \u0915\u0930\u093E",
  continueBtn: "\u0938\u0941\u0930\u0942 \u0920\u0947\u0935\u093E",
  back: "\u092E\u093E\u0917\u0947",
  editSlot: "\u0938\u094D\u0932\u0949\u091F \u092C\u0926\u0932\u093E",
  chooseDate: "\u0924\u093E\u0930\u0940\u0916 \u0928\u093F\u0935\u0921\u093E",
  availableSlots: "\u0909\u092A\u0932\u092C\u094D\u0927 \u0935\u0947\u0933 \u0938\u094D\u0932\u0949\u091F",
  reviewConfirm: "\u092A\u0941\u0928\u0930\u093E\u0935\u0932\u094B\u0915\u0928 \u0906\u0923\u093F \u092A\u0941\u0937\u094D\u091F\u0940",
  reviewDesc: "\u092A\u0941\u0937\u094D\u091F\u0940 \u0915\u0930\u0923\u094D\u092F\u093E\u092A\u0942\u0930\u094D\u0935\u0940 \u0924\u092A\u0936\u0940\u0932 \u0924\u092A\u093E\u0938\u093E.",
  confirmBooking: "\u092C\u0941\u0915\u093F\u0902\u0917 \u092A\u0941\u0937\u094D\u091F\u0940 \u0915\u0930\u093E",
  noBooking: "\u0915\u094B\u0923\u0924\u0940\u0939\u0940 \u0906\u0917\u093E\u092E\u0940 \u092C\u0941\u0915\u093F\u0902\u0917 \u0928\u093E\u0939\u0940",
  noBookingDesc: "\u0930\u093E\u0902\u0917 \u091F\u093E\u0933\u0923\u094D\u092F\u093E\u0938\u093E\u0920\u0940 \u0938\u0902\u0917\u094D\u0930\u0939 \u0938\u094D\u0932\u0949\u091F \u092C\u0941\u0915 \u0915\u0930\u093E.",
  updatesTitle: "\u0938\u0942\u091A\u0928\u093E",
  updatesDesc: "\u0924\u0941\u092E\u091A\u094D\u092F\u093E \u0930\u0947\u0936\u0928 \u0906\u0923\u093F \u092C\u0941\u0915\u093F\u0902\u0917\u092C\u0926\u094D\u0926\u0932 \u092E\u0939\u0924\u094D\u0924\u094D\u0935\u093E\u091A\u094D\u092F\u093E \u0905\u0926\u094D\u092F\u0924\u0928\u093E\u0902.",
  accountTitle: "\u092E\u093E\u091D\u0947 \u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932",
  accountDesc: "\u0924\u0941\u092E\u091A\u0940 \u0935\u0948\u092F\u0915\u094D\u0924\u093F\u0915 \u0906\u0923\u093F \u0930\u0947\u0936\u0928 \u0915\u093E\u0930\u094D\u0921 \u092E\u093E\u0939\u093F\u0924\u0940 \u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093E\u092A\u093F\u0924 \u0915\u0930\u093E.",
  viewAs: "\u092E\u094D\u0939\u0923\u0942\u0928 \u092A\u0939\u093E",
  languageBtn: "\u092D\u093E\u0937\u093E",
  citizen: "\u0928\u093E\u0917\u0930\u093F\u0915",
  shopkeeper: "\u0926\u0941\u0915\u093E\u0928\u0926\u093E\u0930",
  administrator: "\u092A\u094D\u0930\u0936\u093E\u0938\u0915",
  helpSupport: "\u092E\u0926\u0924",
  helpSupportBtn: "\u092E\u0926\u0924",
  needHelp: "\u092E\u0926\u0924 \u0939\u0935\u0940 \u0906\u0939\u0947?"
});
i18n.gu = extendLocale({
  appName: "\u0AB8\u0ACD\u0AAE\u0ABE\u0AB0\u0ACD\u0A9F \u0AB0\u0AC7\u0AB6\u0AA8",
  tagline: "\u0AA1\u0ABF\u0A9C\u0ABF\u0A9F\u0AB2 PDS \u0AB8\u0AC7\u0AB5\u0ABE",
  home: "\u0AB9\u0ACB\u0AAE",
  bookSlot: "\u0AB8\u0ACD\u0AB2\u0ACB\u0A9F \u0AAC\u0AC1\u0A95 \u0A95\u0AB0\u0ACB",
  myBooking: "\u0AAE\u0ABE\u0AB0\u0AC0 \u0AAC\u0AC1\u0A95\u0ABF\u0A82\u0A97",
  notifications: "\u0AB8\u0AC2\u0A9A\u0AA8\u0ABE\u0A93",
  profile: "\u0AAA\u0ACD\u0AB0\u0ACB\u0AAB\u0ABE\u0A87\u0AB2",
  goodMorning: "\u0AB8\u0AC1\u0AAA\u0ACD\u0AB0\u0AAD\u0ABE\u0AA4",
  goodAfternoon: "\u0AB8\u0AC1\u0AB8\u0A82\u0AA7\u0ACD\u0AAF\u0ABE",
  goodEvening: "\u0AB6\u0AC1\u0AAD \u0AB8\u0ABE\u0A82\u0A9C",
  atAGlance: "\u0A8F\u0A95 \u0AA8\u0A9C\u0AB0\u0AAE\u0ABE\u0A82",
  refresh: "\u0AB0\u0ABF\u0AAB\u0ACD\u0AB0\u0AC7\u0AB6",
  skipQueue: "\u0A95\u0AA4\u0ABE\u0AB0 \u0A9F\u0ABE\u0AB3\u0ACB. \u0AA4\u0AAE\u0ABE\u0AB0\u0ACB \u0AB8\u0ACD\u0AB2\u0ACB\u0A9F \u0AAC\u0AC1\u0A95 \u0A95\u0AB0\u0ACB.",
  skipQueueDesc: "\u0A85\u0AA8\u0AC1\u0A95\u0AC2\u0AB3 \u0AB8\u0AAE\u0AAF \u0AAA\u0AB8\u0A82\u0AA6 \u0A95\u0AB0\u0ACB \u0A85\u0AA8\u0AC7 \u0AB0\u0ABE\u0AB9 \u0A9C\u0ACB\u0AAF\u0ABE \u0AB5\u0ABF\u0AA8\u0ABE \u0AB0\u0AC7\u0AB6\u0AA8 \u0AB2\u0ACB.",
  recentNotifications: "\u0AA4\u0ABE\u0A9C\u0AC7\u0AA4\u0AB0\u0AA8\u0AC0 \u0AB8\u0AC2\u0A9A\u0AA8\u0ABE\u0A93",
  quickActions: "\u0A9D\u0AA1\u0AAA\u0AC0 \u0A95\u0ACD\u0AB0\u0ABF\u0AAF\u0ABE\u0A93",
  bookCollection: "\u0AB8\u0A82\u0A97\u0ACD\u0AB0\u0AB9 \u0AB8\u0ACD\u0AB2\u0ACB\u0A9F \u0AAC\u0AC1\u0A95 \u0A95\u0AB0\u0ACB",
  bookCollectionDesc: "\u0AA4\u0AAE\u0ABE\u0AB0\u0AC1\u0A82 \u0AA6\u0AC1\u0A95\u0ABE\u0AA8, \u0AA4\u0ABE\u0AB0\u0AC0\u0A96 \u0A85\u0AA8\u0AC7 \u0A85\u0AA8\u0AC1\u0A95\u0AC2\u0AB3 \u0AB8\u0AAE\u0AAF \u0AAA\u0AB8\u0A82\u0AA6 \u0A95\u0AB0\u0ACB.",
  chooseShop: "\u0AA6\u0AC1\u0A95\u0ABE\u0AA8 \u0AAA\u0AB8\u0A82\u0AA6 \u0A95\u0AB0\u0ACB",
  selectSlot: "\u0AB8\u0ACD\u0AB2\u0ACB\u0A9F \u0AAA\u0AB8\u0A82\u0AA6 \u0A95\u0AB0\u0ACB",
  confirm: "\u0A96\u0ABE\u0AA4\u0AB0\u0AC0 \u0A95\u0AB0\u0ACB",
  continueBtn: "\u0A9A\u0ABE\u0AB2\u0AC1 \u0AB0\u0ABE\u0A96\u0ACB",
  back: "\u0AAA\u0ABE\u0A9B\u0AB3",
  editSlot: "\u0AB8\u0ACD\u0AB2\u0ACB\u0A9F \u0AAC\u0AA6\u0AB2\u0ACB",
  chooseDate: "\u0AA4\u0ABE\u0AB0\u0AC0\u0A96 \u0AAA\u0AB8\u0A82\u0AA6 \u0A95\u0AB0\u0ACB",
  availableSlots: "\u0A89\u0AAA\u0AB2\u0AAC\u0ACD\u0AA7 \u0AB8\u0AAE\u0AAF \u0AB8\u0ACD\u0AB2\u0ACB\u0A9F",
  reviewConfirm: "\u0AAA\u0AC1\u0AA8\u0A83\u0A9A\u0A95\u0ABE\u0AB8\u0AA3\u0AC0 \u0A85\u0AA8\u0AC7 \u0A96\u0ABE\u0AA4\u0AB0\u0AC0",
  reviewDesc: "\u0A96\u0ABE\u0AA4\u0AB0\u0AC0 \u0A95\u0AB0\u0AA4\u0ABE \u0AAA\u0AB9\u0AC7\u0AB2\u0ABE \u0AB5\u0ABF\u0A97\u0AA4\u0ACB \u0AA4\u0AAA\u0ABE\u0AB8\u0ACB.",
  confirmBooking: "\u0AAC\u0AC1\u0A95\u0ABF\u0A82\u0A97 \u0A96\u0ABE\u0AA4\u0AB0\u0AC0 \u0A95\u0AB0\u0ACB",
  noBooking: "\u0A95\u0ACB\u0A88 \u0A86\u0AB5\u0AA8\u0ABE\u0AB0 \u0AAC\u0AC1\u0A95\u0ABF\u0A82\u0A97 \u0AA8\u0AA5\u0AC0",
  noBookingDesc: "\u0A95\u0AA4\u0ABE\u0AB0 \u0A9F\u0ABE\u0AB3\u0AB5\u0ABE \u0AAE\u0ABE\u0A9F\u0AC7 \u0AB8\u0A82\u0A97\u0ACD\u0AB0\u0AB9 \u0AB8\u0ACD\u0AB2\u0ACB\u0A9F \u0AAC\u0AC1\u0A95 \u0A95\u0AB0\u0ACB.",
  updatesTitle: "\u0AB8\u0AC2\u0A9A\u0AA8\u0ABE\u0A93",
  updatesDesc: "\u0AA4\u0AAE\u0ABE\u0AB0\u0ABE \u0AB0\u0AC7\u0AB6\u0AA8 \u0A85\u0AA8\u0AC7 \u0AAC\u0AC1\u0A95\u0ABF\u0A82\u0A97 \u0AB5\u0ABF\u0AB6\u0AC7 \u0AAE\u0AB9\u0AA4\u0ACD\u0AB5\u0AAA\u0AC2\u0AB0\u0ACD\u0AA3 \u0A85\u0AAA\u0AA1\u0AC7\u0A9F\u0ACD\u0AB8.",
  accountTitle: "\u0AAE\u0ABE\u0AB0\u0AC0 \u0AAA\u0ACD\u0AB0\u0ACB\u0AAB\u0ABE\u0A87\u0AB2",
  accountDesc: "\u0AA4\u0AAE\u0ABE\u0AB0\u0AC0 \u0AB5\u0ACD\u0AAF\u0A95\u0ACD\u0AA4\u0ABF\u0A97\u0AA4 \u0A85\u0AA8\u0AC7 \u0AB0\u0AC7\u0AB6\u0AA8 \u0A95\u0ABE\u0AB0\u0ACD\u0AA1 \u0AAE\u0ABE\u0AB9\u0ABF\u0AA4\u0AC0 \u0AB8\u0A82\u0A9A\u0ABE\u0AB2\u0ABF\u0AA4 \u0A95\u0AB0\u0ACB.",
  viewAs: "\u0AB0\u0AC2\u0AAA\u0AC7 \u0A9C\u0AC1\u0A93",
  languageBtn: "\u0AAD\u0ABE\u0AB7\u0ABE",
  citizen: "\u0AA8\u0ABE\u0A97\u0AB0\u0ABF\u0A95",
  shopkeeper: "\u0AA6\u0AC1\u0A95\u0ABE\u0AA8\u0AA6\u0ABE\u0AB0",
  administrator: "\u0AAA\u0ACD\u0AB0\u0AB6\u0ABE\u0AB8\u0A95",
  helpSupport: "\u0AAE\u0AA6\u0AA6",
  helpSupportBtn: "\u0AAE\u0AA6\u0AA6",
  needHelp: "\u0AAE\u0AA6\u0AA6 \u0A9C\u0ACB\u0A88\u0A8F \u0A9B\u0AC7?"
});
i18n.kn = extendLocale({
  appName: "\u0CB8\u0CCD\u0CAE\u0CBE\u0CB0\u0CCD\u0C9F\u0CCD \u0CB0\u0CC7\u0CB7\u0CA8\u0CCD",
  tagline: "\u0CA1\u0CBF\u0C9C\u0CBF\u0C9F\u0CB2\u0CCD PDS \u0CB8\u0CC7\u0CB5\u0CC6",
  home: "\u0CAE\u0CC1\u0C96\u0CAA\u0CC1\u0C9F",
  bookSlot: "\u0CB8\u0CCD\u0CB2\u0CBE\u0C9F\u0CCD \u0CAC\u0CC1\u0C95\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF",
  myBooking: "\u0CA8\u0CA8\u0CCD\u0CA8 \u0CAC\u0CC1\u0C95\u0CBF\u0C82\u0C97\u0CCD",
  notifications: "\u0C85\u0CA7\u0CBF\u0CB8\u0CC2\u0C9A\u0CA8\u0CC6\u0C97\u0CB3\u0CC1",
  profile: "\u0CAA\u0CCD\u0CB0\u0CCA\u0CAB\u0CC8\u0CB2\u0CCD",
  goodMorning: "\u0CB6\u0CC1\u0CAD\u0CCB\u0CA6\u0CAF",
  goodAfternoon: "\u0CB6\u0CC1\u0CAD \u0CAE\u0CA7\u0CCD\u0CAF\u0CBE\u0CB9\u0CCD\u0CA8",
  goodEvening: "\u0CB6\u0CC1\u0CAD \u0CB8\u0C82\u0C9C\u0CC6",
  atAGlance: "\u0C92\u0C82\u0CA6\u0CC1 \u0CA8\u0CCB\u0C9F\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF",
  refresh: "\u0CB0\u0CBF\u0CAB\u0CCD\u0CB0\u0CC6\u0CB6\u0CCD",
  skipQueue: "\u0CB8\u0CB0\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA4\u0CAA\u0CCD\u0CAA\u0CBF\u0CB8\u0CBF. \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CB8\u0CCD\u0CB2\u0CBE\u0C9F\u0CCD \u0CAC\u0CC1\u0C95\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF.",
  skipQueueDesc: "\u0CB8\u0CCC\u0CB2\u0CAD\u0CCD\u0CAF\u0C95\u0CB0 \u0CB8\u0CAE\u0CAF \u0C86\u0CAF\u0CCD\u0C95\u0CC6 \u0CAE\u0CBE\u0CA1\u0CBF \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C95\u0CBE\u0CAF\u0CA6\u0CC7 \u0CB0\u0CC7\u0CB7\u0CA8\u0CCD \u0CA4\u0CC6\u0C97\u0CC6\u0CA6\u0CC1\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CBF.",
  recentNotifications: "\u0C87\u0CA4\u0CCD\u0CA4\u0CC0\u0C9A\u0CBF\u0CA8 \u0C85\u0CA7\u0CBF\u0CB8\u0CC2\u0C9A\u0CA8\u0CC6\u0C97\u0CB3\u0CC1",
  quickActions: "\u0CA4\u0CCD\u0CB5\u0CB0\u0CBF\u0CA4 \u0C95\u0CCD\u0CB0\u0CBF\u0CAF\u0CC6\u0C97\u0CB3\u0CC1",
  bookCollection: "\u0CB8\u0C82\u0C97\u0CCD\u0CB0\u0CB9 \u0CB8\u0CCD\u0CB2\u0CBE\u0C9F\u0CCD \u0CAC\u0CC1\u0C95\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF",
  bookCollectionDesc: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0C85\u0C82\u0C97\u0CA1\u0CBF, \u0CA6\u0CBF\u0CA8\u0CBE\u0C82\u0C95 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C85\u0CA8\u0CC1\u0C95\u0CC2\u0CB2\u0C95\u0CB0 \u0CB8\u0CAE\u0CAF\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0C86\u0CAF\u0CCD\u0C95\u0CC6\u0CAE\u0CBE\u0CA1\u0CBF.",
  chooseShop: "\u0C85\u0C82\u0C97\u0CA1\u0CBF \u0C86\u0CAF\u0CCD\u0C95\u0CC6 \u0CAE\u0CBE\u0CA1\u0CBF",
  selectSlot: "\u0CB8\u0CCD\u0CB2\u0CBE\u0C9F\u0CCD \u0C86\u0CAF\u0CCD\u0C95\u0CC6 \u0CAE\u0CBE\u0CA1\u0CBF",
  confirm: "\u0C96\u0C9A\u0CBF\u0CA4\u0CAA\u0CA1\u0CBF\u0CB8\u0CBF",
  continueBtn: "\u0CAE\u0CC1\u0C82\u0CA6\u0CC1\u0CB5\u0CB0\u0CBF\u0CB8\u0CBF",
  back: "\u0CB9\u0CBF\u0C82\u0CA6\u0CC6",
  editSlot: "\u0CB8\u0CCD\u0CB2\u0CBE\u0C9F\u0CCD \u0CAC\u0CA6\u0CB2\u0CBF\u0CB8\u0CBF",
  chooseDate: "\u0CA6\u0CBF\u0CA8\u0CBE\u0C82\u0C95 \u0C86\u0CAF\u0CCD\u0C95\u0CC6 \u0CAE\u0CBE\u0CA1\u0CBF",
  availableSlots: "\u0CB2\u0CAD\u0CCD\u0CAF\u0CB5\u0CBF\u0CB0\u0CC1\u0CB5 \u0CB8\u0CAE\u0CAF \u0CB8\u0CCD\u0CB2\u0CBE\u0C9F\u0CCD\u200C\u0C97\u0CB3\u0CC1",
  reviewConfirm: "\u0CAA\u0CB0\u0CBF\u0CB6\u0CC0\u0CB2\u0CBF\u0CB8\u0CBF \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C96\u0C9A\u0CBF\u0CA4\u0CAA\u0CA1\u0CBF\u0CB8\u0CBF",
  reviewDesc: "\u0C96\u0C9A\u0CBF\u0CA4\u0CAA\u0CA1\u0CBF\u0CB8\u0CC1\u0CB5 \u0CAE\u0CCA\u0CA6\u0CB2\u0CC1 \u0CB5\u0CBF\u0CB5\u0CB0\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAA\u0CB0\u0CBF\u0CB6\u0CC0\u0CB2\u0CBF\u0CB8\u0CBF.",
  confirmBooking: "\u0CAC\u0CC1\u0C95\u0CBF\u0C82\u0C97\u0CCD \u0C96\u0C9A\u0CBF\u0CA4\u0CAA\u0CA1\u0CBF\u0CB8\u0CBF",
  noBooking: "\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CAE\u0CC1\u0C82\u0CA6\u0CBF\u0CA8 \u0CAC\u0CC1\u0C95\u0CBF\u0C82\u0C97\u0CCD \u0C87\u0CB2\u0CCD\u0CB2",
  noBookingDesc: "\u0CB8\u0CB0\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA4\u0CAA\u0CCD\u0CAA\u0CBF\u0CB8\u0CB2\u0CC1 \u0CB8\u0C82\u0C97\u0CCD\u0CB0\u0CB9 \u0CB8\u0CCD\u0CB2\u0CBE\u0C9F\u0CCD \u0CAC\u0CC1\u0C95\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF.",
  updatesTitle: "\u0C85\u0CA7\u0CBF\u0CB8\u0CC2\u0C9A\u0CA8\u0CC6\u0C97\u0CB3\u0CC1",
  updatesDesc: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CB0\u0CC7\u0CB7\u0CA8\u0CCD \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAC\u0CC1\u0C95\u0CBF\u0C82\u0C97\u0CCD\u200C\u0C97\u0CB3 \u0CAC\u0C97\u0CCD\u0C97\u0CC6 \u0CAA\u0CCD\u0CB0\u0CAE\u0CC1\u0C96 \u0C85\u0CAA\u0CCD\u0CA1\u0CC7\u0C9F\u0CCD\u0C97\u0CB3\u0CC1.",
  accountTitle: "\u0CA8\u0CA8\u0CCD\u0CA8 \u0CAA\u0CCD\u0CB0\u0CCA\u0CAB\u0CC8\u0CB2\u0CCD",
  accountDesc: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CB5\u0CC8\u0CAF\u0C95\u0CCD\u0CA4\u0CBF\u0C95 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB0\u0CC7\u0CB7\u0CA8\u0CCD \u0C95\u0CBE\u0CB0\u0CCD\u0CA1\u0CCD \u0CAE\u0CBE\u0CB9\u0CBF\u0CA4\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CBF\u0CB0\u0CCD\u0CB5\u0CB9\u0CBF\u0CB8\u0CBF.",
  viewAs: "\u0C87\u0CA6\u0CBE\u0C97\u0CBF \u0CA8\u0CCB\u0CA1\u0CBF",
  languageBtn: "\u0CAD\u0CBE\u0CB7\u0CC6",
  citizen: "\u0CA8\u0CBE\u0C97\u0CB0\u0CBF\u0C95",
  shopkeeper: "\u0C85\u0C82\u0C97\u0CA1\u0CBF \u0CAE\u0CBE\u0CB2\u0CC0\u0C95",
  administrator: "\u0CA8\u0CBF\u0CB0\u0CCD\u0CB5\u0CBE\u0CB9\u0C95",
  helpSupport: "\u0CB8\u0CB9\u0CBE\u0CAF",
  helpSupportBtn: "\u0CB8\u0CB9\u0CBE\u0CAF",
  needHelp: "\u0CB8\u0CB9\u0CBE\u0CAF \u0CAC\u0CC7\u0C95\u0CC6?"
});
i18n.ml = extendLocale({
  appName: "\u0D38\u0D4D\u0D2E\u0D3E\u0D7C\u0D1F\u0D4D\u0D1F\u0D4D \u0D31\u0D47\u0D37\u0D7B",
  tagline: "\u0D21\u0D3F\u0D1C\u0D3F\u0D31\u0D4D\u0D31\u0D7D PDS \u0D38\u0D47\u0D35\u0D28\u0D02",
  home: "\u0D39\u0D4B\u0D02",
  bookSlot: "\u0D38\u0D4D\u0D32\u0D4B\u0D1F\u0D4D\u0D1F\u0D4D \u0D2C\u0D41\u0D15\u0D4D\u0D15\u0D4D \u0D1A\u0D46\u0D2F\u0D4D\u0D2F\u0D41\u0D15",
  myBooking: "\u0D0E\u0D28\u0D4D\u0D31\u0D46 \u0D2C\u0D41\u0D15\u0D4D\u0D15\u0D3F\u0D02\u0D17\u0D4D",
  notifications: "\u0D05\u0D31\u0D3F\u0D2F\u0D3F\u0D2A\u0D4D\u0D2A\u0D41\u0D15\u0D7E",
  profile: "\u0D2A\u0D4D\u0D30\u0D4A\u0D2B\u0D48\u0D7D",
  goodMorning: "\u0D38\u0D41\u0D2A\u0D4D\u0D30\u0D2D\u0D3E\u0D24\u0D02",
  goodAfternoon: "\u0D36\u0D41\u0D2D \u0D2E\u0D27\u0D4D\u0D2F\u0D3E\u0D39\u0D4D\u0D28\u0D02",
  goodEvening: "\u0D36\u0D41\u0D2D \u0D38\u0D28\u0D4D\u0D27\u0D4D\u0D2F",
  atAGlance: "\u0D12\u0D30\u0D41 \u0D28\u0D4B\u0D1F\u0D4D\u0D1F\u0D24\u0D4D\u0D24\u0D3F\u0D7D",
  refresh: "\u0D2A\u0D41\u0D24\u0D41\u0D15\u0D4D\u0D15\u0D41\u0D15",
  skipQueue: "\u0D15\u0D4D\u0D2F\u0D42 \u0D12\u0D34\u0D3F\u0D35\u0D3E\u0D15\u0D4D\u0D15\u0D42. \u0D28\u0D3F\u0D19\u0D4D\u0D19\u0D33\u0D41\u0D1F\u0D46 \u0D38\u0D4D\u0D32\u0D4B\u0D1F\u0D4D\u0D1F\u0D4D \u0D2C\u0D41\u0D15\u0D4D\u0D15\u0D4D \u0D1A\u0D46\u0D2F\u0D4D\u0D2F\u0D42.",
  skipQueueDesc: "\u0D38\u0D57\u0D15\u0D30\u0D4D\u0D2F\u0D2A\u0D4D\u0D30\u0D26\u0D2E\u0D3E\u0D2F \u0D38\u0D2E\u0D2F\u0D02 \u0D24\u0D3F\u0D30\u0D1E\u0D4D\u0D1E\u0D46\u0D1F\u0D41\u0D15\u0D4D\u0D15\u0D41\u0D15, \u0D15\u0D3E\u0D24\u0D4D\u0D24\u0D41\u0D28\u0D3F\u0D7D\u0D15\u0D4D\u0D15\u0D3E\u0D24\u0D46 \u0D31\u0D47\u0D37\u0D7B \u0D28\u0D47\u0D1F\u0D41\u0D15.",
  recentNotifications: "\u0D2A\u0D41\u0D24\u0D3F\u0D2F \u0D05\u0D31\u0D3F\u0D2F\u0D3F\u0D2A\u0D4D\u0D2A\u0D41\u0D15\u0D7E",
  quickActions: "\u0D35\u0D47\u0D17 \u0D2A\u0D4D\u0D30\u0D35\u0D7C\u0D24\u0D4D\u0D24\u0D28\u0D19\u0D4D\u0D19\u0D7E",
  bookCollection: "\u0D36\u0D47\u0D16\u0D30\u0D23 \u0D38\u0D4D\u0D32\u0D4B\u0D1F\u0D4D\u0D1F\u0D4D \u0D2C\u0D41\u0D15\u0D4D\u0D15\u0D4D \u0D1A\u0D46\u0D2F\u0D4D\u0D2F\u0D41\u0D15",
  bookCollectionDesc: "\u0D28\u0D3F\u0D19\u0D4D\u0D19\u0D33\u0D41\u0D1F\u0D46 \u0D15\u0D1F, \u0D24\u0D40\u0D2F\u0D24\u0D3F, \u0D05\u0D28\u0D41\u0D2F\u0D4B\u0D1C\u0D4D\u0D2F\u0D2E\u0D3E\u0D2F \u0D38\u0D2E\u0D2F\u0D02 \u0D24\u0D3F\u0D30\u0D1E\u0D4D\u0D1E\u0D46\u0D1F\u0D41\u0D15\u0D4D\u0D15\u0D41\u0D15.",
  chooseShop: "\u0D15\u0D1F \u0D24\u0D3F\u0D30\u0D1E\u0D4D\u0D1E\u0D46\u0D1F\u0D41\u0D15\u0D4D\u0D15\u0D41\u0D15",
  selectSlot: "\u0D38\u0D4D\u0D32\u0D4B\u0D1F\u0D4D\u0D1F\u0D4D \u0D24\u0D3F\u0D30\u0D1E\u0D4D\u0D1E\u0D46\u0D1F\u0D41\u0D15\u0D4D\u0D15\u0D41\u0D15",
  confirm: "\u0D38\u0D4D\u0D25\u0D3F\u0D30\u0D40\u0D15\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D15",
  continueBtn: "\u0D24\u0D41\u0D1F\u0D30\u0D41\u0D15",
  back: "\u0D2A\u0D3F\u0D28\u0D4D\u0D28\u0D4B\u0D1F\u0D4D\u0D1F\u0D4D",
  editSlot: "\u0D38\u0D4D\u0D32\u0D4B\u0D1F\u0D4D\u0D1F\u0D4D \u0D2E\u0D3E\u0D31\u0D4D\u0D31\u0D41\u0D15",
  chooseDate: "\u0D24\u0D40\u0D2F\u0D24\u0D3F \u0D24\u0D3F\u0D30\u0D1E\u0D4D\u0D1E\u0D46\u0D1F\u0D41\u0D15\u0D4D\u0D15\u0D41\u0D15",
  availableSlots: "\u0D32\u0D2D\u0D4D\u0D2F\u0D2E\u0D3E\u0D2F \u0D38\u0D2E\u0D2F\u0D02 \u0D38\u0D4D\u0D32\u0D4B\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E",
  reviewConfirm: "\u0D2A\u0D30\u0D3F\u0D36\u0D4B\u0D27\u0D3F\u0D1A\u0D4D\u0D1A\u0D4D \u0D38\u0D4D\u0D25\u0D3F\u0D30\u0D40\u0D15\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D15",
  reviewDesc: "\u0D38\u0D4D\u0D25\u0D3F\u0D30\u0D40\u0D15\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D28\u0D4D\u0D28\u0D24\u0D3F\u0D28\u0D4D \u0D2E\u0D41\u0D2E\u0D4D\u0D2A\u0D4D \u0D35\u0D3F\u0D36\u0D26\u0D3E\u0D02\u0D36\u0D19\u0D4D\u0D19\u0D7E \u0D2A\u0D30\u0D3F\u0D36\u0D4B\u0D27\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D15.",
  confirmBooking: "\u0D2C\u0D41\u0D15\u0D4D\u0D15\u0D3F\u0D02\u0D17\u0D4D \u0D38\u0D4D\u0D25\u0D3F\u0D30\u0D40\u0D15\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D15",
  noBooking: "\u0D06\u0D38\u0D28\u0D4D\u0D28\u0D2E\u0D3E\u0D2F \u0D2C\u0D41\u0D15\u0D4D\u0D15\u0D3F\u0D02\u0D17\u0D4D \u0D07\u0D32\u0D4D\u0D32",
  noBookingDesc: "\u0D15\u0D4D\u0D2F\u0D42 \u0D12\u0D34\u0D3F\u0D35\u0D3E\u0D15\u0D4D\u0D15\u0D3E\u0D7B \u0D12\u0D30\u0D41 \u0D36\u0D47\u0D16\u0D30\u0D23 \u0D38\u0D4D\u0D32\u0D4B\u0D1F\u0D4D\u0D1F\u0D4D \u0D2C\u0D41\u0D15\u0D4D\u0D15\u0D4D \u0D1A\u0D46\u0D2F\u0D4D\u0D2F\u0D41\u0D15.",
  updatesTitle: "\u0D05\u0D31\u0D3F\u0D2F\u0D3F\u0D2A\u0D4D\u0D2A\u0D41\u0D15\u0D7E",
  updatesDesc: "\u0D28\u0D3F\u0D19\u0D4D\u0D19\u0D33\u0D41\u0D1F\u0D46 \u0D31\u0D47\u0D37\u0D7B, \u0D2C\u0D41\u0D15\u0D4D\u0D15\u0D3F\u0D02\u0D17\u0D4D \u0D0E\u0D28\u0D4D\u0D28\u0D3F\u0D35\u0D2F\u0D47\u0D15\u0D4D\u0D15\u0D41\u0D31\u0D3F\u0D1A\u0D4D\u0D1A\u0D41\u0D33\u0D4D\u0D33 \u0D2A\u0D4D\u0D30\u0D27\u0D3E\u0D28 \u0D05\u0D2A\u0D4D\u0D21\u0D47\u0D31\u0D4D\u0D31\u0D41\u0D15\u0D7E.",
  accountTitle: "\u0D0E\u0D28\u0D4D\u0D31\u0D46 \u0D2A\u0D4D\u0D30\u0D4A\u0D2B\u0D48\u0D7D",
  accountDesc: "\u0D28\u0D3F\u0D19\u0D4D\u0D19\u0D33\u0D41\u0D1F\u0D46 \u0D35\u0D4D\u0D2F\u0D15\u0D4D\u0D24\u0D3F\u0D17\u0D24\u0D35\u0D41\u0D02 \u0D31\u0D47\u0D37\u0D7B \u0D15\u0D3E\u0D7C\u0D21\u0D4D \u0D35\u0D3F\u0D35\u0D30\u0D19\u0D4D\u0D19\u0D33\u0D41\u0D02 \u0D28\u0D3F\u0D2F\u0D28\u0D4D\u0D24\u0D4D\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D15.",
  viewAs: "\u0D06\u0D2F\u0D3F \u0D15\u0D3E\u0D23\u0D41\u0D15",
  languageBtn: "\u0D2D\u0D3E\u0D37",
  citizen: "\u0D2A\u0D57\u0D30\u0D7B",
  shopkeeper: "\u0D15\u0D1F\u0D15\u0D4D\u0D15\u0D3E\u0D30\u0D7B",
  administrator: "\u0D05\u0D21\u0D4D\u0D2E\u0D3F\u0D28\u0D3F\u0D38\u0D4D\u0D1F\u0D4D\u0D30\u0D47\u0D31\u0D4D\u0D31\u0D7C",
  helpSupport: "\u0D38\u0D39\u0D3E\u0D2F\u0D02",
  helpSupportBtn: "\u0D38\u0D39\u0D3E\u0D2F\u0D02",
  needHelp: "\u0D38\u0D39\u0D3E\u0D2F\u0D02 \u0D35\u0D47\u0D23\u0D4B?"
});
i18n.pa = extendLocale({
  appName: "\u0A38\u0A2E\u0A3E\u0A30\u0A1F \u0A30\u0A47\u0A38\u0A3C\u0A28",
  tagline: "\u0A21\u0A3F\u0A1C\u0A3C\u0A3F\u0A1F\u0A32 PDS \u0A38\u0A47\u0A35\u0A3E",
  home: "\u0A39\u0A4B\u0A2E",
  bookSlot: "\u0A38\u0A32\u0A4C\u0A1F \u0A2C\u0A41\u0A71\u0A15 \u0A15\u0A30\u0A4B",
  myBooking: "\u0A2E\u0A47\u0A30\u0A40 \u0A2C\u0A41\u0A71\u0A15\u0A3F\u0A70\u0A17",
  notifications: "\u0A38\u0A42\u0A1A\u0A28\u0A3E\u0A35\u0A3E\u0A02",
  profile: "\u0A2A\u0A4D\u0A30\u0A4B\u0A2B\u0A3C\u0A3E\u0A08\u0A32",
  goodMorning: "\u0A38\u0A24\u0A3F \u0A38\u0A3C\u0A4D\u0A30\u0A40 \u0A05\u0A15\u0A3E\u0A32",
  goodAfternoon: "\u0A38\u0A24\u0A3F \u0A38\u0A3C\u0A4D\u0A30\u0A40 \u0A05\u0A15\u0A3E\u0A32",
  goodEvening: "\u0A38\u0A3C\u0A41\u0A2D \u0A38\u0A3C\u0A3E\u0A2E",
  atAGlance: "\u0A07\u0A71\u0A15 \u0A28\u0A1C\u0A3C\u0A30 \u0A35\u0A3F\u0A71\u0A1A",
  refresh: "\u0A24\u0A3E\u0A1C\u0A3C\u0A3E \u0A15\u0A30\u0A4B",
  skipQueue: "\u0A15\u0A24\u0A3E\u0A30 \u0A24\u0A4B\u0A02 \u0A2C\u0A1A\u0A4B\u0964 \u0A06\u0A2A\u0A23\u0A3E \u0A38\u0A32\u0A4C\u0A1F \u0A2C\u0A41\u0A71\u0A15 \u0A15\u0A30\u0A4B\u0964",
  skipQueueDesc: "\u0A38\u0A41\u0A35\u0A3F\u0A27\u0A3E\u0A1C\u0A28\u0A15 \u0A38\u0A2E\u0A3E\u0A02 \u0A1A\u0A41\u0A23\u0A4B \u0A05\u0A24\u0A47 \u0A09\u0A21\u0A40\u0A15 \u0A2C\u0A3F\u0A28\u0A3E\u0A02 \u0A30\u0A47\u0A38\u0A3C\u0A28 \u0A32\u0A35\u0A4B\u0964",
  recentNotifications: "\u0A39\u0A3E\u0A32\u0A40\u0A06 \u0A38\u0A42\u0A1A\u0A28\u0A3E\u0A35\u0A3E\u0A02",
  quickActions: "\u0A24\u0A47\u0A1C\u0A3C \u0A15\u0A3E\u0A30\u0A35\u0A3E\u0A08\u0A06\u0A02",
  bookCollection: "\u0A07\u0A15\u0A71\u0A20 \u0A38\u0A32\u0A4C\u0A1F \u0A2C\u0A41\u0A71\u0A15 \u0A15\u0A30\u0A4B",
  bookCollectionDesc: "\u0A06\u0A2A\u0A23\u0A40 \u0A26\u0A41\u0A15\u0A3E\u0A28, \u0A2E\u0A3F\u0A24\u0A40 \u0A05\u0A24\u0A47 \u0A38\u0A41\u0A35\u0A3F\u0A27\u0A3E\u0A1C\u0A28\u0A15 \u0A38\u0A2E\u0A3E\u0A02 \u0A1A\u0A41\u0A23\u0A4B\u0964",
  chooseShop: "\u0A26\u0A41\u0A15\u0A3E\u0A28 \u0A1A\u0A41\u0A23\u0A4B",
  selectSlot: "\u0A38\u0A32\u0A4C\u0A1F \u0A1A\u0A41\u0A23\u0A4B",
  confirm: "\u0A2A\u0A41\u0A38\u0A3C\u0A1F\u0A40 \u0A15\u0A30\u0A4B",
  continueBtn: "\u0A1C\u0A3E\u0A30\u0A40 \u0A30\u0A71\u0A16\u0A4B",
  back: "\u0A35\u0A3E\u0A2A\u0A38",
  editSlot: "\u0A38\u0A32\u0A4C\u0A1F \u0A2C\u0A26\u0A32\u0A4B",
  chooseDate: "\u0A2E\u0A3F\u0A24\u0A40 \u0A1A\u0A41\u0A23\u0A4B",
  availableSlots: "\u0A09\u0A2A\u0A32\u0A2C\u0A27 \u0A38\u0A2E\u0A3E\u0A02 \u0A38\u0A32\u0A4C\u0A1F",
  reviewConfirm: "\u0A38\u0A2E\u0A40\u0A16\u0A3F\u0A06 \u0A05\u0A24\u0A47 \u0A2A\u0A41\u0A38\u0A3C\u0A1F\u0A40",
  reviewDesc: "\u0A2A\u0A41\u0A38\u0A3C\u0A1F\u0A40 \u0A15\u0A30\u0A28 \u0A24\u0A4B\u0A02 \u0A2A\u0A39\u0A3F\u0A32\u0A3E\u0A02 \u0A35\u0A47\u0A30\u0A35\u0A47 \u0A1A\u0A48\u0A71\u0A15 \u0A15\u0A30\u0A4B\u0964",
  confirmBooking: "\u0A2C\u0A41\u0A71\u0A15\u0A3F\u0A70\u0A17 \u0A2A\u0A41\u0A38\u0A3C\u0A1F\u0A40 \u0A15\u0A30\u0A4B",
  noBooking: "\u0A15\u0A4B\u0A08 \u0A06\u0A09\u0A23 \u0A35\u0A3E\u0A32\u0A40 \u0A2C\u0A41\u0A71\u0A15\u0A3F\u0A70\u0A17 \u0A28\u0A39\u0A40\u0A02",
  noBookingDesc: "\u0A15\u0A24\u0A3E\u0A30 \u0A24\u0A4B\u0A02 \u0A2C\u0A1A\u0A23 \u0A32\u0A08 \u0A07\u0A15\u0A71\u0A20 \u0A38\u0A32\u0A4C\u0A1F \u0A2C\u0A41\u0A71\u0A15 \u0A15\u0A30\u0A4B\u0964",
  updatesTitle: "\u0A38\u0A42\u0A1A\u0A28\u0A3E\u0A35\u0A3E\u0A02",
  updatesDesc: "\u0A24\u0A41\u0A39\u0A3E\u0A21\u0A47 \u0A30\u0A47\u0A38\u0A3C\u0A28 \u0A05\u0A24\u0A47 \u0A2C\u0A41\u0A71\u0A15\u0A3F\u0A70\u0A17 \u0A2C\u0A3E\u0A30\u0A47 \u0A2E\u0A39\u0A71\u0A24\u0A35\u0A2A\u0A42\u0A30\u0A28 \u0A05\u0A2A\u0A21\u0A47\u0A1F\u0A38\u0964",
  accountTitle: "\u0A2E\u0A47\u0A30\u0A3E \u0A2A\u0A4D\u0A30\u0A4B\u0A2B\u0A3C\u0A3E\u0A08\u0A32",
  accountDesc: "\u0A06\u0A2A\u0A23\u0A40 \u0A28\u0A3F\u0A71\u0A1C\u0A40 \u0A05\u0A24\u0A47 \u0A30\u0A47\u0A38\u0A3C\u0A28 \u0A15\u0A3E\u0A30\u0A21 \u0A1C\u0A3E\u0A23\u0A15\u0A3E\u0A30\u0A40 \u0A38\u0A70\u0A2D\u0A3E\u0A32\u0A4B\u0964",
  viewAs: "\u0A35\u0A1C\u0A4B\u0A02 \u0A35\u0A47\u0A16\u0A4B",
  languageBtn: "\u0A2D\u0A3E\u0A38\u0A3C\u0A3E",
  citizen: "\u0A28\u0A3E\u0A17\u0A30\u0A3F\u0A15",
  shopkeeper: "\u0A26\u0A41\u0A15\u0A3E\u0A28\u0A26\u0A3E\u0A30",
  administrator: "\u0A2A\u0A4D\u0A30\u0A38\u0A3C\u0A3E\u0A38\u0A15",
  helpSupport: "\u0A2E\u0A26\u0A26",
  helpSupportBtn: "\u0A2E\u0A26\u0A26",
  needHelp: "\u0A2E\u0A26\u0A26 \u0A1A\u0A3E\u0A39\u0A40\u0A26\u0A40 \u0A39\u0A48?"
});
i18n.or = extendLocale({
  appName: "\u0B38\u0B4D\u0B2E\u0B3E\u0B30\u0B4D\u0B1F \u0B30\u0B47\u0B38\u0B28",
  tagline: "\u0B21\u0B3F\u0B1C\u0B3F\u0B1F\u0B3E\u0B32\u0B4D PDS \u0B38\u0B47\u0B2C\u0B3E",
  home: "\u0B39\u0B4B\u0B2E",
  bookSlot: "\u0B38\u0B4D\u0B32\u0B1F\u0B4D \u0B2C\u0B41\u0B15\u0B4D \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41",
  myBooking: "\u0B2E\u0B4B\u0B30 \u0B2C\u0B41\u0B15\u0B3F\u0B02",
  notifications: "\u0B38\u0B42\u0B1A\u0B28\u0B3E",
  profile: "\u0B2A\u0B4D\u0B30\u0B4B\u0B2B\u0B3E\u0B07\u0B32\u0B4D",
  goodMorning: "\u0B38\u0B41\u0B2A\u0B4D\u0B30\u0B2D\u0B3E\u0B24",
  goodAfternoon: "\u0B36\u0B41\u0B2D \u0B05\u0B2A\u0B30\u0B3E\u0B39\u0B4D\u0B28",
  goodEvening: "\u0B36\u0B41\u0B2D \u0B38\u0B28\u0B4D\u0B27\u0B4D\u0B5F\u0B3E",
  atAGlance: "\u0B0F\u0B15 \u0B28\u0B1C\u0B30\u0B30\u0B47",
  refresh: "\u0B30\u0B3F\u0B2B\u0B4D\u0B30\u0B47\u0B36",
  skipQueue: "\u0B27\u0B3E\u0B30\u0B3F\u0B15\u0B41 \u0B0F\u0B21\u0B3C\u0B3E\u0B28\u0B4D\u0B24\u0B41\u0964 \u0B06\u0B2A\u0B23\u0B19\u0B4D\u0B15 \u0B38\u0B4D\u0B32\u0B1F\u0B4D \u0B2C\u0B41\u0B15\u0B4D \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41\u0964",
  skipQueueDesc: "\u0B38\u0B41\u0B2C\u0B3F\u0B27\u0B3E\u0B1C\u0B28\u0B15 \u0B38\u0B2E\u0B5F \u0B2C\u0B3E\u0B1B\u0B28\u0B4D\u0B24\u0B41 \u0B0F\u0B2C\u0B02 \u0B05\u0B2A\u0B47\u0B15\u0B4D\u0B37\u0B3E \u0B2C\u0B3F\u0B28\u0B3E \u0B30\u0B47\u0B38\u0B28\u0B4D \u0B28\u0B3F\u0B05\u0B28\u0B4D\u0B24\u0B41\u0964",
  recentNotifications: "\u0B38\u0B2E\u0B4D\u0B2A\u0B4D\u0B30\u0B24\u0B3F\u0B15 \u0B38\u0B42\u0B1A\u0B28\u0B3E",
  quickActions: "\u0B26\u0B4D\u0B30\u0B41\u0B24 \u0B15\u0B3E\u0B30\u0B4D\u0B2F\u0B4D\u0B5F",
  bookCollection: "\u0B38\u0B02\u0B17\u0B4D\u0B30\u0B39 \u0B38\u0B4D\u0B32\u0B1F\u0B4D \u0B2C\u0B41\u0B15\u0B4D \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41",
  bookCollectionDesc: "\u0B06\u0B2A\u0B23\u0B19\u0B4D\u0B15 \u0B26\u0B4B\u0B15\u0B3E\u0B28, \u0B24\u0B3E\u0B30\u0B3F\u0B16 \u0B0F\u0B2C\u0B02 \u0B38\u0B41\u0B2C\u0B3F\u0B27\u0B3E\u0B1C\u0B28\u0B15 \u0B38\u0B2E\u0B5F \u0B1A\u0B5F\u0B28 \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41\u0964",
  chooseShop: "\u0B26\u0B4B\u0B15\u0B3E\u0B28 \u0B1A\u0B5F\u0B28 \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41",
  selectSlot: "\u0B38\u0B4D\u0B32\u0B1F\u0B4D \u0B1A\u0B5F\u0B28 \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41",
  confirm: "\u0B28\u0B3F\u0B36\u0B4D\u0B1A\u0B3F\u0B24 \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41",
  continueBtn: "\u0B1C\u0B3E\u0B30\u0B3F \u0B30\u0B16\u0B28\u0B4D\u0B24\u0B41",
  back: "\u0B2A\u0B1B\u0B15\u0B41",
  editSlot: "\u0B38\u0B4D\u0B32\u0B1F\u0B4D \u0B2A\u0B30\u0B3F\u0B2C\u0B30\u0B4D\u0B24\u0B4D\u0B24\u0B28",
  chooseDate: "\u0B24\u0B3E\u0B30\u0B3F\u0B16 \u0B1A\u0B5F\u0B28 \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41",
  availableSlots: "\u0B09\u0B2A\u0B32\u0B2C\u0B4D\u0B27 \u0B38\u0B2E\u0B5F \u0B38\u0B4D\u0B32\u0B1F\u0B4D",
  reviewConfirm: "\u0B2A\u0B30\u0B40\u0B15\u0B4D\u0B37\u0B3E \u0B15\u0B30\u0B3F \u0B28\u0B3F\u0B36\u0B4D\u0B1A\u0B3F\u0B24 \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41",
  reviewDesc: "\u0B28\u0B3F\u0B36\u0B4D\u0B1A\u0B3F\u0B24 \u0B15\u0B30\u0B3F\u0B2C\u0B3E \u0B2A\u0B42\u0B30\u0B4D\u0B2C\u0B30\u0B41 \u0B2C\u0B3F\u0B2C\u0B30\u0B23\u0B40 \u0B2F\u0B3E\u0B1E\u0B4D\u0B1A \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41\u0964",
  confirmBooking: "\u0B2C\u0B41\u0B15\u0B3F\u0B02 \u0B28\u0B3F\u0B36\u0B4D\u0B1A\u0B3F\u0B24 \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41",
  noBooking: "\u0B15\u0B4C\u0B23\u0B38\u0B3F \u0B06\u0B38\u0B28\u0B4D\u0B24\u0B3E \u0B2C\u0B41\u0B15\u0B3F\u0B02 \u0B28\u0B3E\u0B39\u0B3F\u0B01",
  noBookingDesc: "\u0B27\u0B3E\u0B30\u0B3F\u0B15\u0B41 \u0B0F\u0B21\u0B3C\u0B3E\u0B07\u0B2C\u0B3E \u0B2A\u0B3E\u0B07\u0B01 \u0B0F\u0B15 \u0B38\u0B02\u0B17\u0B4D\u0B30\u0B39 \u0B38\u0B4D\u0B32\u0B1F\u0B4D \u0B2C\u0B41\u0B15\u0B4D \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41\u0964",
  updatesTitle: "\u0B38\u0B42\u0B1A\u0B28\u0B3E",
  updatesDesc: "\u0B06\u0B2A\u0B23\u0B19\u0B4D\u0B15 \u0B30\u0B47\u0B38\u0B28\u0B4D \u0B0F\u0B2C\u0B02 \u0B2C\u0B41\u0B15\u0B3F\u0B02 \u0B38\u0B2E\u0B4D\u0B2A\u0B30\u0B4D\u0B15\u0B3F\u0B24 \u0B17\u0B41\u0B30\u0B41\u0B24\u0B4D\u0B24\u0B4D\u0B71\u0B2A\u0B42\u0B30\u0B4D\u0B23\u0B4D\u0B23 \u0B05\u0B2A\u0B21\u0B47\u0B1F\u0B4D\u0964",
  accountTitle: "\u0B2E\u0B4B\u0B30 \u0B2A\u0B4D\u0B30\u0B4B\u0B2B\u0B3E\u0B07\u0B32\u0B4D",
  accountDesc: "\u0B06\u0B2A\u0B23\u0B19\u0B4D\u0B15 \u0B2C\u0B4D\u0B5F\u0B15\u0B4D\u0B24\u0B3F\u0B17\u0B24 \u0B0F\u0B2C\u0B02 \u0B30\u0B47\u0B38\u0B28\u0B4D \u0B15\u0B3E\u0B30\u0B4D\u0B21 \u0B2C\u0B3F\u0B2C\u0B30\u0B23\u0B40 \u0B2A\u0B30\u0B3F\u0B1A\u0B3E\u0B33\u0B28\u0B3E \u0B15\u0B30\u0B28\u0B4D\u0B24\u0B41\u0964",
  viewAs: "\u0B2D\u0B3E\u0B2C\u0B47 \u0B26\u0B47\u0B16\u0B28\u0B4D\u0B24\u0B41",
  languageBtn: "\u0B2D\u0B3E\u0B37\u0B3E",
  citizen: "\u0B28\u0B3E\u0B17\u0B30\u0B3F\u0B15",
  shopkeeper: "\u0B26\u0B4B\u0B15\u0B3E\u0B28\u0B40",
  administrator: "\u0B2A\u0B4D\u0B30\u0B36\u0B3E\u0B38\u0B15",
  helpSupport: "\u0B38\u0B39\u0B3E\u0B5F\u0B24\u0B3E",
  helpSupportBtn: "\u0B38\u0B39\u0B3E\u0B5F\u0B24\u0B3E",
  needHelp: "\u0B38\u0B39\u0B3E\u0B5F\u0B24\u0B3E \u0B26\u0B30\u0B15\u0B3E\u0B30?"
});
i18n.ur = extendLocale({
  appName: "\u0633\u0645\u0627\u0631\u0679 \u0631\u0627\u0634\u0646",
  tagline: "\u0688\u06CC\u062C\u06CC\u0679\u0644 PDS \u0633\u0631\u0648\u0633",
  home: "\u06C1\u0648\u0645",
  bookSlot: "\u0633\u0644\u0627\u0679 \u0628\u06A9 \u06A9\u0631\u06CC\u06BA",
  myBooking: "\u0645\u06CC\u0631\u06CC \u0628\u06A9\u0646\u06AF",
  notifications: "\u0627\u0637\u0644\u0627\u0639\u0627\u062A",
  profile: "\u067E\u0631\u0648\u0641\u0627\u0626\u0644",
  goodMorning: "\u0635\u0628\u062D \u0628\u062E\u06CC\u0631",
  goodAfternoon: "\u062F\u0648\u067E\u06C1\u0631 \u0628\u062E\u06CC\u0631",
  goodEvening: "\u0634\u0627\u0645 \u0628\u062E\u06CC\u0631",
  atAGlance: "\u0627\u06CC\u06A9 \u0646\u0638\u0631 \u0645\u06CC\u06BA",
  refresh: "\u0631\u06CC\u0641\u0631\u06CC\u0634",
  skipQueue: "\u0642\u0637\u0627\u0631 \u0633\u06D2 \u0628\u0686\u06CC\u06BA\u06D4 \u0627\u067E\u0646\u0627 \u0633\u0644\u0627\u0679 \u0628\u06A9 \u06A9\u0631\u06CC\u06BA\u06D4",
  skipQueueDesc: "\u0645\u0648\u0632\u0648\u06BA \u0648\u0642\u062A \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA \u0627\u0648\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u06A9\u06D2 \u0628\u063A\u06CC\u0631 \u0631\u0627\u0634\u0646 \u0644\u06CC\u06BA\u06D4",
  recentNotifications: "\u062D\u0627\u0644\u06CC\u06C1 \u0627\u0637\u0644\u0627\u0639\u0627\u062A",
  quickActions: "\u0641\u0648\u0631\u06CC \u06A9\u0627\u0631\u0631\u0648\u0627\u0626\u06CC\u0627\u06BA",
  bookCollection: "\u06A9\u0644\u06CC\u06A9\u0634\u0646 \u0633\u0644\u0627\u0679 \u0628\u06A9 \u06A9\u0631\u06CC\u06BA",
  bookCollectionDesc: "\u0627\u067E\u0646\u06CC \u062F\u06A9\u0627\u0646\u060C \u062A\u0627\u0631\u06CC\u062E \u0627\u0648\u0631 \u0645\u0648\u0632\u0648\u06BA \u0648\u0642\u062A \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA\u06D4",
  chooseShop: "\u062F\u06A9\u0627\u0646 \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA",
  selectSlot: "\u0633\u0644\u0627\u0679 \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA",
  confirm: "\u062A\u0635\u062F\u06CC\u0642 \u06A9\u0631\u06CC\u06BA",
  continueBtn: "\u062C\u0627\u0631\u06CC \u0631\u06A9\u06BE\u06CC\u06BA",
  back: "\u0648\u0627\u067E\u0633",
  editSlot: "\u0633\u0644\u0627\u0679 \u062A\u0628\u062F\u06CC\u0644 \u06A9\u0631\u06CC\u06BA",
  chooseDate: "\u062A\u0627\u0631\u06CC\u062E \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA",
  availableSlots: "\u062F\u0633\u062A\u06CC\u0627\u0628 \u0648\u0642\u062A \u06A9\u06D2 \u0633\u0644\u0627\u0679\u0633",
  reviewConfirm: "\u062C\u0627\u0626\u0632\u06C1 \u0627\u0648\u0631 \u062A\u0635\u062F\u06CC\u0642",
  reviewDesc: "\u062A\u0635\u062F\u06CC\u0642 \u06A9\u0631\u0646\u06D2 \u0633\u06D2 \u067E\u06C1\u0644\u06D2 \u062A\u0641\u0635\u06CC\u0644\u0627\u062A \u0686\u06CC\u06A9 \u06A9\u0631\u06CC\u06BA\u06D4",
  confirmBooking: "\u0628\u06A9\u0646\u06AF \u06A9\u06CC \u062A\u0635\u062F\u06CC\u0642 \u06A9\u0631\u06CC\u06BA",
  noBooking: "\u06A9\u0648\u0626\u06CC \u0622\u0646\u06D2 \u0648\u0627\u0644\u06CC \u0628\u06A9\u0646\u06AF \u0646\u06C1\u06CC\u06BA",
  noBookingDesc: "\u0642\u0637\u0627\u0631 \u0633\u06D2 \u0628\u0686\u0646\u06D2 \u06A9\u06D2 \u0644\u06CC\u06D2 \u06A9\u0644\u06CC\u06A9\u0634\u0646 \u0633\u0644\u0627\u0679 \u0628\u06A9 \u06A9\u0631\u06CC\u06BA\u06D4",
  updatesTitle: "\u0627\u0637\u0644\u0627\u0639\u0627\u062A",
  updatesDesc: "\u0622\u067E \u06A9\u06D2 \u0631\u0627\u0634\u0646 \u0627\u0648\u0631 \u0628\u06A9\u0646\u06AF \u06A9\u06D2 \u0628\u0627\u0631\u06D2 \u0645\u06CC\u06BA \u0627\u06C1\u0645 \u0627\u067E\u0688\u06CC\u0679\u0633\u06D4",
  accountTitle: "\u0645\u06CC\u0631\u0627 \u067E\u0631\u0648\u0641\u0627\u0626\u0644",
  accountDesc: "\u0627\u067E\u0646\u06CC \u0630\u0627\u062A\u06CC \u0627\u0648\u0631 \u0631\u0627\u0634\u0646 \u06A9\u0627\u0631\u0688 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0645\u0646\u0638\u0645 \u06A9\u0631\u06CC\u06BA\u06D4",
  viewAs: "\u06A9\u06D2 \u0637\u0648\u0631 \u067E\u0631 \u062F\u06CC\u06A9\u06BE\u06CC\u06BA",
  languageBtn: "\u0632\u0628\u0627\u0646",
  citizen: "\u0634\u06C1\u0631\u06CC",
  shopkeeper: "\u062F\u06A9\u0627\u0646 \u062F\u0627\u0631",
  administrator: "\u0645\u0646\u062A\u0638\u0645",
  helpSupport: "\u0645\u062F\u062F",
  helpSupportBtn: "\u0645\u062F\u062F",
  needHelp: "\u0645\u062F\u062F \u0686\u0627\u06C1\u06CC\u06D2\u061F"
});
i18n.as = extendLocale({
  appName: "\u09B8\u09CD\u09AE\u09BE\u09B0\u09CD\u099F \u09F0\u09C7\u09B6\u09A8",
  tagline: "\u09A1\u09BF\u099C\u09BF\u099F\u09C7\u09B2 PDS \u09B8\u09C7\u09F1\u09BE",
  home: "\u09B9\u09CB\u09AE",
  bookSlot: "\u09B8\u09CD\u09B2\u099F \u09AC\u09C1\u0995 \u0995\u09F0\u0995",
  myBooking: "\u09AE\u09CB\u09F0 \u09AC\u09C1\u0995\u09BF\u0982",
  notifications: "\u0985\u09A7\u09BF\u09B8\u09C2\u099A\u09A8\u09BE",
  profile: "\u09AA\u09CD\u09F0'\u09AB\u09BE\u0987\u09B2",
  goodMorning: "\u09B8\u09C1\u09AA\u09CD\u09F0\u09AD\u09BE\u09A4",
  goodAfternoon: "\u09A8\u09AE\u09B8\u09CD\u0995\u09BE\u09F0",
  goodEvening: "\u09B6\u09C1\u09AD \u09B8\u09A8\u09CD\u09A7\u09CD\u09AF\u09BE",
  atAGlance: "\u098F\u099F\u09BE \u09A6\u09C3\u09B7\u09CD\u099F\u09BF\u09A4",
  refresh: "\u09F0\u09BF\u09AB\u09CD\u09F0\u09C7\u09B6",
  skipQueue: "\u09AA\u0982\u0995\u09CD\u09A4\u09BF \u098F\u09F0\u0995\u0964 \u0986\u09AA\u09CB\u09A8\u09BE\u09F0 \u09B8\u09CD\u09B2\u099F \u09AC\u09C1\u0995 \u0995\u09F0\u0995\u0964",
  skipQueueDesc: "\u09B8\u09C1\u09AC\u09BF\u09A7\u09BE\u099C\u09A8\u0995 \u09B8\u09AE\u09AF\u09BC \u09AC\u09BE\u099B\u0995 \u0986\u09F0\u09C1 \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE \u09A8\u0995\u09F0\u09BE\u0995\u09C8 \u09F0\u09C7\u09B6\u09A8 \u09B2\u0993\u0995\u0964",
  recentNotifications: "\u09B8\u09BE\u09AE\u09CD\u09AA\u09CD\u09F0\u09A4\u09BF\u0995 \u0985\u09A7\u09BF\u09B8\u09C2\u099A\u09A8\u09BE",
  quickActions: "\u09A6\u09CD\u09F0\u09C1\u09A4 \u0995\u09BE\u09F0\u09CD\u09AF",
  bookCollection: "\u09B8\u0982\u0997\u09CD\u09F0\u09B9 \u09B8\u09CD\u09B2\u099F \u09AC\u09C1\u0995 \u0995\u09F0\u0995",
  bookCollectionDesc: "\u0986\u09AA\u09CB\u09A8\u09BE\u09F0 \u09A6\u09CB\u0995\u09BE\u09A8, \u09A4\u09BE\u09F0\u09BF\u0996 \u0986\u09F0\u09C1 \u09B8\u09C1\u09AC\u09BF\u09A7\u09BE\u099C\u09A8\u0995 \u09B8\u09AE\u09AF\u09BC \u09A8\u09BF\u09F0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09F0\u0995\u0964",
  chooseShop: "\u09A6\u09CB\u0995\u09BE\u09A8 \u09A8\u09BF\u09F0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09F0\u0995",
  selectSlot: "\u09B8\u09CD\u09B2\u099F \u09A8\u09BF\u09F0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09F0\u0995",
  confirm: "\u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09F0\u0995",
  continueBtn: "\u099A\u09BE\u09B2\u09BF\u09AF\u09BC\u09C7 \u09AF\u09BE\u0993\u0995",
  back: "\u09AA\u09BF\u099B\u09B2\u09C8",
  editSlot: "\u09B8\u09CD\u09B2\u099F \u09B8\u09B2\u09A8\u09BF \u0995\u09F0\u0995",
  chooseDate: "\u09A4\u09BE\u09F0\u09BF\u0996 \u09A8\u09BF\u09F0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09F0\u0995",
  availableSlots: "\u0989\u09AA\u09B2\u09AC\u09CD\u09A7 \u09B8\u09AE\u09AF\u09BC \u09B8\u09CD\u09B2\u099F",
  reviewConfirm: "\u09AA\u09C1\u09A8\u09F0\u09C0\u0995\u09CD\u09B7\u09A3 \u0986\u09F0\u09C1 \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09F0\u0995",
  reviewDesc: "\u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09F0\u09BE\u09F0 \u0986\u0997\u09A4\u09C7 \u09AC\u09BF\u09F1\u09F0\u09A3 \u09AA\u09F0\u09C0\u0995\u09CD\u09B7\u09BE \u0995\u09F0\u0995\u0964",
  confirmBooking: "\u09AC\u09C1\u0995\u09BF\u0982 \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09F0\u0995",
  noBooking: "\u0995\u09CB\u09A8\u09CB \u0986\u0997\u09A8\u09CD\u09A4\u09C1\u0995 \u09AC\u09C1\u0995\u09BF\u0982 \u09A8\u09BE\u0987",
  noBookingDesc: "\u09AA\u0982\u0995\u09CD\u09A4\u09BF \u098F\u09F0\u09BF\u09AC\u09B2\u09C8 \u098F\u099F\u09BE \u09B8\u0982\u0997\u09CD\u09F0\u09B9 \u09B8\u09CD\u09B2\u099F \u09AC\u09C1\u0995 \u0995\u09F0\u0995\u0964",
  updatesTitle: "\u0985\u09A7\u09BF\u09B8\u09C2\u099A\u09A8\u09BE",
  updatesDesc: "\u0986\u09AA\u09CB\u09A8\u09BE\u09F0 \u09F0\u09C7\u09B6\u09A8 \u0986\u09F0\u09C1 \u09AC\u09C1\u0995\u09BF\u0982 \u09B8\u09AE\u09CD\u09AA\u09F0\u09CD\u0995\u09C7 \u0997\u09C1\u09F0\u09C1\u09A4\u09CD\u09AC\u09AA\u09C2\u09B0\u09CD\u09A3 \u0986\u09AA\u09A1\u09C7\u099F\u0964",
  accountTitle: "\u09AE\u09CB\u09F0 \u09AA\u09CD\u09F0'\u09AB\u09BE\u0987\u09B2",
  accountDesc: "\u0986\u09AA\u09CB\u09A8\u09BE\u09F0 \u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF\u0997\u09A4 \u0986\u09F0\u09C1 \u09F0\u09C7\u09B6\u09A8 \u0995\u09BE\u09F0\u09CD\u09A1 \u09A4\u09A5\u09CD\u09AF \u09AA\u09F0\u09BF\u099A\u09BE\u09B2\u09A8\u09BE \u0995\u09F0\u0995\u0964",
  viewAs: "\u09B9\u09BF\u099A\u09BE\u09AA\u09C7 \u099A\u09BE\u0993\u0995",
  languageBtn: "\u09AD\u09BE\u09B7\u09BE",
  citizen: "\u09A8\u09BE\u0997\u09F0\u09BF\u0995",
  shopkeeper: "\u09A6\u09CB\u0995\u09BE\u09A8\u09C0",
  administrator: "\u09AA\u09CD\u09F0\u09B6\u09BE\u09B8\u0995",
  helpSupport: "\u09B8\u09B9\u09BE\u09AF\u09BC",
  helpSupportBtn: "\u09B8\u09B9\u09BE\u09AF\u09BC",
  needHelp: "\u09B8\u09B9\u09BE\u09AF\u09BC \u09B2\u09BE\u0997\u09C7 \u09A8\u09C7\u0995\u09BF?"
});
i18n.te = i18n.te;
var LANG_OPTIONS = [
  { code: "en", label: "English" },
  { code: "hi", label: "\u0939\u093F\u0928\u094D\u0926\u0940" },
  { code: "bn", label: "\u09AC\u09BE\u0982\u09B2\u09BE" },
  { code: "ta", label: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD" },
  { code: "te", label: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41" },
  { code: "mr", label: "\u092E\u0930\u093E\u0920\u0940" },
  { code: "gu", label: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0" },
  { code: "kn", label: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1" },
  { code: "ml", label: "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02" },
  { code: "pa", label: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40" },
  { code: "or", label: "\u0B13\u0B21\u0B3C\u0B3F\u0B06" },
  { code: "ur", label: "\u0627\u0631\u062F\u0648" },
  { code: "as", label: "\u0985\u09B8\u09AE\u09C0\u09AF\u09BC\u09BE" }
];
var getLangLabel = (code) => LANG_OPTIONS.find((option) => option.code === code)?.label || code;
var SLOTS = [
  { time: "09:00 AM", left: 5 },
  { time: "09:30 AM", left: 0 },
  { time: "10:00 AM", left: 3 },
  { time: "10:30 AM", left: 8 },
  { time: "11:00 AM", left: 2 },
  { time: "11:30 AM", left: 0 },
  { time: "12:00 PM", left: 6 },
  { time: "02:00 PM", left: 4 }
];
var DAYS = [
  { day: "MON", date: "29", label: "29 Jun", note: "Today" },
  { day: "TUE", date: "30", label: "30 Jun", note: "Tomorrow" },
  { day: "WED", date: "01", label: "01 Jul", note: "Available" },
  { day: "THU", date: "02", label: "02 Jul", note: "Available" },
  { day: "FRI", date: "03", label: "03 Jul", note: "Available" }
];
var SHOP_BOOKINGS = [
  { time: "09:00 AM", id: "SR-48265", name: "Neha Verma", card: "DL \u2022\u2022\u2022\u2022 1902", status: "Waiting" },
  { time: "09:00 AM", id: "SR-48268", name: "Arun Kumar", card: "DL \u2022\u2022\u2022\u2022 7338", status: "Waiting" },
  { time: "09:30 AM", id: "SR-48271", name: "Maya Devi", card: "DL \u2022\u2022\u2022\u2022 5129", status: "Arrived" },
  { time: "10:00 AM", id: "SR-48291", name: "Ravi Sharma", card: "DL \u2022\u2022\u2022\u2022 4821", status: "Upcoming" },
  { time: "10:00 AM", id: "SR-48296", name: "Imran Khan", card: "DL \u2022\u2022\u2022\u2022 2904", status: "Upcoming" },
  { time: "10:30 AM", id: "SR-48302", name: "Priya Singh", card: "DL \u2022\u2022\u2022\u2022 3310", status: "Upcoming" }
];
var CHART_DATA = [
  { day: "Mon", bookings: 62, completed: 50 },
  { day: "Tue", bookings: 75, completed: 61 },
  { day: "Wed", bookings: 68, completed: 58 },
  { day: "Thu", bookings: 88, completed: 72 },
  { day: "Fri", bookings: 78, completed: 64 },
  { day: "Sat", bookings: 54, completed: 44 },
  { day: "Sun", bookings: 42, completed: 34 }
];
var NOTIFICATIONS = [
  { icon: "\u{1F4E6}", type: "success", title: "Ration stock is now available", msg: "Your June allocation is ready at Shastri Nagar Fair Price Shop.", time: "Today \xB7 8:30 AM", unread: true },
  { icon: "\u{1F4C5}", type: "info", title: "Book early to avoid the rush", msg: "Morning collection slots for this week are filling up fast.", time: "Yesterday \xB7 4:15 PM", unread: true },
  { icon: "\u{1F4E2}", type: "amber", title: "Shop holiday notice", msg: "Your ration shop will remain closed on Sunday, 5 July.", time: "27 Jun \xB7 10:00 AM", unread: true },
  { icon: "\u2705", type: "success", title: "Ration collected successfully", msg: "Your May 2026 ration collection was completed.", time: "04 Jun \xB7 11:22 AM", unread: false }
];
var AUTH_USERS = {
  citizen: { name: "Ravi Sharma", password: "citizen123", role: "citizen" },
  shopkeeper: { name: "Suresh Kumar", password: "shopkeeper123", role: "shopkeeper" },
  admin: { name: "Anita Kapoor", password: "admin123", role: "admin" }
};
var AppCtx = createContext(null);
var useApp = () => useContext(AppCtx);
var Icon = ({ name, size = 18, color = "currentColor", ...p }) => {
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
    checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3"
  };
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      ...p
    },
    (paths[name] || "").split(" M").map((d, i) => /* @__PURE__ */ React.createElement("path", { key: i, d: i === 0 ? d : "M" + d }))
  );
};
var Avatar = ({ initials, size = 36, color = T.teal, bg = T.tealLight }) => /* @__PURE__ */ React.createElement("div", { style: {
  width: size,
  height: size,
  borderRadius: "50%",
  background: bg,
  color,
  fontSize: size * 0.32,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  letterSpacing: "0.5px"
} }, initials);
var Badge = ({ children, color = T.teal, bg = T.tealLight }) => /* @__PURE__ */ React.createElement("span", { style: {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "3px 8px",
  borderRadius: 20,
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.4px",
  color,
  background: bg
} }, children);
var StatusBadge = ({ status }) => {
  const map = {
    Waiting: { color: T.amber, bg: T.amberLight },
    Arrived: { color: T.green, bg: T.greenLight },
    Upcoming: { color: T.blue, bg: T.blueLight },
    Active: { color: T.green, bg: T.greenLight }
  };
  const s = map[status] || map.Upcoming;
  return /* @__PURE__ */ React.createElement(Badge, { color: s.color, bg: s.bg }, status);
};
var Toast = ({ toast }) => {
  if (!toast) return null;
  const colors = { success: T.green, info: T.blue, error: T.red };
  return /* @__PURE__ */ React.createElement("div", { role: "alert", "aria-live": "polite", style: {
    position: "fixed",
    bottom: 28,
    left: "50%",
    transform: "translateX(-50%)",
    background: T.ink,
    color: "#fff",
    borderRadius: 10,
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    zIndex: 9999,
    boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
    fontSize: 13,
    fontWeight: 500,
    whiteSpace: "nowrap"
  } }, /* @__PURE__ */ React.createElement("span", { style: { color: colors[toast.type] || T.green } }, /* @__PURE__ */ React.createElement(Icon, { name: toast.type === "error" ? "x" : "checkCircle", size: 16, color: "currentColor" })), toast.message);
};
var Skeleton = ({ w = "100%", h = 16, r = 6 }) => /* @__PURE__ */ React.createElement("div", { style: {
  width: w,
  height: h,
  borderRadius: r,
  background: T.line,
  animation: "shimmer 1.4s infinite"
} });
var Brand = ({ compact = false }) => {
  const { t } = useApp();
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("img", { src: "./smart-ration.png", alt: "Smart Ration logo", style: { width: 40, height: 40, borderRadius: 12, objectFit: "cover", boxShadow: "0 12px 28px rgba(15,23,42,0.12)" } }), !compact && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 15, color: T.ink, letterSpacing: "-0.4px" } }, t.appName), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: T.muted, marginTop: 1 } }, t.tagline)));
};
var CitizenSidebar = ({ view, setView, open, onClose }) => {
  const { t, notifCount, logout: logout2 } = useApp();
  const navItems = [
    { id: "home", icon: "home", label: t.home },
    { id: "book", icon: "calendar", label: t.bookSlot },
    { id: "booking", icon: "qr", label: t.myBooking },
    { id: "notifications", icon: "bell", label: t.notifications, badge: notifCount },
    { id: "profile", icon: "user", label: t.profile }
  ];
  return /* @__PURE__ */ React.createElement(React.Fragment, null, open && /* @__PURE__ */ React.createElement("div", { onClick: onClose, style: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.45)",
    zIndex: 29
  }, "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("aside", { role: "navigation", "aria-label": "Main navigation", style: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    width: 260,
    background: T.white,
    borderRight: `1px solid ${T.line}`,
    display: "flex",
    flexDirection: "column",
    padding: "0 14px",
    zIndex: 30,
    transform: open ? "none" : "translateX(-100%)",
    transition: "transform 0.22s ease"
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", height: 78, padding: "0 8px" } }, /* @__PURE__ */ React.createElement(Brand, null), /* @__PURE__ */ React.createElement("button", { onClick: onClose, "aria-label": "Close menu", style: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 6,
    borderRadius: 8,
    color: T.slate
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "x", size: 18, color: "currentColor" }))), /* @__PURE__ */ React.createElement("div", { style: { margin: "0 8px 18px", padding: 16, borderRadius: 18, background: T.tealLight, border: `1px solid ${T.teal}` } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", margin: 0, color: T.tealDark } }, t.rationReady), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16, fontWeight: 800, margin: "10px 0 4px", color: T.ink } }, "Collect before 05 Jul"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: T.slate, margin: 0 } }, t.atShop, " Shastri Nagar FPS")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 9.5, fontWeight: 800, letterSpacing: "1.2px", color: T.muted, padding: "0 10px 6px" } }, "QUICK ACCESS"), /* @__PURE__ */ React.createElement("nav", null, navItems.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      onClick: () => {
        setView(item.id);
        onClose();
      },
      "aria-current": view === item.id ? "page" : void 0,
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        background: view === item.id ? T.tealLight : "transparent",
        color: view === item.id ? T.tealDark : T.slate,
        fontWeight: view === item.id ? 700 : 500,
        fontSize: 13,
        textAlign: "left",
        marginBottom: 4,
        transition: "all 0.14s"
      }
    },
    /* @__PURE__ */ React.createElement(Icon, { name: item.icon, size: 18, color: "currentColor" }),
    /* @__PURE__ */ React.createElement("span", { style: { flex: 1 } }, item.label),
    item.badge > 0 && /* @__PURE__ */ React.createElement("span", { style: {
      background: T.red,
      color: "#fff",
      fontSize: 10,
      fontWeight: 700,
      borderRadius: 10,
      padding: "1px 6px"
    } }, item.badge)
  ))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "auto", margin: "auto 8px 16px", background: T.tealLight, borderRadius: 14, padding: 16, color: T.tealDark } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement(Icon, { name: "help", size: 18, color: T.teal }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 11, marginBottom: 4 } }, t.needHelp), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: T.slate, margin: 0, lineHeight: 1.5 } }, "Call 1800-111-155 or visit your linked FPS.")))), /* @__PURE__ */ React.createElement("button", { onClick: logout2, style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 10px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: T.slate,
    fontWeight: 600,
    fontSize: 12,
    borderRadius: 0
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "logout", size: 16, color: "currentColor" }), t.logout), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: T.muted, textAlign: "center", paddingBottom: 10 } }, "Premium dashboard")));
};
var Topbar = ({ onMenu }) => {
  const { role, setRole, setLang, lang, t, notifCount, setView, user, logout: logout2 } = useApp();
  const initials = user?.name?.split(" ").map((w) => w[0]).join("") || "RS";
  return /* @__PURE__ */ React.createElement("header", { className: "premium-topbar", style: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "rgba(255,255,255,0.98)",
    backdropFilter: "blur(14px)",
    borderBottom: `1px solid ${T.line}`,
    display: "flex",
    alignItems: "center",
    height: 72,
    padding: "0 24px",
    gap: 14
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: onMenu, "aria-label": "Open navigation menu", style: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 8,
    borderRadius: 10,
    color: T.slate,
    display: "flex"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "menu", size: 20, color: "currentColor" })), /* @__PURE__ */ React.createElement(Brand, { compact: true })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 12, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: T.bg,
    border: `1px solid ${T.line}`,
    borderRadius: 16,
    padding: "10px 14px"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "search", size: 16, color: T.muted }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "search",
      placeholder: "Ask Smart Ration or find a shop",
      "aria-label": "Search or ask the assistant",
      style: {
        width: "100%",
        background: "transparent",
        border: "none",
        outline: "none",
        color: T.ink,
        fontSize: 13,
        fontWeight: 500
      }
    }
  )), /* @__PURE__ */ React.createElement(Badge, { color: T.tealDark, bg: T.tealLight }, t.readyToCollect)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: T.muted } }, t.viewAs), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: role,
      onChange: (e) => setRole(e.target.value),
      "aria-label": "Switch demo role",
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: T.ink,
        background: T.bg,
        border: `1px solid ${T.line}`,
        borderRadius: 10,
        padding: "6px 22px 6px 10px",
        cursor: "pointer",
        appearance: "none"
      }
    },
    /* @__PURE__ */ React.createElement("option", { value: "citizen" }, t.citizen),
    /* @__PURE__ */ React.createElement("option", { value: "shopkeeper" }, t.shopkeeper),
    /* @__PURE__ */ React.createElement("option", { value: "admin" }, t.administrator)
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 3, minWidth: 110 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: T.muted, textAlign: "right" } }, LANG_OPTIONS.length, " languages"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: lang,
      onChange: (e) => setLang(e.target.value),
      "aria-label": "Switch language",
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "6px 10px",
        background: T.bg,
        border: `1px solid ${T.line}`,
        borderRadius: 10,
        cursor: "pointer",
        color: T.slate,
        fontSize: 11,
        fontWeight: 600
      }
    },
    LANG_OPTIONS.map((option) => /* @__PURE__ */ React.createElement("option", { key: option.code, value: option.code }, option.label))
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setView && setView("notifications"),
      "aria-label": `Notifications, ${notifCount} unread`,
      style: {
        position: "relative",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 8,
        borderRadius: 10,
        color: T.slate,
        display: "flex"
      }
    },
    /* @__PURE__ */ React.createElement(Icon, { name: "bell", size: 20, color: "currentColor" }),
    notifCount > 0 && /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true", style: {
      position: "absolute",
      top: 4,
      right: 4,
      width: 8,
      height: 8,
      background: T.red,
      borderRadius: "50%",
      border: `2px solid ${T.white}`
    } })
  ), /* @__PURE__ */ React.createElement(Avatar, { initials, size: 34 }), /* @__PURE__ */ React.createElement("button", { onClick: logout2, style: {
    background: T.bg,
    border: `1px solid ${T.line}`,
    borderRadius: 10,
    padding: "8px 12px",
    color: T.slate,
    cursor: "pointer",
    fontSize: 11,
    fontWeight: 700
  } }, "Logout")));
};
var PageIntro = ({ eyebrow, title, desc, onBack }) => /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, onBack && /* @__PURE__ */ React.createElement("button", { onClick: onBack, style: {
  display: "flex",
  alignItems: "center",
  gap: 4,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: T.teal,
  fontSize: 12,
  fontWeight: 600,
  padding: "0 0 12px",
  marginBottom: 4
} }, /* @__PURE__ */ React.createElement(Icon, { name: "chevronL", size: 16, color: "currentColor" }), " Back"), eyebrow && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 9.5, fontWeight: 800, letterSpacing: "1.4px", color: T.teal, margin: "0 0 5px" } }, eyebrow), /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 26, fontWeight: 800, letterSpacing: "-0.6px", color: T.ink, margin: "0 0 5px" } }, title), desc && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: T.slate, margin: 0 } }, desc));
var StatCard = ({ icon, iconColor, iconBg, label, value, sub, subColor, action, onAction, loading, delay = 0 }) => /* @__PURE__ */ React.createElement("div", { className: "premium-surface", style: {
  background: T.white,
  border: `1px solid ${T.line}`,
  borderRadius: 16,
  padding: "18px 20px",
  display: "flex",
  gap: 14,
  alignItems: "flex-start",
  boxShadow: "0 10px 28px rgba(15,23,42,0.04)",
  animation: `riseIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both`,
  animationDelay: `${delay}ms`
} }, /* @__PURE__ */ React.createElement("div", { style: {
  width: 44,
  height: 44,
  borderRadius: 11,
  background: iconBg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)"
} }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 20, color: iconColor })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, loading ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Skeleton, { h: 10, w: "60%" }), /* @__PURE__ */ React.createElement("div", { style: { height: 6 } }), /* @__PURE__ */ React.createElement(Skeleton, { h: 18, w: "80%" })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 9, fontWeight: 800, letterSpacing: "0.8px", color: T.muted, margin: "0 0 6px" } }, label), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 17, fontWeight: 800, color: T.ink, margin: "0 0 5px" } }, value), sub && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: subColor || T.muted, margin: 0 } }, sub), action && /* @__PURE__ */ React.createElement("button", { onClick: onAction, style: {
  display: "inline-flex",
  alignItems: "center",
  gap: 3,
  marginTop: 5,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: T.blue,
  fontSize: 10,
  fontWeight: 700,
  padding: 0
} }, action, " ", /* @__PURE__ */ React.createElement(Icon, { name: "arrowUR", size: 13, color: "currentColor" })))));
var HomeView = () => {
  const { t, setView, showToast: showToast2 } = useApp();
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const loadingTimerRef = useRef(null);
  const hour = (/* @__PURE__ */ new Date()).getHours();
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
    showToast2({ message: "Workspace refreshed", type: "info" });
  };
  const askAssistant = (text) => {
    if (!text.trim()) return;
    const next = text.toLowerCase();
    if (next.includes("book")) setView("book");
    else if (next.includes("token") || next.includes("booking")) setView("booking");
    else if (next.includes("profile") || next.includes("family")) setView("profile");
    else setView("notifications");
    showToast2({ message: `Assistant opened: ${text}`, type: "info" });
    setPrompt("");
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "8px 0 24px",
    position: "relative"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    inset: "-20px -40px auto",
    height: 240,
    pointerEvents: "none",
    opacity: 0.85,
    background: "radial-gradient(circle at 18% 12%, rgba(20,148,142,0.18), transparent 30%), radial-gradient(circle at 82% 8%, rgba(29,78,216,0.16), transparent 26%), radial-gradient(circle at 55% 0%, rgba(16,185,129,0.10), transparent 22%)",
    filter: "blur(10px)"
  } }), /* @__PURE__ */ React.createElement(PageIntro, { eyebrow: `MONDAY, 29 JUNE`, title: t.rationReady, desc: t.rationReadyDesc }), /* @__PURE__ */ React.createElement("div", { style: {
    background: `linear-gradient(135deg, rgba(8,84,80,0.98) 0%, rgba(20,148,142,0.92) 44%, rgba(29,78,216,0.85) 100%)`,
    borderRadius: 24,
    color: "#fff",
    padding: "28px 30px",
    marginBottom: 22,
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 24px 70px rgba(15,23,42,0.18)",
    animation: "riseIn 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) both"
  } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1.4fr 0.95fr", gap: 20, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 } }, /* @__PURE__ */ React.createElement(Badge, { color: "#dafaf7", bg: "rgba(255,255,255,0.12)" }, t.rationReady), /* @__PURE__ */ React.createElement(Badge, { color: "#dbeafe", bg: "rgba(255,255,255,0.10)" }, "June allocation")), /* @__PURE__ */ React.createElement("h2", { style: { fontWeight: 800, fontSize: 34, lineHeight: 1.03, margin: "0 0 12px", letterSpacing: "-0.9px" } }, "Your ration is ready. Collect it on time."), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "rgba(237, 247, 247, 0.95)", margin: "0 0 24px", maxWidth: 560 } }, "Track your collection window, check latest slots, and open your digital token from one premium dashboard."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12, marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(255,255,255,0.12)", borderRadius: 18, padding: 18, border: "1px solid rgba(255,255,255,0.14)" } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", margin: 0 } }, "Next slot"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 22, fontWeight: 800, margin: "10px 0 4px" } }, "10:30 AM"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: "rgba(255,255,255,0.78)", margin: 0 } }, "Best window today")), /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(255,255,255,0.12)", borderRadius: 18, padding: 18, border: "1px solid rgba(255,255,255,0.14)" } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", margin: 0 } }, "Family covered"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 22, fontWeight: 800, margin: "10px 0 4px" } }, "4 members"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: "rgba(255,255,255,0.78)", margin: 0 } }, "Verified ration card"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setView("book"), style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 18px",
    background: "#fff",
    color: T.tealDark,
    border: "none",
    borderRadius: 16,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 800,
    boxShadow: "0 10px 24px rgba(15,23,42,0.18)"
  } }, t.bookSlot, " ", /* @__PURE__ */ React.createElement(Icon, { name: "chevronR", size: 16, color: "currentColor" })), /* @__PURE__ */ React.createElement("button", { onClick: () => setView("booking"), style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 18px",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.22)",
    borderRadius: 16,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700
  } }, t.viewDigitalToken))), /* @__PURE__ */ React.createElement("div", { className: "premium-surface", style: {
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: 20,
    padding: 22,
    backdropFilter: "blur(12px)",
    boxShadow: "0 18px 36px rgba(8,15,35,0.14)"
  } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, letterSpacing: "1.2px", margin: "0 0 6px", color: "rgba(255,255,255,0.72)", fontWeight: 800 } }, "AI assistant"), /* @__PURE__ */ React.createElement("h3", { style: { margin: 0, fontSize: 18, fontWeight: 800 } }, "Quick actions")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "14px", background: "rgba(255,255,255,0.12)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.16)" } }, /* @__PURE__ */ React.createElement(Icon, { name: "scan", size: 18, color: "#fff" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: prompt,
      onChange: (e) => setPrompt(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") askAssistant(prompt);
      },
      placeholder: "Ask the assistant what to do next",
      style: {
        width: "100%",
        background: "transparent",
        border: "none",
        outline: "none",
        color: "#fff",
        fontSize: 13,
        fontWeight: 500
      }
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 10, marginTop: 18 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => askAssistant(prompt || "Book my slot"), style: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    background: T.teal,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700
  } }, "Open assistant"), /* @__PURE__ */ React.createElement("button", { onClick: () => setView("notifications"), style: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.16)",
    color: "#fff",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700
  } }, "Review notifications")))), /* @__PURE__ */ React.createElement("div", { className: "hero-orb", style: {
    position: "absolute",
    inset: "auto -40px -60px auto",
    width: 240,
    height: 240,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 55%, transparent 70%)"
  } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 15, fontWeight: 800, margin: 0, color: T.ink } }, t.atAGlance), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: T.muted, margin: "4px 0 0" } }, "Priority cards keep the rest out of the way.")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: refreshDashboard,
      className: "premium-button",
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "#fff",
        border: `1px solid ${T.line}`,
        cursor: "pointer",
        color: T.teal,
        fontSize: 11,
        fontWeight: 700,
        padding: "9px 12px",
        borderRadius: 999,
        boxShadow: "0 10px 22px rgba(15,23,42,0.04)"
      }
    },
    /* @__PURE__ */ React.createElement(Icon, { name: "refresh", size: 14, color: "currentColor" }),
    " ",
    t.refresh
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginBottom: 22 } }, /* @__PURE__ */ React.createElement(
    StatCard,
    {
      loading,
      delay: 0,
      icon: "package",
      iconColor: T.green,
      iconBg: T.greenLight,
      label: t.rationStatus,
      value: t.readyToCollect,
      sub: `\u25CF ${t.stockAvailable}`,
      subColor: T.green
    }
  ), /* @__PURE__ */ React.createElement(
    StatCard,
    {
      loading,
      delay: 90,
      icon: "calendar",
      iconColor: T.blue,
      iconBg: T.blueLight,
      label: t.nextBooking,
      value: t.noSlotBooked,
      action: t.bookNow,
      onAction: () => setView("book")
    }
  ), /* @__PURE__ */ React.createElement(
    StatCard,
    {
      loading,
      delay: 180,
      icon: "users",
      iconColor: T.amber,
      iconBg: T.amberLight,
      label: t.familyMembers,
      value: "4 Members",
      sub: "3 adults \xB7 1 child"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "premium-surface", style: {
    background: "rgba(255,255,255,0.86)",
    border: `1px solid rgba(226,232,240,0.9)`,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "18px 20px",
    marginBottom: 22,
    flexWrap: "wrap",
    boxShadow: "0 18px 44px rgba(15,23,42,0.06)",
    backdropFilter: "blur(10px)",
    animation: "riseIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both",
    animationDelay: "120ms"
  } }, /* @__PURE__ */ React.createElement("div", { style: { width: 46, height: 46, borderRadius: 14, background: "linear-gradient(135deg, #ecfeff 0%, #dbeafe 100%)", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(Icon, { name: "zap", size: 20, color: T.teal })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 180 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 14, fontWeight: 800, margin: "0 0 4px", color: T.ink } }, t.skipQueue), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: T.slate, margin: 0 } }, t.skipQueueDesc)), /* @__PURE__ */ React.createElement("button", { onClick: () => setView("book"), className: "premium-button", style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    padding: "11px 16px",
    background: `linear-gradient(135deg, ${T.teal} 0%, ${T.tealMid} 100%)`,
    color: "#fff",
    border: "none",
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 800,
    boxShadow: "0 12px 26px rgba(11,110,106,0.22)"
  } }, t.bookSlot, " ", /* @__PURE__ */ React.createElement(Icon, { name: "chevronR", size: 16, color: "currentColor" }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 16, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { className: "premium-surface", style: {
    background: "rgba(255,255,255,0.86)",
    border: `1px solid rgba(226,232,240,0.9)`,
    borderRadius: 20,
    boxShadow: "0 18px 44px rgba(15,23,42,0.06)",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
    animation: "riseIn 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both",
    animationDelay: "180ms"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: `1px solid ${T.line}`
  } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 14, fontWeight: 800, margin: 0, color: T.ink } }, t.recentNotifications), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: "3px 0 0" } }, "Signals the assistant should surface first.")), /* @__PURE__ */ React.createElement("button", { onClick: () => setView("notifications"), style: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: T.teal,
    fontSize: 11,
    fontWeight: 800
  } }, "View all")), NOTIFICATIONS.slice(0, 2).map((n, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    display: "flex",
    gap: 12,
    padding: "15px 20px",
    borderBottom: i < 1 ? `1px solid ${T.line}` : "none",
    position: "relative"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 40,
    height: 40,
    borderRadius: 12,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: n.type === "success" ? T.greenLight : n.type === "info" ? T.blueLight : T.amberLight,
    fontSize: 16
  } }, n.icon), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, fontWeight: 800, margin: "0 0 3px", color: T.ink } }, n.title), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.slate, margin: "0 0 4px", lineHeight: 1.5 } }, n.msg), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 9, color: T.muted, margin: 0 } }, n.time)), n.unread && /* @__PURE__ */ React.createElement("span", { style: {
    position: "absolute",
    right: 18,
    top: 18,
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: T.blue
  }, "aria-label": "Unread" })))), /* @__PURE__ */ React.createElement("div", { className: "premium-surface", style: {
    background: "rgba(255,255,255,0.86)",
    border: `1px solid rgba(226,232,240,0.9)`,
    borderRadius: 20,
    boxShadow: "0 18px 44px rgba(15,23,42,0.06)",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
    animation: "riseIn 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both",
    animationDelay: "260ms"
  } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 20px", borderBottom: `1px solid ${T.line}` } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 14, fontWeight: 800, margin: 0, color: T.ink } }, t.quickActions), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: "3px 0 0" } }, "Guided actions with one-step completion.")), [
    { icon: "qr", title: t.viewDigitalToken, sub: t.showAtShop, action: () => setView("booking") },
    { icon: "card", title: t.rationCardDetails, sub: t.viewFamily, action: () => setView("profile") },
    { icon: "help", title: t.helpSupport, sub: "1800-111-155", action: () => showToast2({ message: "Helpline number copied", type: "info" }) }
  ].map((item, i) => /* @__PURE__ */ React.createElement("button", { key: i, onClick: item.action, style: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 20px",
    background: "transparent",
    border: "none",
    borderBottom: i < 2 ? `1px solid ${T.line}` : "none",
    cursor: "pointer",
    textAlign: "left"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 36,
    height: 36,
    borderRadius: 11,
    background: "linear-gradient(135deg, rgba(20,148,142,0.12) 0%, rgba(29,78,216,0.08) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: item.icon, size: 16, color: T.teal })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, fontWeight: 800, margin: "0 0 2px", color: T.ink } }, item.title), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: 0 } }, item.sub)), /* @__PURE__ */ React.createElement(Icon, { name: "chevronR", size: 15, color: T.muted }))))));
};
var Stepper = ({ step }) => {
  const { t } = useApp();
  const steps = [t.chooseShop, t.selectSlot, t.confirm];
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", marginBottom: 24, gap: 0 } }, steps.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: s, style: { display: "flex", flex: 1, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap" } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    fontWeight: 700,
    background: step > i + 1 ? T.teal : step === i + 1 ? T.teal : T.line,
    color: step >= i + 1 ? "#fff" : T.muted,
    transition: "all 0.2s"
  } }, step > i + 1 ? /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 13, color: "#fff" }) : i + 1), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 600, color: step >= i + 1 ? T.teal : T.muted } }, s)), i < 2 && /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 1, background: step > i + 1 ? T.teal : T.line, margin: "0 8px", transition: "background 0.3s" } }))));
};
var BookView = () => {
  const { t, showToast: showToast2, setView, setBooking, booking } = useApp();
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
    setBooking({ date, time, id: "SR-2026-48291", shop: "Shastri Nagar Fair Price Shop" });
    setView("booking");
    showToast2({ message: "Slot confirmed! Show QR at the shop.", type: "success" });
  };
  return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(PageIntro, { title: t.bookCollection, desc: t.bookCollectionDesc, onBack: () => setView("home") }), /* @__PURE__ */ React.createElement(Stepper, { step }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "minmax(0,1fr) 250px", gap: 18, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.white, border: `1px solid ${T.line}`, borderRadius: 14, padding: "24px 26px" } }, step === 1 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 28,
    height: 28,
    borderRadius: 7,
    background: T.tealLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: T.teal,
    fontWeight: 800,
    fontSize: 12,
    flexShrink: 0
  } }, "1"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 700, margin: "0 0 3px", color: T.ink } }, "Choose your ration shop"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: T.muted, margin: 0 } }, "Your linked shop is selected automatically."))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 } }, [{ label: t.state, value: "Delhi" }, { label: t.district, value: "Central Delhi" }].map((f) => /* @__PURE__ */ React.createElement("label", { key: f.label, style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: T.slate, letterSpacing: "0.5px", display: "block", marginBottom: 6 } }, f.label.toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: {
    border: `1px solid ${T.line}`,
    borderRadius: 8,
    padding: "9px 12px",
    background: T.bg,
    display: "flex",
    alignItems: "center",
    gap: 8
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "map", size: 14, color: T.muted }), /* @__PURE__ */ React.createElement("select", { defaultValue: f.value, style: { background: "transparent", border: "none", fontSize: 12, color: T.ink, flex: 1, outline: "none" } }, /* @__PURE__ */ React.createElement("option", null, f.value)))))), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: T.slate, letterSpacing: "0.5px", display: "block", marginBottom: 8 } }, "RATION SHOP"), /* @__PURE__ */ React.createElement("div", { style: {
    border: `1.5px solid ${T.teal}`,
    borderRadius: 11,
    padding: "14px 16px",
    background: T.tealLight,
    display: "flex",
    gap: 12,
    alignItems: "center"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    border: `2px solid ${T.teal}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement("div", { style: { width: 4, height: 4, borderRadius: "50%", background: T.teal } })), /* @__PURE__ */ React.createElement("div", { style: {
    width: 38,
    height: 38,
    borderRadius: 9,
    background: "#d2f0ed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "store", size: 18, color: T.teal })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("p", { style: { fontWeight: 700, fontSize: 13, margin: "0 0 3px", color: T.tealDark } }, "Shastri Nagar Fair Price Shop"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.slate, margin: "0 0 5px" } }, "FPS ID: DL-CEN-1042"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.slate, margin: 0, display: "flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement(Icon, { name: "map", size: 11, color: T.muted }), " 12, Main Market, Shastri Nagar \xB7 1.2 ", t.kmAway)), /* @__PURE__ */ React.createElement(Badge, { color: T.teal, bg: "#d2f0ed" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 10, color: T.teal }), " ", t.linkedShop))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 24, paddingTop: 18, borderTop: `1px solid ${T.line}` } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(2), style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "11px 20px",
    background: T.teal,
    color: "#fff",
    border: "none",
    borderRadius: 9,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700
  } }, t.continueBtn, " ", /* @__PURE__ */ React.createElement(Icon, { name: "chevronR", size: 15, color: "#fff" })))), step === 2 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 28, height: 28, borderRadius: 7, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.teal, fontWeight: 800, fontSize: 12, flexShrink: 0 } }, "2"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 700, margin: "0 0 3px", color: T.ink } }, "Select date & time"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: T.muted, margin: 0 } }, "Slots are available for the next 5 working days."))), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, fontWeight: 700, color: T.slate, letterSpacing: "0.5px", margin: "0 0 8px" } }, "CHOOSE A DATE"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 7, marginBottom: 22 } }, DAYS.map((d) => /* @__PURE__ */ React.createElement("button", { key: d.label, onClick: () => setDate(d.label), style: {
    padding: "10px 4px",
    border: `1.5px solid ${date === d.label ? T.teal : T.line}`,
    borderRadius: 9,
    background: date === d.label ? T.tealLight : T.white,
    cursor: "pointer",
    textAlign: "center"
  } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8, fontWeight: 800, letterSpacing: "0.6px", color: date === d.label ? T.teal : T.muted, margin: "0 0 4px" } }, d.day), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 18, fontWeight: 800, color: date === d.label ? T.teal : T.ink, margin: "0 0 3px" } }, d.date), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8, color: date === d.label ? T.teal : T.muted, margin: 0 } }, d.note)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, fontWeight: 700, color: T.slate, letterSpacing: "0.5px", margin: 0 } }, "AVAILABLE TIME SLOTS"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12 } }, [{ dot: T.teal, label: "Available" }, { dot: T.amber, label: "Filling fast" }].map((l) => /* @__PURE__ */ React.createElement("span", { key: l.label, style: { display: "flex", alignItems: "center", gap: 5, fontSize: 9, color: T.muted } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: l.dot, display: "inline-block" } }), l.label)))), errors.time && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: T.red, background: T.redLight, borderRadius: 7, padding: "8px 12px", marginBottom: 10 } }, "\u26A0 ", errors.time), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 8, marginBottom: 20 } }, SLOTS.map((s) => {
    const few = s.left > 0 && s.left <= 3;
    const full = s.left === 0;
    const sel = time === s.time;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: s.time,
        disabled: full,
        onClick: () => {
          setTime(s.time);
          setErrors({});
        },
        style: {
          border: `1.5px solid ${sel ? T.teal : few ? T.amber : T.line}`,
          borderRadius: 9,
          background: sel ? T.tealLight : full ? T.bg : T.white,
          padding: "10px 10px",
          textAlign: "left",
          cursor: full ? "not-allowed" : "pointer",
          opacity: full ? 0.55 : 1,
          display: "grid",
          gridTemplateColumns: "18px 1fr",
          alignItems: "center",
          gap: 6
        }
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "clock", size: 14, color: sel ? T.teal : T.muted }),
      /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontWeight: 700, fontSize: 11, color: sel ? T.teal : full ? T.muted : T.ink, margin: "0 0 2px", textDecoration: full ? "line-through" : "none" } }, s.time), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8, color: full ? T.muted : few ? T.amber : T.slate, margin: 0 } }, full ? t.slotFull : `${s.left} ${t.slotsLeft}`))
    );
  })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", paddingTop: 18, borderTop: `1px solid ${T.line}` } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(1), style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 16px",
    background: T.white,
    border: `1px solid ${T.line}`,
    borderRadius: 9,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    color: T.slate
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "chevronL", size: 14, color: "currentColor" }), " ", t.back), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    if (validateStep2()) setStep(3);
  }, style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "11px 20px",
    background: T.teal,
    color: "#fff",
    border: "none",
    borderRadius: 9,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700
  } }, "Review booking ", /* @__PURE__ */ React.createElement(Icon, { name: "chevronR", size: 15, color: "#fff" })))), step === 3 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 28, height: 28, borderRadius: 7, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.teal, fontWeight: 800, fontSize: 12, flexShrink: 0 } }, "3"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 700, margin: "0 0 3px", color: T.ink } }, t.reviewConfirm), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: T.muted, margin: 0 } }, t.reviewDesc))), /* @__PURE__ */ React.createElement("div", { style: { border: `1px solid ${T.line}`, borderRadius: 12, overflow: "hidden", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.bg, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, borderRadius: 8, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(Icon, { name: "store", size: 16, color: T.teal })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8, fontWeight: 800, letterSpacing: "0.5px", color: T.muted, margin: "0 0 3px" } }, "RATION SHOP"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, fontWeight: 700, margin: "0 0 2px", color: T.ink } }, "Shastri Nagar Fair Price Shop"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: 0 } }, "12, Main Market, Shastri Nagar"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } }, [
    { icon: "calendar", label: "DATE", value: `${date}, 2026` },
    { icon: "clock", label: "TIME", value: time },
    { icon: "user", label: "CARD HOLDER", value: "Ravi Sharma" },
    { icon: "card", label: "RATION CARD", value: "DL \u2022\u2022\u2022\u2022 4821" }
  ].map((row, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    display: "flex",
    gap: 10,
    padding: "14px 16px",
    alignItems: "center",
    borderTop: `1px solid ${T.line}`,
    borderRight: i % 2 === 0 ? `1px solid ${T.line}` : "none"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: row.icon, size: 15, color: T.teal }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8, fontWeight: 800, letterSpacing: "0.5px", color: T.muted, margin: "0 0 3px" } }, row.label), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, fontWeight: 700, color: T.ink, margin: 0 } }, row.value)))))), /* @__PURE__ */ React.createElement("div", { style: {
    background: T.blueLight,
    border: `1px solid #bfdbfe`,
    borderRadius: 9,
    padding: "11px 14px",
    display: "flex",
    gap: 9,
    marginBottom: 20,
    alignItems: "flex-start"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "shield", size: 16, color: T.blue }), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: "#1e40af", margin: 0, lineHeight: 1.6 } }, /* @__PURE__ */ React.createElement("strong", null, t.slotReserved), /* @__PURE__ */ React.createElement("br", null), t.arriveEarly)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", paddingTop: 18, borderTop: `1px solid ${T.line}` } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(2), style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 16px",
    background: T.white,
    border: `1px solid ${T.line}`,
    borderRadius: 9,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    color: T.slate
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "chevronL", size: 14, color: "currentColor" }), " ", t.editSlot), /* @__PURE__ */ React.createElement("button", { onClick: confirm, style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "11px 22px",
    background: T.teal,
    color: "#fff",
    border: "none",
    borderRadius: 9,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 15, color: "#fff" }), " ", t.confirmBooking)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.white, border: `1px solid ${T.line}`, borderRadius: 14, padding: 18 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 13, fontWeight: 700, margin: "0 0 16px", color: T.ink } }, "Booking summary"), [
    { icon: "store", label: "SHOP", value: "Shastri Nagar FPS" },
    { icon: "calendar", label: "DATE", value: step > 1 ? `${date}, 2026` : "Not selected" },
    { icon: "clock", label: "TIME", value: step > 1 && time ? time : "Not selected" }
  ].map((row, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 9, margin: i > 0 ? "12px 0 0" : 0 } }, /* @__PURE__ */ React.createElement(Icon, { name: row.icon, size: 15, color: T.teal }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8, fontWeight: 800, letterSpacing: "0.5px", color: T.muted, margin: "0 0 3px" } }, row.label), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, fontWeight: 700, color: row.value.includes("Not") ? T.muted : T.ink, margin: 0 } }, row.value)))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: `1px solid ${T.line}`, marginTop: 14, paddingTop: 12 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 9, color: T.slate, margin: 0, display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement(Icon, { name: "shield", size: 13, color: T.teal }), " Secure government service"))), /* @__PURE__ */ React.createElement("div", { style: {
    background: "#fffbeb",
    border: `1px solid #fde68a`,
    borderRadius: 12,
    padding: 14,
    display: "flex",
    gap: 9
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "help", size: 16, color: T.amber }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, fontWeight: 700, margin: "0 0 4px", color: T.amber } }, "Booking help"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: "#78541a", margin: "0 0 6px", lineHeight: 1.5 } }, "Slots can be rescheduled up to 2 hours before your visit."), /* @__PURE__ */ React.createElement("a", { href: "tel:1800111155", style: { fontSize: 10, fontWeight: 700, color: "#92400e" } }, "Call 1800-111-155"))))));
};
var BookingTokenView = () => {
  const { t, booking, setView, setBooking, showToast: showToast2 } = useApp();
  if (!booking) return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 600, margin: "80px auto", textAlign: "center" } }, /* @__PURE__ */ React.createElement(PageIntro, { eyebrow: "MY BOOKING", title: t.myBookingTitle }), /* @__PURE__ */ React.createElement("div", { style: {
    background: T.white,
    border: `1px solid ${T.line}`,
    borderRadius: 16,
    padding: "48px 32px"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 64,
    height: 64,
    borderRadius: 16,
    background: T.tealLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "calendar", size: 30, color: T.teal })), /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 18, fontWeight: 700, color: T.ink, margin: "0 0 8px" } }, t.noBooking), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: T.slate, margin: "0 0 24px" } }, t.noBookingDesc), /* @__PURE__ */ React.createElement("button", { onClick: () => setView("book"), style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 22px",
    background: T.teal,
    color: "#fff",
    border: "none",
    borderRadius: 9,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700
  } }, t.bookSlot, " ", /* @__PURE__ */ React.createElement(Icon, { name: "chevronR", size: 16, color: "#fff" }))));
  return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 900, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(PageIntro, { eyebrow: "MY BOOKING", title: t.myBookingTitle, desc: t.showQR }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 260px", gap: 20, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.white, border: `1px solid ${T.line}`, borderRadius: 16, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: {
    background: T.teal,
    padding: "16px 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  } }, /* @__PURE__ */ React.createElement(Brand, null), /* @__PURE__ */ React.createElement(Badge, { color: "#fff", bg: "rgba(255,255,255,0.2)" }, /* @__PURE__ */ React.createElement(Icon, { name: "checkCircle", size: 11, color: "#fff" }), " ", t.confirmed)), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "200px 1fr", minHeight: 240 } }, /* @__PURE__ */ React.createElement("div", { style: {
    borderRight: `1.5px dashed ${T.line}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 10
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 130,
    height: 130,
    border: `2px solid ${T.ink}`,
    borderRadius: 8,
    padding: 6,
    background: T.white,
    display: "grid",
    gridTemplateColumns: "repeat(7,1fr)",
    gap: 1.5
  } }, Array.from({ length: 49 }).map((_, i) => {
    const row = Math.floor(i / 7), col = i % 7;
    const corner = row < 3 && col < 3 || row < 3 && col > 3 || row > 3 && col < 3;
    const edge = corner && (row === 0 || row === 2 || col === 0 || col === 2);
    const inner = corner && row === 1 && col === 1;
    const filled = edge || inner || Math.random() > 0.6;
    return /* @__PURE__ */ React.createElement("div", { key: i, style: { background: filled ? T.ink : "transparent", borderRadius: 1 } });
  })), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 9, color: T.muted, margin: 0, textAlign: "center" } }, "Scan at the ration shop")), /* @__PURE__ */ React.createElement("div", { style: { padding: "22px 24px" } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8, fontWeight: 800, letterSpacing: "1px", color: T.muted, margin: "0 0 4px" } }, t.bookingId), /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: T.ink, margin: "0 0 16px" } }, booking.id), /* @__PURE__ */ React.createElement("div", { style: { borderTop: `1px solid ${T.line}`, paddingTop: 14 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8, fontWeight: 800, letterSpacing: "0.8px", color: T.muted, margin: "0 0 4px" } }, "RATION SHOP"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, fontWeight: 700, margin: "0 0 3px", color: T.ink } }, booking.shop), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: "0 0 14px" } }, "12, Main Market, Shastri Nagar"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 20 } }, [{ label: "DATE", val: `${booking.date}, 2026` }, { label: "TIME", val: booking.time }].map((r) => /* @__PURE__ */ React.createElement("div", { key: r.label }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8, fontWeight: 800, letterSpacing: "0.8px", color: T.muted, margin: "0 0 4px" } }, r.label), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, fontWeight: 700, color: T.ink, margin: 0 } }, r.val))))))), /* @__PURE__ */ React.createElement("div", { style: {
    background: T.tealLight,
    padding: "11px 22px",
    display: "flex",
    alignItems: "center",
    gap: 8
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "shield", size: 14, color: T.teal }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: T.teal, fontWeight: 600 } }, t.verifiedToken))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.white, border: `1px solid ${T.line}`, borderRadius: 14, padding: 18 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 13, fontWeight: 700, margin: "0 0 14px", color: T.ink } }, "Booking actions"), [
    { icon: "download", label: t.downloadToken, action: () => showToast2({ message: "Token downloaded", type: "success" }) },
    { icon: "refresh", label: t.reschedule, action: () => setView("book") }
  ].map((a, i) => /* @__PURE__ */ React.createElement("button", { key: i, onClick: a.action, style: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "11px 14px",
    background: T.bg,
    border: `1px solid ${T.line}`,
    borderRadius: 9,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    color: T.ink,
    marginBottom: 8,
    textAlign: "left"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: a.icon, size: 15, color: T.teal }), " ", a.label)), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setBooking(null);
    showToast2({ message: "Booking cancelled", type: "info" });
  }, style: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "11px 14px",
    background: "#fff1f1",
    border: `1px solid #fecaca`,
    borderRadius: 9,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    color: T.red,
    textAlign: "left"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "x", size: 15, color: T.red }), " ", t.cancelBooking)), /* @__PURE__ */ React.createElement("div", { style: {
    background: T.white,
    border: `1px solid ${T.line}`,
    borderRadius: 12,
    padding: "14px 16px",
    display: "flex",
    gap: 12,
    alignItems: "flex-start"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "clock", size: 18, color: T.teal }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, fontWeight: 700, margin: "0 0 4px", color: T.ink } }, t.arriveNote), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.slate, margin: 0, lineHeight: 1.5 } }, t.slotHeld))))));
};
var NotificationsView = () => {
  const { t, setNotifCount } = useApp();
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState(NOTIFICATIONS);
  const filtered = filter === "unread" ? items.filter((n) => n.unread) : items;
  const markAllRead = () => {
    setItems(items.map((n) => ({ ...n, unread: false })));
    setNotifCount(0);
  };
  return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 700, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(PageIntro, { eyebrow: "UPDATES", title: t.updatesTitle, desc: t.updatesDesc }), /* @__PURE__ */ React.createElement("div", { style: { background: T.white, border: `1px solid ${T.line}`, borderRadius: 14 } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    padding: "14px 18px",
    borderBottom: `1px solid ${T.line}`,
    gap: 8,
    flexWrap: "wrap"
  } }, ["all", "unread"].map((f) => /* @__PURE__ */ React.createElement("button", { key: f, onClick: () => setFilter(f), style: {
    padding: "6px 12px",
    borderRadius: 20,
    border: "none",
    cursor: "pointer",
    fontSize: 11,
    fontWeight: 700,
    background: filter === f ? T.teal : T.bg,
    color: filter === f ? "#fff" : T.slate
  } }, f === "all" ? `${t.all} ${items.length}` : `${t.unread} ${items.filter((n) => n.unread).length}`)), /* @__PURE__ */ React.createElement("button", { onClick: markAllRead, style: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: 5,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: T.teal,
    fontSize: 11,
    fontWeight: 700
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 14, color: "currentColor" }), " ", t.markAllRead)), filtered.map((n, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    display: "flex",
    gap: 13,
    padding: "16px 20px",
    position: "relative",
    borderBottom: i < filtered.length - 1 ? `1px solid ${T.line}` : "none",
    background: n.unread ? "#fafcff" : T.white
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 38,
    height: 38,
    borderRadius: 10,
    flexShrink: 0,
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: n.type === "success" ? T.greenLight : n.type === "info" ? T.blueLight : T.amberLight
  } }, n.icon), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, fontWeight: 700, margin: "0 0 4px", color: T.ink } }, n.title), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: T.slate, margin: "0 0 5px" } }, n.msg), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: 0 } }, n.time)), n.unread && /* @__PURE__ */ React.createElement("span", { style: {
    position: "absolute",
    right: 18,
    top: 20,
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: T.blue
  }, "aria-label": "Unread" })))));
};
var ProfileView = () => {
  const { t, lang, setLang } = useApp();
  return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 900, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(PageIntro, { eyebrow: "ACCOUNT", title: t.accountTitle, desc: t.accountDesc }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.white, border: `1px solid ${T.line}`, borderRadius: 14 } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    padding: "22px 24px",
    borderBottom: `1px solid ${T.line}`
  } }, /* @__PURE__ */ React.createElement(Avatar, { initials: "RS", size: 60 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 18, fontWeight: 800, margin: "0 0 4px", color: T.ink } }, "Ravi Sharma"), /* @__PURE__ */ React.createElement(Badge, { color: T.teal, bg: T.tealLight }, /* @__PURE__ */ React.createElement(Icon, { name: "shield", size: 11, color: T.teal }), " ", t.verifiedHolder)), /* @__PURE__ */ React.createElement("button", { style: {
    padding: "8px 14px",
    background: T.bg,
    border: `1px solid ${T.line}`,
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 11,
    fontWeight: 600,
    color: T.slate
  } }, t.editProfile)), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } }, [
    { icon: "phone", label: t.mobile, value: "+91 98\u2022\u2022\u2022 \u2022\u2022210" },
    { icon: "card", label: "Ration card", value: "DL-CEN-2019-4821" },
    { icon: "map", label: t.address, value: "24-B, Shastri Nagar, New Delhi" },
    { icon: "globe", label: t.language, value: lang === "en" ? t.english : t.hindi }
  ].map((row, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    display: "flex",
    gap: 12,
    padding: "16px 24px",
    alignItems: "center",
    borderTop: `1px solid ${T.line}`,
    borderRight: i % 2 === 0 ? `1px solid ${T.line}` : "none"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: row.icon, size: 16, color: T.teal }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8, fontWeight: 800, letterSpacing: "0.6px", color: T.muted, margin: "0 0 4px" } }, row.label.toUpperCase()), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, fontWeight: 700, color: T.ink, margin: 0 } }, row.value)))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.white, border: `1px solid ${T.line}`, borderRadius: 14, padding: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, margin: 0, color: T.ink } }, t.familyCard), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: "3px 0 0" } }, "4 ", t.membersLinked))), [["RS", "Ravi Sharma", t.familyHead], ["SS", "Sunita Sharma", t.spouse], ["AS", "Aarav Sharma", t.son], ["MS", "Meera Sharma", t.daughter]].map((m) => /* @__PURE__ */ React.createElement("div", { key: m[0], style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 0",
    borderBottom: `1px solid ${T.line}`
  } }, /* @__PURE__ */ React.createElement(Avatar, { initials: m[0], size: 32 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, fontWeight: 700, margin: 0, color: T.ink } }, m[1]), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: "2px 0 0" } }, m[2])), /* @__PURE__ */ React.createElement(Icon, { name: "shield", size: 14, color: T.teal })))), /* @__PURE__ */ React.createElement("div", { style: { background: T.white, border: `1px solid ${T.line}`, borderRadius: 14, overflow: "hidden" } }, [
    { icon: "help", label: t.helpSupportBtn, action: () => showToast({ message: "Helpline number copied", type: "info" }) },
    { icon: "globe", label: t.languageBtn, action: () => {
    } },
    { icon: "logout", label: t.logout, color: T.red, action: logout }
  ].map((item, i) => item.icon === "globe" ? /* @__PURE__ */ React.createElement("div", { key: i, style: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 18px",
    background: "transparent",
    borderBottom: i < 2 ? `1px solid ${T.line}` : "none",
    color: item.color || T.slate,
    fontSize: 13,
    fontWeight: 600
  } }, /* @__PURE__ */ React.createElement(Icon, { name: item.icon, size: 16, color: item.color || T.slate }), /* @__PURE__ */ React.createElement("span", { style: { flex: 1 } }, item.label), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: T.muted } }, LANG_OPTIONS.length, " available"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: lang,
      onChange: (e) => setLang(e.target.value),
      "aria-label": "Switch language",
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: T.ink,
        background: T.bg,
        border: `1px solid ${T.line}`,
        borderRadius: 7,
        padding: "6px 10px",
        cursor: "pointer"
      }
    },
    LANG_OPTIONS.map((option) => /* @__PURE__ */ React.createElement("option", { key: option.code, value: option.code }, option.label))
  ))) : /* @__PURE__ */ React.createElement("button", { key: i, onClick: item.action, style: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 18px",
    background: "transparent",
    border: "none",
    borderBottom: i < 2 ? `1px solid ${T.line}` : "none",
    cursor: "pointer",
    color: item.color || T.slate,
    fontSize: 13,
    fontWeight: 600,
    textAlign: "left"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: item.icon, size: 16, color: item.color || T.slate }), /* @__PURE__ */ React.createElement("span", { style: { flex: 1 } }, item.label), /* @__PURE__ */ React.createElement(Icon, { name: "chevronR", size: 15, color: item.color || T.muted })))))));
};
var LoginView = ({ onLogin, authError }) => {
  const { lang, setLang } = useApp();
  const [roleSelection, setRoleSelection] = useState("citizen");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const roleCards = [
    { role: "citizen", icon: "user", title: "Citizen", subtitle: "Book slots & collect rations" },
    { role: "shopkeeper", icon: "store", title: "Shopkeeper", subtitle: "Verify digital tokens" },
    { role: "admin", icon: "shield", title: "Administrator", subtitle: "Monitor allocation & reports" }
  ];
  const demoUsers = [
    { role: "citizen", label: "Citizen", password: "citizen123" },
    { role: "shopkeeper", label: "Shopkeeper", password: "shopkeeper123" },
    { role: "admin", label: "Administrator", password: "admin123" }
  ];
  const features = [
    "Book Slots",
    "Digital Token",
    "QR Verification",
    "Family Management",
    "Notifications",
    "AI Assistant"
  ];
  const handleFill = (role, passwordValue) => {
    setRoleSelection(role);
    setPassword(passwordValue);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "login-page", style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "28px 20px", background: "linear-gradient(180deg, #f8fafc 0%, #eef6ff 100%)" } }, /* @__PURE__ */ React.createElement("div", { className: "login-grid", style: { width: "100%", maxWidth: 1180, display: "grid", gridTemplateColumns: "minmax(320px, 1fr) minmax(360px, 450px)", gap: 28, alignItems: "stretch" } }, /* @__PURE__ */ React.createElement("div", { className: "login-left", style: { position: "relative", overflow: "hidden", borderRadius: 32, background: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.72)", boxShadow: "0 28px 90px rgba(15,23,42,0.08)", padding: "42px 34px" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -40, left: -40, width: 140, height: 140, borderRadius: "50%", background: "rgba(20,148,142,0.12)" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: "rgba(29,78,216,0.1)" } }), /* @__PURE__ */ React.createElement("div", { className: "login-left-inner", style: { position: "relative", zIndex: 1, display: "grid", gap: 22 } }, /* @__PURE__ */ React.createElement("div", { className: "login-gov", style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 700, color: T.teal } }, /* @__PURE__ */ React.createElement("span", null, "\u{1F1EE}\u{1F1F3}"), /* @__PURE__ */ React.createElement("span", null, "Government of India")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: T.slate } }, /* @__PURE__ */ React.createElement("span", null, "\u{1F310} ", getLangLabel(lang)), /* @__PURE__ */ React.createElement("select", { value: lang, onChange: (e) => setLang(e.target.value), "aria-label": "Select language", style: { padding: "8px 10px", borderRadius: 10, border: `1px solid ${T.line}`, background: T.white, color: T.ink, fontSize: 12, cursor: "pointer" } }, LANG_OPTIONS.map((option) => /* @__PURE__ */ React.createElement("option", { key: option.code, value: option.code }, option.label))))), /* @__PURE__ */ React.createElement("div", { className: "login-hero", style: { display: "flex", alignItems: "center", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 72, height: 72, borderRadius: 20, background: T.tealLight, display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement("img", { src: "./smart-ration.png", alt: "Smart Ration logo", style: { width: 44, height: 44, objectFit: "cover" } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 13, fontWeight: 700, color: T.teal } }, "Verified Government Service \u2713"), /* @__PURE__ */ React.createElement("h1", { style: { margin: "8px 0 8px", fontSize: 34, fontWeight: 800, color: T.ink, lineHeight: 1.05 } }, "Smart Ration"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 15, color: T.slate, maxWidth: 340 } }, "India's Digital Public Distribution System for secure ration booking, QR verification, and real-time stock monitoring."))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 12, paddingTop: 6 } }, features.map((feature) => /* @__PURE__ */ React.createElement("div", { key: feature, style: { display: "flex", alignItems: "center", gap: 10, color: T.slate, fontSize: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 28, height: 28, borderRadius: 10, background: T.tealLight, color: T.teal, display: "grid", placeItems: "center", fontSize: 14, fontWeight: 700 } }, "\u2713"), feature)))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, marginTop: 38, borderTop: `1px solid ${T.line}`, paddingTop: 22, display: "flex", flexWrap: "wrap", gap: 14, fontSize: 12, color: T.slate } }, /* @__PURE__ */ React.createElement("span", null, "Privacy"), /* @__PURE__ */ React.createElement("span", null, "Terms"), /* @__PURE__ */ React.createElement("span", null, "Help"), /* @__PURE__ */ React.createElement("span", { style: { marginLeft: "auto", fontWeight: 700, color: T.ink } }, "Version 2.0"))), /* @__PURE__ */ React.createElement("div", { className: "login-right", style: { borderRadius: 28, background: "rgba(255,255,255,0.94)", border: "1px solid rgba(255,255,255,0.82)", boxShadow: "0 20px 60px rgba(15,23,42,0.12)", backdropFilter: "blur(18px)", padding: "36px 34px", display: "grid", gap: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 12 } }, /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 12, fontWeight: 700, color: T.teal, textTransform: "uppercase", letterSpacing: "0.18em" } }, "Welcome Back"), /* @__PURE__ */ React.createElement("h2", { style: { margin: "10px 0 8px", fontSize: 28, fontWeight: 800, color: T.ink, lineHeight: 1.05 } }, "Sign in to access your digital ration services."), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 14, color: T.slate } }, "Secure access for citizens, shopkeepers and administrators.")), authError && /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", borderRadius: 16, background: T.redLight, color: T.red, fontSize: 13, fontWeight: 600 } }, authError), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 12 } }, roleCards.map((card) => {
    const selected = card.role === roleSelection;
    return /* @__PURE__ */ React.createElement("button", { key: card.role, type: "button", onClick: () => setRoleSelection(card.role), style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: 14,
      alignItems: "center",
      width: "100%",
      padding: "16px 18px",
      borderRadius: 18,
      border: selected ? `1px solid ${T.teal}` : `1px solid ${T.line}`,
      background: selected ? "rgba(20,148,142,0.08)" : T.white,
      cursor: "pointer",
      textAlign: "left",
      boxShadow: selected ? "0 16px 35px rgba(15,23,42,0.08)" : "none"
    } }, /* @__PURE__ */ React.createElement("div", { style: { width: 42, height: 42, borderRadius: 14, background: selected ? T.teal : T.bg, display: "grid", placeItems: "center", color: selected ? "#fff" : T.teal } }, /* @__PURE__ */ React.createElement(Icon, { name: card.icon, size: 20, color: selected ? "#fff" : T.teal })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 14, fontWeight: 700, color: T.ink } }, card.title), /* @__PURE__ */ React.createElement("p", { style: { margin: "6px 0 0", fontSize: 12, color: T.slate } }, card.subtitle)));
  })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 18 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "grid", gap: 10, fontSize: 13, color: T.slate } }, "Password", /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: showPassword ? "text" : "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      placeholder: "Enter password",
      style: { width: "100%", padding: "14px 48px 14px 16px", borderRadius: 16, border: `1px solid ${T.line}`, background: T.bg, color: T.ink, fontSize: 14 }
    }
  ), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setShowPassword(!showPassword), style: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent", color: T.teal, cursor: "pointer", fontSize: 13, fontWeight: 700 } }, showPassword ? "Hide" : "Show"))), /* @__PURE__ */ React.createElement("button", { onClick: () => onLogin(roleSelection, password), style: { padding: "16px", borderRadius: 18, border: "none", background: "linear-gradient(135deg, #0F766E, #14B8A6)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 18px 32px rgba(20,148,142,0.22)" } }, "Continue \u2192"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 10, padding: "16px", borderRadius: 20, background: T.bg, border: `1px solid ${T.line}` } }, [
    "\u{1F512} Secure login",
    "256-bit Encryption",
    "OTP Verified",
    "Government Certified"
  ].map((label) => /* @__PURE__ */ React.createElement("span", { key: label, style: { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: T.slate, padding: "8px 12px", borderRadius: 14, background: T.white } }, /* @__PURE__ */ React.createElement("span", null, label.startsWith("\u{1F512}") ? "\u{1F512}" : "\u2022"), label.replace("\u{1F512} ", ""))))), /* @__PURE__ */ React.createElement("div", { style: { borderRadius: 20, border: `1px solid ${T.line}`, background: T.bg, padding: "18px", display: "grid", gap: 16 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 12, color: T.slate, textTransform: "uppercase", letterSpacing: "0.18em" } }, "Quick Demo Login"), /* @__PURE__ */ React.createElement("p", { style: { margin: "8px 0 0", fontSize: 13, fontWeight: 700, color: T.ink } }, "Try credentials in one click")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 12 } }, demoUsers.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.role, style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 16px", borderRadius: 16, background: T.white, border: `1px solid ${T.line}` } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 13, fontWeight: 700, color: T.ink } }, item.label), /* @__PURE__ */ React.createElement("p", { style: { margin: "6px 0 0", fontSize: 12, color: T.slate } }, "Password: ", item.password)), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => handleFill(item.role, item.password), style: { padding: "10px 14px", borderRadius: 14, border: "none", background: T.teal, color: T.white, fontSize: 12, fontWeight: 700, cursor: "pointer" } }, "Use")))))))));
};
var CitizenApp = () => {
  const { view, setView } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  return /* @__PURE__ */ React.createElement("div", { className: "app-shell", style: { minHeight: "100vh", background: T.bg } }, /* @__PURE__ */ React.createElement(CitizenSidebar, { view, setView, open: menuOpen, onClose: () => setMenuOpen(false) }), /* @__PURE__ */ React.createElement("div", { style: { marginLeft: 240, minHeight: "100vh", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement(Topbar, { onMenu: () => setMenuOpen(true) }), /* @__PURE__ */ React.createElement("main", { className: "app-main", style: { flex: 1, padding: "32px 36px 60px" } }, view === "home" && /* @__PURE__ */ React.createElement(HomeView, null), view === "book" && /* @__PURE__ */ React.createElement(BookView, null), view === "booking" && /* @__PURE__ */ React.createElement(BookingTokenView, null), view === "notifications" && /* @__PURE__ */ React.createElement(NotificationsView, null), view === "profile" && /* @__PURE__ */ React.createElement(ProfileView, null))));
};
var PortalShell = ({ navItems, title, subtitle, userInitials, children }) => {
  const { role, setRole, t, lang, setLang, user, logout: logout2 } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = user?.name?.split(" ").map((w) => w[0]).join("") || userInitials;
  return /* @__PURE__ */ React.createElement("div", { className: "portal-shell", style: { display: "flex", minHeight: "100vh", background: T.bg } }, /* @__PURE__ */ React.createElement("aside", { className: "premium-sidebar", style: {
    width: 228,
    background: "#0d2f2d",
    position: "fixed",
    top: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    padding: "20px 14px",
    transform: menuOpen ? "none" : "translateX(-100%)",
    transition: "transform 0.22s",
    zIndex: 40
  } }, /* @__PURE__ */ React.createElement(Brand, null), /* @__PURE__ */ React.createElement("div", { style: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    padding: "8px 12px",
    margin: "20px 0 14px",
    display: "flex",
    gap: 8,
    alignItems: "center",
    fontSize: 9,
    color: "#b9d7d4"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "shield", size: 13, color: "#b9d7d4" }), " ", title), /* @__PURE__ */ React.createElement("nav", { style: { display: "grid", gap: 3 } }, navItems.map((item, i) => /* @__PURE__ */ React.createElement("button", { key: i, style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 11px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    background: i === 0 ? "rgba(255,255,255,0.12)" : "transparent",
    color: i === 0 ? "#fff" : "#aac3c0",
    fontSize: 11,
    fontWeight: 600
  } }, /* @__PURE__ */ React.createElement(Icon, { name: item.icon, size: 17, color: "currentColor" }), item.label))), /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: "auto",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    paddingTop: 14,
    display: "flex",
    gap: 10,
    alignItems: "center"
  } }, /* @__PURE__ */ React.createElement(Avatar, { initials, size: 32, bg: "rgba(255,255,255,0.14)", color: "#fff" }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, fontWeight: 700, color: "#fff", margin: 0 } }, user?.name || (role === "admin" ? "Anita Kapoor" : "Suresh Kumar")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8, color: "#91aca9", margin: "2px 0 0" } }, title)), /* @__PURE__ */ React.createElement("button", { onClick: logout2, style: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.18)",
    padding: "8px 10px",
    borderRadius: 9,
    color: "#fff",
    cursor: "pointer",
    fontSize: 10,
    fontWeight: 700
  } }, t.logout))), /* @__PURE__ */ React.createElement("div", { style: { marginLeft: 0, flex: 1, display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("header", { style: {
    background: T.white,
    borderBottom: `1px solid ${T.line}`,
    display: "flex",
    alignItems: "center",
    height: 64,
    padding: "0 28px",
    gap: 14,
    position: "sticky",
    top: 0,
    zIndex: 20
  } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setMenuOpen(!menuOpen), style: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 6,
    borderRadius: 8,
    color: T.slate
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "menu", size: 20, color: "currentColor" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, fontWeight: 800, margin: 0, color: T.ink } }, title), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: "2px 0 0" } }, subtitle)), /* @__PURE__ */ React.createElement("div", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: T.muted } }, t.viewAs), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: role,
      onChange: (e) => setRole(e.target.value),
      style: { fontSize: 11, fontWeight: 600, color: T.ink, background: T.bg, border: `1px solid ${T.line}`, borderRadius: 7, padding: "6px 8px", cursor: "pointer" }
    },
    /* @__PURE__ */ React.createElement("option", { value: "citizen" }, t.citizen),
    /* @__PURE__ */ React.createElement("option", { value: "shopkeeper" }, t.shopkeeper),
    /* @__PURE__ */ React.createElement("option", { value: "admin" }, t.administrator)
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(Icon, { name: "globe", size: 14, color: T.slate }), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: lang,
      onChange: (e) => setLang(e.target.value),
      "aria-label": "Switch language",
      style: { fontSize: 11, fontWeight: 600, color: T.ink, background: T.bg, border: `1px solid ${T.line}`, borderRadius: 7, padding: "6px 8px", cursor: "pointer" }
    },
    LANG_OPTIONS.map((option) => /* @__PURE__ */ React.createElement("option", { key: option.code, value: option.code }, option.label))
  )), /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement("button", { style: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 6,
    borderRadius: 8,
    color: T.slate,
    display: "flex"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "bell", size: 20, color: "currentColor" }), /* @__PURE__ */ React.createElement("span", { style: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 7,
    height: 7,
    background: T.red,
    borderRadius: "50%",
    border: `2px solid ${T.white}`
  } }))), /* @__PURE__ */ React.createElement(Avatar, { initials, size: 32 }), /* @__PURE__ */ React.createElement("button", { onClick: logout2, style: {
    background: T.bg,
    border: `1px solid ${T.line}`,
    borderRadius: 10,
    padding: "8px 12px",
    color: T.slate,
    cursor: "pointer",
    fontSize: 11,
    fontWeight: 700
  } }, t.logout))), /* @__PURE__ */ React.createElement("main", { style: { flex: 1, padding: 28 } }, children)));
};
var ShopkeeperApp = () => {
  const { t } = useApp();
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [search, setSearch] = useState("");
  const scanTimerRef = useRef(null);
  const filtered = SHOP_BOOKINGS.filter(
    (b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase())
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
    { icon: "dashboard", label: "Overview" },
    { icon: "calendar", label: "Today's bookings" },
    { icon: "scan", label: "Scan QR token" },
    { icon: "box", label: "Stock status" },
    { icon: "clipCheck", label: "Collection log" }
  ];
  return /* @__PURE__ */ React.createElement(PortalShell, { navItems, title: "Shopkeeper portal", subtitle: "Shastri Nagar Fair Price Shop", userInitials: "SK" }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1300, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(
    PageIntro,
    {
      eyebrow: "MONDAY, 29 JUNE",
      title: "Good morning, Suresh",
      desc: "Here's today's collection activity at your shop."
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 } }, [
    { icon: "calendar", color: T.blue, bg: T.blueLight, label: "TODAY'S BOOKINGS", val: "48", sub: "12 remaining" },
    { icon: "clock", color: T.amber, bg: T.amberLight, label: "WAITING", val: "8", sub: "Current queue" },
    { icon: "checkCircle", color: T.green, bg: T.greenLight, label: "COMPLETED", val: "36", sub: "75% complete" },
    { icon: "box", color: T.purple, bg: T.purpleLight, label: "STOCK STATUS", val: "Available", sub: "Updated 9:12 AM" }
  ].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    background: T.white,
    border: `1px solid ${T.line}`,
    borderRadius: 12,
    padding: "16px 18px",
    display: "flex",
    gap: 12,
    alignItems: "center"
  } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(Icon, { name: s.icon, size: 18, color: s.color })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8.5, fontWeight: 800, letterSpacing: "0.7px", color: T.muted, margin: "0 0 5px" } }, s.label), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 18, fontWeight: 800, color: T.ink, margin: "0 0 3px", letterSpacing: "-0.5px" } }, s.val), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 9.5, color: T.muted, margin: 0 } }, s.sub))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "minmax(0,1fr) 270px", gap: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.white, border: `1px solid ${T.line}`, borderRadius: 14 } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: `1px solid ${T.line}`,
    gap: 12,
    flexWrap: "wrap"
  } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, margin: 0, color: T.ink } }, "Today's slot list"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: "3px 0 0" } }, SHOP_BOOKINGS.length, " upcoming citizens")), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    border: `1px solid ${T.line}`,
    borderRadius: 8,
    padding: "7px 10px",
    background: T.bg
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "sliders", size: 13, color: T.muted }), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: search,
      onChange: (e) => setSearch(e.target.value),
      placeholder: "Search booking or name\u2026",
      "aria-label": "Search bookings",
      style: {
        border: "none",
        background: "transparent",
        fontSize: 11,
        color: T.ink,
        outline: "none",
        width: 180
      }
    }
  ))), /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    minWidth: 680,
    gridTemplateColumns: "90px 100px 1.3fr 1fr 90px 60px",
    background: T.bg,
    padding: "9px 18px",
    fontSize: 8.5,
    fontWeight: 800,
    letterSpacing: "0.5px",
    color: T.muted
  } }, ["TIME", "BOOKING", "CITIZEN", "RATION CARD", "STATUS", "ACTION"].map((h) => /* @__PURE__ */ React.createElement("span", { key: h }, h))), filtered.map((b, i) => /* @__PURE__ */ React.createElement("div", { key: b.id, style: {
    display: "grid",
    minWidth: 680,
    gridTemplateColumns: "90px 100px 1.3fr 1fr 90px 60px",
    padding: "12px 18px",
    borderTop: `1px solid ${T.line}`,
    alignItems: "center",
    fontSize: 11,
    background: b.status === "Arrived" ? "#f0fdf4" : T.white
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, color: T.ink } }, b.time), /* @__PURE__ */ React.createElement("span", { style: { color: T.slate } }, b.id), /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: b.name.split(" ").map((x) => x[0]).join(""), size: 26 }), /* @__PURE__ */ React.createElement("strong", { style: { color: T.ink } }, b.name)), /* @__PURE__ */ React.createElement("span", { style: { color: T.slate } }, b.card), /* @__PURE__ */ React.createElement(StatusBadge, { status: b.status }), /* @__PURE__ */ React.createElement("button", { onClick: doScan, style: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: T.teal,
    fontSize: 10,
    fontWeight: 700,
    textAlign: "left"
  } }, "Scan"))), filtered.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "32px 20px", textAlign: "center", color: T.muted, fontSize: 13 } }, "No bookings match your search."))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: doScan, style: {
    background: `linear-gradient(140deg, ${T.teal}, ${T.tealMid})`,
    border: "none",
    borderRadius: 14,
    padding: 22,
    textAlign: "left",
    cursor: "pointer",
    color: "#fff"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 44,
    height: 44,
    borderRadius: 10,
    background: "rgba(255,255,255,0.14)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "scan", size: 22, color: "#fff" })), /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 15, fontWeight: 800, margin: "0 0 6px" } }, "Scan QR token"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: "#cce9e6", margin: "0 0 14px", lineHeight: 1.6 } }, "Verify a citizen's booking and mark their ration as collected."), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 } }, "Open scanner ", /* @__PURE__ */ React.createElement(Icon, { name: "arrowUR", size: 13, color: "currentColor" }))), /* @__PURE__ */ React.createElement("div", { style: { background: T.white, border: `1px solid ${T.line}`, borderRadius: 14 } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    borderBottom: `1px solid ${T.line}`
  } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 13, fontWeight: 700, margin: 0, color: T.ink } }, "Stock overview"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 9, color: T.muted, margin: "3px 0 0" } }, "Today's availability")), /* @__PURE__ */ React.createElement("button", { style: { background: T.bg, border: `1px solid ${T.line}`, borderRadius: 7, padding: "5px 8px", cursor: "pointer", color: T.slate } }, /* @__PURE__ */ React.createElement(Icon, { name: "sliders", size: 14, color: "currentColor" }))), [["Rice", "420 kg", 72, "#0f766e"], ["Wheat", "310 kg", 58, "#0f766e"], ["Sugar", "96 kg", 34, "#d97706"], ["Kerosene", "180 L", 64, "#0f766e"]].map(([name, qty, pct, color]) => /* @__PURE__ */ React.createElement("div", { key: name, style: { display: "grid", gridTemplateColumns: "80px 1fr 30px", gap: 8, padding: "10px 14px", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, fontWeight: 700, margin: "0 0 2px", color: T.ink } }, name), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8, color: T.muted, margin: 0 } }, qty, " remaining")), /* @__PURE__ */ React.createElement("div", { style: { height: 5, borderRadius: 10, background: T.line, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: color, borderRadius: 10 } })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: T.muted, textAlign: "right" } }, pct, "%"))))))), (scanning || scanned) && /* @__PURE__ */ React.createElement("div", { style: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100
  }, role: "dialog", "aria-modal": "true", "aria-label": "QR Verification" }, /* @__PURE__ */ React.createElement("div", { style: {
    background: T.white,
    borderRadius: 18,
    padding: 32,
    width: 340,
    position: "relative",
    textAlign: "center",
    boxShadow: "0 24px 64px rgba(15,23,42,0.28)"
  } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setScanned(false);
    setScanning(false);
  }, style: {
    position: "absolute",
    top: 14,
    right: 14,
    background: T.bg,
    border: "none",
    cursor: "pointer",
    borderRadius: 8,
    padding: 6,
    color: T.slate
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "x", size: 16, color: "currentColor" })), scanning ? /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 0" } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: T.tealLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "scan", size: 36, color: T.teal })), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, fontWeight: 700, color: T.ink, margin: "0 0 6px" } }, "Scanning\u2026"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: T.muted } }, "Hold the QR code in front of the camera"), /* @__PURE__ */ React.createElement("div", { style: {
    width: 200,
    height: 4,
    background: T.line,
    borderRadius: 2,
    margin: "20px auto 0",
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    height: "100%",
    width: "60%",
    background: T.teal,
    borderRadius: 2,
    animation: "scan-progress 1.8s ease-in-out infinite"
  } }))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: T.greenLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 12px"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 26, color: T.green })), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, fontWeight: 800, letterSpacing: "1px", color: T.green, margin: "0 0 8px" } }, "VALID BOOKING"), /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 19, fontWeight: 800, margin: "0 0 4px", color: T.ink } }, "Ravi Sharma"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: T.muted, margin: "0 0 18px" } }, "Booking SR-2026-48291 \xB7 10:00 AM"), /* @__PURE__ */ React.createElement("div", { style: {
    background: T.bg,
    borderRadius: 9,
    padding: "11px 14px",
    display: "flex",
    gap: 10,
    alignItems: "center",
    marginBottom: 18,
    textAlign: "left"
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "card", size: 18, color: T.teal }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8, fontWeight: 800, letterSpacing: "0.6px", color: T.muted, margin: "0 0 3px" } }, "RATION CARD"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, fontWeight: 700, color: T.ink, margin: 0 } }, "DL-CEN-2019-4821"))), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setScanned(false);
  }, style: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "13px",
    background: T.teal,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "package", size: 16, color: "#fff" }), " Mark ration as collected")))));
};
var AdminApp = () => {
  const { t } = useApp();
  const [timeRange, setTimeRange] = useState("This week");
  const [shopSearch, setShopSearch] = useState("");
  const navItems = [
    { icon: "dashboard", label: "Overview" },
    { icon: "calendar", label: "Manage slots" },
    { icon: "store", label: "Ration shops" },
    { icon: "users", label: "Manage users" },
    { icon: "calOff", label: "Holidays" },
    { icon: "chart", label: "Reports" }
  ];
  const shopRows = [
    ["Shastri Nagar FPS", "Central Delhi", "48", "36", "75%"],
    ["Karol Bagh FPS #118", "Central Delhi", "62", "54", "87%"],
    ["Rohini Sector 7 FPS", "North West", "56", "51", "91%"],
    ["Lajpat Nagar FPS", "South East", "44", "40", "90%"]
  ].filter((r) => r[0].toLowerCase().includes(shopSearch.toLowerCase()) || r[1].toLowerCase().includes(shopSearch.toLowerCase()));
  return /* @__PURE__ */ React.createElement(PortalShell, { navItems, title: "Administration", subtitle: "National Food Security Service", userInitials: "AK" }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1380, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(
    PageIntro,
    {
      eyebrow: "SYSTEM OVERVIEW",
      title: "Service dashboard",
      desc: "Live performance across the Smart Ration network."
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 } }, [
    { icon: "users", color: T.blue, bg: T.blueLight, label: "TOTAL USERS", val: "24,862", sub: "\u2191 8.2% this month", subColor: T.green },
    { icon: "store", color: T.purple, bg: T.purpleLight, label: "RATION SHOPS", val: "142", sub: "138 currently active" },
    { icon: "calendar", color: T.amber, bg: T.amberLight, label: "TODAY'S BOOKINGS", val: "1,284", sub: "Across all districts" },
    { icon: "checkCircle", color: T.green, bg: T.greenLight, label: "COMPLETION RATE", val: "87.4%", sub: "\u2191 2.1% vs yesterday", subColor: T.green }
  ].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    background: T.white,
    border: `1px solid ${T.line}`,
    borderRadius: 12,
    padding: "16px 18px",
    display: "flex",
    gap: 12,
    alignItems: "center"
  } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(Icon, { name: s.icon, size: 18, color: s.color })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 8.5, fontWeight: 800, letterSpacing: "0.7px", color: T.muted, margin: "0 0 5px" } }, s.label), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 18, fontWeight: 800, color: T.ink, margin: "0 0 3px", letterSpacing: "-0.5px" } }, s.val), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 9.5, color: s.subColor || T.muted, margin: 0, fontWeight: s.subColor ? 600 : 400 } }, s.sub))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.5fr 0.8fr", gap: 18, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.white, border: `1px solid ${T.line}`, borderRadius: 14, padding: "20px 22px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, margin: 0, color: T.ink } }, "Weekly collection activity"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: "3px 0 0" } }, "Bookings vs completed collections")), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: timeRange,
      onChange: (e) => setTimeRange(e.target.value),
      style: { fontSize: 11, color: T.ink, background: T.bg, border: `1px solid ${T.line}`, borderRadius: 7, padding: "6px 10px", cursor: "pointer" }
    },
    ["This week", "Last week", "This month"].map((v) => /* @__PURE__ */ React.createElement("option", { key: v }, v))
  )), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 200 }, /* @__PURE__ */ React.createElement(BarChart, { data: CHART_DATA, barGap: 4, barCategoryGap: "30%" }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: T.line, vertical: false }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "day", tick: { fontSize: 10, fill: T.muted }, axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fontSize: 10, fill: T.muted }, axisLine: false, tickLine: false }), /* @__PURE__ */ React.createElement(Tooltip, { contentStyle: { borderRadius: 8, border: `1px solid ${T.line}`, fontSize: 11 } }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "bookings", fill: "#b6ded9", radius: [4, 4, 0, 0], name: "Bookings" }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "completed", fill: T.teal, radius: [4, 4, 0, 0], name: "Completed" }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, justifyContent: "center", marginTop: 10 } }, [{ color: "#b6ded9", label: "Bookings" }, { color: T.teal, label: "Completed" }].map((l) => /* @__PURE__ */ React.createElement("span", { key: l.label, style: { display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: T.muted } }, /* @__PURE__ */ React.createElement("span", { style: { width: 10, height: 10, borderRadius: 2, background: l.color, display: "inline-block" } }), l.label)))), /* @__PURE__ */ React.createElement("div", { style: { background: T.white, border: `1px solid ${T.line}`, borderRadius: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", borderBottom: `1px solid ${T.line}` } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, margin: 0, color: T.ink } }, "Recent activity"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: "3px 0 0" } }, "System-wide updates")), /* @__PURE__ */ React.createElement("button", { style: { background: "transparent", border: "none", cursor: "pointer", color: T.teal, fontSize: 11, fontWeight: 700 } }, "View all")), [
    { icon: "store", title: "New shop registered", desc: "Karol Bagh FPS #118", time: "12 min ago" },
    { icon: "users", title: "User verification", desc: "28 new users verified", time: "35 min ago" },
    { icon: "calOff", title: "Holiday added", desc: "Eid al-Adha \xB7 30 June", time: "1 hr ago" },
    { icon: "box", title: "Low stock alert", desc: "Sugar \xB7 Rohini Sector 7", time: "2 hrs ago" }
  ].map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    display: "flex",
    gap: 10,
    padding: "13px 18px",
    borderBottom: i < 3 ? `1px solid ${T.line}` : "none"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 30,
    height: 30,
    borderRadius: 8,
    background: T.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  } }, /* @__PURE__ */ React.createElement(Icon, { name: item.icon, size: 14, color: T.teal })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, fontWeight: 700, margin: "0 0 2px", color: T.ink } }, item.title), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: "0 0 2px" } }, item.desc), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 9, color: "#b0bac8", margin: 0 } }, item.time)))))), /* @__PURE__ */ React.createElement("div", { style: { background: T.white, border: `1px solid ${T.line}`, borderRadius: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${T.line}`, flexWrap: "wrap", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, margin: 0, color: T.ink } }, "Shop performance"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: T.muted, margin: "3px 0 0" } }, "Highest volume shops today")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, border: `1px solid ${T.line}`, borderRadius: 8, padding: "7px 10px", background: T.bg } }, /* @__PURE__ */ React.createElement(Icon, { name: "sliders", size: 13, color: T.muted }), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: shopSearch,
      onChange: (e) => setShopSearch(e.target.value),
      placeholder: "Search shops\u2026",
      "aria-label": "Search shops",
      style: { border: "none", background: "transparent", fontSize: 11, color: T.ink, outline: "none", width: 150 }
    }
  ))), /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    minWidth: 680,
    gridTemplateColumns: "1.6fr 1.2fr 0.7fr 0.7fr 0.7fr 0.7fr",
    background: T.bg,
    padding: "9px 20px",
    fontSize: 8.5,
    fontWeight: 800,
    letterSpacing: "0.5px",
    color: T.muted
  } }, ["SHOP", "DISTRICT", "BOOKINGS", "COMPLETED", "RATE", "STATUS"].map((h) => /* @__PURE__ */ React.createElement("span", { key: h }, h))), shopRows.map((row, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    display: "grid",
    minWidth: 680,
    gridTemplateColumns: "1.6fr 1.2fr 0.7fr 0.7fr 0.7fr 0.7fr",
    padding: "13px 20px",
    borderTop: `1px solid ${T.line}`,
    alignItems: "center",
    fontSize: 12
  } }, /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 9 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 30, borderRadius: 7, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(Icon, { name: "store", size: 14, color: T.teal })), /* @__PURE__ */ React.createElement("strong", { style: { color: T.ink } }, row[0])), /* @__PURE__ */ React.createElement("span", { style: { color: T.slate } }, row[1]), /* @__PURE__ */ React.createElement("span", { style: { color: T.slate } }, row[2]), /* @__PURE__ */ React.createElement("span", { style: { color: T.slate } }, row[3]), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, color: T.ink } }, row[4]), /* @__PURE__ */ React.createElement(StatusBadge, { status: "Active" }))), shopRows.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "28px", textAlign: "center", color: T.muted, fontSize: 13 } }, "No shops match your search.")))));
};
function SmartRation() {
  const [role, setRole] = useState("citizen");
  const [view, setView] = useState("home");
  const [lang, setLang] = useState("en");
  const [toast, setToast] = useState(null);
  const [booking, setBooking] = useState(null);
  const [notifCount, setNotifCount] = useState(3);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const t = i18n[lang] || i18n.en;
  const toastTimerRef = useRef(null);
  const showToast2 = useCallback((msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), 3e3);
  }, []);
  const login = (selectedRole, password) => {
    const user2 = AUTH_USERS[selectedRole];
    if (user2 && user2.password === password) {
      setIsAuthenticated(true);
      setUser({ name: user2.name, role: user2.role });
      setRole(user2.role);
      setView("home");
      setAuthError(null);
      showToast2({ message: `Signed in as ${user2.name}`, type: "success" });
      return;
    }
    setAuthError("Invalid role or password. Please try again.");
  };
  const logout2 = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRole("citizen");
    setView("home");
    showToast2({ message: "Signed out", type: "info" });
  };
  const handleRoleChange = (nextRole) => {
    if (isAuthenticated && user?.role && nextRole !== user.role) {
      showToast2({ message: "Please sign out and sign in with the new role.", type: "info" });
      return;
    }
    setRole(nextRole);
  };
  useEffect(() => () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }, []);
  useEffect(() => {
    setView("home");
  }, [role]);
  const ctx = { role, setRole: handleRoleChange, view, setView, lang, setLang, t, showToast: showToast2, booking, setBooking, notifCount, setNotifCount, isAuthenticated, user, authError, login, logout: logout2 };
  return /* @__PURE__ */ React.createElement(AppCtx.Provider, { value: ctx }, /* @__PURE__ */ React.createElement("style", null, `
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
          .login-grid { grid-template-columns: 1fr !important; }
          .login-page { padding: 24px 14px !important; }
          .login-left, .login-right { width: 100%; max-width: none !important; }
          .login-left { padding: 32px 26px !important; }
          .login-right { padding: 30px 24px !important; }
          .login-left-inner { gap: 22px !important; }
        }
        @media (max-width: 680px) {
          .login-left, .login-right { border-radius: 24px !important; }
          .login-left-inner { gap: 16px !important; }
          .login-gov, .login-hero { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .login-left select { width: 100%; }
          .login-right { padding: 24px 18px !important; }
          .login-right button, .login-right input, .login-right select { min-height: 48px; }
        }
      `), !isAuthenticated ? /* @__PURE__ */ React.createElement(LoginView, { onLogin: login, authError }) : /* @__PURE__ */ React.createElement(React.Fragment, null, role === "citizen" && /* @__PURE__ */ React.createElement(CitizenApp, null), role === "shopkeeper" && /* @__PURE__ */ React.createElement(ShopkeeperApp, null), role === "admin" && /* @__PURE__ */ React.createElement(AdminApp, null)), /* @__PURE__ */ React.createElement(Toast, { toast }));
}

// main.jsx
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ React2.createElement(React2.StrictMode, null, /* @__PURE__ */ React2.createElement(SmartRation, null))
);
