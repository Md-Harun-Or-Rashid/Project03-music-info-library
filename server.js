const express = require("express");// The web framework
const mongoose = require("mongoose");// The database tool
const cors = require("cors");// Allows browser requests from other domains
const path = require("path");
require('dotenv').config();            // Load variables from .env file
// Configuration
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(cors());             // Enable Cross-Origin Resource Sharing
app.use(express.json());     // Allow server to read JSON data in POST requests

//DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('DB Connection Error:', err));
//SCHEMA DEFINITION
 const musicSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        artist:{type: String, required: true},
        year: Number,
        album: {type:String, required:true},
        Genre: {type: String, required: true}
    },
    { timestamps: true }
);
// Create the model
const Music = mongoose.model("Music", musicSchema); 

// GET /api/musics - return all musics info , limit is 50
app.get("/api/musics", async (req, res) => {
    try {
        const musics = await Music.find({}).limit(50);
        res.status(200).json(musics);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch musics" });
    }
});
// GET /api/musics/:id - return one music info by id
app.get("/api/musics/:id", async (req, res) => {
    try {
        const music = await Music.findById(req.params.id);
        if (!music) {
            return res.status(404).json({ error: "Music not found" });
        }
        res.status(200).json(music);
    } catch (err) {
        res.status(400).json({ error: "Invalid id" });
    }
});
// POST /api/musics - create a new music info
app.post("/api/musics", async (req, res) => {
    try {
        const music = await Music.create(req.body);
        res.status(201).json(music);
    } catch (err) {
        res.status(400).json({ error: "Invalid music data" });
    }
});
// PUT /api/musics/:id - update music info
app.put("/api/musics/:id", async (req, res) => {
    try {
        const music = await Music.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!music) {
            return res.status(404).json({ error: "Music not found" });
        }
        res.status(200).json(music);
    } catch (err) {
        res.status(400).json({ error: "Invalid update data" });
    }
});
// DELETE /api/musics/:id - delete music info
app.delete("/api/musics/:id", async (req, res) => {
    try {
        const music = await Music.findByIdAndDelete(req.params.id);
        if (!music) {
            return res.status(404).json({ error: "Music not found" });
        }
        res.status(200).json({ message: "Deleted", id: music._id });
    } catch (err) {
        res.status(400).json({ error: "Invalid id" });
    }
});
// Simple test route
app.get("/", (req, res) => {
    res.json({ message: "Music API running" });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
}
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
