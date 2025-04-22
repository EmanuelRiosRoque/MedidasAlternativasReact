import { useRef, useState } from "react"
import { RegistroSolicitante } from "../types/solicitante"

export function useSolicitante() {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const [idCounter, setIdCounter] = useState(1)
  const [registros, setRegistros] = useState<Record<string, RegistroSolicitante>>({})

  const agregar = (payload: Omit<RegistroSolicitante, "nombre" | "edad" | "datos">) => {
    const datos: Record<string, string> = {}
    Object.entries(inputRefs.current).forEach(([key, input]) => {
      if (input) datos[key] = input.value
    })
  
    const nombre = datos.nombre_solicitante || `Solicitante ${idCounter}`
    const edad = datos.edad_solicitante || "-"
  
    const nuevoRegistro: RegistroSolicitante = {
      nombre,
      edad,
      datos: {
        ...datos,
        tipo_persona: payload.tipoPersona // <- 🔥 este es el fix
      },
      ...payload
    }
  
    setRegistros(prev => ({ ...prev, [nombre]: nuevoRegistro }))
    setIdCounter(prev => prev + 1)
    limpiarInputs()
  }
  

  const eliminar = (nombre: string) => {
    setRegistros(prev => {
      const copia = { ...prev }
      delete copia[nombre]
      return copia
    })
  }

  const editar = (
    registro: RegistroSolicitante,
    setFechaNacimiento: (value: Date | undefined) => void,
    setArchivo: (file: File | null) => void,
    setEsRepresentante: (value: string) => void,
    setDocumentosSeleccionados: (docs: string[]) => void,
    setArchivosDocs: (docs: Record<string, File | null>) => void,
    setTipoPersona?: (tipo: string) => void
  ) => {
    // Rellenar todos los inputs con los valores guardados
    Object.entries(registro.datos).forEach(([key, value]) => {
      if (inputRefs.current[key]) {
        inputRefs.current[key]!.value = value
      }
    })

    // Restaurar valores especiales
    setFechaNacimiento(registro.fechaNacimiento)
    setArchivo(registro.identificacion)
    setEsRepresentante(registro.esRepresentante)
    setDocumentosSeleccionados(registro.documentos)
    setArchivosDocs(registro.archivosDocumentos)

    // Restaurar tipo de persona si está disponible
    if (setTipoPersona) {
      setTipoPersona(registro.datos.tipo_persona || '')
    }

    eliminar(registro.nombre)
  }

  const limpiarInputs = () => {
    Object.values(inputRefs.current).forEach(input => {
      if (input) input.value = ""
    })
  }

  return {
    inputRefs,
    registros,
    agregar,
    eliminar,
    editar,
    setRegistros
  }
}
