import Button from '@material-ui/core/Button'
import logo from '../logo.svg';
import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';




function Home() {
    return (
        <div className="homePage">
            <h2>Home Page</h2>

            <img src={logo} className="App-logo" alt="logo" />

            <Typography>Navigate to pages using the menu bar!</Typography>
        </div>
    );
}

export default Home;
