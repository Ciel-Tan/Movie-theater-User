import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const authenticated = request.cookies.get('token')

    if (!authenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/booking/:path*", "/account"],
};