'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import '../styles/Navbar.module.css';
import styles from '../styles/Navbar.module.css'


export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    router.push('/signin')
  }

  return (
<nav className={styles.navbar}>
  <span className={styles['navbar-title']}>Notes App</span>
  <div className={styles['navbar-links']}>
    <a href="/">Notes</a>
    <a href="/dashboard">Dashboard</a>
    <a href="/profile">Profile</a>
    <a href="/error">Error</a>
  </div>
</nav>

  )
}
