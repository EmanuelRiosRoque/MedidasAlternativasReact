import { useState } from 'react'

export function useFormularioConvenio() {
  const [modalidad, setModalidad] = useState('')
  const [materia, setMateria] = useState('')
  const [tipoPersona, setTipoPersona] = useState('')
  const [esRepresentante, setEsRepresentante] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | undefined>()
  const [archivo, setArchivo] = useState<File | null>(null)

  const [documentosSeleccionados, setDocumentosSeleccionados] = useState<string[]>([])
  const [archivosDocs, setArchivosDocs] = useState<Record<string, File | null>>({
    acta_nacimiento: null,
    acta_notarial: null,
    resultado: null,
  })

  const toggleDocumento = (id: string) => {
    setDocumentosSeleccionados(prev =>
      prev.includes(id) ? prev.filter(doc => doc !== id) : [...prev, id]
    )
  }

  const handleArchivoDoc = (docId: string, file: File | null) => {
    setArchivosDocs(prev => ({
      ...prev,
      [docId]: file,
    }))
  }

  return {
    modalidad, setModalidad,
    materia, setMateria,
    tipoPersona, setTipoPersona,
    esRepresentante, setEsRepresentante,
    fechaNacimiento, setFechaNacimiento,
    archivo, setArchivo,
    documentosSeleccionados, setDocumentosSeleccionados,
    archivosDocs, setArchivosDocs,
    toggleDocumento,
    handleArchivoDoc,
  }
}
