import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await login(name, email)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '3rem auto' }}>
      <h2>Login with KLH Email</h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email (@klh.edu.in)</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%' }} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}


