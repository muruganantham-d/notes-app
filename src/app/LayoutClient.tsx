// ✅ File: src/app/LayoutClient.tsx
'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavbar = pathname === '/signin' || pathname === '/signup'

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  )
}
