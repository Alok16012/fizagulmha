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
 * For Route Handlers (API routes).
 *
 * Checks two sources (either is sufficient):
 *  1. X-Admin-Token custom header — sent by adminFetch() from localStorage.
 *     Works reliably on all Netlify Function setups.
 *  2. Raw Cookie header — traditional httpOnly cookie, also works when
 *     cookies are forwarded correctly.
 */
export function isAuthenticatedRequest(request: Request): boolean {
  // 1. Custom header (localStorage-based, most reliable on Netlify)
  if (request.headers.get('x-admin-token') === SESSION_VALUE) return true;

  // 2. Cookie header (httpOnly cookie fallback)
  try {
    const header = request.headers.get('cookie') ?? '';
    if (!header) return false;
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
