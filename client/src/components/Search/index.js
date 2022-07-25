import React from 'react';
import * as axy from 'axios';
import backgroundImage from '../../images/light_background.png';
import backgroundImage_card from '../../images/banner_background.png';
import './index.css';

import {
  Typography,
  Card,
  Box,
  CardContent,
  Button,
  TextField,
  Grid,
  Container,
  makeStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Modal
} from '@material-ui/core';

// Styling
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: 'lightgrey',
      height: 'calc(100vh - 64px)',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover'
    },
    container: {
      justifyContent: 'center',
      display: 'flex',
      height: 'calc(100vh - 64px)'
    },
    box: {
      padding: '20px 5px',
      margin: '10px',
      background: 'white',
      opacity: '0.85',
      height: 'calc(100vh - 128px)'
    },
    typography: {
      marginLeft: '20px'
    },
    textField: {
      width: '80%',
      marginTop: '20px'
    },
    card: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      marginBottom: '20px'
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxHeight: '80%',
      width: 400,
      maxHeight: '80%',
      bgcolor: 'background.paper',
      background: 'rgba(0, 0, 0, 0.5)',
      boxShadow: 24,
      p: 4,
      padding: '20px',
      overflow: 'auto'
    },
    modalCard: {
      marginBottom: '20px',
      background: 'lightgrey',
      marginRight: '20px'
    }
  }
})

const url = "http://localhost:5000"; //enable for dev mode
// const url = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3064";

export default function App() {
  const classes = useStyles()

  // Filter options
  const [movieTitle, changeMovieTitle] = React.useState('');
  const [actorName, changeActorName] = React.useState('');
  const [directorName, changeDirectorName] = React.useState('');

  // Query results
  const [movies, updateMovies] = React.useState('');

  // Modal triggers
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // API to get query results
  const handleSubmit = (event) => {
    event.preventDefault();

    axy.post(url + "/api/searchMovies", {
      movieTitle: movieTitle,
      actorName: actorName,
      directorName: directorName
    }).then((response) => {
      updateMovies(response.data);
    });
  }


  return (
    <div>
      <Container maxWidth={false} className={classes.page}>
        <Grid container className={classes.container}>
          <Grid xs={4} item>

            {/* Search elements */}
            <Box className={classes.box} style={{ textAlign: 'center' }}>
              <Typography variant='h5'>
                Search for movies
              </Typography>

              <hr />

              <form onSubmit={handleSubmit}>

                <TextField
                  label="Movie Title"
                  placeholder="Enter movie title"
                  variant="outlined"
                  className={classes.textField}
                  value={movieTitle}
                  fullWidth
                  onChange={(event) => changeMovieTitle(event.target.value)}
                />
                <TextField
                  label="Actor Name"
                  placeholder="Enter actor's name"
                  variant="outlined"
                  className={classes.textField}
                  value={actorName}
                  fullWidth
                  onChange={(event) => changeActorName(event.target.value)}
                />
                <TextField
                  label="Director Name"
                  placeholder="Enter director's name"
                  variant="outlined"
                  className={classes.textField}
                  value={directorName}
                  fullWidth
                  onChange={(event) => changeDirectorName(event.target.value)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px', width: '80%' }}
                  fullWidth>
                  Search
                </Button>

              </form>
            </Box>
          </Grid>


          {/* List of movies */}
          <Grid xs={8} item>
            <Card className={classes.box} style={{ overflow: 'auto', paddingLeft: '20px', paddingRight: '20px' }}>

              {/* Only show movies if the query returns results */}
              {movies === '' ?

                <Typography variant='h6' className={classes.typography}>
                  Enter search criteria to see movies
                </Typography>

                : <>

                  {movies.movieData.map((item, index) => (
                    <Card className={classes.card}>
                      <CardContent>
                        <Grid container>
                          <Grid xs={8} item>
                            <Typography variant='h5' className={classes.typography} style={{ fontWeight: 'bold' }}>
                              {item.movie} {!(movies.avgScores.map(function (d) { return d['id']; }).includes(item.id)) ? '' : ' - ' + movies.avgScores[index]['avg']}
                            </Typography>
                            <Typography className={classes.typography}>
                              {item.director}
                            </Typography>
                          </Grid>

                          {/* Only show reviews if they exist */}
                          {!(movies.avgScores.map(function (d) { return d['id']; }).includes(item.id)) ? '' :

                            <>

                              <Grid xs={4} item>
                                <Button
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  onClick={handleOpen}
                                  style={{ marginTop: '20px', marginLeft: '20px', width: '80%' }}>
                                  See Reviews
                                </Button>
                              </Grid>

                              <Accordion>
                                <AccordionSummary
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                  style={{ marginTop: '20px' }}
                                >
                                  <Typography>See Reviews</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Box className>
                                    <Grid container>
                                      {movies.reviewData.map((reviewItem, index) => (
                                        reviewItem.movieID === item.id ?
                                          <Grid xs={6} item>
                                            <Card className={classes.modalCard}>
                                              <CardContent>
                                                <Typography variant='h6' style={{ marginBottom: '10px' }}>
                                                  {reviewItem.reviewTitle} - {reviewItem.reviewScore}
                                                </Typography>
                                                <Typography sx={{ mt: 2 }}>
                                                  {reviewItem.reviewContent}
                                                </Typography>
                                              </CardContent>
                                            </Card>
                                          </Grid>
                                          :
                                          ''
                                      ))}
                                    </Grid>
                                  </Box>
                                </AccordionDetails>
                              </Accordion>

                            </>
                          }

                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </>}

            </Card>
          </Grid>
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
        >

          {movies === '' ? '' :
            <Box className={classes.modal}>
              {movies.reviewData.map((reviewItem, index) => (
                <Card className={classes.modalCard}>
                  <CardContent>
                    <Typography variant='h6' style={{ marginBottom: '10px' }}>
                      {reviewItem.reviewTitle} - {reviewItem.reviewScore}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                      {reviewItem.reviewContent}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          }

        </Modal>

      </Container>
    </div>
  )
}