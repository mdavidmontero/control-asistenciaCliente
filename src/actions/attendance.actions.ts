import { isAxiosError } from "axios";
import api from "../lib/axios";
import { attendanceSchema, historyAttendancesSchemas } from "../types";
export const registerAttendanceMorning = async (
  tipo: string,
  ubicacion: { lat: number; lng: number },
  anotaciones: string
) => {
  try {
    const { data } = await api.post("/attendance/register-morning", {
      tipo,
      ubicacion,
      anotaciones,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const registerAttendanceAfternoon = async (
  tipo: string,
  ubicacion: { lat: number; lng: number },
  anotaciones: string
) => {
  try {
    const { data } = await api.post("/attendance/register-afternoon", {
      tipo,
      ubicacion,
      anotaciones,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getAttendandesUser = async () => {
  try {
    const { data } = await api.get("/attendance");
    const response = attendanceSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getAttendanceHistoryMonth = async (from: string, to: string) => {
  try {
    const { data } = await api.get("/attendance/history/", {
      params: {
        from,
        to,
      },
    });
    const response = historyAttendancesSchemas.safeParse(data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getAttendanceHistoryAll = async (fecha: string) => {
  try {
    const { data } = await api.get("/attendance/history-all", {
      params: {
        fecha,
      },
    });
    const response = historyAttendancesSchemas.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
