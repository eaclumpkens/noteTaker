const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
const express = require("express");

const app = express();
const PORT = 8000;

// DATA PARSER
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + "/public" ));

// GET REQUESTS
app.get("/", function(req, res) {
    return res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    return res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("/api/notes/:id", function(req, res) {
    let data = fs.readFileSync("db/db.json");
    let array = JSON.parse(data);

    let chosen = req.params.id;

    console.log(chosen);

    for (var i = 0; i < array.length; i++) {
        if (chosen === array[i].id) {
            return res.json(array[i]);
        }
    }

    return res.json(false);
})

app.post("/api/notes", function(req, res) {
	let data = fs.readFileSync("db/db.json");
	let array = JSON.parse(data);
	let newNote = {
		id: shortid.generate(),
		title: req.body.title,
		text: req.body.text,
	};

	array.push(newNote);
	data = JSON.stringify(array);
	fs.writeFileSync("db/db.json", data);
	res.send({ msg: "Note saved to the database!" });
});

app.delete("/api/notes/:id", (req, res) => {
	let data = fs.readFileSync("db/db.json");
    let array = JSON.parse(data);

    let note = req.params.id;
    let index = array.indexOf(note);
    
    console.log(array);

	if (!note) {
		return res.status(400).send("The note with the given id was not found.");
    }

	array.splice(index, 1);
	data = JSON.stringify(array);
	fs.writeFileSync("db/db.json", data);
	res.send({ msg: "Note deleted from the database!" });
});


// LISTENING
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
});