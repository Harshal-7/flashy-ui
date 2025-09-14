"use server";

import { RegisterSchema } from "@/schema/RegisterSchema";
import { post } from "@/utils/fetch";
import * as z from "zod";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const result = await post("user", data);

    return {
      success: true,
      data: result.data,
      message: result.data.message || "User created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.message || error.message || "Registration failed",
    };
  }
};
