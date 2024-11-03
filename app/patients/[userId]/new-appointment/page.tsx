import React from "react";
import Image from "next/image";
import logo from "@/public/assets/icons/logo-full.svg";
import appointment from "@/public/assets/icons/appointments.svg";
import AppointmentForm from "@/components/forms/AppointmentForm";
import {getPatient} from "@/lib/actions/patient.actions"

async function NewAppointment ({params: {userId}}: SearchParamProps){

  const patient = await getPatient(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src={logo}
            alt="logo"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm 
          type="create" userId={userId} 
          patientId={patient.$id}/>

          <p className="copyright mt-10 py-12 ">
            ©2024 HealthCare
          </p>
        </div>
      </section>

      <Image
        src={appointment}
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
