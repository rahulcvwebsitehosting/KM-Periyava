
export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  programs?: string[];
  donors?: string[];
  mediaUrl: string;
}

export const eventsData: Event[] = [
  {
    id: "anusham-jan-2026",
    title: "ANUSHAM POOJA",
    date: "January 14, 2026",
    description: "Anusham pooja for Sri Mahaperiyava held on 14th January, 2026.",
    programs: ["Avahanthi Homam", "Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam", "Annadhanam"],
    donors: ["Mr. Shyam Sundar, West Mambalam (Chennai)", "Mr. Mahalingam (Chennai)", "Mr. Subash Chand (Chennai)", "Mr. Suresh (Chennai)"],
    mediaUrl: "https://photos.app.goo.gl/CeiJqFRaERLWLt1h6"
  },
  {
    id: "anusham-dec-2025",
    title: "ANUSHAM POOJA",
    date: "December 18, 2025",
    description: "Anusham pooja for Sri Mahaperiyava held on 18th December, 2025.",
    programs: ["Avahanthi Homam", "Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam", "Annadhanam"],
    donors: ["Mr. Uma maheswaran (Bangalore)", "Mrs. Brindha (Chennai)"],
    mediaUrl: "https://photos.app.goo.gl/dtHmpTDvb1fJVrRW7"
  },
  {
    id: "anusham-oct-2025",
    title: "ANUSHAM POOJA",
    date: "October 24, 2025",
    description: "Anusham pooja for Sri Mahaperiyava held on 24th October, 2025. Due to rain, evening there was no Maha Periyava temple car purappadu, so vaidhighas recited vedha parayanam in Mahaperiyava sannadhi.",
    programs: ["Avahanthi Homam", "Uthagashanthi parayanam", "Annadhanam"],
    donors: ["Mr. T.S. Subramaniyan (Chennai)"],
    mediaUrl: "https://photos.app.goo.gl/whDB6M7vxwYTgEKU9"
  },
  {
    id: "anusham-feb-2025",
    title: "ANUSHAM POOJA",
    date: "February 21, 2025",
    description: "Anusham pooja for Sri Mahaperiyava celebrated on 21st February 2025.",
    programs: ["Avahanthi Homam", "Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam", "Annadhanam"],
    donors: ["Mrs. Subashini Vijayaraghavan (Chennai)", "Mr. Thyagarajan (Chennai)"],
    mediaUrl: "https://photos.app.goo.gl/n1i8rNowxitoN3UW8"
  },
  {
    id: "bhairavar-feb-2025",
    title: "ASHTAMI BHAIRAVAR POOJA",
    date: "February 20, 2025",
    description: "Theipirai Ashtami pooja for Bhairavar was done on 20th February, 2025 in Sri Soundaranayagi sametha Sri Kailasanathar temple, Kandhamangalam.",
    donors: ["Mr. Ramalingam (Chennai)", "Mrs. Lakshmi Priya (Chennai)", "Mrs. Poongodi Senthilkumar (Finland)"],
    mediaUrl: "https://photos.app.goo.gl/h6CGfLYwP5fKHZSP9"
  },
  {
    id: "anusham-oct-2024",
    title: "ANUSHAM POOJA",
    date: "October 7, 2024",
    description: "Anusham pooja for Sri Mahaperiyava held on 7th October, 2024.",
    programs: ["Avahanthi Homam", "Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam", "Annadhanam"],
    donors: ["Mr. T.S. Subramaniyam (Chennai)"],
    mediaUrl: "https://photos.app.goo.gl/cczwUqfUmxd4jKkQ7"
  },
  {
    id: "vinayagar-2024",
    title: "VINAYAGAR CHATHURTHI",
    date: "September 7, 2024",
    description: "Vinayagar chathurthi was celebrated in Kandhamangalam Sri Prasanna Maha Ganapathi temple on 7th September, 2024 in a grand manner.",
    mediaUrl: "https://photos.app.goo.gl/2dP1KdMKSyQxeNvK9"
  },
  {
    id: "shivaratri-2024",
    title: "MAHA SIVARATHRI",
    date: "March 8, 2024",
    description: "Maha Shivaratri is a Hindu festival that honours God Shiva, also called 'The Night of Shiva'. In Sri Soundaranayagi samedha Sri Kailasanathar temple, Kandhamangalam, Maha Sivarathri was celebrated throughout the night.",
    mediaUrl: "https://photos.app.goo.gl/w9bsKYktqJeRHZhTA"
  },
  {
    id: "anusham-mar-2024",
    title: "ANUSHAM POOJA",
    date: "March 3, 2024",
    description: "Anusham pooja for Sri Mahaperiyava held on 3rd March, 2024.",
    programs: ["Avahanthi Homam", "Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam", "Annadhanam"],
    donors: ["Mr. Suresh (Chennai)"],
    mediaUrl: "https://photos.app.goo.gl/MuzUyzq3KfnkBBi77"
  },
  {
    id: "anusham-feb-2024",
    title: "ANUSHAM POOJA",
    date: "February 4, 2024",
    description: "Anusham pooja for Sri Mahaperiyava held on 4th February, 2024.",
    programs: ["Avahanthi Homam", "Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam", "Annadhanam"],
    donors: ["Mr. Thyagarajan (Chennai)"],
    mediaUrl: "https://photos.app.goo.gl/dPLXQy3nCkQ83RqcA"
  }
];
