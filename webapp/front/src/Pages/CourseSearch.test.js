import React from 'react'
import ReactDOM from 'react-dom'
import CourseSearch from './CourseSearch'


it ("Renders without crashing", () =>{
    const div = document.createElement("div");
    ReactDOM.render(<CourseSearch />, div)
})