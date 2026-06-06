/**
 * Drop-in replacement for fetch() used by all admin client components.
 *
 * On Netlify Functions, the httpOnly session cookie is sometimes not
 * forwarded to API routes. This helper also sends the session token
 * as a custom header (X-Admin-Token) read from localStorage, which
 * works reliably across all hosting environments.
 */
export async function adminFetch(url: string, options: RequestInit = {}): Promise<Response> {
  let token = '';
  try {
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('admin_token') ?? '';
    }
  } catch {
    // Private-browsing mode may block localStorage
  }

  const headers = new Headers(options.headers as HeadersInit | undefined);
  if (token) headers.set('x-admin-token', token);

  return fetch(url, { ...options, headers });
}
