// Nuevo componente: CardSolicitante.tsx

import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { RegistroSolicitante } from '../types/solicitante' 

interface Props {
  nombre: string
  data: RegistroSolicitante
  onEliminar: (nombre: string) => void
  onEditar: (registro: RegistroSolicitante) => void
}

const capitalize = (text: string) =>
  text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const renderFilePreview = (file: File, openInNewTab = false) => {
  const fileURL = URL.createObjectURL(file)
  const isImage = file.type.startsWith('image/')
  const isPDF = file.type === 'application/pdf'
  const isVideo = file.type.startsWith('video/')

  const commonProps = {
    className: 'w-full h-auto rounded border border-neutral-700',
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

export const CardSolicitante = ({ nombre, data, onEliminar, onEditar }: Props) => (
  <Dialog>
    <DialogTrigger asChild>
      <Card className="cursor-pointer bg-neutral-800 relative transition-transform duration-200 hover:scale-[1.02] hover:border-emerald-500 border border-transparent">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEliminar(nombre)
          }}
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 z-10"
          title="Eliminar"
        >
          <X className="w-4 h-4" />
        </button>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-white">{capitalize(data.nombre)}</h3>
          <p className="text-sm text-neutral-400">Edad: {data.edad}</p>
        </CardContent>
      </Card>
    </DialogTrigger>

    <DialogContent className="max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">Detalles del solicitante</DialogTitle>
      </DialogHeader>
      <div className="space-y-6 text-sm text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><span className="font-medium">Nombre:</span> {capitalize(data.nombre)}</p>
          <p><span className="font-medium">Edad:</span> {data.edad}</p>
          <p><span className="font-medium">Fecha de nacimiento:</span> {data.fechaNacimiento?.toLocaleDateString() || '-'}</p>
          <p><span className="font-medium">Representante:</span> {data.esRepresentante === 'si' ? 'Sí' : 'No'}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-emerald-400">Datos personales</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(data.datos).map(([k, v]) => (
              <p key={k}><span className="font-medium text-neutral-300">{capitalize(k.replace(/_/g, ' '))}:</span> {v}</p>
            ))}
          </div>
        </div>

        {data.identificacion && (
          <div>
            <h4 className="font-semibold mb-2 text-emerald-400">Identificación cargada</h4>
            <div className="overflow-auto">{renderFilePreview(data.identificacion)}</div>
            <div className="mt-2">{renderFilePreview(data.identificacion, true)}</div>
          </div>
        )}

        {data.documentos.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-emerald-400">Documentos cargados</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.documentos.map(doc => (
                <div key={doc} className="space-y-1 text-center">
                  <p className="text-sm font-medium text-neutral-200">📄 {capitalize(doc.replace(/_/g, ' '))}</p>
                  {data.archivosDocumentos[doc] && renderFilePreview(data.archivosDocumentos[doc] as File)}
                  {data.archivosDocumentos[doc] && (
                    <div className="mt-1">{renderFilePreview(data.archivosDocumentos[doc] as File, true)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <DialogClose asChild>
            <Button onClick={() => onEditar(data)} className="bg-amber-600 hover:bg-amber-700 text-white">
              Editar
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)
