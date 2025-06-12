'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '../signin/page.module.css'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }), 
    })

    const data = await res.json()
    if (res.ok) {
      router.push('/signin')
    } else {
      setError(data.error || 'Signup failed')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <div className={styles.illustration} />
        <h1 className={styles.brand}>Keep Notes</h1>
        <p className={styles.tagline}>
          Organize your thoughts, track ideas, and stay productive. Your notes, always accessible.
        </p>
      </div>
      <div className={styles.formPane}>
        <form onSubmit={handleSubmit} className={styles.formBox}>
          <h2>Sign Up</h2>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Sign Up</button>
          <p className={styles.linkText}>
            Already have an account? <Link href="/signin">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
