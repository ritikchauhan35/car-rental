import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, MapPin } from "lucide-react";

interface SearchHeaderProps {
  searchLocation: string;
  onLocationChange: (value: string) => void;
  resultsCount: number;
}

export const SearchHeader = ({ searchLocation, onLocationChange, resultsCount }: SearchHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <Card className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <div className="sm:col-span-2 md:col-span-2">
            <label className="text-sm font-medium mb-2 block">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Where to?" 
                className="pl-10" 
                value={searchLocation}
                onChange={(e) => onLocationChange(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Pick-up Date</label>
            <Input type="date" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Return Date</label>
            <Input type="date" />
          </div>
          <div className="flex items-end sm:col-span-2 md:col-span-1">
            <Button 
              size="lg" 
              className="w-full"
              onClick={() => {/* Search functionality already working via filters */}}
            >
              <Search className="mr-2 h-4 w-4" />
              Search ({resultsCount} found)
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};