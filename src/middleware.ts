import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/* routes (but NOT /admin/login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const response = NextResponse.next();
    
    try {
      // Read the session cookie directly from the request
      const sessionCookie = request.cookies.get('mindwave_admin_session');
      
      if (!sessionCookie) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Lightweight check: if cookie exists and is non-empty, allow through.
      // Full validation happens in each API route via iron-session.
      return response;
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};