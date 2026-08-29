import { useEffect, useState } from 'react'
import axios from "axios";

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

  function handleSubmit(e) {
    e.preventDefault()

    const { title, description } = e.target.elements
    console.log(title.value, description.value);

    if (!title.value.trim() || !description.value.trim()) {
      alert("Title and description are required");
      return;
    }

    axios.post('http://localhost:3000/api/notes',
      {
        title: title.value,
        description: description.value
      }
    )
      .then(res => {
        console.log(res.data)
        e.target.reset();
        fetchNotes()
      })

  }

  function handleDelete(noteId) {
    console.log(noteId);

    axios.delete('http://localhost:3000/api/notes/' + noteId)

      .then(res => {
        console.log(res.data);
        fetchNotes()
      })

  }

  function handleUpdate(e, noteId) {
    e.preventDefault()
    console.log(noteId);

    const { description } = e.target.elements
    console.log(description.value);

    if (!description.value.trim()) {
      alert("Description is required");
      return;
    }

    axios.patch('http://localhost:3000/api/notes/' + noteId, {
      description: description.value
    })

      .then(res => {
        console.log(res.data);
        e.target.reset();
        fetchNotes()
      })
  }


  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input type="text" name='title' placeholder='Enter title' />
        <input type="text" name='description' placeholder='Enter description' />
        <button>Create note</button>

      </form>

      <div className='notes'>
        {notes.map(note => {
          return <div className='note'>
            <div><h1>{note.title}</h1>
              <p>{note.description}</p>
              <button className='delete-button' onClick={() => { handleDelete(note._id) }}>Delete note</button></div>

            <form className='note-update-form' onSubmit={(e) => { handleUpdate(e, note._id) }}>
              <input
                type="text"
                name='description'
                placeholder='Update note description' />
              <button type='submit'>Update description</button>
            </form>
          </div>

        })}

      </div>
    </>
  )
}

export default App
