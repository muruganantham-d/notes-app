// File: app/api/users/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  // For localStorage-based auth, logout is handled client-side by removing token.
  return NextResponse.json({ success: true, message: 'Client should remove token from storage.' })
}