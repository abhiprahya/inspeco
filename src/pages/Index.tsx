import { useState } from "react";
import InspectionHeader from "@/components/InspectionHeader";
import ImageUploadZone from "@/components/ImageUploadZone";
import VehicleInfoForm from "@/components/VehicleInfoForm";
import InspectionButton from "@/components/InspectionButton";
import InspectionResults from "@/components/InspectionResults";
import FeatureDashboard from "@/components/FeatureDashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car } from "lucide-react";
import { toast } from "sonner";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  angle: string;
}

interface VehicleInfo {
  vehicleNumber: string;
  ownerName: string;
  inspectionDate: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  mileage: string;
  notes: string;
}

interface DamageDetection {
  id: string;
  type: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  imageIndex: number;
  severity: 'low' | 'medium' | 'high';
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'inspection' | 'features' | 'results'>('inspection');
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null);
  const [inspectionResults, setInspectionResults] = useState<DamageDetection[]>([]);
  const [isInspectionComplete, setIsInspectionComplete] = useState(false);

  // Mock API call to external computer vision service
  const performInspection = async (): Promise<void> => {
    toast.info("Starting AI inspection...");
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock detection results
    const mockResults: DamageDetection[] = [
      {
        id: "1",
        type: "Dent",
        confidence: 0.92,
        x: 25,
        y: 30,
        width: 15,
        height: 20,
        imageIndex: 0,
        severity: 'medium'
      },
      {
        id: "2", 
        type: "Scratch",
        confidence: 0.87,
        x: 60,
        y: 45,
        width: 20,
        height: 8,
        imageIndex: 1,
        severity: 'low'
      },
      {
        id: "3",
        type: "Broken Light",
        confidence: 0.95,
        x: 15,
        y: 15,
        width: 12,
        height: 18,
        imageIndex: 2,
        severity: 'high'
      }
    ];

    setInspectionResults(mockResults);
    setIsInspectionComplete(true);
    setCurrentView('results');
    toast.success("Inspection completed successfully!");
  };

  const generateReport = () => {
    toast.success("Report generation feature coming soon!");
    // In a real app, this would generate and download a PDF report
  };

  const startNewInspection = () => {
    setUploadedImages([]);
    setVehicleInfo(null);
    setInspectionResults([]);
    setIsInspectionComplete(false);
    setCurrentView('inspection');
    toast.info("Starting new inspection");
  };

  const handleFeatureClick = (feature: string) => {
    if (feature === 'new-inspection') {
      setCurrentView('inspection');
    } else {
      toast.info(`${feature} feature clicked`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <InspectionHeader onFeatureClick={handleFeatureClick} />
      
      {/* Navigation Bar */}
      <div className="bg-muted/30 border-b sticky top-[64px] md:top-[72px] z-30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center space-x-4">
            {currentView !== 'inspection' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('inspection')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Inspection</span>
                <span className="sm:hidden">Back</span>
              </Button>
            )}
            <div className="flex items-center space-x-4 text-sm">
              <button
                onClick={() => setCurrentView('inspection')}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors ${
                  currentView === 'inspection' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Car className="h-4 w-4" />
                <span>Inspection</span>
              </button>
              <button
                onClick={() => setCurrentView('features')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  currentView === 'features' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                All Features
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Feature Dashboard */}
        {currentView === 'features' && (
          <FeatureDashboard onBackToInspection={() => setCurrentView('inspection')} />
        )}

        {/* Inspection View */}
        {currentView === 'inspection' && !isInspectionComplete && (
          <div className="space-y-6 md:space-y-8">
            {/* Image Upload Section */}
            <section className="space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Upload Vehicle Images</h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Upload 3-5 high-quality images of the vehicle from different angles
                </p>
              </div>
              <ImageUploadZone 
                onImagesChange={setUploadedImages}
                maxImages={5}
              />
            </section>

            {/* Vehicle Information Section */}
            <section className="space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Vehicle Information</h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Enter vehicle details for the inspection report
                </p>
              </div>
              <VehicleInfoForm onInfoChange={setVehicleInfo} />
            </section>

            {/* Inspection Button */}
            <section>
              <InspectionButton
                onStartInspection={performInspection}
                imageCount={uploadedImages.length}
                disabled={uploadedImages.length === 0}
              />
            </section>
          </div>
        )}

        {/* Results View */}
        {currentView === 'results' && isInspectionComplete && (
          <div className="space-y-6 md:space-y-8">
            {/* Results Section */}
            <section className="space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Inspection Results</h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  AI-powered damage detection analysis completed
                </p>
              </div>
              <InspectionResults
                results={inspectionResults}
                images={uploadedImages}
                onGenerateReport={generateReport}
              />
            </section>

            {/* Action Buttons */}
            <section className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={startNewInspection}
                variant="outline"
                className="px-6 py-3"
              >
                Start New Inspection
              </Button>
              <Button
                onClick={() => setCurrentView('features')}
                variant="secondary"
                className="px-6 py-3"
              >
                Explore Features
              </Button>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
