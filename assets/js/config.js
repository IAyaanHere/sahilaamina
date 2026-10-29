/**
 * CLIENT CONFIGURATION - SAHIL & AAMINA
 * -------------------------------------
 * Wedding & Reception details matching attached invitation card.
 */

window.INVITATION_CONFIG = {
  site: {
    title: "Sahil & Aamina — Wedding & Reception Invitation",
    description: "Mr. & Mrs. Muzammil Mustaq Sayed solicit your gracious and esteemed presence on the auspicious occasion of the Reception Ceremony of their beloved son Sahil Sayed with Aamina Lashkariya.",
  },

  couple: {
    groomInitial: "S",
    brideInitial: "A",
    groom: {
      name: "Sahil Sayed",
      shortName: "Sahil",
      relation: "S/o.",
      parents: "Muzammil Mustaq Sayed",
    },
    bride: {
      name: "Aamina Lashkariya",
      shortName: "Aamina",
      relation: "D/o.",
      parents: "Yunus Lashkariya",
    },
  },

  hosts: {
    invitationBy: "Mr. & Mrs. Muzammil Mustaq Sayed",
    solicitation: "Solicit your gracious and esteemed presence on the auspicious occasion of the Reception Ceremony of their beloved son",
    fromName: "Muzammil Mustaq Sayed",
    contactNumber: "9224475366",
    contactDisplay: "+91 92244 75366",
  },

  compliments: {
    title: "With Best Compliments From",
    families: "Sayed Family, Shaikh Family",
    relations: "Relatives & Friends",
  },

  copy: {
    bismillah: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ",
    bismillahTranslation: 'In the name of "Allah" the most beneficent & merciful',
    invitationType: "Reception Invitation",
    welcomeLine: "Mr. & Mrs. Muzammil Mustaq Sayed\nrequest the honour of your presence at the reception of",
    invitation: "",
    heroClosing: "as they begin their blessed journey of togetherness in faith and love.",
    welcomeTitle: "Reception Invitation",
    welcomeBody: "Mr. & Mrs. Muzammil Mustaq Sayed solicit your gracious and esteemed presence on the auspicious occasion of the Reception Ceremony of their beloved son Sahil Sayed with Aamina Lashkariya. Your presence, warm prayers, and blessings are our greatest treasure.",
    gifts: "Your gracious presence, love, and prayers are the greatest gifts we could ever ask for.",
    closing: "We look forward to welcoming you with warmth and joy.",
    dua: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    duaTranslation: "May Allah bless you both, shower His blessings upon you, and join you together in goodness.",
  },

  // Countdown & Scratch Date: Reception Ceremony (Dec 8, 2026, 7:30 PM IST)
  wedding: {
    isoDate: "2026-12-08T19:30:00+05:30",
    date: "December 8, 2026",
    day: "Tuesday",
    time: "7:30 PM to 11:00 PM",
    timezone: "IST",
  },

  // Auspicious Occasions directly from invitation card
  occasions: [
    {
      name: "Insha Allah Nikah",
      badge: "Solemnisation Ceremony",
      date: "Sunday, 6th December, 2026",
      hijri: "(25th Jamadil-Akhir 1448 Hijri)",
      time: "Nikah : After Namaz-e-Magrib",
      location: "",
      mapLink: "",
    },
    {
      name: "Reception & Dawat-e-Walima",
      badge: "Auspicious Occasion",
      date: "Tuesday, 8th December, 2026",
      hijri: "",
      time: "Between : 7-30 to 11-00 pm.",
      location: "Jashn Banquet Hall, Near Holy Cross High School, Kamani, Kurla (W), Mumbai - 400 070.",
      mapLink: "https://www.google.com/maps/search/?api=1&query=Jashn+Banquet+Hall+Near+Holy+Cross+High+School+Kamani+Kurla+West+Mumbai+400070",
    },
  ],

  venue: {
    name: "Jashn Banquet Hall",
    address: "Near Holy Cross High School, Kamani, Kurla (W), Mumbai - 400 070.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Jashn+Banquet+Hall+Near+Holy+Cross+High+School+Kamani+Kurla+West+Mumbai+400070",
  },

  program: [
    {
      time: "07:30 PM",
      title: "Welcoming of Guests",
      note: "Dawat-e-Walima commences with warm hospitality",
    },
    {
      time: "08:30 PM",
      title: "Reception Ceremony",
      note: "Stage greetings, blessings & photographs with the couple",
    },
    {
      time: "09:00 PM",
      title: "Dawat-e-Walima / Dinner",
      note: "A joyous feast shared with family, relatives & friends",
    },
    {
      time: "11:00 PM",
      title: "Duas & Farewell",
      note: "Heartfelt prayers for Sahil & Aamina's blessed future",
    },
  ],

  dressCode: {
    title: "Festive & Traditional Formal",
    description: "Traditional Indian or modest formal attire is warmly welcomed. Sherwanis, Kurtas, Suits, Sarees, Lehengas, and Anarkalis.",
    swatches: [
      "#7A1F2B",
      "#234638",
      "#C49A56",
      "#7A4968",
      "#5A4035",
    ],
  },

  media: {
    introVideo: "./media/intro-placeholder.mp4",
    introPoster: "./media/intro-placeholder.webp",
    music: "./WhatsApp Video 2026-10-29 at 9.19.17 PM-[AudioTrimmer.com].mp3",
    gallery: [
      {
        src: "./media/gallery/01.jpg",
        alt: "Wedding celebration moments",
        caption: "",
      },
      {
        src: "./media/gallery/02.jpg",
        alt: "Sahil & Aamina wedding celebration",
        caption: "",
      },
      {
        src: "./media/gallery/03.jpg",
        alt: "Joyful wedding celebrations",
        caption: "",
      },
      {
        src: "./media/gallery/04.jpg",
        alt: "Wedding floral details & elegance",
        caption: "",
      },
    ],
  },

  theme: {
    ivory: "#FBF7F0",       /* warm bridal ivory matching invitation paper */
    plum: "#482D1D",        /* rich chocolate ink matching card typography */
    lavender: "#DECBBA",    /* soft golden beige */
    mauve: "#A87042",       /* warm bronze gold */
    lilac: "#967259",       /* warm taupe */
    champagne: "#C59A53",   /* royal card gold border & accents */
  },
};
