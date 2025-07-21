import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  status: "available" | "coming-soon" | "requires-backend";
  onClick?: () => void;
}

const FeatureCard = ({ icon, title, description, status, onClick }: FeatureCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "available":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Available</Badge>;
      case "coming-soon":
        return <Badge variant="outline" className="border-warning text-warning">Coming Soon</Badge>;
      case "requires-backend":
        return <Badge variant="outline" className="border-primary text-primary">Requires Setup</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="p-2 bg-primary/10 rounded-lg">
            {icon}
          </div>
          {getStatusBadge()}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          variant={status === "available" ? "default" : "outline"} 
          className="w-full"
          onClick={onClick}
          disabled={status === "coming-soon"}
        >
          {status === "requires-backend" ? "Setup Required" : status === "coming-soon" ? "Coming Soon" : "Open"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;