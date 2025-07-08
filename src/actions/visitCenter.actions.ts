import api from "@/lib/axios";
import {
  visitAllSchema,
  visitSchema,
  visitSchemaList,
  type VisitFormData,
} from "@/types/schemas";
import { isAxiosError } from "axios";

export const registerVisitCenter = async (formData: VisitFormData) => {
  try {
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

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
interface ListProps {
  from: string;
  to: string;
  empresa: string;
  page: number;
}

export const getVisitCenterAll = async ({
  from,
  to,
  empresa,
  page = 1,
}: ListProps) => {
  try {
    const { data } = await api("/visit-center/get-visit-by-date", {
      params: {
        from,
        to,
        empresa,
        page,
      },
    });
    const response = visitAllSchema.safeParse(data);
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

interface UpdateStatusVisit {
  id: number;
  evaluacion: string;
}

export const updateStatusVisit = async (formData: UpdateStatusVisit) => {
  console.log(formData);
  try {
    const { data } = await api.patch(
      `/visit-center/update-status-visit/${formData.id}`,
      formData
    );
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getVisitById = async (id: number) => {
  try {
    const { data } = await api.get(`/visit-center/get-visit-by-id/${id}`);
    const response = visitSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
