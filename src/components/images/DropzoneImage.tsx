import { deleteImage, uploadImage } from "@/actions/upload-image.actions";
import { useDropzone } from "react-dropzone";
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

type Props = {
  currentImage?: string[];
  currentId?: string;
  onChange: (imageUrls: string[]) => void;
};

export default function UploadImage({
  currentImage = [],
  currentId,
  onChange,
}: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const onDrop = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    setIsUploading(true);

    try {
      const uploadedUrls = await uploadImage(+currentId!, formData);
      onChange(uploadedUrls);
    } catch (error) {
      console.error("Error al subir la imagen", error);
    } finally {
      setIsUploading(false);
    }
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    onDrop,
    maxFiles: 1,
  });

  return (
    <>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-900">
          Imagen de trampa
        </label>
        <div
          {...getRootProps({
            className: `
              py-20 border-2 border-dashed text-center transition-all
              ${
                isDragActive
                  ? "border-gray-900 bg-gray-100 text-gray-900"
                  : "border-gray-400 bg-white text-gray-400"
              }
              ${isDragReject ? "border-red-500 bg-white text-red-500" : ""}
            `,
          })}
        >
          <input {...getInputProps()} />
          {isDragAccept && <p>Suelta la imagen</p>}
          {isDragReject && <p>Archivo no válido</p>}
          {!isDragActive && <p>Click aqui para subir o arrastrar una imagen</p>}
        </div>
      </div>
      {isUploading && (
        <div className="flex items-center gap-2 mt-4 text-blue-600">
          <svg
            className="animate-spin h-5 w-5 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
            />
          </svg>
          <span>Subiendo imagen...</span>
        </div>
      )}

      {currentImage.length > 0 && (
        <div className="py-5">
          <p className="font-bold text-gray-800 mb-2">Imágenes cargadas:</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {currentImage.map((img, i) => (
              <div
                key={i}
                className="relative group rounded overflow-hidden shadow-md border border-gray-300"
              >
                <img
                  src={img}
                  alt={`uploaded-${i}`}
                  className="w-full h-40 object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={img}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-1 rounded-full shadow hover:bg-gray-200"
                    title="Descargar"
                  >
                    <Download className="w-7 h-7 text-gray-700" />
                  </a>
                </div>
                <Button
                  type="button"
                  disabled={isDeleting}
                  onClick={async () => {
                    setIsDeleting(true);
                    setDeletingIndex(i);
                    try {
                      await deleteImage(+currentId!, img);
                      const updatedImages = currentImage.filter(
                        (url) => url !== img
                      );
                      onChange(updatedImages);
                    } catch (err) {
                      console.error("Error al eliminar imagen:", err);
                    } finally {
                      setIsDeleting(false);
                      setDeletingIndex(null);
                    }
                  }}
                  className="absolute top-1 left-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-700 z-10"
                  title="Eliminar imagen"
                >
                  {isDeleting && deletingIndex === i ? (
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                      />
                    </svg>
                  ) : (
                    "×"
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
