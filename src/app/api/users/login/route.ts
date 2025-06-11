import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { readFile } from 'fs/promises'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const loginUsersPath = path.join(process.cwd(), 'src', 'data', 'users.json')
const LOGIN_SECRET = process.env.JWT_SECRET || 'testing#133'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const users = JSON.parse(await readFile(loginUsersPath, 'utf-8'))

  const user = users.find((u: any) => u.email === email)
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = jwt.sign({ id: user.id, email: user.email }, LOGIN_SECRET, { expiresIn: '1h' })

  const res = NextResponse.json({ success: true })
  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  })

  return res
}
