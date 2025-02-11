const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Storage configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads/";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// WebSocket connection for real-time updates
io.on("connection", (socket) => {
    console.log("New client connected");
    
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// File upload route
app.post("/upload", upload.array("files"), (req, res) => {
    if (!req.files) {
        return res.status(400).json({ message: "No files uploaded" });
    }
    
    const fileUrls = req.files.map(file => `/uploads/${file.filename}`);
    io.emit("newSlides", fileUrls); // Notify all clients about new slides
    res.json({ message: "Files uploaded successfully", files: fileUrls });
});

// Fetch previous uploads
app.get("/previous-uploads", (req, res) => {
    fs.readdir("uploads", (err, files) => {
        if (err) {
            return res.status(500).json({ message: "Error reading uploads" });
        }
        res.json(files.map(file => `/uploads/${file}`));
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
