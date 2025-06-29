
import { Home, Plus, TrendingUp, Settings, Heart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    { id: 'entry', label: 'Saisie du jour', icon: Plus },
    { id: 'trends', label: 'Tendances', icon: TrendingUp },
    { id: 'triggers', label: 'Déclencheurs', icon: AlertTriangle },
    { id: 'joys', label: 'Sources de joie', icon: Heart },
    { id: 'settings', label: 'Réglages', icon: Settings },
  ];

  return (
    <nav className="bg-card border-r border-border p-4 min-h-screen w-64">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary mb-2">Daily Insights</h1>
        <p className="text-sm text-muted-foreground">Compass</p>
      </div>
      
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={currentView === item.id ? "default" : "ghost"}
              className="w-full justify-start zen-focus"
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
