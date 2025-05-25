import { z } from "zod";

const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation"
>;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;

export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;
export type UpdateCurrentUserPasswordForm = Pick<
  Auth,
  "current_password" | "password" | "password_confirmation"
>;

export type CheckPasswordForm = Pick<Auth, "password">;

export type confirmToken = Pick<Auth, "token">;
export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    id: z.string(),
    role: z.string(),
    image: z.string().nullable(),
  });
export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, "name" | "email">;

export const attendanceSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    date: z.string(),

    morningIn: z.string().nullable(),
    morningOut: z.string().nullable(),
    afternoonIn: z.string().nullable(),
    afternoonOut: z.string().nullable(),

    morningInLocation: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .nullable(),

    morningOutLocation: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .nullable(),

    afternoonInLocation: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .nullable(),

    afternoonOutLocation: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .nullable(),

    anotacionesMorning: z.string().nullable(),
    anotacionesAfternoon: z.string().nullable(),

    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .optional();

export type Attendance = z.infer<typeof attendanceSchema>;

export const attendancesSchemas = z.array(attendanceSchema);

export interface SchemaHistoryAttendances {
  id: string;
  userId: string;
  date: string;
  morningIn: string | null;
  morningInLocation: { lat: number; lng: number } | null;
  morningOut: string | null;
  morningOutLocation: { lat: number; lng: number } | null;
  afternoonIn: string | null;
  afternoonInLocation: { lat: number; lng: number } | null;
  afternoonOut: string | null;
  afternoonOutLocation: { lat: number; lng: number } | null;
  anotacionesMorning?: string | null;
  anotacionesAfternoon?: string | null;
  createdAt: string;
  updatedAt: string;
}

const locationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const historyAttendancesSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    date: z.string(),
    morningIn: z.string().nullable(),
    morningInLocation: locationSchema.nullable(),
    morningOut: z.string().nullable(),
    morningOutLocation: locationSchema.nullable(),
    afternoonIn: z.string().nullable(),
    afternoonInLocation: locationSchema.nullable(),
    afternoonOut: z.string().nullable(),
    afternoonOutLocation: locationSchema.nullable(),
    anotacionesMorning: z.string().nullable().optional(),
    anotacionesAfternoon: z.string().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .optional();

export const historyAttendancesSchemas = z.array(historyAttendancesSchema);
export type HistoryAttendances = z.infer<typeof historyAttendancesSchema>;
