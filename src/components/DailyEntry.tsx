
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Calendar, Plus, X } from "lucide-react";
import IntensitySlider from "./IntensitySlider";
import MoodSelector from "./MoodSelector";
import { toast } from "@/hooks/use-toast";

interface DailyEntryData {
  date: string;
  intensity: number;
  mood: number;
  triggers: string[];
  joys: string[];
  notes: string;
}

interface DailyEntryProps {
  onSave: (data: DailyEntryData) => void;
}

const DailyEntry = ({ onSave }: DailyEntryProps) => {
  const [intensity, setIntensity] = useState(5);
  const [mood, setMood] = useState(3);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [joys, setJoys] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [newTrigger, setNewTrigger] = useState("");
  const [newJoy, setNewJoy] = useState("");

  const addTrigger = () => {
    if (newTrigger.trim()) {
      setTriggers([...triggers, newTrigger.trim()]);
      setNewTrigger("");
    }
  };

  const removeTrigger = (index: number) => {
    setTriggers(triggers.filter((_, i) => i !== index));
  };

  const addJoy = () => {
    if (newJoy.trim()) {
      setJoys([...joys, newJoy.trim()]);
      setNewJoy("");
    }
  };

  const removeJoy = (index: number) => {
    setJoys(joys.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const entryData: DailyEntryData = {
      date: new Date().toISOString().split('T')[0],
      intensity,
      mood,
      triggers,
      joys,
      notes
    };

    onSave(entryData);
    
    toast({
      title: "Entrée sauvegardée !",
      description: "Vos données du jour ont été enregistrées avec succès.",
    });

    // Reset form
    setIntensity(5);
    setMood(3);
    setTriggers([]);
    setJoys([]);
    setNotes("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Saisie du jour - {new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <IntensitySlider value={intensity} onChange={setIntensity} />
          
          <MoodSelector selectedMood={mood} onMoodChange={setMood} />
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Principaux déclencheurs</label>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter un déclencheur..."
                value={newTrigger}
                onChange={(e) => setNewTrigger(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTrigger()}
                className="zen-focus"
              />
              <Button onClick={addTrigger} size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {triggers.length > 0 && (
              <div className="space-y-2">
                {triggers.map((trigger, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-warm-yellow/10 rounded-lg">
                    <span className="text-sm">{trigger}</span>
                    <Button 
                      onClick={() => removeTrigger(index)} 
                      size="sm" 
                      variant="ghost"
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Sources de plaisir</label>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter une source de plaisir..."
                value={newJoy}
                onChange={(e) => setNewJoy(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addJoy()}
                className="zen-focus"
              />
              <Button onClick={addJoy} size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {joys.length > 0 && (
              <div className="space-y-2">
                {joys.map((joy, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-soft-green/10 rounded-lg">
                    <span className="text-sm">{joy}</span>
                    <Button 
                      onClick={() => removeJoy(index)} 
                      size="sm" 
                      variant="ghost"
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Notes libres</label>
            <Textarea
              placeholder="Ajoutez ici toute observation ou réflexion sur votre journée..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] zen-focus"
            />
          </div>
          
          <Button 
            onClick={handleSave} 
            className="w-full zen-focus"
            size="lg"
          >
            <Save className="mr-2 h-4 w-4" />
            Sauvegarder l'entrée du jour
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyEntry;
