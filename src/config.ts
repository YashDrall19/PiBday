import img5776 from '@/assets/IMG_5776.jpeg';
import memory1 from '@/assets/WhatsApp_Image_2026-11-11_at_22.55.17.jpeg';
import memory2 from '@/assets/WhatsApp_Image_2026-11-11_at_22.56.33.jpeg';
import memory3 from '@/assets/WhatsApp_Image_2026-11-11_at_23.29.05.jpeg';
import video1 from '@/assets/v1.mp4';
import video2 from '@/assets/v2.mp4';

// ============================================================
//  YOUR BIRTHDAY WEBSITE — PERSONALIZATION CONFIG
//  Edit anything here to make this gift yours. 💗
// ============================================================

export const config = {
  // --- The Birthday Girl ---
  name: "Pihu",
  nickname: "Pihuuu",

  // --- The Magical Introduction ---
  intro: {
    greeting: "Hey, Birthday Girl! 💗",
    heading: "Today, the universe celebrates YOU.",
    subheading:
      "Someone pretty hard to ignore deserves something a little more magical today...",
    button: "Open Your Little Surprise ✨",
  },

  // --- The Grand Hero ---
  hero: {
    heading: "Happiest Birthday, Pihuuu! 🎂",
    subtitle:
      "To the girl who turns ordinary days into something worth remembering — and somehow makes my boring life a lot less boring. Don't let it get to your head though... it's already pretty crowded in there.",
  },

  // --- A Little Message From Me 💌 ---
  letter: {
    heading: "A little something from me...",
    // Each line reveals one-by-one. Keep lines short for the best effect.
    lines: [
      "Heyyy Pihuuu! 💗",
      "",
      "First of all, HAPPY BIRTHDAYYYY!",
      "",
      "I hope your day is filled with endless smiles, unexpected surprises, delicious cake (that you don't have to share), and all the happiness your heart can hold.",
      "",
      "You deserve all the beautiful things this world has to offer. Never stop being the wonderful, crazy, funny, and dangerously adorable person you are. (Yes, I said dangerously. You're a hazard to my peace of mind and I'm not even mad about it.)",
      "",
      "Thank you for being such a special part of my life. I still don't know what I did to deserve someone like you in my corner — but whatever it was, I'd do it a hundred times over just to end up here.",
      "",
      "Keep smiling, keep shining, keep annoying people with your adorable craziness, and please never let that beautiful smile fade. (And yes, I'll keep calling it beautiful every chance I get. No takebacks, no refunds.)",
      "",
      "Here's to more laughter, more late-night conversations, more moments where you say something completely random and I somehow fall for it a little more every single time.",
      "",
      "Stay the amazing person you are, Pihu. The world's honestly a little luckier with you in it — and I'm not even being dramatic when I say so am I.",
      "",
      "Once again, HAPPY BIRTHDAY! 🥹💗",
    ],
  },

  // --- Reasons Why You're Awesome 🌷 ---
  reasons: {
    heading: "Just a few reasons why you're special...",
    cards: [
      { icon: "Smile", text: "That smile of yours? Absolutely unfair advantage. You know exactly what it does to people and you still use it like it's free." },
      { icon: "Sparkles", text: "Your random craziness is honestly iconic. Never a dull moment around you — and I'd happily volunteer for more." },
      { icon: "Heart", text: "You have a heart full of kindness — hidden under all that chaos. It's a dangerously cute combo, honestly." },
      { icon: "Star", text: "You're effortlessly unique. The kind of person that's hard to find, impossible to forget, and frankly a little addictive to be around." },
      { icon: "Sun", text: "Your presence makes moments better. Especially mine. Not even trying to be subtle about it anymore." },
      { icon: "Gift", text: "You deserve happiness in unlimited quantities. Refills allowed. No expiry. And I'll happily keep adding to the supply." },
      { icon: "Crown", text: "Never underestimate how amazing you are, Pihu. You're the whole package — and yeah, I noticed. Hard not to." },
    ],
  },

  // --- Our Little Memory Lane 📸 ---
  // Memory photos and videos are bundled from src/assets.
  memories: {
    heading: "Little moments, lovely memories.",
    photos: [
      {
        src: memory1,
        caption: "A moment worth remembering 💗",
        rotate: -4,
      },
      {
        src: video1,
        caption: "Some memories just hit differently.",
        rotate: 3,
        media: "video",
      },
      {
        src: memory2,
        caption: "One for the memory collection!",
        rotate: -2,
      },
      {
        src: img5776,
        caption: "Good times, great company.",
        rotate: 5,
      },
      {
        src: video2,
        caption: "Laughing till it hurt 💗",
        rotate: -5,
        media: "video",
      },
      {
        src: memory3,
        caption: "Forever one of my favorites.",
        rotate: 2,
      },
    ],
  },

  // --- A Little Wish For You 🌙 ---
  wish: {
    heading: "If I could wish one thing for you...",
    paragraphs: [
      "I'd wish that life always gives you reasons to smile, that your dreams find their way to reality, that you never feel alone, and that happiness follows you wherever you go — like a loyal little shadow, but way less creepy.",
      "May this new chapter of your life be filled with beautiful beginnings, unexpected blessings, way too much cake, and moments that make your heart smile even on the tough days. You deserve every single one of them, Pihu.",
    ],
  },

  // --- The Interactive Birthday Cake 🎂 ---
  cake: {
    heading: "Okayyy Pihuuu! Time to make a wish!",
    hint: "Tap each candle to blow it out… and don't waste your wish on me being less annoying. I'm not going anywhere, sorry.",
    afterMessage: "May every little wish of yours come true! 💗",
    candleCount: 1,
  },

  // --- The Final Surprise 🎁 ---
  final: {
    lead: "One Last Thing...",
    message: [
      "Never forget how special you are, Pihu. The world is a little brighter, a little louder, and a lot more fun with you in it.",
      "Keep smiling, keep dreaming, keep being your unapologetically amazing self — and keep making my days better without even lifting a finger. It's honestly a little unfair how good you are at that.",
      "Happy Birthday, Once Again! 💗",
    ],
    button: "Send Me a Smile 😊",
    popup: "Mission accomplished! Now go enjoy your special day, Pihuuu! And don't think I forgot — you owe me a cute selfie, right now. 🥳💗",
  },

  // --- Theme Colors (Tailwind-compatible hex) ---
  // Tweak these to change the whole vibe.
  theme: {
    blush: "#ffd6e8",
    pink: "#ff8fb1",
    rose: "#ff6b9d",
    lavender: "#c9b6ff",
    periwinkle: "#a9b8ff",
    babyBlue: "#bfe3ff",
    cream: "#fff6ef",
    peach: "#ffd9c2",
    champagne: "#f3d9a0",
    ink: "#5b3a52",
  },
};

export type Config = typeof config;
