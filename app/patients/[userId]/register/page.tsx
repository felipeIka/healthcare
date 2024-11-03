import logo from "@/public/assets/icons/logo-full.svg";
import register from "@/public/assets/images/register-img.png";
import Image from "next/image";
import React from "react";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";


const page = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src={logo}
            alt="logo"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />
          <p className="copyright py-12">©2024 HealthCare</p>
        </div>
      </section>

      <Image
        src={register}
        height={1000}
        width={1000}
        alt="logo"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default page;
