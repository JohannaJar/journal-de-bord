
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import DailyEntry from "@/components/DailyEntry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, TrendingUp, AlertTriangle, Heart } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [entries, setEntries] = useState([]);

  const handleSaveEntry = (entryData: any) => {
    setEntries(prev => [...prev, entryData]);
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard entries={entries} />;
      case 'entry':
        return <DailyEntry onSave={handleSaveEntry} />;
      case 'trends':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Analyse des tendances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cette section contiendra des analyses détaillées de vos patterns et tendances au fil du temps.
                Graphiques avancés, corrélations et insights personnalisés seront disponibles ici.
              </p>
            </CardContent>
          </Card>
        );
      case 'triggers':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warm-yellow" />
                Gestion des déclencheurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ici vous pourrez gérer vos déclencheurs, analyser leur fréquence et impact,
                et développer des stratégies pour mieux les gérer.
              </p>
            </CardContent>
          </Card>
        );
      case 'joys':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-soft-green" />
                Sources de joie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cette section vous aidera à identifier et cultiver les activités et situations
                qui vous apportent du bien-être et de la joie.
              </p>
            </CardContent>
          </Card>
        );
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Réglages et personnalisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Personnalisez votre expérience avec les options d'accessibilité et de préférences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Accessibilité</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Mode sombre/clair</li>
                      <li>• Taille des polices</li>
                      <li>• Contraste élevé</li>
                      <li>• Réduction des animations</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Rappels</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Notification quotidienne</li>
                      <li>• Heure personnalisée</li>
                      <li>• Récapitulatif hebdomadaire</li>
                      <li>• Export des données</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return <Dashboard entries={entries} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      <div className="flex">
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-6">
          <div className="calm-gradient rounded-lg p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
