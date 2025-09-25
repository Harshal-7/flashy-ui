import { NextRequest, NextResponse } from "next/server";
import {
  apiAuthPrefixRoute,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  privateRoutes,
  publicRoutes,
} from "./lib/routes";
import authenticated from "./actions/authenticated";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isLoggedIn = await authenticated();

  const isApiPreficRoute = nextUrl.pathname.startsWith(apiAuthPrefixRoute);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

  if (isApiPreficRoute) {
    return;
  }

  if (isAuthRoute || isPublicRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.rewrite(new URL(request.url));
  }

  if (isPrivateRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
