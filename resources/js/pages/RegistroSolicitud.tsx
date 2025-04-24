import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { BreadcrumbItem, type User } from '@/types';
import Tabs from './components/shared/Tabs';
import { Checkbox } from '@/components/ui/checkbox';
import CampoRadio from './convenios/components/ui/form/CampoRadio';
import CampoInput from './convenios/components/ui/form/CampoInput';
import CampoSelect from './convenios/components/ui/form/CampoSelect';
import CampoFile from './convenios/components/ui/form/CampoFile';
import { useDatosSolicitante } from './convenios/hooks/useDatosSolicitante';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Registro solicitud',
    href: '/registro',
  },
];

export default function RegistroSolicitud() {
  const { auth } = usePage().props as unknown as { auth: { user: User } };
  const user = auth.user;

  const [tab, setTab] = useState(1);
  const [modalidad, setModalidad] = useState('');
  const [materia, setMateria] = useState('');
  const [canalizado, setCanalizado] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [ticket, setTicket] = useState('');
  const [oficio, setOficio] = useState<File | null>(null);
  
    const {
  tipoPersona, setTipoPersona,
  representante, setRepresentante,
  identificacion, setIdentificacion,
  adjuntoInstrumento, setAdjuntoInstrumento,
  archivoInstrumento, setArchivoInstrumento,
  esApoderado, setEsApoderado,
  archivoApoderado, setArchivoApoderado,
  esEstatutos, setEsEstatutos,
  archivoEstatutos, setArchivoEstatutos,
  personaFisica, setPersonaFisica,
  personaMoral, setPersonaMoral,
  fileResetKey,
  limpiar: limpiarDatosSolicitante,
} = useDatosSolicitante();


  // funciones
  const guardarTodo = () => {
    const datosCompletos = {
      generales: {
        modalidad,
        materia,
        canalizado,
        ticket: modalidad === 'En Línea' ? ticket : null,
        institucion: canalizado === 'Si' ? institucion : null,
        oficio: canalizado === 'Si' ? oficio?.name || null : null, 
      },
      solicitante: {
        tipoPersona,
        ...(tipoPersona === 'fisica'
          ? { ...personaFisica }
          : { ...personaMoral }),
        representante,
        documentosSolicitante: {
          identificacion: identificacion?.name || null,
          oficio: canalizado === 'Si' ? oficio?.name || null : null,
          instrumentoNotarial: adjuntoInstrumento ? archivoInstrumento?.name || null : null,
          poderLegal: esApoderado ? archivoApoderado?.name || null : null,
          estatutos: esEstatutos ? archivoEstatutos?.name || null : null,
        },
      },
    };
  
    console.log('🗂️ Datos completos y organizados:', datosCompletos);
    limpiarDatosSolicitante();

  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Registro de Solicitud" />

      <div className="relative px-4 py-10 bg-gradient-to-br from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 min-h-[95vh] overflow-hidden">
        <section className="relative z-10 w-full">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="space-y-6">
              <div className="text-center lg:text-left space-y-4">
                <span className="inline-flex items-center text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full dark:bg-emerald-900/30 dark:text-emerald-300">
                  📄 Formulario
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
                  Registro de Solicitud
                </h1>
                <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto lg:mx-0">
                  Completa los siguientes datos para iniciar el registro de una medida alternativa.
                </p>
              </div>

              <Tabs current={tab} onChange={setTab} items={[
                { id: 1, label: 'Datos Generales' },
                { id: 2, label: 'Solicitante' },
                { id: 3, label: 'Invitado' }
              ]} />

              <div className="bg-white dark:bg-neutral-900 shadow-md rounded-xl max-w-4xl p-6">
              <div className={tab === 1 ? '' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <div className="md:col-span-1">
                      <CampoRadio
                        label="Modalidad"
                        name="modalidad"
                        value={modalidad}
                        onChange={setModalidad}
                        options={[
                          { label: "Presencial", value: "Presencial" },
                          { label: "En Línea", value: "En Línea" }
                        ]}
                      />
                    </div>

                    <div className="md:col-span-1">
                      <CampoRadio
                        label="Materia"
                        name="materia"
                        value={materia}
                        onChange={setMateria}
                        options={[
                          { label: "Civil Mercantil", value: "Civil Mercantil" },
                          { label: "Familiar", value: "Familiar" }
                        ]}
                      />
                    </div>

                    <div className="md:col-span-1">
                      <CampoRadio
                        label="¿Canalizado?"
                        name="canalizado"
                        value={canalizado}
                        onChange={setCanalizado}
                        options={[
                          { label: "Sí", value: "Si" },
                          { label: "No", value: "No" }
                        ]}
                      />
                    </div>

                    <div className="md:col-span-3">
                      {modalidad === "En Línea" && (
                        <CampoInput
                          id="ticket"
                          label="Número de Ticket"
                          placeholder="Ingresa el número de ticket"
                          value={ticket}
                          onChange={(e) => setTicket(e.target.value)}
                        />
                      )}
                    </div>

                    {canalizado === "Si" && (
                      <div className="grid md:grid-cols-2 gap-4 col-span-full">
                        <CampoSelect
                          label="Institución"
                          value={institucion}
                          onChange={setInstitucion}
                          options={[
                            { label: "CDHDF", value: "CDHDF" },
                            { label: "DIF", value: "DIF" },
                            { label: "Consejería Jurídica", value: "Consejería Jurídica" }
                          ]}
                        />

                    <CampoFile
                      key={`oficio-${canalizado}`}
                      id="oficio"
                      label="Oficio"
                      onChange={(e) => setOficio(e.target.files?.[0] || null)}
                    />



                      </div>
                    )}


                  </div>
                  </div>

                  <div className={tab === 2 ? '' : 'hidden'}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <CampoRadio
                        label="Tipo persona"
                        name="tipoPersona"
                        value={tipoPersona}
                        onChange={setTipoPersona}
                        options={[
                          { label: 'Física', value: 'fisica' },
                          { label: 'Moral', value: 'moral' }
                        ]}
                      />
                    </div>

                    {tipoPersona === 'fisica' && (
                      <>
                        <CampoInput
                          id="nombre"
                          label="Nombre del solicitante"
                          placeholder="Nombre completo"
                          value={personaFisica.nombre}
                          onChange={(e) =>
                            setPersonaFisica({ ...personaFisica, nombre: e.target.value })
                          }
                        />

                        <CampoSelect
                          label="Sexo"
                          value={personaFisica.sexo}
                          onChange={(val) =>
                            setPersonaFisica({ ...personaFisica, sexo: val })
                          }
                          options={[
                            { label: 'Masculino', value: 'masculino' },
                            { label: 'Femenino', value: 'femenino' },
                            { label: 'Otro', value: 'otro' }
                          ]}
                        />

                        <CampoInput
                          id="edad"
                          label="Edad"
                          type="number"
                          placeholder="Edad"
                          value={personaFisica.edad}
                          onChange={(e) =>
                            setPersonaFisica({ ...personaFisica, edad: e.target.value })
                          }
                        />

                        <CampoInput
                          id="fecha_nacimiento"
                          label="Fecha de nacimiento"
                          type="date"
                          value={personaFisica.fechaNacimiento}
                          onChange={(e) =>
                            setPersonaFisica({ ...personaFisica, fechaNacimiento: e.target.value })
                          }
                        />

                        <CampoSelect
                          label="Escolaridad"
                          value={personaFisica.escolaridad}
                          onChange={(val) =>
                            setPersonaFisica({ ...personaFisica, escolaridad: val })
                          }
                          options={[
                            { label: 'Primaria', value: 'primaria' },
                            { label: 'Secundaria', value: 'secundaria' },
                            { label: 'Preparatoria', value: 'preparatoria' },
                            { label: 'Universidad', value: 'universidad' }
                          ]}
                        />

                        <CampoSelect
                          label="Ocupación"
                          value={personaFisica.ocupacion}
                          onChange={(val) =>
                            setPersonaFisica({ ...personaFisica, ocupacion: val })
                          }
                          options={[
                            { label: 'Empleado', value: 'empleado' },
                            { label: 'Desempleado', value: 'desempleado' },
                            { label: 'Estudiante', value: 'estudiante' },
                            { label: 'Otro', value: 'otro' }
                          ]}
                        />

                        <CampoSelect
                          label="Nacionalidad"
                          value={personaFisica.nacionalidad}
                          onChange={(val) =>
                            setPersonaFisica({ ...personaFisica, nacionalidad: val })
                          }
                          options={[
                            { label: 'Mexicana', value: 'mexicana' },
                            { label: 'Extranjera', value: 'extranjera' }
                          ]}
                        />

                        <CampoSelect
                          label="Tipo de domicilio"
                          value={personaFisica.tipoDomicilio}
                          onChange={(val) =>
                            setPersonaFisica({ ...personaFisica, tipoDomicilio: val })
                          }
                          options={[
                            { label: 'Propio', value: 'propio' },
                            { label: 'Rentado', value: 'rentado' },
                            { label: 'Otro', value: 'otro' }
                          ]}
                        />

                        <CampoInput
                          id="calle"
                          label="Calle"
                          placeholder="Nombre de la calle"
                          value={personaFisica.calle}
                          onChange={(e) =>
                            setPersonaFisica({ ...personaFisica, calle: e.target.value })
                          }
                        />

                        <CampoInput
                          id="colonia"
                          label="Colonia"
                          placeholder="Colonia"
                          value={personaFisica.colonia}
                          onChange={(e) =>
                            setPersonaFisica({ ...personaFisica, colonia: e.target.value })
                          }
                        />

                        <CampoInput
                          id="cp"
                          label="Código Postal"
                          placeholder="C.P."
                          value={personaFisica.cp}
                          onChange={(e) =>
                            setPersonaFisica({ ...personaFisica, cp: e.target.value })
                          }
                        />

                        <CampoInput
                          id="municipio"
                          label="Municipio"
                          placeholder="Municipio o alcaldía"
                          value={personaFisica.municipio}
                          onChange={(e) =>
                            setPersonaFisica({ ...personaFisica, municipio: e.target.value })
                          }
                        />

                        <CampoSelect
                          label="Entidad federativa"
                          value={personaFisica.entidad}
                          onChange={(val) =>
                            setPersonaFisica({ ...personaFisica, entidad: val })
                          }
                          options={[
                            { label: 'CDMX', value: 'cdmx' },
                            { label: 'Estado de México', value: 'edomex' },
                            { label: 'Otro', value: 'otro' }
                          ]}
                        />

                        <CampoInput
                          id="email"
                          label="Correo electrónico"
                          type="email"
                          placeholder="correo@ejemplo.com"
                          value={personaFisica.correo}
                          onChange={(e) =>
                            setPersonaFisica({ ...personaFisica, correo: e.target.value })
                          }
                        />
                      </>
                    )}

                    {tipoPersona === 'moral' && (
                      <>
                        <CampoInput
                          id="razon_social"
                          label="Razón social"
                          placeholder="Razón social de la persona moral"
                          value={personaMoral.razonSocial}
                          onChange={(e) => setPersonaMoral({ ...personaMoral, razonSocial: e.target.value })}
                        />
                        <CampoInput
                          id="rfc"
                          label="RFC"
                          placeholder="RFC"
                          value={personaMoral.rfc}
                          onChange={(e) => setPersonaMoral({ ...personaMoral, rfc: e.target.value })}
                        />
                        <CampoInput
                          id="instrumento"
                          label="Instrumento notarial"
                          placeholder="Instrumento notarial"
                          value={personaMoral.instrumento}
                          onChange={(e) => setPersonaMoral({ ...personaMoral, instrumento: e.target.value })}
                        />
                        <CampoInput
                          id="fecha_instrumento"
                          label="Fecha del instrumento notarial"
                          type="date"
                          value={personaMoral.fechaInstrumento}
                          onChange={(e) => setPersonaMoral({ ...personaMoral, fechaInstrumento: e.target.value })}
                        />
                        <CampoInput
                          id="telefono"
                          label="Teléfono"
                          type="tel"
                          placeholder="Teléfono"
                          value={personaMoral.telefono}
                          onChange={(e) => setPersonaMoral({ ...personaMoral, telefono: e.target.value })}
                        />
                        <CampoInput
                          id="calle_moral"
                          label="Calle"
                          placeholder="Calle de la persona moral"
                          value={personaMoral.calle}
                          onChange={(e) => setPersonaMoral({ ...personaMoral, calle: e.target.value })}
                        />
                        <CampoInput
                          id="colonia_moral"
                          label="Colonia"
                          placeholder="Colonia de la persona moral"
                          value={personaMoral.colonia}
                          onChange={(e) => setPersonaMoral({ ...personaMoral, colonia: e.target.value })}
                        />
                        <CampoInput
                          id="cp_moral"
                          label="Código postal"
                          placeholder="C.P."
                          value={personaMoral.cp}
                          onChange={(e) => setPersonaMoral({ ...personaMoral, cp: e.target.value })}
                        />
                        <CampoInput
                          id="municipio_moral"
                          label="Municipio"
                          placeholder="Municipio o alcaldía"
                          value={personaMoral.municipio}
                          onChange={(e) => setPersonaMoral({ ...personaMoral, municipio: e.target.value })}
                        />
                        <CampoSelect
                          label="Entidad federativa"
                          value={personaMoral.entidad}
                          onChange={(val) => setPersonaMoral({ ...personaMoral, entidad: val })}
                          options={[
                            { label: 'CDMX', value: 'cdmx' },
                            { label: 'Estado de México', value: 'edomex' },
                            { label: 'Otro', value: 'otro' }
                          ]}
                        />
                        <CampoInput
                          id="correo_moral"
                          label="Correo electrónico"
                          type="email"
                          placeholder="correo@ejemplo.com"
                          value={personaMoral.correo}
                          onChange={(e) => setPersonaMoral({ ...personaMoral, correo: e.target.value })}
                        />
                      </>
                    )}

                  <div className="col-span-2">
                    <CampoFile
                      key={`identificacion-${fileResetKey}`}
                      id="identificacion"
                      label="Subir identificación"
                      onChange={(e) => setIdentificacion(e.target.files?.[0] || null)}
                    />
                  </div>

                  <div className="md:col-span-1">
                    <CampoRadio
                      label="¿Es usted el representante?"
                      name="representante"
                      value={representante}
                      onChange={setRepresentante}
                      options={[
                        { label: 'Sí', value: 'si' },
                        { label: 'No', value: 'no' }
                      ]}
                    />
                  </div>

                  {representante === 'si' && (
                    <div className="md:col-span-2 flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-sm font-medium">
                          <Checkbox
                            id="opcion1"
                            checked={adjuntoInstrumento}
                            onCheckedChange={(checked) => setAdjuntoInstrumento(checked === true)}
                          />
                          Adjuntó instrumento notarial
                        </label>
                        {adjuntoInstrumento && (
                          <CampoFile
                            key={`archivo_instrumento-${fileResetKey}`}
                            id="archivo_instrumento"
                            label="Subir archivo"
                            onChange={(e) => setArchivoInstrumento(e.target.files?.[0] || null)}
                          />
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-sm font-medium">
                          <Checkbox
                            id="opcion2"
                            checked={esApoderado}
                            onCheckedChange={(checked) => setEsApoderado(checked === true)}
                          />
                          Es apoderado legal
                        </label>
                        {esApoderado && (
                         <CampoFile
                            key={`archivo_apoderado-${fileResetKey}`}
                            id="archivo_apoderado"
                            label="Archivo Apoderado"
                            onChange={(e) => setArchivoApoderado(e.target.files?.[0] || null)}
                          />
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-sm font-medium">
                          <Checkbox
                            id="opcion3"
                            checked={esEstatutos}
                            onCheckedChange={(checked) => setEsEstatutos(checked === true)}
                          />
                          Es representante por estatutos
                        </label>
                        {esEstatutos && (
                          <CampoFile
                            key={`archivo_estatutos-${fileResetKey}`}
                            id="archivo_estatutos"
                            label="Subir archivo"
                            onChange={(e) => setArchivoEstatutos(e.target.files?.[0] || null)}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  </div>
                  </div>


                {tab === 3 && <p className="text-sm text-neutral-500">[🧑‍💼 Aquí irán los campos del Invitado]</p>}
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={guardarTodo}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-md"
              >
                Guardar datos generales
              </button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
