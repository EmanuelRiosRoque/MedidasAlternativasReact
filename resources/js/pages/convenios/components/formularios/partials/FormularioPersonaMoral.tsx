import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefObject } from "react"

interface Props {
    inputRefs: RefObject<Record<string, HTMLInputElement | null>>
  }
  
export const FormularioPersonaMoral = ({ inputRefs }: Props) => {
  const campos = [
    { label: "Razón social del solicitante", name: "razon_social" },
    { label: "RFC", name: "rfc" },
    { label: "Instrumento notarial", name: "instrumento_notarial" },
    { label: "Fecha del Instrumento Notarial", name: "fecha_instrumento", type: "date" },
    { label: "Teléfono", name: "telefono" },
    { label: "Calle", name: "calle" },
    { label: "Colonia", name: "colonia" },
    { label: "CP", name: "cp" },
    { label: "Municipio", name: "municipio" },
    { label: "Correo electrónico del solicitante", name: "correo" }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {campos.map(({ label, name, type = "text" }) => (
        <div key={name}>
          <Label htmlFor={name} className="text-white">{label}</Label>
          <Input
            id={name}
            type={type}
            placeholder={label}
            ref={el => {
              inputRefs.current[name] = el
            }}
          />
        </div>
      ))}

      <div>
        <Label htmlFor="entidad_federativa" className="text-white">Entidad federativa</Label>
        <Select onValueChange={value => {
          if (inputRefs.current["entidad_federativa"]) {
            inputRefs.current["entidad_federativa"]!.value = value
          }
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Elige entidad federativa del solicitante..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CDMX">CDMX</SelectItem>
            <SelectItem value="Jalisco">Jalisco</SelectItem>
            <SelectItem value="Nuevo León">Nuevo León</SelectItem>
            {/* Más entidades si gustas */}
          </SelectContent>
        </Select>
        <input type="hidden" id="entidad_federativa" ref={el => {
          inputRefs.current["entidad_federativa"] = el
        }} />
      </div>
    </div>
  )
}
