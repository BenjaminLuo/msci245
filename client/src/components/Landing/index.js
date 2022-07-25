import React from 'react';
import search from '../../images/reel_background.png';
import reviews from '../../images/cut_background.png';
import myPage from '../../images/news_background.png';
import backgroundImage from '../../images/light_background.png';
// import backgroundImage from '../../images/banner_background.png';

import { NavLink } from 'react-router-dom';

import {
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  makeStyles
} from '@material-ui/core';


// Styling
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: 'white',
      height: 'calc(100vh - 64px)',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover'
    },
    overlay: {
      background: 'rgba(255, 255, 255, 0.2)',
      height: 'calc(100vh - 64px)',
      width: '100%'
    },
    card: {
      padding: '20px 5px',
      margin: '10px',
      background: 'white',
      backgroundSize: 'cover',
      opacity: '0.85'
    },
    container: {
      justifyContent: 'center',
      display: 'flex'
    },
    typography: {
      marginLeft: '20px',
      fontWeight: 'bold'
    }
  }
})


export default function App() {
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={classes.page}>
      <Container maxWidth={false} className={classes.overlay}>
        <Grid container className={classes.container}>

          <NavButton size={9} content={'Movie Catalogue'} height={'40vh'} id={'search'} img={`url(${search})`}/>
          <NavButton size={3} content={'Review Movies'} height={'40vh'} id={'reviews'} img={`url(${reviews})`}/>
          <NavButton size={12} content={'Latest News'} height={'25vh'} id={'myPage'} img={`url(${myPage})`}/>

        </Grid>
      </Container>
    </Container>
  )
}

const NavButton = (props) => {
  const classes = useStyles()
  const textColor = props.id === 'myPage' ? 'black' : 'white'

  return (
    <Grid xs={props.size} item>
      <NavLink to={'/' + props.id} style={{ color: 'inherit', textDecoration: 'none' }}>
        <Card className={classes.card} style={{ height: props.height, backgroundImage: props.img}}>
          <CardContent>
            <Typography variant='h5' className={classes.typography} style={{ color: textColor}}>
              {props.content}
            </Typography>
          </CardContent>
        </Card>
      </NavLink>
    </Grid>
  )
}