import api from "@/lib/axios";
import { listHistoryTrapsSchema, type LimpiezaTraps } from "@/types/schemas";
import { isAxiosError } from "axios";

export const registerStickyTrap = async (formData: LimpiezaTraps) => {
  try {
    const { data } = await api.post("/traps/register-traps", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

type getActualType = LimpiezaTraps & {
  id: number;
};

export const updateLimpiezaTraps = async (formData: getActualType) => {
  try {
    const { data } = await api.patch(
      `/traps/update-traps/${formData.id}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getLimpiezaTrapsById = async (id: number) => {
  try {
    const { data } = await api.get(`/traps/get-traps/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getLimpiezaTrapsByDate = async (from: string, to: string) => {
  try {
    const { data } = await api.get("/traps/get-traps-by-date", {
      params: {
        from,
        to,
      },
    });
    const response = listHistoryTrapsSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
