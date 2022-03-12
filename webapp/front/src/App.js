import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import CreateGraphs from './Pages/CreateGraphs';
import ErrorPage from './Pages/ErrorPage';
import React, { useState, useEffect } from 'react';


import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Create } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles'
import { withThemeCreator } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    fill: 'white'
  }
})

function MenuIconStyled() {
  const classes = useStyles();
  return <MenuIcon className={classes.root} />
}


function App() {
  
  return (
    <Router>
      <div className="App">
        <header className="App-header">

          <AppBar>
            <Toolbar>
              <IconButton>
                <MenuIconStyled />
              </IconButton>

              <Link to="/">
                <Button type='button' style={{color: 'white'}}>
                  Home  
                </Button>  
              </Link>
              
              <Link to="/CreateGraphs">
                <Button type='button' style={{color: 'white'}}>
                  Create Graphs  
                </Button>  
              </Link>
            </Toolbar>
          </AppBar>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreateGraphs" element={<CreateGraphs />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>

        </header>
      </div>
    </Router>

  );
}

export default App;
