// Taken and modified from: https://www.youtube.com/watch?v=3YrOOia3-mo

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 5000;
// const port = 5000;

const db = mysql.createPool({
	host: "ec2-18-216-101-119.us-east-2.compute.amazonaws.com",
	// host: "localhost",
	user: "b33luo",
	password: "Password1",
	database: "b33luo"
});

app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// API to send all MySQL movie data to frontend 'Select Movie' element
app.post('/api/getMovies', (req, res) => {
	const sqlSelect = "SELECT * FROM movies";
	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
});

// API to get all MySQL message data to frontend Forum page
app.post('/api/getMessages', (req, res) => {
	const sqlSelect = "SELECT * FROM ForumMessages";
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


// API to post user reviews to database
app.post('/api/addMessage', (req, res) => {
	const userID = req.body.userID;
	const title = req.body.title;
	const body = req.body.body;

	console.log(req.body);

	const sqlInsert = "INSERT INTO ForumMessages(userID, title, content) VALUES (?,?,?)";
	db.query(sqlInsert, [userID, title, body], (err, result) => {
		console.log(err);
	});

	res.send('');
});



// API to search for movies based on given search terms
app.post('/api/searchMovies', (req, res) => {
	const movieTitle = req.body.movieTitle;
	const actorName = req.body.actorName;
	const directorName = req.body.directorName;
	console.log(req.body)

	var movieID = [];

	var sqlMovieSearch = `
		SELECT DISTINCT m.name as movie, CONCAT(d.first_name, ' ', d.last_name) as director, m.id
		FROM movies m, directors d, movies_directors md ` + (actorName === '' ? '' : `, actors a, roles r `) + `
		WHERE md.director_id=d.id 
		AND m.id=md.movie_id ` +
		(actorName === '' ? '' : `AND m.id=r.movie_id AND r.actor_id=a.id AND CONCAT(a.first_name, ' ', a.last_name) ='` + actorName + `' `) +
		(movieTitle === '' ? '' : `AND m.name='` + movieTitle + `' `) +
		(directorName === '' ? '' : `AND CONCAT(d.first_name, ' ', d.last_name)='` + directorName + `'`) + `;`

	db.query(sqlMovieSearch, (err, result) => {

		for (var i = 0; i < result.length; i++) {
			movieID.push(result[i]['id']);
		}

		const movieData = result;

		var sqlReviewSearch = `
			SELECT reviewTitle, reviewContent, reviewScore, movieID
			FROM Review
			WHERE movieID IN (` + movieID.join(',') + `);`

		db.query(sqlReviewSearch, (err, result) => {
			const reviewData = result

			var sqlAvgScores = `
				SELECT AVG(reviewScore) as avg, movieID as id
				FROM Review 
				WHERE movieID IN (` + movieID.join(',') + `) 
				GROUP BY movieID;`

			db.query(sqlAvgScores, (err, result) => {
				const avgScores = result;
				res.send({ movieData, reviewData, avgScores });
				console.log(reviewData);
			});


		});


	});

});


app.listen(port, '172.31.31.77');
// app.listen(port);
