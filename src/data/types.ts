export interface Vehicle {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  seats: number;
  category: string;
  transmission: "Automatic" | "Manual";
  fuel: string;
}