// src/types/solicitante.ts

export interface RegistroSolicitante {
    tipoPersona: string; 
    nombre: string
    edad: string
    datos: Record<string, string>
    fechaNacimiento: Date | undefined
    identificacion: File | null
    esRepresentante: string
    documentos: string[]
    archivosDocumentos: Record<string, File | null>
  }
  