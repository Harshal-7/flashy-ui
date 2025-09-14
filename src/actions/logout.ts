"use server";

import { AUTHENTICATION_COOKIE } from "@/lib/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import useUserStore from "@/lib/store";

export default async function logout() {
  (await cookies()).delete(AUTHENTICATION_COOKIE);
  redirect("/login");
}
