import axios from 'axios'

export const API_BASE = import.meta.env.VITE_API_BASE || (import.meta.env.PROD ? 'https://lostandfound-backend.onrender.com' : 'http://localhost:5000')

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
})

export async function login(name: string, email: string, avatarUrl?: string) {
  const res = await api.post('/api/auth/login', { name, email, avatarUrl })
  return res.data.user
}

export async function signup(name: string, email: string, rollNumber?: string, department?: string, avatarUrl?: string) {
  const res = await api.post('/api/auth/signup', { name, email, rollNumber, department, avatarUrl })
  return res.data.user
}

export async function logout() {
  await api.post('/api/auth/logout')
}

export async function me() {
  try {
    console.log('Calling /api/auth/me...')
    const res = await api.get('/api/auth/me')
    console.log('Auth response:', res.data)
    return res.data.user
  } catch (error) {
    console.error('Auth error:', error)
    throw error
  }
}

export async function listItems() {
  try {
    console.log('Calling /api/items...')
    const res = await api.get('/api/items')
    console.log('Items response:', res.data)
    return res.data.items
  } catch (error) {
    console.error('Items error:', error)
    throw error
  }
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


