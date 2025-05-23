import { NextRequest, NextResponse } from 'next/server';

import { getToken } from 'next-auth/jwt';
import { NEXTAUTH_SECRET } from '@/lib/config';

export default async function AppMiddleware(req: NextRequest) {
  console.log('AppMiddleware', req.nextUrl.pathname);
  const url = req.nextUrl;
  const path = url.pathname;
  const token = (await getToken({
    req,
    secret: NEXTAUTH_SECRET,
  })) as {
    email?: string;
    user?: {
      createdAt?: string;
    };
  };

  // UNAUTHENTICATED if there's no token and the path isn't /login, redirect to /login
  if (!token?.email && path !== '/login' && path.includes('/dashboard')) {
    const loginUrl = new URL(`/login`, req.url);
    // Append "next" parameter only if not navigating to the root
    if (path !== '/') {
      loginUrl.searchParams.set('next', encodeURIComponent(path));
    }
    return NextResponse.redirect(loginUrl);
  }

  // AUTHENTICATED if the user was created in the last 3 seconds, redirect to "/welcome"
  // if (
  //   token?.email &&
  //   token?.user?.createdAt &&
  //   new Date(token?.user?.createdAt).getTime() > Date.now() - 3000 &&
  //   path !== "/welcome"
  // ) {
  //   console.log("Redirecting to welcome page");
  //   return NextResponse.redirect(new URL("/welcome", req.url));
  // }

  // AUTHENTICATED if the path is /login, redirect to "/dashboard"
  if (token?.email && path === '/login') {
    const nextPath = url.searchParams.get('next') || '/dashboard'; // Default redirection to "/dashboard" if no next parameter
    return NextResponse.redirect(
      new URL(decodeURIComponent(nextPath), req.url)
    );
  }
}
