import { Vehicle } from "../types";

export const suvs: Vehicle[] = [
  {
    id: "4",
    name: "BMW X5",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    price: 120,
    rating: 4.8,
    location: "London, UK",
    seats: 7,
    category: "SUV",
    transmission: "Automatic" as const,
    fuel: "Gasoline"
  },
  {
    id: "18",
    name: "Range Rover Evoque",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    price: 150,
    rating: 4.9,
    location: "Cape Town, South Africa",
    seats: 5,
    category: "SUV",
    transmission: "Automatic" as const,
    fuel: "Gasoline"
  },
  {
    id: "33",
    name: "Jeep Wrangler",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price: 85,
    rating: 4.6,
    location: "Denver, CO, USA",
    seats: 5,
    category: "SUV",
    transmission: "Manual" as const,
    fuel: "Gasoline"
  },
  {
    id: "34",
    name: "Toyota Land Cruiser",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price: 95,
    rating: 4.7,
    location: "Dubai, UAE",
    seats: 8,
    category: "SUV",
    transmission: "Automatic" as const,
    fuel: "Gasoline"
  },
  {
    id: "35",
    name: "Porsche Cayenne",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price: 145,
    rating: 4.8,
    location: "Zurich, Switzerland",
    seats: 5,
    category: "SUV",
    transmission: "Automatic" as const,
    fuel: "Gasoline"
  },
  {
    id: "36",
    name: "Cadillac Escalade",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price: 125,
    rating: 4.6,
    location: "Dallas, TX, USA",
    seats: 8,
    category: "SUV",
    transmission: "Automatic" as const,
    fuel: "Gasoline"
  },
  {
    id: "64",
    name: "Proton X50",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price: 45,
    rating: 4.2,
    location: "Kuala Lumpur, Malaysia",
    seats: 5,
    category: "SUV",
    transmission: "Automatic" as const,
    fuel: "Gasoline"
  },
  {
    id: "78",
    name: "Tata Nexon",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price: 35,
    rating: 4.2,
    location: "Pune, India",
    seats: 5,
    category: "SUV",
    transmission: "Manual" as const,
    fuel: "Gasoline"
  },
  {
    id: "79",
    name: "Chery Tiggo",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    price: 42,
    rating: 4.1,
    location: "Shanghai, China",
    seats: 5,
    category: "SUV",
    transmission: "Automatic" as const,
    fuel: "Gasoline"
  }
];