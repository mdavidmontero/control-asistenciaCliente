import { isAxiosError } from "axios";
import api from "../lib/axios";
import { attendanceSchema } from "../types";
export const registerAttendanceMorning = async (tipo: string) => {
  try {
    const { data } = await api.post("/attendance/register-morning", {
      tipo,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const registerAttendanceAfternoon = async (tipo: string) => {
  try {
    const { data } = await api.post("/attendance/register-afternoon", {
      tipo,
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
    console.log(data);
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
