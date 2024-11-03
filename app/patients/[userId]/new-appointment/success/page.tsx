import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/assets/icons/logo-full.svg";
import gifs from "@/public/assets/gifs/success.gif";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import calendar from "@/public/assets/icons/calendar.svg";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Sucess = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            height={1000}
            width={1000}
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image src={gifs} alt="Gifs" height={300} width={280} />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Seu <span className="text-green-500">Agendamento</span> foi
            enviado com sucesso!
          </h2>
          <p>Em breve entraremos em contato para confimar sua consulta.</p>
        </section>

        <section className="request-details">
          <p>Detalhes da Consulta:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              height={100}
              width={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image src={calendar} alt="calendar" height={24} width={24} />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
            <Link
            href={`/patients/${userId}/new-appointment`}>
                Novo Agendamento
            </Link>
        </Button>
        <p className="copyright">© 2024 HealthCare</p>
      </div>
    </div>
  );
};

export default Sucess;
