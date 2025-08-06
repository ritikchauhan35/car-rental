import { motion } from "framer-motion";
import { VehicleCard } from "@/components/VehicleCard";
import { Vehicle } from "@/data/vehiclesData";

interface VehicleGridProps {
  vehicles: Vehicle[];
  viewMode: "grid" | "list";
}

export const VehicleGrid = ({ vehicles, viewMode }: VehicleGridProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
          : "space-y-4"
      }
    >
      {vehicles.map((vehicle, index) => (
        <motion.div
          key={vehicle.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 * index }}
        >
          <VehicleCard vehicle={vehicle} />
        </motion.div>
      ))}
    </motion.div>
  );
};