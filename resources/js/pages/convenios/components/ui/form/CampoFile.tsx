// components/ui/form/CampoFile.tsx
import { Label } from "@/components/ui/label";
import type { InputHTMLAttributes } from "react";

interface CampoFileProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export default function CampoFile({ id, label, ...props }: CampoFileProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type="file"
        {...props}
        className="block w-full file:rounded-md file:border-0 file:bg-emerald-600 file:px-2 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700 cursor-pointer"
      />
    </div>
  );
}
