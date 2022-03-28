import React from 'react'
import ReactDOM from 'react-dom'
import CreateGraphs from './CreateGraphs';


it ("Renders without crashing", () =>{
    const div = document.createElement("div");
    ReactDOM.render(<CreateGraphs />, div)
})