import Button from '@material-ui/core/Button'
import logo from '../logo.svg';
// import React, { useState, useEffect } from 'react';




function home() {
    // const [courses, setCourses] = useState([])
    // const fetchCourses = async() => {
    //     fetch('131.104.49.104:5000', {
    //         'methods': 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(response => {
    //         setCourses(response.json())
    //         console.log(courses)})
    //     .catch(error => console.log(error))
    // };
    return (
        <div className="homePage">
            <h2>Home Page</h2>

            <img src={logo} className="App-logo" alt="logo" />

            {/* <Button onClick = {fetchCourses} variant='contained' color='primary'>
            Fetch Courses
            </Button> */}

            
        
        </div>
    );
}

export default home;

