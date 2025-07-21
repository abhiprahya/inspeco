import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Scan, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface InspectionButtonProps {
  onStartInspection: () => Promise<void>;
  disabled?: boolean;
  imageCount: number;
}

const InspectionButton = ({ onStartInspection, disabled, imageCount }: InspectionButtonProps) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleInspection = async () => {
    if (imageCount === 0) {
      toast.error("Please upload at least one vehicle image");
      return;
    }

    setIsScanning(true);
    try {
      await onStartInspection();
    } catch (error) {
      console.error("Inspection failed:", error);
      toast.error("Inspection failed. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-inspection text-white shadow-inspection">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="p-3 bg-white/20 rounded-full">
            {isScanning ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : imageCount > 0 ? (
              <CheckCircle className="h-8 w-8" />
            ) : (
              <AlertTriangle className="h-8 w-8" />
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            {isScanning ? "AI Analysis in Progress..." : "Ready for AI Inspection"}
          </h3>
          <p className="text-white/80 text-sm mt-1">
            {isScanning 
              ? "Analyzing images for damage detection" 
              : `${imageCount} image${imageCount !== 1 ? 's' : ''} uploaded • Ready to scan`
            }
          </p>
        </div>

        {isScanning && (
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-white/80 animate-scan rounded-full"></div>
          </div>
        )}

        <Button
          onClick={handleInspection}
          disabled={disabled || isScanning || imageCount === 0}
          size="lg"
          className="bg-white text-primary hover:bg-white/90 transition-all duration-300 min-w-[200px]"
        >
          {isScanning ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Scan className="mr-2 h-5 w-5" />
              Start AI Inspection
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default InspectionButton;