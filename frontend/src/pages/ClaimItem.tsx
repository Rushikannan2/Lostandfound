import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { claimItem, me } from '../api'

export default function ClaimItem() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    me().catch(() => navigate('/login'))
  }, [navigate])

  const onClaim = async () => {
    setError(null)
    try {
      if (!id) return
      await claimItem(id)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to claim item')
    }
  }

  return (
    <div style={{ maxWidth: 460, margin: '3rem auto' }}>
      <h2>Confirm Claim</h2>
      <p>Are you sure you want to claim this item?</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={onClaim}>Yes, Claim</button>
      <button style={{ marginLeft: 12 }} onClick={() => navigate('/dashboard')}>Cancel</button>
    </div>
  )
}


