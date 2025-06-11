'use client'

import NoteForm from '@/components/NoteForm';
import styles from './page.module.css'

export default function CreateNotePage() {
  return (
    <div className={styles.create_container}>
      <h1>Create a New Note</h1>
      <NoteForm />
    </div>
  )
}
