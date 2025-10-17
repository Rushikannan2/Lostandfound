import React, { useEffect, useState } from 'react'
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [userData, itemsData] = await Promise.all([
          me().catch(() => null),
          listItems().catch(() => [])
        ])
        setUser(userData)
        setItems(itemsData)
      } catch (err: any) {
        setError(err.message || 'Failed to load data')
        console.error('Dashboard error:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const onLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div style={{ maxWidth: 900, margin: '2rem auto', textAlign: 'center' }}>
        <h2>Loading...</h2>
        <p>Please wait while we load the dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ maxWidth: 900, margin: '2rem auto', textAlign: 'center' }}>
        <h2>Error</h2>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1rem' }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>KLH Lost & Found</h1>
            <p style={{ margin: 0, opacity: 0.9 }}>Help fellow students find their belongings</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {user ? (
              <>
                <span style={{ fontSize: '1.1rem' }}>Welcome, {user.name}!</span>
                <button 
                  onClick={onLogout} 
                  style={{ 
                    padding: '8px 16px',
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link 
                  to="/login" 
                  style={{ 
                    padding: '8px 16px',
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  style={{ 
                    padding: '8px 16px',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                >
                  Sign Up
                </Link>
              </div>
            )}
            <Link 
              to="/post" 
              style={{ 
                padding: '12px 24px',
                background: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600'
              }}
            >
              + Post Item
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>No items found</h3>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            Be the first to post a lost or found item and help the KLH community!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/post" 
              style={{ 
                display: 'inline-block',
                padding: '12px 24px',
                background: '#2563eb',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.1rem'
              }}
            >
              Post Your First Item
            </Link>
            {!user && (
              <Link 
                to="/signup" 
                style={{ 
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: '#10b981',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '1.1rem'
                }}
              >
                Sign Up to Get Started
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {items.map((it) => (
            <div 
              key={it._id} 
              style={{ 
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              {it.imageUrl && (
                <img 
                  src={it.imageUrl} 
                  alt={it.title} 
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover' 
                  }} 
                />
              )}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>{it.title}</h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: '1.5' }}>
                  {it.description}
                </p>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ margin: '0.25rem 0', color: '#374151' }}>
                    <strong>📍 Location:</strong> {it.location}
                  </p>
                  <p style={{ margin: '0.25rem 0', color: '#374151' }}>
                    <strong>📊 Status:</strong> 
                    <span style={{ 
                      color: it.status === 'lost' ? '#dc2626' : it.status === 'found' ? '#059669' : '#6b7280',
                      fontWeight: '600',
                      marginLeft: '0.5rem'
                    }}>
                      {it.status.toUpperCase()}
                    </span>
                  </p>
                </div>
                <Link 
                  to={`/claim/${it._id}`}
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    background: '#2563eb',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: '500'
                  }}
                >
                  Claim This Item
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


