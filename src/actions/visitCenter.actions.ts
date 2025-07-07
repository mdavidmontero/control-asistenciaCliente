import api from "@/lib/axios";
import { visitSchemaList, type VisitFormData } from "@/types/schemas";
import { isAxiosError } from "axios";

export const registerVisitCenter = async (formData: VisitFormData) => {
  try {
    console.log("desde actions visit center", formData);
    const { data } = await api.post("/visit-center/register-visit", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getVisitCenterByUser = async () => {
  try {
    const { data } = await api("/visit-center/get-visit-by-user");
    const response = visitSchemaList.safeParse(data);
    console.log(response);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
