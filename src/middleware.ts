// app/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Get the token from cookies
  const token = req.cookies.get("accessToken");

  // If no token is found, redirect to the login page
  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  const { pathname } = req.nextUrl;

  if (!token && pathname !== "/login" && pathname !== "/register") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If token exists, proceed with the request
  return NextResponse.next();

  // Assuming the token has a role property or some identifier for user roles
  // const userRole = token.role;

  // // Paths accessible by each role
  // const adminPaths = ["/1", "/2", "/3", "/4"];
  // const teacherPaths = ["/5", "/6", "/7", "/8"];
  // const coordinatorPaths = ["/9", "/23", "/43", "/5", "/3"];

  // // Get the current path of the request
  // const currentPath = req.nextUrl.pathname;

  // // If the user is an admin, allow access to admin-specific paths
  // if (userRole === "admin" && adminPaths.includes(currentPath)) {
  //   return NextResponse.next();
  // }

  // // If the user is a teacher, allow access to teacher-specific paths
  // if (userRole === "teacher" && teacherPaths.includes(currentPath)) {
  //   return NextResponse.next();
  // }

  // // If the user is a coordinator, allow access to coordinator-specific paths
  // if (userRole === "coordinator" && coordinatorPaths.includes(currentPath)) {
  //   return NextResponse.next();
  // }

  // // If the user does not have permission for the current path, redirect to an access-denied page
  // return NextResponse.redirect(new URL("/access-denied", req.url));
}

// This will apply to all pages except /login and /register
export const config = {
  matcher: ["/"],
};
