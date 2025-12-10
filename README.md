## 📖 Project Overview

In this project, I developed a **Music Info Library** web application using:

- **Frontend:** React  
- **Backend:** Node.js with Express.js  
- **Database:** MongoDB (NoSQL)  
- **Data format:** JSON for REST APIs 

## 📌 Main Features

This is a **CRUD application** that saves music information to a database. Users can:

- ✅ Create and list music info  
- 🔍 Search music info by artist name  
- 🔄 Update music info dynamically
- ❌ Delete music info

REST API methods used: **GET, POST, PUT, PATCH, DELETE**

- Standard HTTP codes implemented:
  - `200 OK`
  - `404 Music Not Found / Invalid ID`
  - `500 Failed to Fetch Music`
- Clear error responses with JSON error objects
- Performance optimization using `limit(50)` to fetch only the first 50 documents

## 📁 Project Structure

```
Project03-music-info-library
│ 
├── frontend/             
│   ├── public/        
│   ├── src/         
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md        
├── images/                          
│   ├── HomePage.png       
│   ├── SearchMusicInfoByArtistName.png
│   ├── AddNewMusicInfoEntry.png
│   ├── UpdateMusicInfoEntry.png
│   ├── DeleteMusicInfoEntry.png
├── package-lock.js           
├── server.js                           
├── .gitignore            
├── README.md             
└── package.json  
``` 
## 🛠️ Tools and Technologies

**Frontend:** ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
**Backend:** ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  
**Database:** ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)


## 📷 Screenshots

### 1. 🏠 Home Page
![Home Page](images/HomePage.png)

### 2. ✅ Add a New Music Info Entry
![Add a New Music Info Entry](images/AddNewMusicInfoEntry.png)

### 3. 🔍 Search Music Info by Artist Name
![Search Music Info by Artist Name](images/SearchMusicInfoByArtistName.png)

### 4. 🔄 Update a Music Info Entry
![Update a Music Info Entry](images/UpdateMusicInfoEntry.png)

### 5. ❌ Delete a Music Info Entry
![Delete a Music Info Entry](images/DeleteMusicInfoEntry.png)


# 📦 How to Clone & Run Locally

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- Git (for cloning the repository)

## Prerequisite

 - Create a .env file in your project root and add your connection string .
 ```bash
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/YOUR_DB
PORT=3000
 ```
## 📝 App.js Setup Instructions

- For **local development**, use direct endpoints:
  - `http://localhost:3000`
- Remove `API_URL` and related code — it is not needed locally.
- Use your own `API_URL` only when deploying (e.g., Render).
- Functions included:
  - **Fetch songs** → `axios.get("http://localhost:3000/api/musics")`
  - **Add song** → `axios.post("http://localhost:3000/api/musics", formData)`
  - **Update song** → `axios.put("http://localhost:3000/api/musics/:id", updatedData)`
  - **Delete song** → `axios.delete("http://localhost:3000/api/musics/:id")`

## 🚀 Setup Instructions (Windows)

Open PowerShell or CMD and run the following commands:

```bash
# Clone the repository
git clone https://github.com/Md-Harun-Or-Rashid/Project03-music-info-library.git

# Navigate to backend folder
cd Project03-music-info-library

# Install backend dependencies
npm install

# Navigate to frontend folder
cd frontend

# Install frontend dependencies
npm install

# Start the backend server
cd Project03-music-info-library
npm start   # Runs backend at http://localhost:3000

# Start the frontend

cd frontend

npm start   # Runs frontend (usually http://localhost:3001 if 3000 is taken) ## Remember to start the serve before you start frontend.

# Open the project in VS Code
code .
```

## Live Deployment

Live: https://project03-music-info-library.onrender.com/  # The public URL where the live application can be accessed.

## 🛠️ Tech Highlights

- **Express.js** simplifies routing, middleware, and API creation  
- **Mongoose** provides a smooth connection between MongoDB and Node.js  


## 🚀 Future Improvements

- Add **user login and registration** functionality so that users can register to use the app 
