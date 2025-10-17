import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../api'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [rollNumber, setRollNumber] = useState('')
  const [department, setDepartment] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      console.log('Attempting signup with:', { name, email, rollNumber, department })
      
      // Validate KLH email format
      if (!email.endsWith('@klh.edu.in')) {
        setError('Please use your official KLH email address')
        setLoading(false)
        return
      }
      
      // Create user account with additional info
      await signup(name, email, rollNumber, department)
      console.log('Signup successful, navigating to dashboard')
      navigate('/dashboard')
    } catch (err: any) {
      console.error('Signup error:', err)
      setError(err?.response?.data?.error || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      maxWidth: 500, 
      margin: '2rem auto', 
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2563eb', marginBottom: '0.5rem' }}>KLH Lost & Found</h1>
        <h2>Student Registration</h2>
        <p style={{ color: '#666' }}>Create your account to access the platform</p>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Already have an account? <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>Login here</Link>
        </p>
      </div>
      
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Full Name *
          </label>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="Enter your full name"
            style={{ 
              width: '100%', 
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }} 
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Roll Number
          </label>
          <input 
            value={rollNumber} 
            onChange={(e) => setRollNumber(e.target.value)} 
            placeholder="e.g., 2310080010"
            style={{ 
              width: '100%', 
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }} 
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Department
          </label>
          <select
            value={department} 
            onChange={(e) => setDepartment(e.target.value)} 
            style={{ 
              width: '100%', 
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          >
            <option value="">Select your department</option>
            <option value="CSE">Computer Science Engineering</option>
            <option value="ECE">Electronics & Communication Engineering</option>
            <option value="EEE">Electrical & Electronics Engineering</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="CE">Civil Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            KLH Email Address *
          </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="your.rollnumber@klh.edu.in"
            style={{ 
              width: '100%', 
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }} 
          />
          <small style={{ color: '#666', fontSize: '14px' }}>
            Only @klh.edu.in emails are allowed
          </small>
        </div>
        
        {error && (
          <div style={{ 
            background: '#fee2e2', 
            color: '#dc2626', 
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '1rem',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%',
            padding: '12px',
            background: loading ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p style={{ color: '#666', fontSize: '14px' }}>
          By creating an account, you agree to use the platform responsibly.
        </p>
      </div>
    </div>
  )
}
