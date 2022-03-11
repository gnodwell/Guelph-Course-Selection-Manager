import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'

function App() {
    const [courses, setCourses] = useState([])
    const fetchCourses = async() => {
        fetch('131.104.49.104:5000', {
            'methods': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setCourses(response.json())
            console.log(courses)})
        .catch(error => console.log(error))
    };

  return (
    <div className="App">
      <header className="App-header">
        <AppBar>
          <Toolbar>
            <IconButton>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6'>
              CIS*3760 Team 4
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
      
        <img src={logo} className="App-logo" alt="logo" />

        {/* <Button onClick = {()=>alert('Hello World!')} variant='contained' color='primary'>
            Hello World
        </Button> */}

        <Button onClick = {fetchCourses} variant='contained' color='primary'>
            Fetch Courses
        </Button>
        <div>
        {/* {courses.map((course) => (
            <p>Major: {course.major}</p>
        ))} */}
        </div>
    </div>
  );
}

export default App;
