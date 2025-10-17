import axios from 'axios'

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
})

export async function login(name: string, email: string, avatarUrl?: string) {
  const res = await api.post('/api/auth/login', { name, email, avatarUrl })
  return res.data.user
}

export async function logout() {
  await api.post('/api/auth/logout')
}

export async function me() {
  const res = await api.get('/api/auth/me')
  return res.data.user
}

export async function listItems() {
  const res = await api.get('/api/items')
  return res.data.items
}

export async function createItem(form: FormData) {
  const res = await api.post('/api/items', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data.item
}

export async function claimItem(id: string) {
  const res = await api.post(`/api/items/${id}/claim`)
  return res.data.item
}


