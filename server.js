// Taken and modified from: https://www.youtube.com/watch?v=3YrOOia3-mo

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 5000;

const db = mysql.createPool({
	host: "ec2-18-216-101-119.us-east-2.compute.amazonaws.com",
	user: "b33luo",
	password: "Password1",
	database: "b33luo"
});

app.use(cors());
app.use(express.json(path.join(__dirname, "client/build")));
app.use(bodyParser.urlencoded({ extended: true }));

// API to send all MySQL movie data to frontend 'Select Movie' element
app.post('/api/getMovies', (req, res) => {
	const sqlSelect = "SELECT * FROM movies";
	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
});


// API to post user reviews to database
app.post('/api/addReview', (req, res) => {
	const reviewTitle = req.body.reviewTitle;
	const reviewContent = req.body.reviewContent;
	const reviewScore = req.body.reviewScore;
	const userID = req.body.userID;
	const movieID = req.body.movieID;

	console.log(req.body);

	const sqlInsert = "INSERT INTO Review(reviewTitle, reviewContent, reviewScore, userID, movieID) VALUES (?,?,?,?,?)";
	db.query(sqlInsert, [reviewTitle, reviewContent, reviewScore, userID, movieID], (err, result) => {
		console.log(err);
	});
});


app.listen(port, '172.31.31.77');
