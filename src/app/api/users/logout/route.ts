// File: app/api/users/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ success: true, message: 'Logged out successfully' })
  
  // Clear the token cookie by setting it to empty with maxAge 0
  res.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })

  return res
}
