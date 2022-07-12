// Desc:    MSCI 245 - Project Deliverable 2
// Author:  Benjamin Luo
// Date:    2022-07-11

// --------------------------------------------------- \/ References

// - https://www.youtube.com/watch?v=Lv3OhfcxjkA: React, Material UI "Contact us" Form
// - https://www.youtube.com/watch?v=tKApfSoDPgM: Using Material UI "Select" element
// - https://thewebdev.info/2021/12/19/how-to-add-form-validation-with-react-and-material-ui/: Form validation

// --------------------------------------------------- /\ References
// --------------------------------------------------- \/ Imports

import React, { useEffect } from 'react';
import * as axy from 'axios';

import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Modal
} from '@material-ui/core';

const url = "http://localhost:5000"; //enable for dev mode
// const url = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3064";

const reviewObject = {
  movie: "",
  title: "",
  rating: "",
  body: ""
}

// --------------------------------------------------- /\ Imports
// --------------------------------------------------- \/ Styles
// Styling of the form elements

// Modal styling
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  border: '0px'
};

// --------------------------------------------------- /\ Styles
// --------------------------------------------------- \/ Main Function
// Main function: Aggregating components into a user form

function Review(props) {

  // States
  const [movie, selectedMovie] = React.useState();
  const [title, enteredTitle] = React.useState();
  const [review, enteredReview] = React.useState();
  const [rating, selectedRating] = React.useState();

  // D2: Hardcoded userID
  const [userID, setUser] = React.useState(1);

  // States: Errors
  const [errorMovie, triggerErrorMovie] = React.useState(false);
  const [errorTitle, triggerErrorTitle] = React.useState(false);
  const [errorReview, triggerErrorReview] = React.useState(false);
  const [errorRating, triggerErrorRating] = React.useState(false);

  // Modal triggers
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation
    reviewObject.movie === "" ? triggerErrorMovie(true) : triggerErrorMovie(false)
    reviewObject.title === "" ? triggerErrorTitle(true) : triggerErrorTitle(false)
    reviewObject.body === "" ? triggerErrorReview(true) : triggerErrorReview(false)
    reviewObject.rating === "" ? triggerErrorRating(true) : triggerErrorRating(false)

    // If no errors then output user review
    if (reviewObject.body !== "" && reviewObject.rating !== "" && reviewObject.movie !== "" && reviewObject.title !== "") {
      handleOpen(); // Open modal to display review

      // API to send review to database
      axy.post(url + '/api/addReview', {
        reviewTitle: reviewObject.title,
        reviewContent: reviewObject.body,
        reviewScore: reviewObject.rating,
        userID: userID,
        movieID: reviewObject.movie
      })

    }
  }

  return (
    <div className="App">

      {/* Main title */}
      <Typography gutterBottom variant="h3" align="center">
        Review a movie
      </Typography>

      {/* Form container */}
      <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>

          {/* User form */}
          <form onSubmit={handleSubmit}>

            {/* Grid for organizing form elements */}
            <Grid container spacing={2}>

              <Grid xs={12} item>
                <MovieSelection
                  movie={movie}
                  onChange={selectedMovie}
                  error={errorMovie}
                  helperText={errorMovie ? "Please select a movie" : " "}
                />
              </Grid>
              <Grid xs={12} item>
                <ReviewTitle
                  title={title}
                  onChange={enteredTitle}
                  error={errorTitle}
                  helperText={errorTitle ? "Please enter your review title" : " "}
                />
              </Grid>

              <Grid xs={12} item align="center">
                <ReviewRating
                  rating={rating}
                  onChange={selectedRating}
                  error={errorRating}
                  helperText={errorRating ? 'Please select the rating' : " "}
                />
              </Grid>

              <Grid xs={12} item>
                <ReviewBody
                  review={review}
                  onChange={enteredReview}
                  error={errorReview}
                  helperText={errorReview ? "Please enter your review" : " "}
                />
              </Grid>
              <Grid xs={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth>
                  Share your review
                </Button>
              </Grid>

              {/* Modal to display review */}
              <Modal
                open={open}
                onClose={handleClose}
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginBottom: "20px" }}>
                    {reviewObject.title} ~ {reviewObject.rating}*
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {reviewObject.body}
                  </Typography>
                </Box>
              </Modal>

            </Grid>
          </form>
        </CardContent>
      </Card>

    </div>
  );

}

export default Review;

// --------------------------------------------------- /\ Main Function
// --------------------------------------------------- \/ Movie Selection
// Component: Selecting which movie to review (MUI Select)

const MovieSelection = (props) => {

  const [movies, updateMovies] = React.useState();

  const handleChange = (event) => {
    reviewObject.movie = event.target.value;
  }

  // Auto-loading movie titles from database
  useEffect(() => {
    axy.post(url + "/api/getMovies").then((response) => {
      updateMovies(response.data);
    });
  }, []);

  return (
    <Box>
      <TextField
        label="Select movie"
        select
        value={props.movie}
        fullWidth
        variant="outlined"
        error={props.error}
        helperText={props.helperText}
        onChange={handleChange}
      >

        <MenuItem value="">
          <em>Select a movie</em>
        </MenuItem>
        {movies
          ? movies.map((item, index) => (
            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
          ))
          : null
        }

      </TextField>
    </Box>
  )
}

// --------------------------------------------------- /\ Movie Selection
// --------------------------------------------------- \/ Review Title
// Component: The title of the user's review (MUI TextField)

const ReviewTitle = (props) => {

  const handleChange = (event) => {
    reviewObject.title = event.target.value;
  }

  return (
    <TextField
      label="Title"
      placeholder="Enter review title"
      variant="outlined"
      value={props.title}
      error={props.error}
      helperText={props.helperText}
      fullWidth
      name={"reviewTitle"}
      onChange={handleChange}
    />
  )
}

// --------------------------------------------------- /\ Review Title
// --------------------------------------------------- \/ Review Body
// Component: The body of the user's review (MUI TextField)

const ReviewBody = (props) => {

  const handleChange = (event) => {
    reviewObject.body = event.target.value;
  }

  return (
    <TextField
      label="Review"
      inputProps={{ maxLength: 200 }}
      multiline minRows={4}
      placeholder="Type your thoughts here (max. 200 char)"
      variant="outlined"
      value={props.review}
      fullWidth
      error={props.error}
      helperText={props.helperText}
      onChange={handleChange}
    />
  )
}

// --------------------------------------------------- /\ Review Body
// --------------------------------------------------- \/ Review Rating
// Component: The user's rating (# of stars) (MUI Radio Buttons)

const ReviewRating = (props) => {

  const handleChange = (event) => {
    reviewObject.rating = event.target.value;
  };

  return (
    <FormControl component="fieldset" error={props.error}>
      <FormLabel component="legend">Rating</FormLabel>
      <RadioGroup
        row
        aria-label="position"
        name="position"
        value={props.rating}
        onChange={handleChange}
      >
        <FormControlLabel
          value="1"
          control={<Radio color="primary" />}
          label="1"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="2"
          control={<Radio color="primary" />}
          label="2"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="3"
          control={<Radio color="primary" />}
          label="3"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="4"
          control={<Radio color="primary" />}
          label="4"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="5"
          control={<Radio color="primary" />}
          label="5"
          labelPlacement="bottom"
        />
      </RadioGroup>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
}

// --------------------------------------------------- /\ Review Rating
