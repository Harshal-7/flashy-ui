"use server";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getErrorMessage } from "./errors";
import { cookies } from "next/headers";
import { API_URL, AUTHENTICATION_COOKIE } from "@/lib/constant";

interface FetchOptions {
  includeAuth?: boolean;
  customHeaders?: Record<string, string>;
  timeout?: number;
}

const getHeaders = async (options: FetchOptions = {}) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.customHeaders,
  };

  if (options.includeAuth !== false) {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(AUTHENTICATION_COOKIE);

    if (authCookie?.value) {
      headers.Cookie = `access_token=${authCookie.value}`;
    }
  }

  return headers;
};

export const post = async <T = any>(
  path: string,
  data: any,
  options: FetchOptions = {},
) => {
  const headers = await getHeaders(options);

  const config: AxiosRequestConfig = {
    headers,
    timeout: options.timeout || 10000,
    withCredentials: true,
  };

  console.log("-----data:", data);
  console.log("-----type data:", typeof data);

  try {
    const res: AxiosResponse<T> = await axios.post(
      `${API_URL}/${path}`,
      data,
      config,
    );

    return { error: "", data: res.data, success: true };
  } catch (error: any) {
    console.log("-------error:", error);

    const errorMessage =
      error.response?.data?.message || error.message || "Request failed";
    return {
      error: getErrorMessage(errorMessage),
      success: false,
      data: null,
    };
  }
};

export const get = async <T = any>(
  path: string,
  options: FetchOptions & {
    params?: Record<string, any>;
    tags?: string[];
  } = {},
) => {
  const headers = await getHeaders(options);

  let url = `${API_URL}/${path}`;

  if (options.params) {
    const searchParams = new URLSearchParams();
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    url += `?${searchParams.toString()}`;
  }

  const config: AxiosRequestConfig = {
    headers,
    timeout: options.timeout || 10000,
    withCredentials: true,
  };

  try {
    const res: AxiosResponse<T> = await axios.get(url, config);
    return { error: "", data: res.data, success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Request failed";
    return {
      error: getErrorMessage(errorMessage),
      success: false,
      data: null,
    };
  }
};

export const put = async <T = any>(
  path: string,
  data: FormData | object,
  options: FetchOptions = {},
) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const headers = await getHeaders(options);

  const config: AxiosRequestConfig = {
    headers,
    timeout: options.timeout || 10000,
  };

  try {
    const res: AxiosResponse<T> = await axios.put(
      `${API_URL}/${path}`,
      body,
      config,
    );
    return { error: "", data: res.data, success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Request failed";
    return {
      error: getErrorMessage(errorMessage),
      success: false,
      data: null,
    };
  }
};

export const del = async <T = any>(
  path: string,
  options: FetchOptions = {},
) => {
  const headers = await getHeaders(options);

  const config: AxiosRequestConfig = {
    headers,
    timeout: options.timeout || 10000,
  };

  try {
    const res: AxiosResponse<T> = await axios.delete(
      `${API_URL}/${path}`,
      config,
    );
    return { error: "", data: res.data, success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Request failed";
    return {
      error: getErrorMessage(errorMessage),
      success: false,
      data: null,
    };
  }
};
