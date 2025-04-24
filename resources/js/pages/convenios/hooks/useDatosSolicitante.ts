import { useState } from 'react';

export function useDatosSolicitante() {
  const [tipoPersona, setTipoPersona] = useState('');
  const [representante, setRepresentante] = useState('');
  const [identificacion, setIdentificacion] = useState<File | null>(null);

  const [adjuntoInstrumento, setAdjuntoInstrumento] = useState(false);
  const [archivoInstrumento, setArchivoInstrumento] = useState<File | null>(null);
  const [esApoderado, setEsApoderado] = useState(false);
  const [archivoApoderado, setArchivoApoderado] = useState<File | null>(null);
  const [esEstatutos, setEsEstatutos] = useState(false);
  const [archivoEstatutos, setArchivoEstatutos] = useState<File | null>(null);
  const [fileResetKey, setFileResetKey] = useState(0);

  const basePersonaFisica = {
    nombre: '',
    sexo: '',
    edad: '',
    fechaNacimiento: '',
    escolaridad: '',
    ocupacion: '',
    nacionalidad: '',
    tipoDomicilio: '',
    calle: '',
    colonia: '',
    cp: '',
    municipio: '',
    entidad: '',
    correo: '',
  };

  const basePersonaMoral = {
    razonSocial: '',
    rfc: '',
    instrumento: '',
    fechaInstrumento: '',
    telefono: '',
    calle: '',
    colonia: '',
    cp: '',
    municipio: '',
    entidad: '',
    correo: '',
  };

  const [personaFisica, setPersonaFisica] = useState(basePersonaFisica);
  const [personaMoral, setPersonaMoral] = useState(basePersonaMoral);

  const limpiar = () => {
    setTipoPersona('');
    setRepresentante('');
    setIdentificacion(null);
    setAdjuntoInstrumento(false);
    setArchivoInstrumento(null);
    setEsApoderado(false);
    setArchivoApoderado(null);
    setEsEstatutos(false);
    setArchivoEstatutos(null);
    setPersonaFisica(basePersonaFisica);
    setPersonaMoral(basePersonaMoral);
    setFileResetKey(prev => prev + 1);
  };

  return {
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
    limpiar
  };
}
