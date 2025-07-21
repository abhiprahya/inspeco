import { Car, Shield, FileText } from "lucide-react";

const InspectionHeader = () => {
  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-inspection">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Car className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Inspecop</h1>
              <p className="text-primary-foreground/80 text-sm">AI Vehicle Inspection Platform</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Professional Grade</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium">Instant Reports</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default InspectionHeader;