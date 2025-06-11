'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setNotes } from '@/store/notesSlice'
import NoteItem from '@/components/NoteItem'
import { useRouter } from 'next/navigation'
import styles from '../page.module.css'

export default function HomePage() {
  const dispatch = useDispatch()
  const notes = useSelector((state: RootState) => state.notes.list)
  const [page, setPage] = useState(1)
  const notesPerPage = 6
  const router = useRouter()



  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch('/api/notes')
      if (res.status === 401) {
        router.push('/signin') 
        return
      }

      const data = await res.json()
      dispatch(setNotes(data))
    }

    fetchNotes()
  }, [dispatch, router])

  const paginatedNotes = notes.slice((page - 1) * notesPerPage, page * notesPerPage)
  const maxPage = Math.ceil(notes.length / notesPerPage)

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1>Notes</h1>
        <button onClick={() => router.push('/notes/create')}>Create New Note</button>
      </div>

      <input placeholder="Search notes..." className={styles.searchInput} />

      <div className={styles.grid}>
        {paginatedNotes.map(note => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>

      <div className={styles.footerRow}>
        <span>Showing {paginatedNotes.length} of {notes.length} notes</span>
        <div className={styles.paginationButtons}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <button disabled={page === maxPage} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </div>
  )
}
