import Link from "next/link";
import React from "react";
import logo from "@/public/assets/icons/logo-full.svg";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import appointmentss from "@/public/assets/icons/appointments.svg";
import pending from "@/public/assets/icons/pending.svg";
import cancelled from "@/public/assets/icons/cancelled.svg";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";

const Admin = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
            src={logo}
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Bem Vindo 👋 </h1>
          <p className="text-dark-700">
            Comece o dia organizando seus agendamentos
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount || 0}
            label="Agendamentos Marcados"
            icon={appointmentss}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount || 0}
            label="Agendamentos Pendentes"
            icon={pending}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount || 0}
            label="Agendamentos Cancelados"
            icon={cancelled}
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default Admin;
