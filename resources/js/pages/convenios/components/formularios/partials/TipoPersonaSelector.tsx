// components/TipoPersonaSelector.tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Props {
  tipoPersona: string
  setTipoPersona: (value: string) => void
}

export const TipoPersonaSelector = ({ tipoPersona, setTipoPersona }: Props) => {
  return (
    <div>
      <Label className="block text-sm font-medium mb-2">Tipo de persona</Label>
      <RadioGroup
        name="tipo_persona"
        value={tipoPersona}
        onValueChange={setTipoPersona}
        className="space-x-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="fisica" id="persona-fisica" />
          <Label htmlFor="persona-fisica">Física</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="moral" id="persona-moral" />
          <Label htmlFor="persona-moral">Moral</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
