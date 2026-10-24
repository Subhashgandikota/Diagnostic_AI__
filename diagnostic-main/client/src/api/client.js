import { handleMockApi, getToken, setToken } from './mockData.js';

export { getToken, setToken };

export async function api(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  const API_BASE = import.meta.env.VITE_API_URL || '';

  // Attempt real API if backend URL configured or running locally
  try {
    const res = await fetch(`${API_BASE}/api${path}`, {
      ...options,
      headers,
    });

    const contentType = res.headers.get('content-type') || '';
    
    // If backend returned valid JSON, parse and return
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }

    // If 404 or HTML (e.g. Vercel SPA routing returning index.html for unknown /api/*), use mock fallback
    if (!API_BASE || res.status === 404 || contentType.includes('text/html')) {
      return await handleMockApi(path, options);
    }

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      // If error is 404 or generic failure, fallback
      if (res.status === 404 || res.status >= 500) {
        return await handleMockApi(path, options);
      }
      const err = new Error(data?.error || res.statusText || 'Request failed');
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  } catch (err) {
    // If it's a network error (e.g. failed to fetch, CORS, offline), use mock fallback
    if (!err.status || err.status === 404 || err.status >= 500) {
      return await handleMockApi(path, options);
    }
    throw err;
  }
}
