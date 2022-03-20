import Button from '@material-ui/core/Button'
import logo from '../logo.svg';
import React, { useState, useEffect } from 'react';




function Home() {
    return (
        <div className="homePage">
            <h2>Home Page</h2>

            <img src={logo} className="App-logo" alt="logo" />

        </div>
    );
}

export default Home;
