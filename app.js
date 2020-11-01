const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = 8000;

// DATA PARSER
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// FILE ROUTES
app.get("/", function(req, res) {
    return res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    return res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("/api/notes/:note", function(req, res) {
    
});

// LISTENING

app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
});