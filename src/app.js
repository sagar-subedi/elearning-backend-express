const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const coursesDir = path.join(__dirname, "../public/courses");

app.use(express.static("public")); // Serve static files
// app.use(cors({ origin: "http://localhost:5173" })); // Allow React dev server
app.use(cors());

// ✅ Allow JSON and URL Encoded Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
