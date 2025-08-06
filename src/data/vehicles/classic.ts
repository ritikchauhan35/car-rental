import { Vehicle } from "../types";

export const classicVehicles: Vehicle[] = [
  {
    id: "74",
    name: "Volkswagen Beetle Classic",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
    price: 55,
    rating: 4.7,
    location: "San Francisco, CA, USA",
    seats: 4,
    category: "Classic",
    transmission: "Manual" as const,
    fuel: "Gasoline"
  },
  {
    id: "75",
    name: "Ford Mustang '67",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
    price: 125,
    rating: 4.8,
    location: "Detroit, MI, USA",
    seats: 4,
    category: "Classic",
    transmission: "Manual" as const,
    fuel: "Gasoline"
  },
  {
    id: "76",
    name: "Porsche 911 Classic",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
    price: 185,
    rating: 4.9,
    location: "Stuttgart, Germany",
    seats: 4,
    category: "Classic",
    transmission: "Manual" as const,
    fuel: "Gasoline"
  }
];