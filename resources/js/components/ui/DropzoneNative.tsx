import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';
import { FileTextIcon, XIcon } from 'lucide-react';

interface DropzoneNativeProps {
  value?: File | null;
  onFileAccepted: (file: File | null) => void;
  accept?: {
    [mime: string]: string[];
  };
  label?: string;
}

export default function DropzoneNative({
  value,
  onFileAccepted,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg'],
    'application/pdf': ['.pdf'],
    'video/mp4': ['.mp4'],
  },
  label = 'Arrastra o selecciona un archivo',
}: DropzoneNativeProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const generatePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
      setFileType(file.type);
    };

    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setFileType(file.type);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        generatePreview(file);
        onFileAccepted(file);
      }
    },
    [onFileAccepted]
  );

  const removeFile = () => {
    setPreview(null);
    setFileType(null);
    onFileAccepted(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept,
  });

  useEffect(() => {
    if (value) {
      generatePreview(value);
    } else {
      setPreview(null);
      setFileType(null);
    }
  }, [value]);

  return (
    <div className="space-y-4 relative">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`w-full cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition min-h-[120px] ${
          isDragActive
            ? 'border-emerald-500 bg-emerald-50/10'
            : 'border-neutral-600 bg-neutral-800'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2 text-sm text-white">
          <FileTextIcon className="w-8 h-8 opacity-50" />
          <p>{label}</p>
          <p className="text-xs text-neutral-400">(PDF, imagen o video)</p>
        </div>
      </div>

      {/* Previews */}
      {value && (
        <div className="relative w-full">
          {fileType?.startsWith('image/') && preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full max-h-48 rounded-xl border border-neutral-700 object-contain"
            />
          )}

          {fileType?.startsWith('video/') && preview && (
            <video
              src={preview}
              controls
              className="w-full max-h-64 rounded-xl border border-neutral-700 object-contain"
            />
          )}

          {fileType === 'application/pdf' && (
            <div className="w-full p-4 border border-neutral-700 bg-neutral-800 rounded-xl text-white flex items-center justify-between gap-2 text-sm min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <FileTextIcon className="w-5 h-5 shrink-0" />
              <span className="truncate overflow-hidden whitespace-nowrap w-full">{value.name}</span>
            </div>
            <button
              onClick={removeFile}
              type="button"
              className="text-white hover:text-red-500 transition shrink-0"
              title="Eliminar archivo"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
          
          )}


          {/* Botón eliminar para imágenes o videos */}
          {(fileType?.startsWith('image/') || fileType?.startsWith('video/')) && (
            <button
              onClick={removeFile}
              type="button"
              className="absolute top-2 right-2 z-20 bg-black/70 text-white p-1 rounded-full hover:bg-red-500 transition"
              title="Eliminar archivo"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
