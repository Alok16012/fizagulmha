import { NextRequest, NextResponse } from 'next/server';
import { checkPassword, SESSION_COOKIE, SESSION_VALUE } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!checkPassword(password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  // Include the token in the response body so the client can persist it
  // in localStorage and send it as X-Admin-Token on subsequent API calls.
  const response = NextResponse.json({ success: true, token: SESSION_VALUE });
  response.cookies.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
