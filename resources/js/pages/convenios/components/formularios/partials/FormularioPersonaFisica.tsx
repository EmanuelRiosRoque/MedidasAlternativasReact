import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerInput } from "@/pages/components/DatePickerInput"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RefObject } from "react"

interface Props {
  fechaNacimiento: Date | undefined
  setFechaNacimiento: (value: Date | undefined) => void
  inputRefs: RefObject<Record<string, HTMLInputElement | null>>
}

export const FormularioPersonaFisica = ({ fechaNacimiento, setFechaNacimiento, inputRefs }: Props) => {
  const campos = [
    { id: "nombre_solicitante", label: "Nombre del solicitante", type: "input" },
    { id: "sexo_solicitante", label: "Sexo del solicitante", type: "select", options: ["Masculino", "Femenino", "Otro"] },
    { id: "edad_solicitante", label: "Edad", type: "input" },
    { id: "escolaridad", label: "Escolaridad", type: "select", options: ["Primaria", "Secundaria", "Preparatoria", "Universidad"] },
    { id: "ocupacion", label: "Ocupación", type: "input" },
    { id: "nacionalidad", label: "Nacionalidad", type: "input" },
    { id: "tipo_domicilio", label: "Tipo domicilio", type: "select", options: ["Casa", "Departamento", "Otro"] },
    { id: "calle", label: "Calle", type: "input" },
    { id: "colonia", label: "Colonia", type: "input" },
    { id: "cp", label: "Código Postal", type: "input" },
    { id: "municipio", label: "Municipio", type: "input" },
    { id: "entidad", label: "Entidad federativa", type: "select", options: ["CDMX", "Jalisco", "Nuevo León"] },
    { id: "correo", label: "Correo electrónico", type: "input" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {campos.map(({ id, label, type, options }) => (
        <div key={id}>
          <Label htmlFor={id}>{label}</Label>
          {type === "select" ? (
            <>
              <Select onValueChange={(value) => {
                if (inputRefs.current) inputRefs.current[id]!.value = value
              }}>
                <SelectTrigger>
                  <SelectValue placeholder={`Selecciona ${label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((op) => (
                    <SelectItem key={op} value={op}>{op}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" ref={(el) => {
                if (inputRefs.current) inputRefs.current[id] = el
              }} />
            </>
          ) : (
            <Input
              id={id}
              placeholder={label}
              ref={(el) => {
                if (inputRefs.current) inputRefs.current[id] = el
              }}
            />
          )}
        </div>
      ))}

      <div>
        <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
        <DatePickerInput
          value={fechaNacimiento}
          onChange={setFechaNacimiento}
          placeholder="dd/mm/aaaa"
        />
      </div>
    </div>
  )
}
