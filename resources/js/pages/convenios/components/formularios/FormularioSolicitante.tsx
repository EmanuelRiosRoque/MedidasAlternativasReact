import { useEffect, useState } from "react"
import { DocumentosRepresentante } from "./partials/DocumentosRepresentante"
import { FormularioPersonaFisica } from "./partials/FormularioPersonaFisica"
import { IdentificacionUploader } from "./partials/IdentificacionUploader"
import { RepresentanteSelector } from "./partials/RepresentanteSelector"
import { TipoPersonaSelector } from "./partials/TipoPersonaSelector"
import { Button } from "@/components/ui/button"
import { useSolicitante } from "../../hooks/useSolicitante"
import { CardSolicitante } from "../Cards"
import { FormularioPersonaMoral } from "./partials/FormularioPersonaMoral"
import { RegistroSolicitante } from "../../types/solicitante"

interface Props {
  materia: string
  tipoPersona: string
  setTipoPersona: (value: string) => void
  fechaNacimiento: Date | undefined
  setFechaNacimiento: (value: Date | undefined) => void
  archivo: File | null
  setArchivo: (file: File | null) => void
  esRepresentante: string
  setEsRepresentante: (value: string) => void
  documentosSeleccionados: string[]
  setDocumentosSeleccionados: (value: string[]) => void
  archivosDocs: Record<string, File | null>
  setArchivosDocs: (docs: Record<string, File | null>) => void
  toggleDocumento: (id: string) => void
  handleArchivoDoc: (id: string, file: File | null) => void
}

export const FormularioSolicitante = ({
  materia,
  tipoPersona,
  setTipoPersona,
  fechaNacimiento,
  setFechaNacimiento,
  archivo,
  setArchivo,
  esRepresentante,
  setEsRepresentante,
  documentosSeleccionados,
  setDocumentosSeleccionados,
  archivosDocs,
  setArchivosDocs,
  toggleDocumento,
  handleArchivoDoc
}: Props) => {
  const {
    inputRefs,
    registros,
    agregar,
    eliminar,
    editar
  } = useSolicitante()

  const [registroSeleccionado, setRegistroSeleccionado] = useState<RegistroSolicitante | null>(null)

  const handleAgregar = () => {
    agregar({
      tipoPersona,
      fechaNacimiento,
      identificacion: archivo,
      esRepresentante,
      documentos: documentosSeleccionados,
      archivosDocumentos: archivosDocs
    })

    setFechaNacimiento(undefined)
    setArchivo(null)
    setEsRepresentante('')
    setTipoPersona('')
    setDocumentosSeleccionados([])
    setArchivosDocs({
      acta_nacimiento: null,
      acta_notarial: null,
      resultado: null
    })
  }

  useEffect(() => {
    if (!registroSeleccionado) return
    Object.entries(registroSeleccionado.datos).forEach(([key, value]) => {
      if (inputRefs.current[key]) {
        inputRefs.current[key]!.value = value
      }
    })
    setRegistroSeleccionado(null)
  }, [tipoPersona])

  const capitalize = (text: string) =>
    text
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

  const renderFilePreview = (file: File, openInNewTab = false) => {
    const fileURL = URL.createObjectURL(file)
    const isImage = file.type.startsWith("image/")
    const isPDF = file.type === "application/pdf"
    const isVideo = file.type.startsWith("video/")

    const commonProps = {
      className: "w-full h-auto rounded border border-neutral-700",
      style: { maxHeight: '10rem' }
    }

    if (openInNewTab) {
      return <a href={fileURL} target="_blank" rel="noopener noreferrer" className="underline text-emerald-400">Abrir documento</a>
    }

    if (isImage) return <img src={fileURL} alt="preview" {...commonProps} />
    if (isPDF) return <iframe src={fileURL} {...commonProps} />
    if (isVideo) return <video controls src={fileURL} {...commonProps} />
    return null
  }

  return (
    <div className="space-y-6 text-white">
      {materia === 'mercantil' && (
        <TipoPersonaSelector 
          tipoPersona={tipoPersona} 
          setTipoPersona={setTipoPersona} 
        />
      )}

      {tipoPersona === 'fisica' && (
        <FormularioPersonaFisica 
          fechaNacimiento={fechaNacimiento} 
          setFechaNacimiento={setFechaNacimiento} 
          inputRefs={inputRefs} 
        />
      )}

      {tipoPersona === 'moral' && (
        <FormularioPersonaMoral inputRefs={inputRefs} />
      )}

      <IdentificacionUploader 
        archivo={archivo} 
        setArchivo={setArchivo} 
      />

      <RepresentanteSelector 
        esRepresentante={esRepresentante} 
        setEsRepresentante={setEsRepresentante} 
      />

      {esRepresentante === 'si' && (
        <DocumentosRepresentante 
          documentosSeleccionados={documentosSeleccionados} 
          toggleDocumento={toggleDocumento} 
          archivosDocs={archivosDocs} 
          handleArchivoDoc={handleArchivoDoc} 
        />
      )}

      <div className="pt-4 flex justify-end">
        <Button 
          onClick={handleAgregar} 
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Agregar
        </Button>
      </div>

      {Object.entries(registros).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          {Object.entries(registros).map(([nombre, data]) => (
            <CardSolicitante
              key={nombre}
              nombre={nombre}
              data={data}
              onEliminar={eliminar}
              onEditar={(registro) => {
                setRegistroSeleccionado(registro)
                editar(
                  registro,
                  setFechaNacimiento,
                  setArchivo,
                  setEsRepresentante,
                  setDocumentosSeleccionados,
                  setArchivosDocs,
                  setTipoPersona
                )
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}