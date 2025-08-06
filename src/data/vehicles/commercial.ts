import { Vehicle } from "../types";

export const commercialVehicles: Vehicle[] = [
  {
    id: "53",
    name: "Ford Transit",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price: 65,
    rating: 4.3,
    location: "Chicago, IL, USA",
    seats: 8,
    category: "Van",
    transmission: "Automatic" as const,
    fuel: "Gasoline"
  },
  {
    id: "54",
    name: "Mercedes Sprinter",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price: 78,
    rating: 4.4,
    location: "Frankfurt, Germany",
    seats: 12,
    category: "Van",
    transmission: "Automatic" as const,
    fuel: "Gasoline"
  },
  {
    id: "55",
    name: "Volkswagen Crafter",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price: 72,
    rating: 4.2,
    location: "Hamburg, Germany",
    seats: 9,
    category: "Van",
    transmission: "Manual" as const,
    fuel: "Gasoline"
  },
  {
    id: "56",
    name: "Ford F-150",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price: 89,
    rating: 4.5,
    location: "Austin, TX, USA",
    seats: 5,
    category: "Pickup",
    transmission: "Automatic" as const,
    fuel: "Gasoline"
  },
  {
    id: "57",
    name: "Toyota Tacoma",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price: 82,
    rating: 4.6,
    location: "Phoenix, AZ, USA",
    seats: 5,
    category: "Pickup",
    transmission: "Manual" as const,
    fuel: "Gasoline"
  },
  {
    id: "58",
    name: "Ram 1500",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price: 92,
    rating: 4.4,
    location: "Atlanta, GA, USA",
    seats: 5,
    category: "Pickup",
    transmission: "Automatic" as const,
    fuel: "Gasoline"
  }
];