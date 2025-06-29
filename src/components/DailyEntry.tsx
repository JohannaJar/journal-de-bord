
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, Calendar } from "lucide-react";
import IntensitySlider from "./IntensitySlider";
import MoodSelector from "./MoodSelector";
import TagSelector from "./TagSelector";
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

  const predefinedTriggers = [
    "Bruit fort", "Changement imprévu", "Fatigue", "Foule", "Lumière vive",
    "Stress social", "Texture désagréable", "Transition difficile", "Conflit"
  ];

  const predefinedJoys = [
    "Musique apaisante", "Temps seul", "Routine habituelle", "Nature",
    "Animal de compagnie", "Activité créative", "Lecture", "Sport", "Ami proche"
  ];

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
          
          <TagSelector
            title="Principaux déclencheurs"
            predefinedTags={predefinedTriggers}
            selectedTags={triggers}
            onTagsChange={setTriggers}
            color="yellow"
          />
          
          <TagSelector
            title="Sources de plaisir"
            predefinedTags={predefinedJoys}
            selectedTags={joys}
            onTagsChange={setJoys}
            color="green"
          />
          
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
