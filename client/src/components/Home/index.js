// Desc:    MSCI 245 - Project Deliverable 1
// Author:  Benjamin Luo
// Date:    2022-06-17

/* ------------------------------------ \/ References

- https://www.youtube.com/watch?v=Lv3OhfcxjkA: React, Material UI "Contact us" Form
- https://www.youtube.com/watch?v=tKApfSoDPgM: Using Material UI "Select" element
- https://www.youtube.com/watch?v=ev6E5SextWE: Form validation via 'react-hook-form' library

--------------------------------------- /\ References */

import React from 'react';
import { Typography, Card, CardContent, Grid, TextField, Button, Box, MenuItem, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';
import { useForm } from 'react-hook-form';

const serverURL = ""; //enable for dev mode

const MovieSelection = () => {
  const [movie, selectedMovie] = React.useState('')
  const handleChange = (event) => {
    selectedMovie(event.target.value);
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

const ReviewTitle = () => {
  const [title, enteredTitle] = React.useState('')
  const handleChange = (event) => {
    enteredTitle(event.target.value);
  };
  return (
    <TextField
      label="Title"
      placeholder="Enter review title"
      variant="outlined"
      value={title}
      onChange={handleChange}
      fullWidth
      required />
  )
}

const ReviewBody = () => {

  const [review, enteredReview] = React.useState('')
  const handleChange = (event) => {
    enteredReview(event.target.value);
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
      required />
  )
}

const ReviewRating = () => {

  const [rating, selectedRating] = React.useState('')
  const handleChange = (event) => {
    selectedRating(event.target.value);
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

function Review() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => console.log(data)

  return (
    <div className="App">
      <Typography gutterBottom variant="h3" align="center">
        Review a movie
      </Typography>

      <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>

          <form onSubmit={handleSubmit(onSubmit)}>
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

            </Grid>
          </form>
        </CardContent>
      </Card>

    </div>
  );

}

export default Review;