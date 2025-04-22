import { Head } from '@inertiajs/react'
import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import TabsNav from './components/TabsNav'
import DatosGenerales from './components/DatosGenerales'
import { FormularioSolicitante } from './components/formularios/FormularioSolicitante'
import { motion, AnimatePresence } from 'framer-motion'

// Íconos de pestañas
import {
  DocumentTextIcon,
  HandRaisedIcon,
  UsersIcon,
  PencilSquareIcon,
  BookmarkSquareIcon,
} from '@heroicons/react/24/solid'
import { useFormularioConvenio } from './hooks/useFormularioConvenio'

// Configuración de pestañas
const tabs = [
  { id: 'datos', label: 'Datos generales', icon: DocumentTextIcon },
  { id: 'solicitante', label: 'Solicitante', icon: HandRaisedIcon },
  { id: 'invitado', label: 'Invitado', icon: UsersIcon },
  { id: 'documentos', label: 'Documentos', icon: PencilSquareIcon },
  { id: 'finalizar', label: 'Finalizar', icon: BookmarkSquareIcon },
]

export default function Index() {

  const [activeTab, setActiveTab] = useState('datos')

  // Estado general
  const {
    modalidad, setModalidad,
    materia, setMateria,
    tipoPersona, setTipoPersona,
    esRepresentante, setEsRepresentante,
    fechaNacimiento, setFechaNacimiento,
    archivo, setArchivo,
    documentosSeleccionados, setDocumentosSeleccionados,
    archivosDocs, setArchivosDocs,
    toggleDocumento,
    handleArchivoDoc
  } = useFormularioConvenio()
  

  return (
    <AppLayout>
      <Head title="Inicio" />

      <div className="max-w-6xl mx-auto px-12 py-7 mt-10 rounded-2xl border border-neutral-700 bg-neutral-900 shadow-xl">
        <TabsNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            {activeTab === 'datos' && (
              <DatosGenerales
                modalidad={modalidad}
                setModalidad={setModalidad}
                materia={materia}
                setMateria={setMateria}
              />
            )}

            {activeTab === 'solicitante' && (
              <FormularioSolicitante
                materia={materia}
                tipoPersona={tipoPersona}
                setTipoPersona={setTipoPersona}
                fechaNacimiento={fechaNacimiento}
                setFechaNacimiento={setFechaNacimiento}
                archivo={archivo}
                setArchivo={setArchivo}
                esRepresentante={esRepresentante}
                setEsRepresentante={setEsRepresentante}
                documentosSeleccionados={documentosSeleccionados}
                setDocumentosSeleccionados={setDocumentosSeleccionados}
                archivosDocs={archivosDocs}
                setArchivosDocs={setArchivosDocs}
                toggleDocumento={toggleDocumento}
                handleArchivoDoc={handleArchivoDoc}
              />
            )}

            {activeTab === 'invitado' && <p>Sección de Invitado</p>}
            {activeTab === 'documentos' && <p>Sección de Documentos</p>}
            {activeTab === 'finalizar' && <p>Sección de Finalizar</p>}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppLayout>
  )
}
