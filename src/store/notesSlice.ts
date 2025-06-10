import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Note {
  id: string
  title: string
  content: string
}

interface NotesState {
  list: Note[]
}

const initialState: NotesState = {
  list: [],
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.list = action.payload
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.list.push(action.payload)
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.list.findIndex(n => n.id === action.payload.id)
      if (index !== -1) state.list[index] = action.payload
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(n => n.id !== action.payload)
    },
  },
})

export const { setNotes, addNote, updateNote, deleteNote } = notesSlice.actions
export default notesSlice.reducer
