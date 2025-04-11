import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];
const productEditRegex = /^\/products\/\d+\/edit$/;

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("!!!", request);
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;
  // Chưa đăng nhập thì không cho vào private paths
  const isPrivatePath = privatePaths.some((path) => pathname.startsWith(path));
  if ((isPrivatePath || productEditRegex.test(pathname)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/me", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/me", "/login", "/register", "/products/:path*"],
};
