// --- STEP 7: Fetch notes on mount using Redux ---
// app/page.tsx
'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setNotes } from '@/store/notesSlice'
import NoteItem from '@/components/NoteItem'
import NoteForm from '@/components/NoteForm';
import styles from './page.module.css'

export default function HomePage() {
  const dispatch = useDispatch()
  const notes = useSelector((state: RootState) => state.notes.list)

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch('/api/notes')
      const data = await res.json()
      dispatch(setNotes(data))
    }
    fetchNotes()
  }, [dispatch])

  return (
    <div className={styles.container}>
      <h1>My Notes</h1>
      <NoteForm />
      {notes.map(note => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  )
}