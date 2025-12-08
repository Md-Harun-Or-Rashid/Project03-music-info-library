const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
// Replace this [mongodb+srv://**************@cluster0.psf8akh.mongodb.net] with your real connection string from MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://****************************@cluster0.psf8akh.mongodb.net";
app.use(cors());
app.use(express.json());
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });

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
const Music = mongoose.model("Music", musicSchema); 

// GET /api/musics - return all musics info
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