
// -------------------------------------------------------- Sample append to DOM

import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
)



import { listen } from 'express/lib/application';
import * as React from 'react';

const textbooks = [
  {
    "title": "Road to React",
    "author": "a1",
    "year": "y1",
    "url": "u1"
 },
 {
    "title": "t2",
    "author": "a2",
    "year": "y2",
    "url": "u2"
  }
]

function getTitle(title) {

  let index;

  if (title === 'React') {
    index = 0;
  };

  return textbooks[index]['title'];
}

function App() {

  return (
    <div>
      <h1>
      {getTitle('React')}
      </h1>
      <hr />
      <ul>
        {
          textbooks.map( function(item) {
            return <li>{item.title}</li>
          })
        }
      </ul>
    </div>
  );
}

//       <label htmlFor="search">Search: </label>
//       <input id="search" type="text" />

export default App;


// import React, { Component } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
// } from 'react-router-dom';

// import Home from '../Home';
// import PrivateRoute from '../Navigation/PrivateRoute.js';



// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       //
//     };
//   }

//   componentDidMount() {
//     //
//   }


//   componentWillUnmount() {
//     this.listener();
//   }


//   render() {
//     return (
// 	  <Router>
// 	    <div>
//         <PrivateRoute exact path="/" component={Home}/>
// 	    </div>
// 	  </Router>
//     );
//   }
// }

// export default App;