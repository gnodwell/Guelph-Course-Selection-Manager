import Button from '@material-ui/core/Button'
import logo from '../logo.svg';
import React, { useState, useEffect } from 'react';




function Home() {
    const [courses, setCourses] = useState([])

    const fetchCourses = async() => {
        fetch('http://131.104.49.104:5000/', {
            'methods': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setCourses(data))
        .catch(error => console.log(error))
    };
    return (
        <div className="homePage">
            <h2>Home Page</h2>

            <img src={logo} className="App-logo" alt="logo" />


        <Button onClick = {fetchCourses} variant='contained' color='primary'>
            Fetch Courses
        </Button>
        
        {courses && <div>{
          courses.map(course => (
            <p key={course.cCode}>course code: {course.cCode}</p>
        ))}
        </div>}
        
        </div>
    );
}

export default Home;

