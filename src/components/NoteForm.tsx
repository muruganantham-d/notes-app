'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNote } from '@/store/notesSlice'
import styles from '../styles/NoteForm.module.css'

export default function NoteForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const note = {
      id: Date.now().toString(),
      title,
      content,
    }

    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    })

    if (res.ok) {
      dispatch(addNote(note))
      setTitle('')
      setContent('')
    }
  }

  return (
 <form onSubmit={handleSubmit} className={styles.noteForm}>
      <input
      className={styles.input}
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
      className={styles.textarea}
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button type="submit">Add Note</button>
    </form>
  )
}
