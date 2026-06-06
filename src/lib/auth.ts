import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'clatians@admin2026';
const SESSION_COOKIE = 'admin_session';
const SESSION_VALUE = 'authenticated';

/**
 * For Server Components — uses next/headers cookies()
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE;
  } catch {
    return false;
  }
}

/**
 * For Route Handlers (API routes) — reads cookie directly from the
 * raw request Cookie header, which is always present on Netlify.
 */
export function isAuthenticatedRequest(request: Request): boolean {
  try {
    const header = request.headers.get('cookie') ?? '';
    const map = Object.fromEntries(
      header.split(';').map((c) => {
        const idx = c.indexOf('=');
        return [c.slice(0, idx).trim(), c.slice(idx + 1).trim()];
      })
    );
    return map[SESSION_COOKIE] === SESSION_VALUE;
  } catch {
    return false;
  }
}

export function checkPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export { SESSION_COOKIE, SESSION_VALUE };
