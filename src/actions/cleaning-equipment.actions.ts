import api from "@/lib/axios";
import {
  lisEquipmentSchema,
  listEquipmentSchema,
  type EquipmentSchema,
  type EquipmentSchemaType,
} from "@/types/schemas";
import { isAxiosError } from "axios";

export const registetEquimentCleaning = async (formData: EquipmentSchema) => {
  try {
    const { data } = await api.post(
      "/equipment-center/registerEquimentCleaning",
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

type EquipmentCleaningType = {
  equipmentId: EquipmentSchemaType["id"];
  formData: EquipmentSchema;
};

export const updateEquimentCleaning = async ({
  formData,
  equipmentId,
}: EquipmentCleaningType) => {
  try {
    const { data } = await api.patch(
      `/equipment-center/updateEquimentCleaning/${equipmentId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getEquimentByDateActual = async (from: string, to: string) => {
  try {
    
    const { data } = await api(
      "/equipment-center/getEquimentCleaningByDateActual",
      {
        params: {
          from,
          to,
        },
      }
    );
    const response = listEquipmentSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getEquimentById = async (id: EquipmentSchemaType["id"]) => {
  try {
    const { data } = await api(
      `/equipment-center/getEquimentCleaningById/${id}`
    );
    const response = lisEquipmentSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
