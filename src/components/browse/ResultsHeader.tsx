import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid2X2, List } from "lucide-react";

interface ResultsHeaderProps {
  resultsCount: number;
  viewMode: "grid" | "list";
  sortBy: string;
  onToggleFilters: () => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onSortChange: (value: string) => void;
}

export const ResultsHeader = ({
  resultsCount,
  viewMode,
  sortBy,
  onToggleFilters,
  onViewModeChange,
  onSortChange,
}: ResultsHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="flex items-center justify-between mb-6"
    >
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">Available Vehicles</h2>
        <Badge variant="secondary">{resultsCount} results</Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onToggleFilters}
        >
          <Filter className="h-4 w-4" />
        </Button>
        
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border shadow-lg z-50">
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex border rounded-md">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => onViewModeChange("grid")}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => onViewModeChange("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};