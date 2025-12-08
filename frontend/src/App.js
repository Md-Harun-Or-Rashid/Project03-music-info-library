import {useState,useEffect} from "react";
import axios from "axios";
import './App.css'
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
;

const API_URL = process.env.NODE_ENV==="production"
                ? "https://project-music-info-library.onrender.com"
                : "http://localhost:3000/api/musics";

function App() {
  const[songs, setSongs]=useState([]);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    year: "",
    album: "",
    Genre: ""
  });
  
  //Fetch data from backend

  useEffect(()=>{axios.get("http://localhost:3000/api/musics").then((res)=>setSongs(res.data));},[])

  useEffect(() => {
  axios.get(`${API_URL}/api/musics`)
    .then((res) => setSongs(res.data));
}, []);

  // handleChange updates the formData state whenever´an input changes. 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

// Adding a new song info [POST method]

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post("http://localhost:3000/api/musics", formData);
      const res = await axios.post(`${API_URL}/api/musics`, formData);
      const newSong = res.data;
      setSongs((prev) => [...prev, newSong]); // update list instantly
      setFormData({ title: "", artist: "", year: "", album: "", Genre: "" }); // reset form
    } catch (err) {
      console.error(err);
      alert("Failed to add song");
    }
  };
  
// Updating song info 
const handleUpdate = async (songId, updatedData) => {
  try {
    //const res = await axios.put(`http://localhost:3000/api/musics/${songId}`, updatedData);
    const res = await axios.put(`${API_URL}/api/musics/${songId}`, updatedData);

    const updatedSong = res.data;

    // Update local state so UI reflects changes
    setSongs((prev) =>
      prev.map((s) => (s._id === songId ? updatedSong : s))
    );
  } catch (err) {
    console.error(err);
    alert("Failed to update song");
  }
};

const [editingSong, setEditingSong] = useState(null);
const [editFormData, setEditFormData] = useState({
  title: "",
  artist: "",
  year: "",
  album: "",
  Genre: ""
});

// deleting song info by id 

const handleDelete = async (songId) => {
  try {
    //const res = await axios.delete(`http://localhost:3000/api/musics/${songId}`);
    const res = await axios.delete(`${API_URL}/api/musics/${songId}`);
    alert(`Deleted song with id: ${res.data.id}`);

    // Update local state so UI reflects deletion
    setSongs((prev) => prev.filter((s) => s._id !== songId));
  } catch (err) {
    console.error(err);
    alert("Failed to delete song");
  }
};

// Find songs by  id
/*const [searchTerm, setSearchTerm] = useState("");
const filteredSongs = songs.filter((song) =>
  song._id.replace(/\s+/g, "").toLowerCase()
    .includes(searchTerm.replace(/\s+/g, "").toLowerCase())
);*/

// Find songs by artist name 

const [searchTerm, setSearchTerm] = useState("");

const filteredSongs = songs.filter((song) =>
  song.artist.replace(/\s+/g, "").toLowerCase()
    .includes(searchTerm.replace(/\s+/g, "").toLowerCase())
);


  return (
    <div className="song-list-container">
      {/* Heading */}
      <h1 className="song-heading">🎵 My Music Library</h1>
     
      <form className="music-form" onSubmit={handleSubmit}> {/* form for adding a song info */}
      <h2>Add a New Song Info</h2>

      <input
        type="text"
        name="title"
        placeholder="Song Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="artist"
        placeholder="Artist"
        value={formData.artist}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
      />

      <input
        type="text"
        name="album"
        placeholder="Album"
        value={formData.album}
        onChange={handleChange}
      />

      <input
        type="text"
        name="Genre"
        placeholder="Genre"
        value={formData.Genre}
        onChange={handleChange}
      />

      <button type="submit" >➕ Add Song</button>
    </form>

      {/* Search Bar className song-search */}
      <input
        type="text"
        placeholder="Find songs by artist name"
        className="song-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/*Updating song info */ }
      {editingSong && (
    <div className="modal-overlay">
    <div className="modal">
      <h2>Updating song info</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate(editingSong, editFormData);
          setEditingSong(null);
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={editFormData.title}
          onChange={(e) =>
            setEditFormData({ ...editFormData, title: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Artist"
          value={editFormData.artist}
          onChange={(e) =>
            setEditFormData({ ...editFormData, artist: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Year"
          value={editFormData.year}
          onChange={(e) =>
            setEditFormData({ ...editFormData, year: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Album"
          value={editFormData.album}
          onChange={(e) =>
            setEditFormData({ ...editFormData, album: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Genre"
          value={editFormData.Genre}
          onChange={(e) =>
            setEditFormData({ ...editFormData, Genre: e.target.value })
          }
        />

        <div className="modal-actions">
          <button type="submit">✅ Save</button>
          <button type="button" onClick={() => setEditingSong(null)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    {/* maping the music-card with song info, delete and update button*/}  
    <div className="song-list">
      {filteredSongs.map((song) => ( <div className="music-card" key={song._id}> 
        
        <h2 className="music-title">{song.title}</h2>
        <p className="music-artist">{song.artist}</p>
        <p className="music-year">{song.year}</p>
        <p className="music-genre">{song.album}</p>
         <div className="card-actions">
        <button 
          className="update-btn" 
          onClick={() => {
                           setEditingSong(song._id);
                           setEditFormData({
                           title: song.title,
                           artist: song.artist,
                           year: song.year,
                           album: song.album,
                           Genre: song.Genre
                          });
                        }}
        >
        <CiEdit />
        </button>
      
        <button 
          className="delete-btn" 
         onClick={() => handleDelete(song._id)}
        >
           <MdDeleteForever />
        </button>
       
      </div>
         </div> ) )}
    </div>
    </div>
  );
}

export default App;
