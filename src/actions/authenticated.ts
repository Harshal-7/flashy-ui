"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { AUTHENTICATION_COOKIE } from "@/lib/constant";

export default async function authenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(AUTHENTICATION_COOKIE);

    if (!authCookie?.value) {
      return false;
    }

    // Decode and verify token
    const decoded = jwtDecode(authCookie.value);

    // Check if token is expired
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
}
