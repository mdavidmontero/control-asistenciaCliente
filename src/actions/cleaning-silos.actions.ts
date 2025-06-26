import api from "@/lib/axios";
import { listHistorySilosSchema, type LimpiezaSilo } from "@/types/schemas";
import { isAxiosError } from "axios";
export const registerCleaingSilo = async (formData: LimpiezaSilo) => {
  try {
    const { data } = await api.post(
      "/cleaning-silo/register-cleaning-silo",
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

type getActualType = LimpiezaSilo & {
  id: number;
};
export const updateLimpiezaSilo = async (formData: getActualType) => {
  try {
    const { data } = await api.patch(
      `/cleaning-silo/update-cleaning-silo/${formData.id}`,
      formData
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getLimpiezaSiloById = async (id: number) => {
  try {
    const { data } = await api.get(`/cleaning-silo/get-cleaning-silo/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getLimpiezaSiloByDateActual = async (from: string, to: string) => {
  try {
    const { data } = await api.get("/cleaning-silo/get-cleaning-silo-by-date", {
      params: {
        from,
        to,
      },
    });
    const response = listHistorySilosSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
