
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface TagSelectorProps {
  title: string;
  predefinedTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  color: "blue" | "green" | "yellow" | "purple";
}

const TagSelector = ({ title, predefinedTags, selectedTags, onTagsChange, color }: TagSelectorProps) => {
  const [customTag, setCustomTag] = useState("");

  const colorClasses = {
    blue: "bg-calm-blue/20 text-calm-blue border-calm-blue/30",
    green: "bg-soft-green/20 text-soft-green border-soft-green/30",
    yellow: "bg-warm-yellow/20 text-warm-yellow border-warm-yellow/30",
    purple: "bg-gentle-purple/20 text-gentle-purple border-gentle-purple/30"
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      onTagsChange([...selectedTags, customTag.trim()]);
      setCustomTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{title}</label>
      
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={`${colorClasses[color]} cursor-pointer`}
            >
              {tag}
              <X 
                className="ml-1 h-3 w-3"
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Predefined Tags */}
      <div className="flex flex-wrap gap-2">
        {predefinedTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            size="sm"
            className="zen-focus"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Custom Tag Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Ajouter un tag personnalisé..."
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
          className="zen-focus"
        />
        <Button onClick={addCustomTag} size="icon" className="zen-focus">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TagSelector;
