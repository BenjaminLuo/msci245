// Desc:    MSCI 245 - Project Deliverable 1
// Author:  Benjamin Luo
// Date:    2022-06-17

// --------------------------------------------------- \/ References

// - https://www.youtube.com/watch?v=Lv3OhfcxjkA: React, Material UI "Contact us" Form
// - https://www.youtube.com/watch?v=tKApfSoDPgM: Using Material UI "Select" element
// - https://thewebdev.info/2021/12/19/how-to-add-form-validation-with-react-and-material-ui/: Form validation

// --------------------------------------------------- /\ References
// --------------------------------------------------- \/ Imports

import React from 'react';
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
  Modal
} from '@material-ui/core';

const serverURL = ""; //enable for dev mode

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
// --------------------------------------------------- \/ Movie Selection
// Component: Selecting which movie to review (MUI Select)

const MovieSelection = () => {
  const [movie, selectedMovie] = React.useState('')
  const handleChange = (event) => {
    selectedMovie(event.target.value);
    reviewObject.movie = event.target.value;
  };

  return (
    <Box>
      <TextField
        label="Select movie"
        select
        value={movie}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      >

        <MenuItem value="M1">Movie 1</MenuItem>
        <MenuItem value="M2">Movie 2</MenuItem>
        <MenuItem value="M3">Movie 3</MenuItem>
        <MenuItem value="M4">Movie 4</MenuItem>
        <MenuItem value="M5">Movie 5</MenuItem>

      </TextField>
    </Box>
  )
}

// --------------------------------------------------- /\ Movie Selection
// --------------------------------------------------- \/ Review Title
// Component: The title of the user's review (MUI TextField)

const ReviewTitle = () => {
  const [title, enteredTitle] = React.useState()
  const handleChange = (event) => {
    enteredTitle(event.target.value);
    reviewObject.title = event.target.value;
  };
  return (
    <TextField
      label="Title"
      placeholder="Enter review title"
      variant="outlined"
      value={title}
      onChange={handleChange}
      error={title === ""}
      helperText={title === "" ? "Please enter your review title" : " "}
      fullWidth
    />
  )
}

// --------------------------------------------------- /\ Review Title
// --------------------------------------------------- \/ Review Body
// Component: The body of the user's review (MUI TextField)

const ReviewBody = () => {

  const [review, enteredReview] = React.useState()
  const handleChange = (event) => {
    enteredReview(event.target.value);
    reviewObject.body = event.target.value;
  };

  return (
    <TextField
      label="Review"
      inputProps={{ maxLength: 200 }}
      multiline rows={4}
      placeholder="Type your thoughts here (max. 200 char)"
      variant="outlined"
      value={review}
      onChange={handleChange}
      fullWidth
      error={review === ""}
      helperText={review === "" ? "Please enter your review" : " "}
    />
  )
}

// --------------------------------------------------- /\ Review Body
// --------------------------------------------------- \/ Review Rating
// Component: The user's rating (# of stars) (MUI Radio Buttons)

const ReviewRating = () => {

  const [rating, selectedRating] = React.useState('')
  const handleChange = (event) => {
    selectedRating(event.target.value);
    reviewObject.rating = event.target.value;
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Rating</FormLabel>
      <RadioGroup
        row
        aria-label="position"
        name="position"
        value={rating}
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
    </FormControl>
  );
}

// --------------------------------------------------- /\ Review Rating
// --------------------------------------------------- \/ Main Function
// Main function: Aggregating components into a user form

function Review() {

  // Modal triggers
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation
    if (reviewObject.body == "" || reviewObject.rating == "" || reviewObject.movie == "" || reviewObject.title == "") {
      if (reviewObject.body == "") {
        
      } 
      if (reviewObject.rating == "") {
  
      } 
      if (reviewObject.movie == "") {
  
      } 
      if (reviewObject.title == "") {
  
      }
    } else {
      handleOpen(); // Open modal to display review
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
                <MovieSelection />
              </Grid>
              <Grid xs={12} item>
                <ReviewTitle />
              </Grid>

              <Grid xs={12} item align="center">
                <ReviewRating />
              </Grid>

              <Grid xs={12} item>
                <ReviewBody />
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
