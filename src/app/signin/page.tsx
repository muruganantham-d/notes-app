'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (res.ok && data.success) {
      router.push('/dashboard')
    } else {
      setError(data.error || 'Login failed')
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
          <h2>Sign In</h2>
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

          <button type="submit" className={styles.button}>Sign In</button>

          <p className={styles.linkText}>
            Don't have an account? <Link href="/signup">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

