import { z } from "zod";

// Defina o schema de validação com Zod
export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "O nome deve ter pelo menos 2 caracteres",
    })
    .max(50, { message: "Limite de caracteres atingido" }),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Número Inválido"),
});

export const patientFormSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Número Inválido"),
  birthDate: z.coerce.date(),
  gender: z.enum(["male", "female", "other"]),
  address: z
    .string()
    .min(5, "O Endereço deve ter pelo menos 5 caracteres")
    .max(500, "O Endereço deve ter no máximo 500 caracteres"),
  occupation: z
    .string()
    .min(2, "Ocupação deve ter pelo menos 2 caracteres")
    .max(500, "O Ocupação deve ter no máximo 500 caracteres"),
  emergencyContactName: z
    .string()
    .min(2, "O nome do contato deve ter pelo menos 2 caracteres")
    .max(50, "O nome do contato deve ter no máximo 50 caracteres"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Número Inválido"
    ),
  primaryPhysician: z.string().min(2, "Escolha um médico"),
  insuranceProvider: z
    .string()
    .min(2, "A seguradora deve ter no máximo 2 caracteres")
    .max(50, "A seguradora deve ter no máximo 50 caracteres"),
  insurancePolicyNumber: z
    .string()
    .min(2, "O número da ápolice deve ter no mínimo 2 caracteres")
    .max(50, "O número da ápolice deve ter no máximo 50 caracteres"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Você precisa aceitar os termos de tratamento para continuar",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Você precisa aceitar os termos de divulgação para continuar",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Você precisa aceitar os termos de privacidade para continuar",
    }),
});


export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}