import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function uploadImage(id: number, formData: FormData) {
  try {
    const { data } = await api.post<{ images: string[] }>(
      `/traps/upload-image/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data.images;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error al subir la imagen");
    }
    throw new Error("Error desconocido al subir la imagen");
  }
}
export async function deleteImage(id: number, imageUrl: string) {
  const { data } = await api.delete(`/traps/delete-image/${id}`, {
    data: { imageUrl },
  });
  return data;
}
