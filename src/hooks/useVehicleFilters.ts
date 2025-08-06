import { useState, useMemo } from "react";
import { Vehicle } from "@/data/vehiclesData";

export interface FilterState {
  searchLocation: string;
  vehicleType: string;
  transmission: string;
  fuelType: string;
  priceRange: [number, number];
  sortBy: string;
}

export const useVehicleFilters = (vehicles: Vehicle[]) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("all");
  const [transmission, setTransmission] = useState("all");
  const [fuelType, setFuelType] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState("price-low");

  const filteredAndSortedVehicles = useMemo(() => {
    // Filter vehicles
    const filtered = vehicles.filter(vehicle => {
      const matchesLocation = !searchLocation || 
        vehicle.location.toLowerCase().includes(searchLocation.toLowerCase());
      
      const matchesPrice = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
      
      const matchesType = vehicleType === "all" || 
        vehicle.category.toLowerCase() === vehicleType;
      
      const matchesTransmission = transmission === "all" || 
        vehicle.transmission.toLowerCase() === transmission;
      
      const matchesFuel = fuelType === "all" || 
        vehicle.fuel.toLowerCase() === fuelType;
      
      return matchesLocation && matchesPrice && matchesType && matchesTransmission && matchesFuel;
    });

    // Sort vehicles
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return 0; // Would sort by creation date in real app
        default:
          return 0;
      }
    });
  }, [vehicles, searchLocation, vehicleType, transmission, fuelType, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchLocation("");
    setVehicleType("all");
    setTransmission("all");
    setFuelType("all");
    setPriceRange([0, 200]);
    setSortBy("price-low");
  };

  return {
    // State
    searchLocation,
    vehicleType,
    transmission,
    fuelType,
    priceRange,
    sortBy,
    // Setters
    setSearchLocation,
    setVehicleType,
    setTransmission,
    setFuelType,
    setPriceRange,
    setSortBy,
    // Computed
    filteredAndSortedVehicles,
    clearFilters,
  };
};