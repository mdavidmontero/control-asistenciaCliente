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
  });
export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, "name" | "email">;

export const attendanceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  date: z.string(),
  morningIn: z.string().nullable(),
  morningOut: z.string().nullable(),
  afternoonIn: z.string().nullable(),
  afternoonOut: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Attendance = z.infer<typeof attendanceSchema>;

export const attendancesSchemas = z.array(attendanceSchema);
