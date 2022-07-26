import React, { useEffect } from 'react';
import * as axy from 'axios';
import backgroundImage from '../../images/light_background.png';

import {
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
  makeStyles
} from '@material-ui/core';

const url = "http://localhost:5000"; //enable for dev mode
// const url = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3064";

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
    chatBox: {
      width: '50%',
      background: 'lightgrey',
      marginBottom: '10px'
    }
  }
})


export default function MyPage() {
  const classes = useStyles();

  const [postTitle, updateTitle] = React.useState();
  const [postBody, updateBody] = React.useState();
  const [messages, uploadMessages] = React.useState('');

  const updateMessages = () => {
    axy.post(url + '/api/getMessages').then((response) => {
      uploadMessages(response.data);
      console.log(messages);
    });
  }

  // Auto-loading messages from database
  useEffect(() => {
    updateMessages();
  }, []);

  // API to get query results
  const handleSubmit = (event) => {
    event.preventDefault();

    // API to send user message to database
    axy.post(url + '/api/addMessage', {
      title: postTitle,
      body: postBody,
      userID: 1
    }).then(updateMessages)

  }

  return (
    <Container maxWidth={false} className={classes.page}>

      <Grid container className={classes.container}>
        <Grid xs={4} item>

          {/* Add a message */}
          <Box className={classes.box} style={{ textAlign: 'center' }}>
            <Typography variant='h5'>
              Write a post
            </Typography>

            <hr />

            <form onSubmit={handleSubmit}>

              <TextField
                label="Title"
                placeholder="Enter review title"
                variant="outlined"
                className={classes.textField}
                value={postTitle}
                fullWidth
                onChange={(event) => updateTitle(event.target.value)}
              />
              <TextField
                label="Content"
                placeholder="Write some thoughts"
                variant="outlined"
                className={classes.textField}
                value={postBody}
                fullWidth
                multiline minRows={4} maxRows={8}
                inputProps={{ maxLength: 400 }}
                onChange={(event) => updateBody(event.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px', width: '80%' }}
                fullWidth>
                Send
              </Button>

            </form>

          </Box>

        </Grid>


        {/* Message Page */}
        <Grid xs={8} item>
          <Box className={classes.box} style={{ overflow: 'auto' }}>
            <Typography className={classes.typography}>
              {messages === '' ? '' :
                messages.map((item, index) => (
                  <Card className={classes.chatBox}>
                    <CardContent>
                      <Typography variant='h6'>User {item.userID}: {item.title}</Typography>
                      <Typography>{item.content}</Typography>
                    </CardContent>
                  </Card>
                ))
              }
            </Typography>
          </Box>
        </Grid>
      </Grid>

    </Container>
  )

}