import DropzoneNative from "@/components/ui/DropzoneNative"

interface Props {
  archivo: File | null
  setArchivo: (file: File | null) => void
}

export const IdentificacionUploader = ({ archivo, setArchivo }: Props) => {
  return (
    <DropzoneNative
      value={archivo}
      onFileAccepted={setArchivo}
      label="Sube una identificación o documento"
    />
  )
}
