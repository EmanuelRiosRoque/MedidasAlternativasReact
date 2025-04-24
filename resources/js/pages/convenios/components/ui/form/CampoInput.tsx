import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes } from "react";

interface CampoInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export default function CampoInput({ id, label, ...props }: CampoInputProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
    </div>
  );
}
