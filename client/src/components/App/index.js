import React, { Component } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Navigation from '../Navigation';
import Landing from '../Landing';
import Search from '../Search';
import Reviews from '../Reviews';
import MyPage from '../MyPage';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1c1c1c',
      light: '#acaea9',
      dark: '#acaea9'
    },
    secondary: {
      main: '#dedfdd',
      light: '#dedfdd',
      dark: '#dedfdd'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  }
})


export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
        <Route exact path="/" component={Landing} />
        <Route path="/search" component={Search} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/myPage" component={MyPage} />
      </Router>
    </ThemeProvider>
  );
}
