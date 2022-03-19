import Button from '@material-ui/core/Button'
import logo from '../logo.svg';
import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';




function Home() {
    const [courses, setCourses] = useState([])
    const [usedFilters, setUsedFilters] = useState([])
    const [unusedFilters, setUnusedFilters] = useState([])

    const fetchCourses = async() => {
        fetch('https://131.104.49.104/api', {
            method: 'POST',
            body: JSON.stringify({}),
            referrerPolicy: "unsafe-url",
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

            {/* <img src={logo} className="App-logo" alt="logo" /> */}

            <Typography>Select the filters you would like to apply</Typography>

            <br></br>

            <div style={{backgroundColor: 'white', margin: '10px', overflowY: 'scroll'}}>
                {/* <Button>Course Code</Button>
                <Button>Course Name</Button> */}
                {/* <Button type='button' style={{color: 'white'}}>Summer</Button>
                <Button type='button' style={{color: 'white'}}>Fall</Button>
                <Button type='button' style={{color: 'white'}}>Winter</Button> */}
                {/* <Button>Restriction</Button> */}
                {/* <Button type='button' style={{color: 'white'}}>0.25 Credits</Button>
                <Button type='button'style={{color: 'white'}}>0.5 Credits</Button>
                <Button type='button'style={{color: 'white'}} >0.75 Credits</Button>
                <Button type='button'style={{color: 'white'}}>1 Credit</Button>
                <Button type='button'></Button>
                <Button type='button'></Button> */}
            </div>

            

            <Button onClick = {fetchCourses} variant='contained' color='primary'>
                Fetch Courses
            </Button>
            
            {(() => {
                if (courses.length > 0) {
                    return (
                        <div style={{backgroundColor: 'white', margin: '10px', overflowY: 'scroll', overflowX: 'scroll', maxHeight: '400px', width: '100%'}}>{
                            courses.map(course => (
                                <p key={course.cCode} style={{color: 'black'}} >course code: {course.cCode}</p>
                            ))}
                        </div>
                    )
                }
            })()}
            
        </div>
    );
}

export default Home;

