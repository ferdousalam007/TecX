import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/apiAuth";
import { cookies } from "next/headers";

type Role = "user" | "admin";

const AuthRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

const roleBasedRoutes: Record<Role, (string | RegExp)[]> = {
  user: [/^\/dashboard\/user/, "/feeds"],
  admin: [/^\/dashboard\/admin/, "/feeds"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = cookies().get("token")?.value;

  if (!token) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/sign-in?redirect=${pathname}`, request.url)
      );
    }
  }

  const user = await getCurrentUser();

  if (user.role && roleBasedRoutes[user.role as Role]) {
    const routes = roleBasedRoutes[user.role as Role];
    if (
      routes.some((route) =>
        typeof route === "string"
          ? pathname.startsWith(route)
          : pathname.match(route)
      )
    ) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/feeds",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
  ],
};
