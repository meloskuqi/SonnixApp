// Dummy data for UI preview

export const dummyUser = {
  id: 1,
  name: "Melos Kuqi",
  email: "melos@sonnix.com",
  balance: 125.50,
  tokens: 125,
};

export const dummyTransactions = [
  {
    id: 1,
    type: "Add Funds",
    amount: 50.00,
    description: "Added funds via Credit Card",
    date: "2024-11-10",
    status: "completed",
    isPositive: true,
  },
  {
    id: 2,
    type: "Purchase",
    amount: -15.00,
    description: "Event Ticket - Night Vibes 2024",
    date: "2024-11-09",
    status: "completed",
    isPositive: false,
  },
  {
    id: 3,
    type: "Refund",
    amount: 20.00,
    description: "Refund for cancelled event",
    date: "2024-11-08",
    status: "completed",
    isPositive: true,
  },
  {
    id: 4,
    type: "Sent",
    amount: -10.00,
    description: "Sent to @john_doe",
    date: "2024-11-07",
    status: "completed",
    isPositive: false,
  },
  {
    id: 5,
    type: "Received",
    amount: 25.00,
    description: "Received from @sarah_smith",
    date: "2024-11-06",
    status: "completed",
    isPositive: true,
  },
  {
    id: 6,
    type: "Drink Purchase",
    amount: -5.50,
    description: "2x Mojito at Club Venue",
    date: "2024-11-05",
    status: "completed",
    isPositive: false,
  },
];

export const dummyEvents = [
  {
    id: 1,
    title: "Night Vibes 2024",
    date: "2024-12-15",
    time: "21:00",
    venue: "The Grand Arena",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    price: 25,
    description: "Experience the ultimate night of electronic music with world-class DJs and stunning visuals. A night you won't forget!",
    category: "Music",
  },
  {
    id: 2,
    title: "Summer Festival",
    date: "2024-12-20",
    time: "14:00",
    venue: "Beach Park",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    price: 35,
    description: "Join us for a day full of sunshine, music, and good vibes at the beach. Multiple stages with diverse artists.",
    category: "Festival",
  },
  {
    id: 3,
    title: "Jazz Night",
    date: "2024-12-18",
    time: "19:30",
    venue: "Blue Note Club",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800",
    price: 15,
    description: "An intimate evening of smooth jazz featuring local and international artists in a cozy setting.",
    category: "Jazz",
  },
];

export const dummyTickets = [
  {
    id: 1,
    eventId: 1,
    eventTitle: "Night Vibes 2024",
    date: "2024-12-15",
    venue: "The Grand Arena",
    qrCode: "TICKET-NV2024-001",
    seatNumber: "A-42",
    purchaseDate: "2024-11-09",
  },
];

export const dummyMerch = [
  {
    id: 1,
    name: "Sonnix T-Shirt",
    price: 20,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    description: "Official Sonnix branded t-shirt. 100% cotton, available in multiple sizes.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Sonnix Hat",
    price: 15,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400",
    description: "Stylish Sonnix cap with embroidered logo. One size fits all.",
    sizes: ["One Size"],
  },
];

export const dummyVendorItems = [
  {
    id: 1,
    name: "Mojito",
    price: 8,
    category: "Cocktails",
    image: "🍹",
  },
  {
    id: 2,
    name: "Beer",
    price: 6,
    category: "Beer",
    image: "🍺",
  },
  {
    id: 3,
    name: "Vodka Red Bull",
    price: 10,
    category: "Energy Drinks",
    image: "🥤",
  },
  {
    id: 4,
    name: "Water",
    price: 3,
    category: "Non-Alcoholic",
    image: "💧",
  },
  {
    id: 5,
    name: "Nachos",
    price: 7,
    category: "Food",
    image: "🌮",
  },
  {
    id: 6,
    name: "Pizza Slice",
    price: 5,
    category: "Food",
    image: "🍕",
  },
];

