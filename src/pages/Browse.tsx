import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { SearchHeader } from "@/components/browse/SearchHeader";
import { FilterSidebar } from "@/components/browse/FilterSidebar";
import { ResultsHeader } from "@/components/browse/ResultsHeader";
import { VehicleGrid } from "@/components/browse/VehicleGrid";
import { LoadMoreSection } from "@/components/browse/LoadMoreSection";
import { vehicles } from "@/data/vehiclesData";
import { useVehicleFilters } from "@/hooks/useVehicleFilters";

export const Browse = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const {
    searchLocation,
    vehicleType,
    transmission,
    fuelType,
    priceRange,
    sortBy,
    setSearchLocation,
    setVehicleType,
    setTransmission,
    setFuelType,
    setPriceRange,
    setSortBy,
    filteredAndSortedVehicles,
    clearFilters,
  } = useVehicleFilters(vehicles);

  return (
    <>
      <SEOHead 
        title="Browse Vehicles - Rent Flow"
        description="Browse and rent from thousands of vehicles worldwide. Cars, motorcycles, scooters available for rent with instant booking and competitive prices."
        keywords="browse vehicles, rent car, motorcycle rental, scooter rental, vehicle search, instant booking"
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <SearchHeader
            searchLocation={searchLocation}
            onLocationChange={setSearchLocation}
            resultsCount={filteredAndSortedVehicles.length}
          />

          <div className="flex gap-8">
            <FilterSidebar
              showFilters={showFilters}
              priceRange={priceRange}
              vehicleType={vehicleType}
              transmission={transmission}
              fuelType={fuelType}
              onPriceRangeChange={setPriceRange}
              onVehicleTypeChange={setVehicleType}
              onTransmissionChange={setTransmission}
              onFuelTypeChange={setFuelType}
              onClearFilters={clearFilters}
            />

            <div className="flex-1">
              <ResultsHeader
                resultsCount={filteredAndSortedVehicles.length}
                viewMode={viewMode}
                sortBy={sortBy}
                onToggleFilters={() => setShowFilters(!showFilters)}
                onViewModeChange={setViewMode}
                onSortChange={setSortBy}
              />

              <VehicleGrid 
                vehicles={filteredAndSortedVehicles}
                viewMode={viewMode}
              />

              <LoadMoreSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};