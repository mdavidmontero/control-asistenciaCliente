import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
  const fecha = new Date(date).toLocaleDateString();
  return fecha;
};

export function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getImagePath(imagePath: string) {
  const cloudinaryBaseUrl = "https://res.cloudinary.com";
  if (imagePath.startsWith(cloudinaryBaseUrl)) {
    return imagePath;
  } else {
    return `/products/${imagePath}.png`;
  }
}
export const buildDateFromFormData = (
  dia: string,
  mes: string,
  anio: string
) => {
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const day = Number(dia);
  const month = meses.indexOf(mes.toLowerCase());
  const year = Number(anio);

  if (!isNaN(day) && month !== -1 && !isNaN(year)) {
    return new Date(year, month, day);
  }

  return new Date();
};
