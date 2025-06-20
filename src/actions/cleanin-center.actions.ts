import api from "@/lib/axios";
import {
  listHistoryAttendancesSchema,
  type LimpiezaForm,
} from "@/types/schemas";
import { isAxiosError } from "axios";

export const registerLimpiezaAcopio = async (formData: LimpiezaForm) => {
  try {
    const { data } = await api.post(
      "/cleaning-center/register-limpieza-acopio",
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

type getActualType = LimpiezaForm & {
  id: number;
};

export const updateLimpiezaAcopio = async (formData: getActualType) => {
  try {
    const { data } = await api.patch(
      `/cleaning-center/${formData.id}`,
      formData
    );

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getLimpiezaById = async (id: number) => {
  try {
    const { data } = await api.get(`/cleaning-center/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getLimpiezaByDateActual = async (from: string, to: string) => {
  try {
    const { data } = await api.get("/cleaning-center/actual", {
      params: {
        from,
        to,
      },
    });
    const response = listHistoryAttendancesSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
