// --- STEP 6: Add PATCH and DELETE to Notes API ---
// app/api/notes/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'src', 'data', 'notes.json')


export async function GET() {
  const data = await readFile(filePath, 'utf8')
  return NextResponse.json(JSON.parse(data))
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const data = JSON.parse(await readFile(filePath, 'utf8'))
  data.push(body)
  await writeFile(filePath, JSON.stringify(data, null, 2))
  return NextResponse.json({ success: true })
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const data = JSON.parse(await readFile(filePath, 'utf8'))
  const index = data.findIndex((n: any) => n.id === body.id)
  if (index !== -1) {
    data[index] = body
    await writeFile(filePath, JSON.stringify(data, null, 2))
    return NextResponse.json({ success: true })
  }
  return NextResponse.json({ success: false }, { status: 404 })
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  let data = JSON.parse(await readFile(filePath, 'utf8'))
  data = data.filter((n: any) => n.id !== id)
  await writeFile(filePath, JSON.stringify(data, null, 2))
  return NextResponse.json({ success: true })
}
