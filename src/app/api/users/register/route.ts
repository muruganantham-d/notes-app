import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import bcrypt from 'bcryptjs';

const usersPath = path.join(process.cwd(), 'src', 'data', 'users.json')

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const users = JSON.parse(await readFile(usersPath, 'utf-8'))

  const exists = users.find((u: any) => u.email === email)
  if (exists) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)
  users.push({ id: Date.now().toString(), email, password: hashed })
  await writeFile(usersPath, JSON.stringify(users, null, 2))

  return NextResponse.json({ success: true })
}
