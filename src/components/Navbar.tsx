'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/users/logout', { method: 'POST' }) 
    router.push('/signin')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_wrap}>
      <span className={styles['navbar-title']}>Keep Notes</span>
      <div className={styles['navbar-links']}>
        <Link href="/dashboard">Notes</Link>
        <Link href="/profile">Profile</Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
      </div>
    </nav>
  )
}
