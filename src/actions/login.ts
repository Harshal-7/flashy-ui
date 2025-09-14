"use server";

import { LoginSchema } from "@/schema/LoginSchema";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import * as z from "zod";
import { post } from "@/utils/fetch";
import axios, { AxiosResponse } from "axios";
import { getErrorMessage } from "@/utils/errors";
import { API_URL, AUTHENTICATION_COOKIE } from "@/lib/constant";
import useUserStore from "@/lib/store";

export const login = async <T = any>(data: z.infer<typeof LoginSchema>) => {
  try {
    const response: AxiosResponse<T> = await axios.post(
      `${API_URL}/auth/login`,
      data
    );

    await setAuthCookie(response);

    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Request failed";
    return {
      success: false,
      error: getErrorMessage(errorMessage),
    };
  }
};

const setAuthCookie = async (response: AxiosResponse) => {
  const setCookieHeader = response.headers["set-cookie"];


  if (!setCookieHeader || !Array.isArray(setCookieHeader)) {
    throw new Error("No set-cookie header found in response");
  }

  // Find the cookie that starts with "access_token="
  const accessTokenCookie = setCookieHeader.find((cookieStr) =>
    cookieStr.startsWith("access_token=")
  );

  if (!accessTokenCookie) {
    throw new Error("access_token cookie not found in set-cookie header");
  }

  const token = accessTokenCookie.split(";")[0].split("=")[1];

  const decoded: { id: number; email: string; username: string; iat: number; exp: number; image?: string } = jwtDecode(token);

  (await cookies()).set({
    name: AUTHENTICATION_COOKIE,
    value: token,
    secure: true,
    httpOnly: true,
    expires: new Date(decoded.exp * 1000),
  });
};
