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
import Divider from '@material-ui/core/Divider';
import Zoom from '@material-ui/core/Zoom';

import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Create } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles'
import { withThemeCreator } from '@material-ui/styles';
import { Menu, MenuItem } from '@material-ui/core';


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

  //menu functionality
  const [anchorEl, setAnchorEl] = React.useState(null)
  
  const handleClose = () => {
    setAnchorEl(null)
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  };



  //menu functionality
  
  return (
    <Router>
      <div className="App">
        <header className="App-header">

          <AppBar>
            <Toolbar>
              <IconButton
                id='zoom-button'
                onClick={openMenu}>
                <MenuIconStyled />
              </IconButton>
              <Menu
                id='zoom-menu'
                MenuListProps={{
                  'aria-labelledby': 'zoom-button',
                }}
                anchorEl={anchorEl}
                open = {Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Zoom}
              >
                <MenuItem onClick={handleClose}>Home</MenuItem>
                <Divider variant='middle' />
                <MenuItem onClick={handleClose}>Create Graph</MenuItem>
              </Menu>

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
