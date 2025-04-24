import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem
  } from "@/components/ui/select";
  import { Label } from "@/components/ui/label";
  
  interface Option {
    value: string;
    label: string;
  }
  
  interface CampoSelectProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: Option[];
    placeholder?: string;
  }
  
  export default function CampoSelect({
    label,
    value,
    onChange,
    options,
    placeholder = "Selecciona una opción",
  }: CampoSelectProps) {
    return (
      <div>
        <Label>{label}</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((op) => (
                <SelectItem key={op.value} value={op.value}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }
  