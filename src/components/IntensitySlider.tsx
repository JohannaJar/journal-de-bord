
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const IntensitySlider = ({ value, onChange }: IntensitySliderProps) => {
  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return "text-soft-green";
    if (intensity <= 6) return "text-warm-yellow";
    return "text-destructive";
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity === 0) return "Aucun symptôme";
    if (intensity <= 2) return "Très léger";
    if (intensity <= 4) return "Léger";
    if (intensity <= 6) return "Modéré";
    if (intensity <= 8) return "Intense";
    return "Très intense";
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Intensité des symptômes</label>
      <Card className="p-4">
        <CardContent className="space-y-4 p-0">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0</span>
            <span className={`font-medium ${getIntensityColor(value)}`}>
              {value}/10 - {getIntensityLabel(value)}
            </span>
            <span>10</span>
          </div>
          <Slider
            value={[value]}
            onValueChange={(values) => onChange(values[0])}
            max={10}
            step={1}
            className="zen-focus"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default IntensitySlider;
