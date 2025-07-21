import { Car, Shield, FileText, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileNav from "./MobileNav";
import { toast } from "sonner";

interface InspectionHeaderProps {
  onFeatureClick?: (feature: string) => void;
}

const InspectionHeader = ({ onFeatureClick }: InspectionHeaderProps) => {
  const handleFeatureClick = (feature: string) => {
    if (feature === "auth" || feature === "profile" || feature === "history") {
      toast.info("Connect to Supabase to enable user authentication and data storage");
    } else {
      toast.info(`${feature} feature coming soon!`);
    }
    onFeatureClick?.(feature);
  };

  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-inspection sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Car className="h-6 w-6 md:h-8 md:w-8" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Inspecop</h1>
              <p className="text-primary-foreground/80 text-xs md:text-sm">AI Vehicle Inspection Platform</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Professional Grade</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">Instant Reports</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary-foreground hover:bg-white/10"
              onClick={() => handleFeatureClick("notifications")}
            >
              <Bell className="h-4 w-4" />
            </Button>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search inspections..." 
                className="pl-10 w-64 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <MobileNav onFeatureClick={handleFeatureClick} />
        </div>
      </div>
    </header>
  );
};

export default InspectionHeader;