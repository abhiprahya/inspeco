import { 
  User, 
  History, 
  Share2, 
  FileText, 
  AlertTriangle, 
  Settings, 
  HelpCircle,
  Car,
  Shield,
  CreditCard,
  MapPin,
  Camera,
  Calendar,
  Database,
  Smartphone
} from "lucide-react";
import FeatureCard from "./FeatureCard";
import { toast } from "sonner";

interface FeatureDashboardProps {
  onBackToInspection: () => void;
}

const FeatureDashboard = ({ onBackToInspection }: FeatureDashboardProps) => {
  const handleFeatureClick = (feature: string) => {
    if (["profile", "history", "auth", "reports", "alerts"].includes(feature)) {
      toast.info("This feature requires Supabase backend integration. Click the green Supabase button to get started!");
    } else {
      toast.info(`${feature} feature coming soon!`);
    }
  };

  const coreFeatures = [
    {
      icon: <Car className="h-6 w-6 text-primary" />,
      title: "AI Vehicle Inspection",
      description: "Upload images and get AI-powered damage detection",
      status: "available" as const,
      onClick: onBackToInspection
    },
    {
      icon: <User className="h-6 w-6 text-primary" />,
      title: "User Authentication",
      description: "Login with email or Google account",
      status: "requires-backend" as const,
      onClick: () => handleFeatureClick("auth")
    },
    {
      icon: <History className="h-6 w-6 text-primary" />,
      title: "Inspection History",
      description: "View and manage all vehicle inspections",
      status: "requires-backend" as const,
      onClick: () => handleFeatureClick("history")
    },
    {
      icon: <Share2 className="h-6 w-6 text-primary" />,
      title: "Share Reports",
      description: "Share inspection reports via WhatsApp or email",
      status: "requires-backend" as const,
      onClick: () => handleFeatureClick("share")
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "PDF Reports",
      description: "Generate professional inspection reports",
      status: "coming-soon" as const,
      onClick: () => handleFeatureClick("reports")
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-primary" />,
      title: "Critical Alerts",
      description: "Get notified about critical vehicle issues",
      status: "requires-backend" as const,
      onClick: () => handleFeatureClick("alerts")
    }
  ];

  const advancedFeatures = [
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: "Vehicle Records",
      description: "Maintain comprehensive service history",
      status: "requires-backend" as const
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Location Services",
      description: "GPS tracking for inspection locations",
      status: "coming-soon" as const
    },
    {
      icon: <Camera className="h-6 w-6 text-primary" />,
      title: "Gallery Permissions",
      description: "Access device camera and photo gallery",
      status: "coming-soon" as const
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Service Reminders",
      description: "Schedule maintenance based on inspection results",
      status: "requires-backend" as const
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Biometric Auth",
      description: "Fingerprint and face recognition",
      status: "coming-soon" as const
    },
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: "Valuator Info",
      description: "Vehicle valuation and market data",
      status: "coming-soon" as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Core Features */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Core Features</h2>
          <p className="text-muted-foreground">Essential vehicle inspection capabilities</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Advanced Features */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Advanced Features</h2>
          <p className="text-muted-foreground">Professional-grade inspection tools</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advancedFeatures.map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature} 
              onClick={() => handleFeatureClick(feature.title.toLowerCase())}
            />
          ))}
        </div>
      </section>

      {/* Quick Setup Guide */}
      <section className="bg-gradient-card rounded-lg p-6 border">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">Quick Setup Guide</h3>
            <p className="text-muted-foreground mb-4">
              To unlock all features, connect your project to Supabase for backend functionality including user authentication, database storage, and more.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                ✓ Image Upload
              </div>
              <div className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                ⏳ User Authentication
              </div>
              <div className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                ⏳ Data Storage
              </div>
              <div className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                ⏳ Report Sharing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="text-center">
        <button
          onClick={() => handleFeatureClick("help")}
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
          <span>Need Help? View FAQ & Documentation</span>
        </button>
      </section>
    </div>
  );
};

export default FeatureDashboard;