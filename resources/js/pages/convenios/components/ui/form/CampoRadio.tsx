import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Option {
  value: string;
  label: string;
}

interface CampoRadioProps {
  label: string;
  name: string;
  value: string;
  onChange: (val: string) => void;
  options: Option[];
}

export default function CampoRadio({ label, name, value, onChange, options }: CampoRadioProps) {
  return (
    <div>
      <Label>{label}</Label>
      <RadioGroup value={value} onValueChange={onChange}>
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center space-x-2">
            <RadioGroupItem id={`${name}-${opt.value}`} value={opt.value} />
            <Label htmlFor={`${name}-${opt.value}`}>{opt.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
