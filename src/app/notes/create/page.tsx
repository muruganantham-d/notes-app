'use client'

import NoteForm from '@/components/NoteForm'

export default function CreateNotePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create a New Note</h1>
      <NoteForm />
    </div>
  )
}
