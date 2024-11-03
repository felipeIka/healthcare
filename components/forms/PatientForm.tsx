"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import user from "@/public/assets/icons/user.svg";
import email from "@/public/assets/icons/email.svg";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { formSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFIeldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Inicialize o formulário usando useForm com o zodResolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Função que será executada quando o formulário for enviado
  async function onSubmit({ name, email, phone }: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);
      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Olá 👋</h1>
          <p className="text-dark-700">Agende sua primeira Consulta</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFIeldType.INPUT}
          label="Nome Completo"
          name="name"
          placeholder="Carlos Augusto"
          iconSrc={user}
          iconAlt="user"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFIeldType.INPUT}
          label="Email"
          name="email"
          placeholder="Augusto@gmail.com"
          iconSrc={email}
          iconAlt="email"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFIeldType.PHONE_INPUT}
          label="Telefone"
          name="phone"
          placeholder="+55 11 908001000"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
