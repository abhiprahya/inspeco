import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Car, User, FileText } from "lucide-react";

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

interface VehicleInfoFormProps {
  onInfoChange: (info: VehicleInfo) => void;
}

const VehicleInfoForm = ({ onInfoChange }: VehicleInfoFormProps) => {
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
    vehicleNumber: "",
    ownerName: "",
    inspectionDate: new Date().toISOString().split('T')[0],
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    mileage: "",
    notes: ""
  });

  const handleInputChange = (field: keyof VehicleInfo, value: string) => {
    const updatedInfo = { ...vehicleInfo, [field]: value };
    setVehicleInfo(updatedInfo);
    onInfoChange(updatedInfo);
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Car className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Vehicle Information</h2>
          <p className="text-muted-foreground text-sm">Enter vehicle details for the inspection report</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleNumber" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Vehicle Number</span>
            </Label>
            <Input
              id="vehicleNumber"
              placeholder="e.g., ABC-1234"
              value={vehicleInfo.vehicleNumber}
              onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
              className="transition-all duration-300 focus:shadow-float"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerName" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Owner Name</span>
            </Label>
            <Input
              id="ownerName"
              placeholder="Enter owner name"
              value={vehicleInfo.ownerName}
              onChange={(e) => handleInputChange('ownerName', e.target.value)}
              className="transition-all duration-300 focus:shadow-float"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inspectionDate" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Inspection Date</span>
            </Label>
            <Input
              id="inspectionDate"
              type="date"
              value={vehicleInfo.inspectionDate}
              onChange={(e) => handleInputChange('inspectionDate', e.target.value)}
              className="transition-all duration-300 focus:shadow-float"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mileage">Mileage (km)</Label>
            <Input
              id="mileage"
              placeholder="e.g., 50,000"
              value={vehicleInfo.mileage}
              onChange={(e) => handleInputChange('mileage', e.target.value)}
              className="transition-all duration-300 focus:shadow-float"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleMake">Vehicle Make</Label>
            <Input
              id="vehicleMake"
              placeholder="e.g., Toyota"
              value={vehicleInfo.vehicleMake}
              onChange={(e) => handleInputChange('vehicleMake', e.target.value)}
              className="transition-all duration-300 focus:shadow-float"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleModel">Vehicle Model</Label>
            <Input
              id="vehicleModel"
              placeholder="e.g., Camry"
              value={vehicleInfo.vehicleModel}
              onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
              className="transition-all duration-300 focus:shadow-float"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleYear">Year</Label>
            <Input
              id="vehicleYear"
              placeholder="e.g., 2020"
              value={vehicleInfo.vehicleYear}
              onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
              className="transition-all duration-300 focus:shadow-float"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information..."
              value={vehicleInfo.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="transition-all duration-300 focus:shadow-float min-h-[80px]"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VehicleInfoForm;