import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuIcon,
  makeStyles,
  Grid
} from '@material-ui/core';

import backgroundImage from '../../images/nav_background.png';


// Styling
const useStyles = makeStyles((theme) => {
  return {
    page: {
      paddingBottom: '64px'
    },
    appbar: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover'
    },
    toolbar: theme.mixins.toolbar,
    grid: {
    }
  }
})


// Navigation Bar (appears on all pages)
export default function NavBar() {
  const classes = useStyles()

  return (
    <div className={classes.page}>
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.toolbar}>

          {/* Grid to organize redirects */}
          <Grid container spacing={2} className={classes.grid}>
            <NavButton size={1} redirect={"/"} linkText={"Home"} />
            <Grid xs={8} item></Grid>
            <NavButton size={1} redirect={"/search"} linkText={"Search"} />
            <NavButton size={1} redirect={"/reviews"} linkText={"Reviews"} />
            <NavButton size={1} redirect={"/myPage"} linkText={"News"} />
          </Grid>

        </Toolbar>
      </AppBar>
    </div>
  );
}


const NavButton = (props) => {
  return (
    <Grid xs={props.size} item>
      <NavLink to={props.redirect} style={{ color: 'inherit', textDecoration: 'none' }}>
        <Typography color="inherit" noWrap>
          {props.linkText}
        </Typography>
      </NavLink>
    </Grid>
  )
}
