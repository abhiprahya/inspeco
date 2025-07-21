import { useState } from "react";
import { Menu, X, User, History, Settings, HelpCircle, Car, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface MobileNavProps {
  onFeatureClick: (feature: string) => void;
}

const MobileNav = ({ onFeatureClick }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { icon: Car, label: "New Inspection", action: "new-inspection" },
    { icon: History, label: "Inspection History", action: "history" },
    { icon: User, label: "Profile", action: "profile" },
    { icon: Settings, label: "Settings", action: "settings" },
    { icon: HelpCircle, label: "Help & FAQ", action: "help" },
  ];

  const handleItemClick = (action: string) => {
    onFeatureClick(action);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden text-primary-foreground">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 bg-gradient-primary">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-white/20 text-primary-foreground">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-primary-foreground font-medium">Guest User</p>
                <p className="text-primary-foreground/70 text-sm">Login to save data</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.action}
                  onClick={() => handleItemClick(item.action)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            <Separator className="my-4" />

            {/* Quick Actions */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-3">
                Quick Actions
              </h3>
              <button
                onClick={() => handleItemClick("auth")}
                className="w-full flex items-center space-x-3 p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-left"
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Login / Sign Up</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Inspecop v1.0 - AI Vehicle Inspection
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;