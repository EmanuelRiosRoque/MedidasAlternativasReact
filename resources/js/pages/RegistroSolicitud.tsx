import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { BreadcrumbItem, type User } from '@/types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Tabs from './components/shared/Tabs';
import { Checkbox } from '@/components/ui/checkbox';

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
  const [tipoPersona, setTipoPersona] = useState('');
  const [representante, setRepresentante] = useState('');


  const [adjuntoInstrumento, setAdjuntoInstrumento] = useState(false);
  const [esApoderado, setEsApoderado] = useState(false);
  const [esEstatutos, setEsEstatutos] = useState(false);

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

              <div className="bg-white dark:bg-neutral-900 shadow-md rounded-xl p-6">
                {tab === 1 && (
                  <div className='grid grid-cols-1 md:grid-cols-6 gap-6'>
                    <div className="md:col-span-1">
                      <Label className="mb-2 block">Modalidad</Label>
                      <RadioGroup value={modalidad} onValueChange={setModalidad}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Presencial" id="presencial" />
                          <Label htmlFor="presencial">Presencial</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="En Línea" id="en-linea" />
                          <Label htmlFor="en-linea">En Línea</Label>
                        </div>
                      </RadioGroup>
                    </div>



                    <div className="md:col-span-1">
                      <Label className="mb-2 block">Materia</Label>
                      <RadioGroup value={materia} onValueChange={setMateria}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Civil Mercantil" id="civil" />
                          <Label htmlFor="civil">Civil Mercantil</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Familiar" id="familiar" />
                          <Label htmlFor="familiar">Familiar</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="md:col-span-1">
                      <Label className="mb-2 block">¿Canalizado?</Label>
                      <RadioGroup value={canalizado} onValueChange={setCanalizado}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Si" id="si" />
                          <Label htmlFor="si">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No" id="no" />
                          <Label htmlFor="no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="md:col-span-3">
                      {modalidad === 'En Línea' && (
                        <div>
                          <Label htmlFor="ticket" className="block mb-2">Número de Ticket</Label>
                          <Input
                            id="ticket"
                            type="text"
                            value={ticket}
                            onChange={(e) => setTicket(e.target.value)}
                            placeholder="Ingresa el número de ticket"
                          />
                        </div>
                      )}
                    </div>

                    {canalizado === 'Si' && (
                      <div className="grid md:grid-cols-2 gap-4 col-span-full">
                        <div>
                          <Label className="mb-2 block">Institución</Label>
                          <Select value={institucion} onValueChange={setInstitucion}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una institución" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="CDHDF">CDHDF</SelectItem>
                                <SelectItem value="DIF">DIF</SelectItem>
                                <SelectItem value="Consejería Jurídica">Consejería Jurídica</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="archivo" className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                            Subir documento
                          </Label>
                          <input
                            id="archivo"
                            type="file"
                            className="block w-full text-sm text-neutral-700 dark:text-neutral-200 file:rounded-md file:border-0 file:bg-emerald-600 file:px-2 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {tab === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label className="mb-2 block">Tipo persona</Label>
                      <RadioGroup value={tipoPersona} onValueChange={setTipoPersona}>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fisica" id="fisica" />
                            <Label htmlFor="fisica">Física</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="moral" id="moral" />
                            <Label htmlFor="moral">Moral</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {tipoPersona === 'fisica' && (
                      <>
                        <div>
                          <Label htmlFor="nombre">Nombre del solicitante</Label>
                          <Input id="nombre" type="text" placeholder="Nombre completo" />
                        </div>

                        <div>
                          <Label htmlFor="sexo">Sexo</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="masculino">Masculino</SelectItem>
                                <SelectItem value="femenino">Femenino</SelectItem>
                                <SelectItem value="otro">Otro</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="edad">Edad</Label>
                          <Input id="edad" type="number" placeholder="Edad" />
                        </div>

                        <div>
                          <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
                          <Input id="fecha_nacimiento" type="date" />
                        </div>

                        <div>
                          <Label htmlFor="escolaridad">Escolaridad</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona escolaridad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="primaria">Primaria</SelectItem>
                                <SelectItem value="secundaria">Secundaria</SelectItem>
                                <SelectItem value="preparatoria">Preparatoria</SelectItem>
                                <SelectItem value="universidad">Universidad</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="ocupacion">Ocupación</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona ocupación" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="empleado">Empleado</SelectItem>
                                <SelectItem value="desempleado">Desempleado</SelectItem>
                                <SelectItem value="estudiante">Estudiante</SelectItem>
                                <SelectItem value="otro">Otro</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="nacionalidad">Nacionalidad</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona nacionalidad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="mexicana">Mexicana</SelectItem>
                                <SelectItem value="extranjera">Extranjera</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="tipo_domicilio">Tipo de domicilio</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tipo de domicilio" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="propio">Propio</SelectItem>
                                <SelectItem value="rentado">Rentado</SelectItem>
                                <SelectItem value="otro">Otro</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="calle">Calle</Label>
                          <Input id="calle" type="text" placeholder="Nombre de la calle" />
                        </div>

                        <div>
                          <Label htmlFor="colonia">Colonia</Label>
                          <Input id="colonia" type="text" placeholder="Colonia" />
                        </div>

                        <div>
                          <Label htmlFor="cp">Código Postal</Label>
                          <Input id="cp" type="text" placeholder="C.P." />
                        </div>

                        <div>
                          <Label htmlFor="municipio">Municipio</Label>
                          <Input id="municipio" type="text" placeholder="Municipio o alcaldía" />
                        </div>

                        <div>
                          <Label htmlFor="entidad">Entidad federativa</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una entidad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="cdmx">CDMX</SelectItem>
                                <SelectItem value="edomex">Estado de México</SelectItem>
                                <SelectItem value="otro">Otro</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="email">Correo electrónico</Label>
                          <Input id="email" type="email" placeholder="correo@ejemplo.com" />
                        </div>
                      </>
                    )}

                    {tipoPersona === 'moral' && (
                      <>
                        <div>
                          <Label htmlFor="razon_social">Razón social</Label>
                          <Input id="razon_social" type="text" placeholder="Razón social de la persona moral" />
                        </div>

                        <div>
                          <Label htmlFor="rfc">RFC</Label>
                          <Input id="rfc" type="text" placeholder="RFC" />
                        </div>

                        <div>
                          <Label htmlFor="instrumento">Instrumento notarial</Label>
                          <Input id="instrumento" type="text" placeholder="Instrumento notarial" />
                        </div>

                        <div>
                          <Label htmlFor="fecha_instrumento">Fecha del instrumento notarial</Label>
                          <Input id="fecha_instrumento" type="date" />
                        </div>

                        <div>
                          <Label htmlFor="telefono">Teléfono</Label>
                          <Input id="telefono" type="tel" placeholder="Teléfono" />
                        </div>

                        <div>
                          <Label htmlFor="calle_moral">Calle</Label>
                          <Input id="calle_moral" type="text" placeholder="Calle de la persona moral" />
                        </div>

                        <div>
                          <Label htmlFor="colonia_moral">Colonia</Label>
                          <Input id="colonia_moral" type="text" placeholder="Colonia de la persona moral" />
                        </div>

                        <div>
                          <Label htmlFor="cp_moral">Código postal</Label>
                          <Input id="cp_moral" type="text" placeholder="C.P." />
                        </div>

                        <div>
                          <Label htmlFor="municipio_moral">Municipio</Label>
                          <Input id="municipio_moral" type="text" placeholder="Municipio o alcaldía" />
                        </div>

                        <div>
                          <Label htmlFor="entidad_moral">Entidad federativa</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una entidad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="cdmx">CDMX</SelectItem>
                                <SelectItem value="edomex">Estado de México</SelectItem>
                                <SelectItem value="otro">Otro</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="correo_moral">Correo electrónico</Label>
                          <Input id="correo_moral" type="email" placeholder="correo@ejemplo.com" />
                        </div>
                      </>
                    )}

                    <div className=' col-span-2'>
                      <Label htmlFor="identificacion" className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                        Subir identificacion
                      </Label>
                      <input
                        id="identificacion"
                        type="file"
                        className="block w-full text-sm text-neutral-700 dark:text-neutral-200 file:rounded-md file:border-0 file:bg-emerald-600 file:px-2 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700 cursor-pointer"
                      />
                    </div>

                    <div className="md:col-span-1">
                      <Label className="mb-2 block">¿Es usted el representante?</Label>
                      <RadioGroup value={representante} onValueChange={setRepresentante}>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="si" id="si" />
                            <Label htmlFor="si">Sí</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="no" />
                            <Label htmlFor="no">No</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {representante === 'si' && (
  <div className="md:col-span-2 flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="opcion1"
          checked={adjuntoInstrumento}
          onCheckedChange={(checked) => setAdjuntoInstrumento(checked === true)}
        />
        <label htmlFor="opcion1" className="text-sm font-medium leading-none">
          Adjuntó instrumento notarial
        </label>
      </div>
      {adjuntoInstrumento && (
        <input
          type="file"
          className="block w-full text-sm text-neutral-700 dark:text-neutral-200 file:rounded-md file:border-0 file:bg-emerald-600 file:px-2 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700 cursor-pointer"
        />
      )}
    </div>

    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="opcion2"
          checked={esApoderado}
          onCheckedChange={(checked) => setEsApoderado(checked === true)}
        />
        <label htmlFor="opcion2" className="text-sm font-medium leading-none">
          Es apoderado legal
        </label>
      </div>
      {esApoderado && (
        <input
          type="file"
          className="block w-full text-sm text-neutral-700 dark:text-neutral-200 file:rounded-md file:border-0 file:bg-emerald-600 file:px-2 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700 cursor-pointer"
        />
      )}
    </div>

    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="opcion3"
          checked={esEstatutos}
          onCheckedChange={(checked) => setEsEstatutos(checked === true)}
        />
        <label htmlFor="opcion3" className="text-sm font-medium leading-none">
          Es representante por estatutos
        </label>
      </div>
      {esEstatutos && (
        <input
          type="file"
          className="block w-full text-sm text-neutral-700 dark:text-neutral-200 file:rounded-md file:border-0 file:bg-emerald-600 file:px-2 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700 cursor-pointer"
        />
      )}
    </div>
  </div>
)}





                  </div>
                )}


                {tab === 3 && <p className="text-sm text-neutral-500">[🧑‍💼 Aquí irán los campos del Invitado]</p>}
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
