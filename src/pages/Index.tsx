import { useState } from "react";
import InspectionHeader from "@/components/InspectionHeader";
import ImageUploadZone from "@/components/ImageUploadZone";
import VehicleInfoForm from "@/components/VehicleInfoForm";
import InspectionButton from "@/components/InspectionButton";
import InspectionResults from "@/components/InspectionResults";
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
    toast.success("Inspection completed successfully!");
  };

  const generateReport = () => {
    toast.success("Report generation feature coming soon!");
    // In a real app, this would generate and download a PDF report
  };

  return (
    <div className="min-h-screen bg-background">
      <InspectionHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {!isInspectionComplete ? (
          <>
            {/* Image Upload Section */}
            <section className="space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Upload Vehicle Images</h2>
                <p className="text-muted-foreground">
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
                <h2 className="text-2xl font-bold text-foreground">Vehicle Information</h2>
                <p className="text-muted-foreground">
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
          </>
        ) : (
          <>
            {/* Results Section */}
            <section className="space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Inspection Results</h2>
                <p className="text-muted-foreground">
                  AI-powered damage detection analysis completed
                </p>
              </div>
              <InspectionResults
                results={inspectionResults}
                images={uploadedImages}
                onGenerateReport={generateReport}
              />
            </section>

            {/* New Inspection Button */}
            <section className="text-center">
              <button
                onClick={() => {
                  setUploadedImages([]);
                  setVehicleInfo(null);
                  setInspectionResults([]);
                  setIsInspectionComplete(false);
                  toast.info("Starting new inspection");
                }}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 rounded-lg transition-colors"
              >
                Start New Inspection
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
