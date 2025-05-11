const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mime = require('mime-types');
const jwt = require("jsonwebtoken");
require('dotenv').config();


const app = express();
const staticDir = path.join(__dirname, '../public');
const coursesDir = path.join(staticDir, 'courses');

const usersFile = path.join(__dirname, "../users.json");

const SECRET_KEY = process.env.SECRET_KEY; // Secret key for signing tokens

// app.use(cors({ origin: "http://localhost:5173" })); // Allow React dev server
app.use(cors());

// ✅ Allow JSON and URL Encoded Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files
app.use(express.static(staticDir,{
    
    
    setHeaders: (res, filePath) => {

    
    //   fs.readFile(filePath, 'utf8', (err, data) => {
    //     if (err) {
    //       console.error('Error reading file:', err);
    //       return;
    //     }
    //     // Check if the content contains the SVG opening tag
    //     if (data.startsWith('<svg') || data.startsWith('<!DOCTYPE svg')) {
    //       res.setHeader('Content-Type', 'image/svg+xml; charset=UTF-8');
    //     } 
    //   });

        // Synchronously read the file
        const fileContent = fs.readFileSync(filePath, 'utf8');
         // Check if the file contains specific content (e.g., <!DOCTYPE svg)
         if (!path.extname(filePath) || fileContent.startsWith('<svg') || fileContent.startsWith('<!DOCTYPE svg')) {
            res.setHeader('Content-Type', 'image/svg+xml; charset=UTF-8');
        }

    //Assuming the file is an SVG if it has no extension, the logic above
    //is performance wise inefficient as that requires reading the file
    // if (!path.extname(filePath)) {  // Check if the file has no extension
    //     res.setHeader('Content-Type', 'image/svg+xml; charset=UTF-8');
    // }

    }
  }));

  // Authentication middleware to validate tokens
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user info to the request
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

// Route to log in and generate a token
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Read users from the JSON file
    const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));

    // Find the user
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate a token
    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});


// List all available courses
app.get("/courses", authenticate, (req, res) => {
    fs.readdir(coursesDir, { withFileTypes: true }, (err, files) => {
        if (err) return res.status(500).json({ error: "Cannot read directory" });
        const courses = files.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
        res.json(courses);
    });
});

// List all lessons in a selected course
app.get("/courses/:courseName/lessons", authenticate, (req, res) => {
    const coursePath = path.join(coursesDir, req.params.courseName, "lessons_html");
    fs.readdir(coursePath, (err, files) => {
        if (err) return res.status(500).json({ error: "Cannot read course directory" });
        const lessons = files.filter(file => file.endsWith(".html")).map(file => file.replace(".html", ""));
        res.json(lessons);
    });
});

// Serve lesson pages
app.get("/courses/:courseName/:lessonName", authenticate, (req, res) => {
    const { courseName, lessonName } = req.params;

    const lessonPath = path.join(coursesDir, courseName, "lessons_html", `${lessonName}.html`);

    res.sendFile(lessonPath, (err) => {
        if (err) {
            res.status(404).send("Lesson not found");
        }
    });
});


module.exports = app;
