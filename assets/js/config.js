/**
 * CLIENT CONFIGURATION
 * --------------------
 * Change client-specific content here. Keep quotation marks and commas intact.
 * File paths are relative so this template works inside /khwahish/ or any folder.
 */

window.INVITATION_CONFIG = {
  site: {
    title: "Durefishan & Bilal — Nikah Invitation",
    description: "You are warmly invited to celebrate the Nikah of Durefishan and Bilal Abbas.",
  },

  couple: {
    brideInitial: "D",
    groomInitial: "B",
    bride: {
      name: "Durefishan Saleem",
      shortName: "Durefishan",
      relation: "Daughter of",
      parents: "Saleem",
    },
    groom: {
      name: "Bilal Abbas",
      shortName: "Bilal",
      relation: "Son of",
      parents: "Abbas",
    },
  },

  copy: {
    bismillah: "﷽",
    bismillahTranslation:
      "",
    welcomeLine: "We request the honour of your\npresence at the Nikah of",
    invitation:
      "",
    heroClosing:
      "as they begin their forever in\nfaith and love.",
    welcomeTitle: "A Blessed Beginning",
    welcomeBody:
      "With hearts full of gratitude, we warmly invite you to join us as we celebrate this beautiful beginning with the love, prayers, and blessings of our families.",
    gifts:
      "Your love, blessings, and presence are the greatest gifts we could ever ask for.",
    closing: "We can’t wait to celebrate with you.",
    dua: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    duaTranslation:
      "May Allah bless you both, shower His blessings upon you, and join you together in goodness.",
  },

  wedding: {
    // Use a valid ISO date with the local UTC offset for an accurate countdown.
    isoDate: "2026-10-18T19:00:00+05:30",
    date: "October 18, 2026",
    day: "Sunday",
    time: "07:00 PM",
    timezone: "IST",
  },

  media: {
    // Replace these two files inside the /media folder.
    introVideo: "./media/intro-placeholder.mp4",
    introPoster:
      "./media/intro-placeholder.webp",
    music: "./bismillah.mp3",

    // Replace gallery URLs with your own hosted files or image URLs.
    gallery: [
      {
        src: "./media/gallery/01.webp",
        alt: "A softly lit wedding detail",
        caption: "",
      },
      {
        src: "./media/gallery/02.webp",
        alt: "A joyful wedding celebration",
        caption: "",
      },
      {
        src: "./media/gallery/03.webp",
        alt: "Elegant wedding florals and table setting",
        caption: "",
      },
    ],
  },

  program: [
    {
      time: "6:30 PM",
      title: "Guest Arrival",
      note: "",
    },
    {
      time: "07:00 PM",
      title: "Nikah Ceremony",
      note: "Solemnisation & duas",
    },
    {
      time: "07:30 PM",
      title: "Blessings",
      note: "Family greetings & photographs",
    },
    {
      time: "08:00 PM",
      title: "Dinner",
      note: "A feast shared with love",
    },
  ],

  venue: {
    name: "Noor Invites",
    address:
      "Lahore, Pakistan",
    mapUrl: "https://maps.app.goo.gl/9SjDC3RRg9jHZty59",
  },

dressCode: {
  title: "Festive Formal",
  description:
    "Traditional or formal attire is encouraged. Sarees, lehengas, anarkalis, sherwanis, kurtas, suits, and formal dresses are all welcome. We kindly ask guests to avoid overly casual attire and white or ivory.",
  swatches: [
    "#7A1F2B",
    "#234638",
    "#C49A56",
    "#7A4968",
    "#31506B",
  ],
},

  preWeddingEvents: [
    {
      name: "Mehendi",
      date: "October 15",
      time: "4:00 PM",
      location: "Bride’s Residence",
      mapLink: "https://maps.app.goo.gl/c4WZJk71NhKc7CDGA",
    },
    {
      name: "Qawwali Evening",
      date: "October 17",
      time: "7:00 PM",
      location: "Groom's Residence",
      mapLink: "https://maps.app.goo.gl/c4WZJk71NhKc7CDGA",
    },
    {
      name: "Walima",
      date: "October 19",
      time: "7:30 PM",
      location: "Lahore, Pakistan",
      mapLink: "https://maps.app.goo.gl/VY3FM2kntM26syuJ8",
    },
  ],

  rsvp: {
    deadline: "Kindly respond by September 15, 2026",
    contact: "For assistance, call +91 98765 43210",
    fields: {
      name: "Your full name",
      email: "Email address",
      attendance: ["Joyfully accepts", "Regretfully declines"],
      guests: ["1 guest", "2 guests", "3 guests", "4 guests"],
      note: "Dietary notes or a message for the couple",
    },
  },

theme: {
  ivory: "#F7EFE2",       /* warm bridal ivory */
  plum: "#5A4035",        /* deep warm cocoa */
  lavender: "#D8B7A6",    /* muted blush nude */
  mauve: "#B97D6D",       /* dusty rose */
  lilac: "#A8A28A",       /* soft sage taupe */
  champagne: "#B88A45",   /* antique gold */
},
};
