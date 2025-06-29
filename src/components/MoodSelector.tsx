
import { Button } from "@/components/ui/button";

interface MoodSelectorProps {
  selectedMood: number;
  onMoodChange: (mood: number) => void;
}

const MoodSelector = ({ selectedMood, onMoodChange }: MoodSelectorProps) => {
  const moods = [
    { value: 1, emoji: "😢", label: "Très difficile" },
    { value: 2, emoji: "😔", label: "Difficile" },
    { value: 3, emoji: "😐", label: "Neutre" },
    { value: 4, emoji: "😊", label: "Bien" },
    { value: 5, emoji: "😄", label: "Très bien" }
  ];

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Humeur globale</label>
      <div className="flex gap-2 justify-between">
        {moods.map((mood) => (
          <Button
            key={mood.value}
            variant={selectedMood === mood.value ? "default" : "outline"}
            className="flex-1 flex flex-col gap-1 h-auto py-3 zen-focus"
            onClick={() => onMoodChange(mood.value)}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs">{mood.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
