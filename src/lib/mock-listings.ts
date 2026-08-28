export type Listing = {
  id: string;
  landlord: string;
  initials: string;
  title: string;
  area: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  size: string;
  rating: number;
  verified: boolean;
  available: string;
  condition: string[];
  description: string;
  phone: string;
  email: string;
};

export const listings: Listing[] = [
  {
    id: "l1",
    landlord: "Naledi Mokoena",
    initials: "NM",
    title: "Sunlit 2-bed cottage",
    area: "Melville, Johannesburg",
    address: "14 Fourth Avenue, Melville, 2092",
    price: "R7 800 / mo",
    beds: 2,
    baths: 1,
    size: "68 m²",
    rating: 4.8,
    verified: true,
    available: "Available 1 Sept",
    condition: ["Freshly painted", "Prepaid electricity", "Fibre ready", "Pet friendly"],
    description:
      "A quiet garden cottage with north-facing windows, a private entrance and an enclosed stoep. Walking distance to 7th Street cafés and the Melville Koppies trail.",
    phone: "+27 82 441 0917",
    email: "naledi.m@homelight.co.za",
  },
  {
    id: "l2",
    landlord: "Peter Adjei",
    initials: "PA",
    title: "Modern studio loft",
    area: "Braamfontein",
    address: "Unit 705, De Beer Street, Braamfontein, 2001",
    price: "R5 400 / mo",
    beds: 1,
    baths: 1,
    size: "42 m²",
    rating: 4.5,
    verified: true,
    available: "Available now",
    condition: ["Newly renovated", "24h security", "Backup water", "Furnished option"],
    description:
      "Compact loft on the 7th floor with skyline views, built-in desk nook and a shared rooftop. Ideal for students and first jobbers, five minutes from campus.",
    phone: "+27 71 220 6634",
    email: "p.adjei@braamlofts.com",
  },
  {
    id: "l3",
    landlord: "Fatima Cassim",
    initials: "FC",
    title: "Family home with yard",
    area: "Bryanston",
    address: "9 Willow Bend Close, Bryanston East, 2191",
    price: "R14 500 / mo",
    beds: 3,
    baths: 2,
    size: "180 m²",
    rating: 4.9,
    verified: false,
    available: "Available 15 Sept",
    condition: ["Solar backup", "Double garage", "Borehole water", "Large garden"],
    description:
      "Single-storey family home in a quiet cul-de-sac, with a covered braai patio, established fruit trees and a separate staff room. Pre-paid electricity and inverter installed.",
    phone: "+27 83 909 1120",
    email: "fatima.cassim@mail.co.za",
  },
  {
    id: "l4",
    landlord: "Sipho Dlamini",
    initials: "SD",
    title: "Budget bachelor flat",
    area: "Yeoville",
    address: "3B Raleigh Street, Yeoville, 2198",
    price: "R3 200 / mo",
    beds: 1,
    baths: 1,
    size: "28 m²",
    rating: 4.1,
    verified: true,
    available: "Available now",
    condition: ["Water included", "Communal laundry", "Secure gate", "Bus route nearby"],
    description:
      "Simple, clean bachelor flat on the ground floor with tiled floors and a small kitchenette. Rent includes water and refuse; electricity is metered per unit.",
    phone: "+27 76 118 3402",
    email: "sipho.d@yeoprops.co.za",
  },
];

export const examplePrompts = [
  {
    icon: "🌿",
    title: "Quiet 2-bed under R8k",
    prompt: "A quiet 2-bedroom cottage in Johannesburg under R8 000 with a garden.",
  },
  {
    icon: "🎓",
    title: "Student flat near campus",
    prompt: "An affordable furnished studio in Braamfontein close to campus.",
  },
  {
    icon: "🏡",
    title: "Family home with a yard",
    prompt: "A 3-bedroom family home in the northern suburbs with a big yard and solar.",
  },
  {
    icon: "💸",
    title: "Cheapest safe place",
    prompt: "The cheapest secure bachelor flat available immediately.",
  },
];

export function aiSummary(prompt: string) {
  const p = prompt.trim().toLowerCase();
  if (p.includes("student") || p.includes("campus") || p.includes("studio"))
    return "I found compact, well-secured units close to campus. The Braamfontein loft fits your budget best and is available immediately.";
  if (p.includes("family") || p.includes("3-bed") || p.includes("yard"))
    return "Here are family-sized homes with outdoor space. The Bryanston house has solar backup and a large garden, though it lists at the top of your range.";
  if (p.includes("cheap") || p.includes("budget"))
    return "These are the most affordable verified listings right now. The Yeoville bachelor flat includes water and can be moved into this week.";
  return "I matched 4 homes to your request, sorted by how closely they fit your budget, area and condition preferences. Two landlords are verified and respond within a day.";
}
