import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import CreateGraphs from './Pages/CreateGraphs';
import CourseSearch from './Pages/CourseSearch'
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
import { ContactlessOutlined, Create } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles'
import { withThemeCreator } from '@material-ui/styles';
import { Menu, MenuItem } from '@material-ui/core';




function App() {

  //menu functionality
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [page, setPage] = React.useState('Home')
  
  const handleClose = () => {
    setAnchorEl(null)
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const useStyles = makeStyles({
    root: {
      fill: 'white'
    }
  })

  const updatePage = (event) => {
    const newPage = event.target.to.split("/")
    setPage(newPage)
  }
  
  function MenuIconStyled() {
    const classes = useStyles();
    return <MenuIcon className={classes.root} />
  }
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
                <Link to="/" style={{textDecoration: 'none'}}>
                  <MenuItem onClick={handleClose} style={{color: 'black'}}>Home</MenuItem>
                </Link>

                <Divider variant='middle' />
                <Link to="/CourseSearch" style={{textDecoration: 'none'}}>
                  <MenuItem onClick={handleClose} style={{color: 'black'}}>Course Search</MenuItem>
                </Link>
                
                <Divider variant='middle' />
                
                <Link to="/CreateGraphs" style={{textDecoration: 'none'}}>
                  <MenuItem onClick={handleClose} style={{color: 'black'}}>Create Graphs</MenuItem>
                </Link>
              </Menu>

              <Link to="/" onClick={updatePage} style={{textDecoration: 'none'}}>
                {(() => {
                  if(window.location.pathname === "/") {
                    return (<Button type='button' style={{color: 'white', backgroundColor: '#097ff6'}}>
                              Home  
                            </Button>
                    )
                  } else {
                    return (<Button type='button' style={{color: 'white'}}>
                              Home  
                            </Button>
                    )
                  }

                })()}
                  
              </Link>


              <Link to="/CourseSearch" onClick={updatePage} style={{textDecoration: 'none'}}>
                {(() => {
                  if(window.location.pathname === "/CourseSearch") {
                    return (<Button type='button' style={{color: 'white', backgroundColor: '#097ff6'}}>
                              Course Search 
                            </Button>
                    )
                  } else {
                    return (<Button type='button' style={{color: 'white'}}>
                              Course Search  
                            </Button>
                    )
                  }

                })()} 
              </Link>


              <Link to="/CreateGraphs" onClick={updatePage} style={{textDecoration: 'none'}}>
                {(() => {
                  if(window.location.pathname === "/CreateGraphs") {
                    return (<Button type='button' style={{color: 'white', backgroundColor: '#097ff6'}}>
                              Create Graphs  
                            </Button>
                    )
                  } else {
                    return (<Button type='button' style={{color: 'white'}}>
                              Create Graphs  
                            </Button>
                    )
                  }

                })()} 
              </Link>
            </Toolbar>
          </AppBar>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreateGraphs" element={<CreateGraphs />} />
            <Route path="/CourseSearch" element={<CourseSearch />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>

        </header>
      </div>
    </Router>

  );
}

export default App;
