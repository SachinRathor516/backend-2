import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [notes, setNotes] = useState([

  ])

  function fetchNotes() {

    axios.get('http://localhost:3000/api/notes')

      .then(res => {
        console.log(res.data);
        setNotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleCreateNote(e) {
    e.preventDefault()

    const { title, description } = e.target.elements

    if (!title.value.trim() || !description.value.trim())
      return alert('Title and Description are required')



    axios.post('http://localhost:3000/api/notes', {
      title: title.value,
      description: description.value,
    })

      .then(res => {
        console.log(res.data);
        e.target.reset()
        fetchNotes()
      })
  }

  function handleDeleteNote(noteId) {

    axios.delete('http://localhost:3000/api/notes/' + noteId)

      .then(res => {
        console.log(res.data);
        fetchNotes()
      })

  }

  function handleUpdateDescription(e, noteId) {
    e.preventDefault()

    const { description } = e.target.elements

    if (!description.value.trim()) return alert('Description is required')

    axios.patch('http://localhost:3000/api/notes/' + noteId,
      {
        description: description.value
      })

      .then(res => {
        console.log(res.data);
        e.target.reset()
        fetchNotes()
      })


  }


  return (
    <>

      <form className='note-create-form' onSubmit={handleCreateNote}>
        <input type="text" name='title' placeholder='Enter Title' />
        <input type="text" name='description' placeholder='Enter Description'/>
        <button>Create note</button>
      </form>


      <div className='notes'>
        {notes.map(note => {
          return <div key={note._id} className='note'>
            <div>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => { handleDeleteNote(note._id) }}>Delete note</button>
            </div>

            <form className='note-update-form' onSubmit={(e) => { handleUpdateDescription(e, note._id) }}>
              <input type="text" name='description' placeholder='Update description' />
              <button>Update description</button>
            </form>
          </div>
        })}
      </div>
    </>
  )
}

export default App
