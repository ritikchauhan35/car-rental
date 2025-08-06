import { Vehicle } from "../types";

export const hybridVehicles: Vehicle[] = [
  {
    id: "8",
    name: "Toyota Prius",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop",
    price: 55,
    rating: 4.5,
    location: "Tokyo, Japan",
    seats: 5,
    category: "Hybrid",
    transmission: "Automatic" as const,
    fuel: "Hybrid"
  },
  {
    id: "50",
    name: "Toyota Camry Hybrid",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop",
    price: 58,
    rating: 4.5,
    location: "Portland, OR, USA",
    seats: 5,
    category: "Hybrid",
    transmission: "Automatic" as const,
    fuel: "Hybrid"
  },
  {
    id: "51",
    name: "Honda Accord Hybrid",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop",
    price: 62,
    rating: 4.6,
    location: "Sacramento, CA, USA",
    seats: 5,
    category: "Hybrid",
    transmission: "Automatic" as const,
    fuel: "Hybrid"
  },
  {
    id: "52",
    name: "Lexus ES Hybrid",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    price: 75,
    rating: 4.7,
    location: "Nagoya, Japan",
    seats: 5,
    category: "Hybrid",
    transmission: "Automatic" as const,
    fuel: "Hybrid"
  }
];