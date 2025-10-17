import React, { FormEvent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createItem, me } from '../api'

export default function PostItem() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState<'lost' | 'found'>('lost')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    me().catch(() => navigate('/login'))
  }, [navigate])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const form = new FormData()
      form.append('title', title)
      form.append('description', description)
      form.append('location', location)
      form.append('status', status)
      if (imageFile) form.append('image', imageFile)
      await createItem(form)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to post')
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: '2rem auto' }}>
      <h2>Post Lost/Found Item</h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}


