import { NextRequest } from "next/server";

import { store } from "@/store";

// Middleware for protecting routes
export async function middleware(request: NextRequest) {
  const { dispatch, getState } = store;

  // Initialize authentication (equivalent to `AuthCheck`)
  // await dispatch(initializeAuth())
  //   .unwrap()
  //   .catch(() => {
  //     console.log("Initialize auth failed");
  //     return NextResponse.redirect(new URL("/log-in", request.url));
  //   });

  // const state = getState();
  // const isAuthenticated = state.auth.isAuthenticated;

  // if (!isAuthenticated) {
  //   console.log("Not authenticated, redirecting...");
  //   return NextResponse.redirect(new URL("/log-in", request.url));
  // }

  // return NextResponse.next();
}

// Middleware configuration for protected routes
export const config = {
  matcher: ["/settings/:path*", "/documents/:path*"],
};
