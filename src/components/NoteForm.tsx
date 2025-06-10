'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNote, updateNote } from '@/store/notesSlice'
import styles from '../styles/NoteForm.module.css'
import { useRouter } from 'next/navigation'

type NoteFormProps = {
  isEdit?: boolean
  initialNote?: {
    id: string
    title: string
    content: string
  }
}

export default function NoteForm({ isEdit = false, initialNote }: NoteFormProps) {
  const [title, setTitle] = useState(initialNote?.title || '')
  const [content, setContent] = useState(initialNote?.content || '')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError('Both fields are required.')
      return
    }

    const note = {
      id: initialNote?.id || Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
    }

    const res = await fetch('/api/notes', {
      method: isEdit ? 'PATCH' : 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
      body: JSON.stringify(note),
    })

    if (res.ok) {
      isEdit ? dispatch(updateNote(note)) : dispatch(addNote(note))
      router.push('/dashboard')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.noteForm}>
      {error && <p style={{ color: 'red', marginBottom: '0.75rem' }}>{error}</p>}

      <input
        className={styles.input}
        placeholder="Title"
        value={title}
        onChange={e => {
          setTitle(e.target.value)
          setError('')
        }}
      />
      <textarea
        className={styles.textarea}
        placeholder="Content"
        value={content}
        onChange={e => {
          setContent(e.target.value)
          setError('')
        }}
      />
    <button type="submit" className={styles.submitButton}>
        {isEdit ? 'Update Note' : 'Add Note'}
    </button>

    </form>
  )
}
