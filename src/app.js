const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mime = require('mime-types');


const app = express();
const coursesDir = path.join(__dirname, "../public/courses");
const staticDir = path.join(__dirname, '../public');

// app.use(cors({ origin: "http://localhost:5173" })); // Allow React dev server
app.use(cors());

// ✅ Allow JSON and URL Encoded Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files
app.use(express.static(staticDir,{
    
    
    setHeaders: (res, filePath) => {

    
    //   fs.readFile(path, 'utf8', (err, data) => {
    //     if (err) {
    //       console.error('Error reading file:', err);
    //       return;
    //     }
    //     // Check if the content contains the SVG opening tag
    //     if (data.startsWith('<svg')) {
    //       res.setHeader('Content-Type', 'image/svg+xml; charset=UTF-8');
    //     } 
    //   });

    //Assuming the file is an SVG if it has no extension, the logic above
    //is performance wise inefficient as that requires reading the file
    if (!path.extname(filePath)) {  // Check if the file has no extension
        res.setHeader('Content-Type', 'image/svg+xml; charset=UTF-8');
    }

    }
  }));


// List all available courses
app.get("/courses", (req, res) => {
    fs.readdir(coursesDir, { withFileTypes: true }, (err, files) => {
        if (err) return res.status(500).json({ error: "Cannot read directory" });
        const courses = files.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
        res.json(courses);
    });
});

// List all lessons in a selected course
app.get("/courses/:courseName/lessons", (req, res) => {
    const coursePath = path.join(coursesDir, req.params.courseName, "lessons_html");
    fs.readdir(coursePath, (err, files) => {
        if (err) return res.status(500).json({ error: "Cannot read course directory" });
        const lessons = files.filter(file => file.endsWith(".html")).map(file => file.replace(".html", ""));
        res.json(lessons);
    });
});

// Serve lesson pages
app.get("/courses/:courseName/:lessonName", (req, res) => {
    const { courseName, lessonName } = req.params;

    const lessonPath = path.join(coursesDir, courseName, "lessons_html", `${lessonName}.html`);

    res.sendFile(lessonPath, (err) => {
        if (err) {
            res.status(404).send("Lesson not found");
        }
    });
});


module.exports = app;
