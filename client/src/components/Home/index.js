// Desc:    MSCI 245 - Project Deliverable 1
// Author:  Benjamin Luo
// Date:    2022-06-17

/* ------------------------------------ \/ References

- https://www.youtube.com/watch?v=Lv3OhfcxjkA: React, Material UI "Contact us" Form
- https://www.youtube.com/watch?v=tKApfSoDPgM: Using Material UI "Select" element

--------------------------------------- /\ References */

import React from 'react';
import { Typography, Card, CardContent, Grid, TextField, Button, Box, MenuItem } from '@material-ui/core';

const serverURL = ""; //enable for dev mode

const MuiSelect = () => {
  const [movie, setMovie] = React.useState('')
  const handleChange = (event) => {
    setMovie(event.target.value);
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

function App() {

  return (
    <div className="App">
      <Typography gutterBottom variant="h3" align="center">
        Review a movie
      </Typography>

      <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>

          <Typography gutterBottom variant="h5">
            Placeholder
          </Typography>

          <form>
            <Grid container spacing={1}>

              <Grid xs={12} item>
                <MuiSelect />
              </Grid>

              <Grid xs={12} sm={6} item>
                <TextField label="First Name" placeholder="Enter first name" variant="outlined" fullWidth required />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField label="Last Name" placeholder="Enter last name" variant="outlined" fullWidth required />
              </Grid>
              <Grid xs={12} item>
                <TextField type="email" label="Email" placeholder="Enter email" variant="outlined" fullWidth required />
              </Grid>
              <Grid xs={12} item>
                <TextField type="number" label="Phone Number" placeholder="Enter phone number" variant="outlined" fullWidth required />
              </Grid>
              <Grid xs={12} item>
                <TextField label="Message" multiline rows={4} placeholder="Type your message here" variant="outlined" fullWidth required />
              </Grid>
              <Grid xs={12} item>
                <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
              </Grid>

            </Grid>
          </form>
        </CardContent>
      </Card>

    </div>
  );

}

export default App;