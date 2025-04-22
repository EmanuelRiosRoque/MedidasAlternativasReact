import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface DatosGeneralesProps {
    modalidad: string;
    setModalidad: (value: string) => void;
    materia: string;
    setMateria: (value: string) => void;
  }
  

export default function DatosGenerales({ modalidad, setModalidad, materia, setMateria }: DatosGeneralesProps) {
  return (
    <div className="space-y-6 text-white">
      <div className="grid grid-cols-5 gap-4">
        {/* Modalidad */}
        <div className="col-span-1">
          <Label className="block text-sm font-medium mb-2">Modalidad</Label>
          <RadioGroup
            name="modalidad"
            value={modalidad}
            onValueChange={setModalidad}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="presencial" id="modalidad-presencial" />
              <Label htmlFor="modalidad-presencial">Presencial</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="en_linea" id="modalidad-enlinea" />
              <Label htmlFor="modalidad-enlinea">En línea</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Materia */}
        <div>
          <Label className="block text-sm font-medium mb-2">Materia</Label>
          <RadioGroup
            name="materia"
            value={materia}
            onValueChange={setMateria}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mercantil" id="materia-mercantil" />
              <Label htmlFor="materia-mercantil">Civil Mercantil</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="familiar" id="materia-familiar" />
              <Label htmlFor="materia-familiar">Familiar</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Herencia */}
        <div>
          <Label className="block text-sm font-medium mb-2">Herencia</Label>
          <RadioGroup name="herencia">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="derivado" id="herencia-derivado" />
              <Label htmlFor="herencia-derivado">Derivado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="canalizado" id="herencia-canalizado" />
              <Label htmlFor="herencia-canalizado">Canalizado</Label>
            </div>
          </RadioGroup>
        </div>


        <div className=' col-span-2'>
        {modalidad === 'en_linea' && (
            <div className="mt-4">
              <Label htmlFor="ticket" className="block text-sm font-medium mb-2">#Ticket</Label>
              <Input
                id="ticket"
                name="ticket"
                type="text"
                placeholder="Ingresa el número de ticket"
              />
            </div>
          )}
        </div>
      </div>

      {/* ¿Cómo se enteró? */}
      <div>
        <Label htmlFor="como_entero" className="block text-sm font-medium mb-2">¿Cómo se enteró?</Label>
        <Input
          id="como_entero"
          name="como_entero"
          type="text"
          placeholder="Escriba cómo se enteró de este servicio"
          autoComplete="off"
          className="w-full"
        />
      </div>
    </div>
  );
}
