"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import userx from "@/public/assets/icons/user.svg";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { patientFormSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patient.actions";
import { FormFIeldType } from "./PatientForm";
import email from "@/public/assets/icons/email.svg";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "@radix-ui/react-label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import Fileuploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Inicialize o formulário usando useForm com o zodResolver
  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
      gender: "male",
    },
  });

  // Função que será executada quando o formulário for enviado
 
  const onSubmit = async (values: z.infer<typeof patientFormSchema>) => {
    console.log("OILAS")
    window.alert('as')
    setIsLoading(true);
  
 
    let formData;

    // function to extract the file
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      
      const pat = await registerPatient(patientData);
      console.log(patientData)
      if(pat) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }


  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Bem Vindo 👋</h1>
          <p className="text-dark-700">Nós conte mais sobre você</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y">
            <h2 className="sub-header">Informações pessoais</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFIeldType.INPUT}
          label="Nome Completo"
          name="name"
          placeholder="Carlos Augusto"
          iconSrc={userx}
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFIeldType.DATE_PICKER}
            label="Data de Nascimento"
            name="birthDate"
            placeholder=""
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFIeldType.SKELETON}
            label="Gênero"
            name="gender"
            placeholder=""
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFIeldType.INPUT}
            label="Endereço"
            name="address"
            placeholder="Oscar Freire - 14, SP"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFIeldType.INPUT}
            label="Ocupação"
            name="occupation"
            placeholder="Advogado"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFIeldType.INPUT}
            label="Contato de emergência"
            name="emergencyContactName"
            placeholder="Nome do contato"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFIeldType.PHONE_INPUT}
            label="Telefone de emergência "
            name="emergencyContactNumber"
            placeholder="+55 11 908001000"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y">
            <h2 className="sub-header">Informações Médicas</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFIeldType.SELECT}
          label="Médico Responsável"
          name="primaryPhysician"
          placeholder="Escolha o médico"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2 ">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={32}
                  height={32}
                  className="rounded-full border border-dark-500 "
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFIeldType.INPUT}
            label="Plano de Saúde"
            name="insuranceProvider"
            placeholder="Cruz Vermelha"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFIeldType.INPUT}
            label="Número do Plano"
            name="insurancePolicyNumber"
            placeholder="ABC123456789"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFIeldType.TEXTAREA}
            label="Alergias"
            name="allergies"
            placeholder="Amendoim, Frutos do mar, Polén"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFIeldType.TEXTAREA}
            label="Medicação atual(se houver)"
            name="currentMedication"
            placeholder="Paracetamol 200mg; Ibuprofeno 500mg"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFIeldType.TEXTAREA}
            label="Histórico Familiar"
            name="familyMedicalHistory"
            placeholder="Mãe com diabetes, Pai com pressão alta"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFIeldType.TEXTAREA}
            label="Histórico Médico"
            name="pastMedicalHistory"
            placeholder="Apendicite; Asma"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y">
            <h2 className="sub-header">Identificação e Verificação</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFIeldType.SELECT}
          label="Documento"
          name="identificationType"
          placeholder="Escolha o seu tipo de documento"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          fieldType={FormFIeldType.INPUT}
          label="Número do documento"
          name="identificationNumber"
          placeholder="123456789"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFIeldType.SKELETON}
          label="Copia Docuemnto"
          name="identificationDocument"
          placeholder="Anexe uma cópia do Documento"
          renderSkeleton={(field) => (
            <FormControl>
              <Fileuploader onChange={field.onChange} files={field.value} />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y">
            <h2 className="sub-header">Consentimento e Privacidade</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFIeldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="Eu aceito o tratamento"
        />

        <CustomFormField
          fieldType={FormFIeldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="Eu aceito os termos de divulgação"
        />

        <CustomFormField
          fieldType={FormFIeldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="Eu aceito os termos de privacidade"
        />
        

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>

    
  );
};

export default RegisterForm;
