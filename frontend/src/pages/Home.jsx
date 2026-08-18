import { useState, useEffect, useRef } from 'react';
import api from '../api';
import Note from '../components/Note';
import '../styles/Home.css'
import LoadingIndicator from '../components/LoadingIndicator'

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchedRef = useRef(false);

    const getNote = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get('api/notes/');
            setNotes(res.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data ?? err.message ?? 'Failed to load notes');
        } finally {
            setLoading(false);
        }
    };

    const deleteNote = async (id) => {
        try {
            const res = await api.delete(`api/notes/delete/${id}`);
            if (res.status !== 204) {
                console.warn('Failed to delete note', res.status);
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data ?? err.message ?? 'Failed to delete note');
        } finally {
            await getNote();
        }
    };

    const createNote = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/notes/', { content, title });
            if (res.status !== 201) {
                setError('Failed to create note');
                console.log(error)
            } else alert('Note created successfully')
        } catch (err) {
            console.error(err);
            setError(err.response?.data ?? err.message ?? 'Failed to create note');
        } finally {
            setContent('');
            setTitle('');
            await getNote();
        }
    };

    useEffect(() => {
        // In React 18 StrictMode effects may run twice in dev; guard to avoid duplicate fetches
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        getNote();
    }, [])

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id}></Note>)}
            </div>
            {loading && <LoadingIndicator />}
            {error && <div className="error">{JSON.stringify(error)}</div>}
                <h2>New Note</h2>
                <form onSubmit={createNote}>
                    <label htmlFor="title">Title:</label>
                    <br />
                    <input 
                    type="text" 
                    name="title"
                    id='title' 
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    value={title}
                    />
                    <br />
                    <label htmlFor="title">Content:</label>
                    <br />
                    <textarea 
                    name="content"
                    id='content' 
                    onChange={(e) => setContent(e.target.value)}
                    required
                    value={content}
                    ></textarea>
                    <br />
                    <input type="submit" value="Submit"/>
                </form>
        </div>
    )
}

export default Home;