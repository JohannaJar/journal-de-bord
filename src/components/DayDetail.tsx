
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Calendar, TrendingUp, Smile, AlertTriangle, Heart } from "lucide-react";

interface DayDetailData {
  date: string;
  intensity: number;
  mood: number;
  triggers: string[];
  joys: string[];
  notes: string;
}

interface DayDetailProps {
  data: DayDetailData;
  onClose: () => void;
}

const DayDetail = ({ data, onClose }: DayDetailProps) => {
  const moodLabels = ["Très difficile", "Difficile", "Neutre", "Bien", "Très bien"];
  const moodEmojis = ["😢", "😔", "😐", "😊", "😄"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Détail du {new Date(data.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-calm-blue/10">
              <TrendingUp className="h-5 w-5 text-calm-blue" />
              <div>
                <p className="text-sm text-muted-foreground">Intensité symptômes</p>
                <p className="text-2xl font-bold text-calm-blue">{data.intensity}/10</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-soft-green/10">
              <Smile className="h-5 w-5 text-soft-green" />
              <div>
                <p className="text-sm text-muted-foreground">Humeur</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{moodEmojis[data.mood - 1]}</span>
                  <span className="font-bold text-soft-green">{moodLabels[data.mood - 1]}</span>
                </div>
              </div>
            </div>
          </div>

          {data.triggers && data.triggers.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warm-yellow" />
                <h3 className="font-medium text-warm-yellow">Déclencheurs</h3>
              </div>
              <div className="space-y-2">
                {data.triggers.map((trigger, index) => (
                  <div key={index} className="p-2 bg-warm-yellow/10 rounded-lg">
                    <p className="text-sm">{trigger}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.joys && data.joys.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-soft-green" />
                <h3 className="font-medium text-soft-green">Sources de plaisir</h3>
              </div>
              <div className="space-y-2">
                {data.joys.map((joy, index) => (
                  <div key={index} className="p-2 bg-soft-green/10 rounded-lg">
                    <p className="text-sm">{joy}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.notes && (
            <div className="space-y-2">
              <h3 className="font-medium">Notes</h3>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{data.notes}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DayDetail;
