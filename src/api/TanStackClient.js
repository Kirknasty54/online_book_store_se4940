// Base configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Generic fetch wrapper
async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  // Check if response has content before parsing JSON
  const text = await response.text();
  if (!text) return null;

  // Try to parse as JSON, if it fails return the text as-is (for JWT tokens, etc.)
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// Example API functions
export const booksApi = {
  getAll: () => apiRequest('/books/allbooks'),
  getById: (id) => apiRequest(`/books/${id}`, {method: 'GET'}),
  create: (data) => apiRequest('/books', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/books/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/books/${id}`, { method: 'DELETE' }),
};

export const authApi = {
  login: (credentials) => apiRequest('/users/auth', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => apiRequest('/users/register', { method: 'POST', body: JSON.stringify(userData) }),
};

export const checkOutApi = {
    checkout: (bookId) => apiRequest(`/books/${bookId}/checkout`, { method: 'POST' }),
}