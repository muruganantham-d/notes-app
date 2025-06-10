'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteNote, updateNote } from '@/store/notesSlice'
import styles from '../styles/NoteItem.module.css';
import { useRouter } from 'next/navigation'

interface NoteProps {
  note: {
    id: string
    title: string
    content: string
  }
}

export default function NoteItem({ note }: NoteProps) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const handleDelete = async () => {
    const res = await fetch('/api/notes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: note.id }),
    })
    if (res.ok) dispatch(deleteNote(note.id))
  }

  const handleUpdate = async () => {
    const updatedNote = { id: note.id, title, content }
    const res = await fetch('/api/notes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNote),
    })
    if (res.ok) {
      dispatch(updateNote(updatedNote))
      setIsEditing(false)
    }
  }

  return (
    <div className={styles.noteCard}>

        <>
          <h3 className={styles.noteTitle}>{note.title}</h3>
          <p className={styles.noteContent}>
            {note.content.length > 140 ? note.content.slice(0, 140) + '...' : note.content}
          </p>
          <div className={styles.noteActions}>
          <button onClick={() => router.push(`/notes/edit/${note.id}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>

    </div>
  )
}
