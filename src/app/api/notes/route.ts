// app/api/notes/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path';
import { verifyToken } from '@/lib/auth';

const filePath = path.join(process.cwd(), 'src', 'data', 'notes.json')


export async function GET(req: NextRequest) {
const token = req.cookies.get('token')?.value || ''
  const user = verifyToken(token || '')
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = JSON.parse(await readFile(filePath, 'utf8'))
  const userNotes = data.filter((n: any) => n.userId === user.id)

  return NextResponse.json(userNotes)
}

export async function POST(req: NextRequest) {
const token = req.cookies.get('token')?.value || ''
  const user = verifyToken(token || '')
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const newNote = { ...body, userId: user.id }

  const data = JSON.parse(await readFile(filePath, 'utf8'))
  data.push(newNote)
  await writeFile(filePath, JSON.stringify(data, null, 2))

  return NextResponse.json({ success: true })
}


export async function PATCH(req: NextRequest) {
const token = req.cookies.get('token')?.value || ''
  const user = verifyToken(token || '')
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const data = JSON.parse(await readFile(filePath, 'utf8'))

  const index = data.findIndex((n: any) => n.id === body.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 })
  }

  if (data[index].userId !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const updatedNote = { ...body, userId: user.id }
  data[index] = updatedNote

  await writeFile(filePath, JSON.stringify(data, null, 2))
  return NextResponse.json({ success: true })
}


export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  let data = JSON.parse(await readFile(filePath, 'utf8'))
  data = data.filter((n: any) => n.id !== id)
  await writeFile(filePath, JSON.stringify(data, null, 2))
  return NextResponse.json({ success: true })
}
