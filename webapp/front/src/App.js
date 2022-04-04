import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import Home from './Pages/Home';
import CreateGraphs from './Pages/CreateGraphs';
import CourseSearch from './Pages/CourseSearch'
import ErrorPage from './Pages/ErrorPage';


import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { makeStyles } from "@material-ui/core/styles";
import {ThemeProvider} from '@mui/styles';
import { BrowserRouter, Link, Route, Routes, Switch } from 'react-router-dom';
var body = document.body, html = document.documentElement;
var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

const drawerWidth = 240;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#171717'
  }
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function App() {

  const [open, setOpen] = React.useState(false);



  const classes = useStyles();

//   const updatePage = (event) => {
//     const newPage = event.target.to.split("/")
//     setPage(newPage)
//   }


  
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = (event) => {
    setOpen(false);
  }

  return (
      <Box sx={{ minHeight: '100vh', display: 'flex', backgroundColor: '#0a1929', color: 'white'}} >

      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Fragment>
      <BrowserRouter>
        <AppBar className= {classes.root} position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap component="div">
              University Course Utility - CIS*3760 Team 4
            </Typography>
          </Toolbar>
        </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />


          <List>
            {/* SCROLL TO HOME */}
            <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
        

            {/* SCROLL TO COURSE SEARCH */}
              <ListItem button component={Link} to="/CourseSearch" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary={"Course Search"} />
              </ListItem>
      

            {/* SCROLL TO CREATE GRAPHS*/}
              <ListItem button key={"Course Graph"} component={Link} to="/CreateGraphs" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary={"Create Graphs"} />
              </ListItem>
          </List>
      </Drawer>

      <Main open={open}>

      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/CourseSearch' element={<CourseSearch/>}></Route>
        <Route exact path='/CreateGraphs' element={<CreateGraphs/>}></Route>
      </Routes>

      </Main>

      </BrowserRouter>
      </Fragment>
      </ThemeProvider>
      </Box>
  );
}

export default App;