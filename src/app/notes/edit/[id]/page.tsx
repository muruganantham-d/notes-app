'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import NoteForm from '@/components/NoteForm'
import styles from '../../create/page.module.css';

export default function EditNotePage() {
  const { id } = useParams()
  const router = useRouter()
  const [note, setNote] = useState<{ id: string; title: string; content: string } | null>(null)

  useEffect(() => {
    const fetchNote = async () => {
      const res = await fetch('/api/notes')
      if (res.status === 401) {
        router.push('/signin')
        return
      }

      const data = await res.json()
      const match = data.find((n: any) => n.id === id)
      if (match) setNote(match)
      else router.push('/') 
    }

    fetchNote()
  }, [id, router])

  if (!note) return <p>Loading...</p>

  return (
    <div className={styles.create_container}>
      <h1>Edit Note</h1>
      <NoteForm isEdit initialNote={note} />
    </div>
  )
}
