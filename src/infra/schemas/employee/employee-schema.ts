import { z } from "zod"

export const createEmployeeSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name is required",
  }),
  cpf: z.string().trim().min(1, {
    message: "CPF is required",
  }),
  jobTitle: z.string().trim().min(1, {
    message: "Job title is required",
  }),
  age: z
    .number({
      message: "Age is required",
    })
    .min(16, {
      message: "Employee must be at least 16 years old",
    })
    .max(100, {
      message: "Employee age seems invalid",
    }),
})

export const getEmployeeByIdSchema = z.object({
  employeeId: z.string().uuid({
    message: "Invalid UUID",
  }),
})
