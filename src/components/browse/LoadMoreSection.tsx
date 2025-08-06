import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const LoadMoreSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="flex justify-center mt-12"
    >
      <Button variant="outline" size="lg">
        Load More Vehicles
      </Button>
    </motion.div>
  );
};