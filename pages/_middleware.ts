import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req, _ev) {
  // This promise will return a value if the user is logged in
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  const { pathname } = req.nextUrl;
  // Allow requests if the token exists or user tries to authenticate
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }
}
