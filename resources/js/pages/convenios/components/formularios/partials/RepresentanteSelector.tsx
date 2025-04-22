import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Props {
  esRepresentante: string
  setEsRepresentante: (value: string) => void
}

export const RepresentanteSelector = ({ esRepresentante, setEsRepresentante }: Props) => {
  return (
    <div>
      <Label className="block text-sm font-medium mb-2">¿Es usted el representante?</Label>
      <RadioGroup
        name="es_representante"
        value={esRepresentante}
        onValueChange={setEsRepresentante}
        className="flex space-x-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="si" id="representante-si" />
          <Label htmlFor="representante-si">Sí</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="representante-no" />
          <Label htmlFor="representante-no">No</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
