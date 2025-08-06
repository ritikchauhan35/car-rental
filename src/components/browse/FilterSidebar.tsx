import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarProps {
  showFilters: boolean;
  priceRange: [number, number];
  vehicleType: string;
  transmission: string;
  fuelType: string;
  onPriceRangeChange: (value: [number, number]) => void;
  onVehicleTypeChange: (value: string) => void;
  onTransmissionChange: (value: string) => void;
  onFuelTypeChange: (value: string) => void;
  onClearFilters: () => void;
}

export const FilterSidebar = ({
  showFilters,
  priceRange,
  vehicleType,
  transmission,
  fuelType,
  onPriceRangeChange,
  onVehicleTypeChange,
  onTransmissionChange,
  onFuelTypeChange,
  onClearFilters,
}: FilterSidebarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 shrink-0`}
    >
      <Card className="p-4 lg:p-6 sticky top-24">
        <h3 className="font-semibold text-lg mb-4">Filters</h3>
        
        {/* Price Range */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-3 block">Price Range</label>
          <Slider
            value={priceRange}
            onValueChange={onPriceRangeChange}
            max={200}
            step={5}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Vehicle Type */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-3 block">Vehicle Type</label>
          <Select value={vehicleType} onValueChange={onVehicleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="motorcycle">Motorcycle</SelectItem>
              <SelectItem value="scooter">Scooter</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transmission */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-3 block">Transmission</label>
          <Select value={transmission} onValueChange={onTransmissionChange}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fuel Type */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-3 block">Fuel Type</label>
          <Select value={fuelType} onValueChange={onFuelTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Fuels" />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              <SelectItem value="all">All Fuels</SelectItem>
              <SelectItem value="gasoline">Gasoline</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="w-full" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </Card>
    </motion.div>
  );
};