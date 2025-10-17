import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { listItems, me, logout } from '../api'

type Item = {
  _id: string
  title: string
  description: string
  imageUrl?: string
  location: string
  status: 'lost' | 'found' | 'claimed'
}

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([])
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    me().then(setUser).catch(() => setUser(null))
    listItems().then(setItems)
  }, [])

  const onLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Dashboard</h2>
        <div>
          {user ? <span>Hi, {user.name}</span> : <Link to="/login">Login</Link>}
          {user && (
            <button onClick={onLogout} style={{ marginLeft: 12 }}>Logout</button>
          )}
          <Link to="/post" style={{ marginLeft: 12 }}>Post Item</Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {items.map((it) => (
          <div key={it._id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
            {it.imageUrl && (
              <img src={it.imageUrl} alt={it.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
            )}
            <h4>{it.title}</h4>
            <p>{it.description}</p>
            <p><b>Location:</b> {it.location}</p>
            <p><b>Status:</b> {it.status}</p>
            <Link to={`/claim/${it._id}`}>Claim</Link>
          </div>
        ))}
      </div>
    </div>
  )
}


