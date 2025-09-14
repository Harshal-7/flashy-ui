"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { AUTHENTICATION_COOKIE } from "@/lib/constant";

type DecodedUser = {
  id: number;
  email: string;
  username: string;
  iat: number;
  exp: number;
};

export default async function getCurrentUser(): Promise<DecodedUser | null> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(AUTHENTICATION_COOKIE);

    if (!authCookie?.value) {
      return null;
    }

    const decoded = jwtDecode<DecodedUser>(authCookie.value);

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return null;
  }
}
