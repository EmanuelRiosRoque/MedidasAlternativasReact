import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import DropzoneNative from "@/components/ui/DropzoneNative"

interface Props {
  documentosSeleccionados: string[]
  toggleDocumento: (id: string) => void
  archivosDocs: Record<string, File | null>
  handleArchivoDoc: (id: string, file: File | null) => void
}

const labelMap: Record<string, string> = {
  acta_nacimiento: "Acta de nacimiento",
  acta_notarial: "Acta notarial",
  resultado: "Resultado",
}

export const DocumentosRepresentante = ({
  documentosSeleccionados,
  toggleDocumento,
  archivosDocs,
  handleArchivoDoc,
}: Props) => {
  return (
    <div className="space-y-4">
      <Label className="block text-sm font-semibold">Documentos</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.keys(labelMap).map((id) => (
          <div key={id} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={id}
                checked={documentosSeleccionados.includes(id)}
                onCheckedChange={() => toggleDocumento(id)}
              />
              <label htmlFor={id} className="text-sm font-medium">
                {labelMap[id]}
              </label>
            </div>

            {documentosSeleccionados.includes(id) && (
              <DropzoneNative
                value={archivosDocs[id]}
                onFileAccepted={(file) => handleArchivoDoc(id, file)}
                label={`Sube el documento: ${labelMap[id]}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 
