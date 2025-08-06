import { Vehicle } from "../types";

export const sportsVehicles: Vehicle[] = [
  {
    id: "10",
    name: "Ford Mustang",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
    price: 85,
    rating: 4.8,
    location: "Toronto, Canada",
    seats: 4,
    category: "Sports",
    transmission: "Manual" as const,
    fuel: "Gasoline"
  },
  {
    id: "30",
    name: "Corvette Stingray",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
    price: 155,
    rating: 4.7,
    location: "Miami, FL, USA",
    seats: 2,
    category: "Sports",
    transmission: "Manual" as const,
    fuel: "Gasoline"
  },
  {
    id: "31",
    name: "McLaren 570S",
    image: "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=400&h=300&fit=crop",
    price: 295,
    rating: 4.8,
    location: "Las Vegas, NV, USA",
    seats: 2,
    category: "Sports",
    transmission: "Automatic" as const,
    fuel: "Gasoline"
  },
  {
    id: "32",
    name: "Aston Martin DB11",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
    price: 265,
    rating: 4.8,
    location: "Birmingham, UK",
    seats: 4,
    category: "Sports",
    transmission: "Automatic" as const,
    fuel: "Gasoline"
  }
];