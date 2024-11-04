"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import {Appointment} from "@/types/appwrite.types"
import { revalidatePath } from "next/cache";


export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {}
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };
    //revalidatePath("/admin");
     await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return parseStringify(data);
  } catch (error) {
    console.error(
      "Erro ao buscar a lista de compromissos",
      error
    );
  }
};


export const updateAppointment = async ({appointment, type, appointmentId, userId}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    )
    if(!updatedAppointment){
      throw new Error("Appointment not found")
    }

    const smsMessage = `Olá, é a HealthCare. ${
      type === "schedule"
        ? `Sua consulta foi agendada para ${formatDateTime(appointment.schedule!).dateTime} com o Dr. ${appointment.primaryPhysician}`
        : `Nos lamentamos informar a você que sua consulta foi cancelada pelo seguinte motivo: ${appointment.cancellationReason}`
    }`;
    await sendSMSNotification(userId, smsMessage)

    //revalidatePath("/admin")
     await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return parseStringify(updatedAppointment)
  } catch (error) {
    console.log(error)
    return null;
  }
}


export const sendSMSNotification = async (userId: string, content: string) => {
  try { 
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    )

    return parseStringify(message);
  } catch (error) {
    
  }
}
