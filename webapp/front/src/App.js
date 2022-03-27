import React, { useState, useEffect } from 'react';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { dark } from '@mui/material/styles/createPalette';
import { createTheme } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { makeStyles } from "@material-ui/core/styles";
import {ThemeProvider} from '@mui/styles';

import Button from '@mui/material/Button';
import {TableContainer} from '@mui/material/';
import { Menu } from '@mui/material/';
import { MenuItem } from '@mui/material/';
import Zoom from '@mui/material/Zoom';
import { ArrowDropDown } from '@mui/icons-material/';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material/';
import { Close } from '@mui/icons-material/';

import Tree from 'react-d3-tree';
import { Graph } from 'react-d3-graph'

import data1 from './Data/mockdataset.json';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import { create } from '@mui/material/styles/createTransitions';

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

  const [courses, setCourses] = useState([])
  const [filters, setFilters] = useState({})
  const [anchorElSem, setAnchorElSem] = useState(null)
  const [anchorElCr, setAnchorElCr] = useState(null)
  const [anchorElLv, setAnchorElLv] = useState(null)
  const [anchorElDept, setAnchorElDept] = useState(null)
  const [depts, setDepts] = useState([])
  const [subject, setSubject] = useState({'subject': ''})
  const [subjectGraph, setSubjectGraph] = useState(null)
  const [major, setMajor] = useState({'subject': ''})
  const [majorGraph, setMajorGraph] = useState(null)
  const [uni, setUni] = useState('guelph')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [page, setPage] = React.useState('Home')
  const [graph, setGraphData] = useState(null)
  const [open, setOpen] = React.useState(false);

  useEffect( async () => {
      await getDepartments()
  }, [])

  const getDepartments = async() => {
      fetch('http://127.0.0.1:5000/api/getDepartments', {
          method: 'GET',
          referrerPolicy: 'unsafe-url'
      })
      .then(res => res.json())
      .then(foundData => setDepts(foundData))
      .catch(error => console.log(error))
  }

  const fetchCourses = async() => {
      console.log(filters)
      
      //if server is taking a long time to fetch then run the api locally
      fetch('http://127.0.0.1:5000/api', {
          method: 'POST',
          body: JSON.stringify(filters),
          referrerPolicy: "unsafe-url",
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => response.json())
      .then(foundData => setCourses(foundData))
      .catch(error => console.log(error))
  }

  const getSubjectGraph = async() => {
      console.log(subject)
      console.log(subjectGraph)

      fetch('http://127.0.0.1:5000/api/createSubjectGraph', {
          method: 'POST',
          body: JSON.stringify(subject),
          referrerPolicy: "unsafe-url",
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => response.json())
      .then(foundData => {console.log(foundData)
          setSubjectGraph(foundData)})
      .catch(error => console.log(error))
  }

  const handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value
      console.log(value)
      //allows user to enter multiple courses separated by commas
      if (value !== "" && value !== null) {
          if (name === 'prereqs' || name === 'coreqs') {
              const vals = value.split(",")
              setFilters(values => ({...values, [name]: vals}))
          } else {
              setFilters(values => ({...values, [name]: value}))
          }
      }
      
  }

  const handleSubjectChange = (event) => {
    //console.log(event.target.value)
    if (event.target.value === "") {
        setSubject(values => ({...values, [event.target.name]: ''}))
    } else if (event.target.value !== '' && event.target.value !== null) {
        setSubject(values => ({...values, [event.target.name]: event.target.value}))
    }
  }

  const handleMajorChange = (event) => {
      event.preventDefault()
      console.log(event.target.elements.majorField.value)
  }

  const handleCloseSem = (event) => {
      //add the semester to the filters
      if (event.currentTarget.innerText !== "") {
          updateFilters(event, 1)
      }
      setAnchorElSem(null)
  }

  const handleCloseCr = (event) => {
      //add the credit weight to the filters
      if (event.currentTarget.innerText !== "") {
          updateFilters(event, 2)
      }
      setAnchorElCr(null)
  }

  const handleCloseLv = (event) => {
      //add the level to the filters
      if (event.currentTarget.value !== null) {
          updateFilters(event, 3)
      }
      setAnchorElLv(null)
  }

  const handleCloseDept = (event) => {
      //add the department to the filters
      if (event.currentTarget.innerText !== null && event.currentTarget.innerText !== "") {
          updateFilters(event, 4)
      }
      setAnchorElDept(null)
  }

  const openMenuSem = (event) => {
      setAnchorElSem(event.currentTarget)
  }

  const openMenuCr = (event) => {
      setAnchorElCr(event.currentTarget)
  }

  const openMenuLv = (event) => {
      setAnchorElLv(event.currentTarget)
  }

  const openMenuDept = (event) => {
      setAnchorElDept(event.currentTarget)
  }

  function checkIfInArray (array, item) {
      for(let i = 0; i < array.length; i++) {
          if (array[i] === item) {
              return(1)
          }
      }
      return(0)
  }

  const removeFilter = (event)  => {
      console.log(event.currentTarget.id)
      const arr = event.currentTarget.id.split(":")
      console.log(arr)

      const tempObj = filters
      console.log(tempObj)
      const tempFilters = tempObj[arr[0]]
      console.log(tempFilters)


      if (Array.isArray(tempFilters)) {
          if(tempFilters.includes(arr[1])){
              var newFilters = tempFilters.filter((f) => {return f !== arr[1]})
          }
          setFilters(values => ({...values, [arr[0]]: newFilters}))
      } else {
          setFilters(values => ({...values, [arr[0]]: null}))
      }
      
  }

  function updateFilters (event, mode) {
      //updating either the semester, credit or level attr. based on the mode
      var isIn = 0
      if (mode === 1) {
          if (filters.semesters === undefined) {
              setFilters(values => ({...values, ['semesters']: [event.target.innerText]}))
          } else {
              //check if filter already exists
              isIn = checkIfInArray(filters.semesters, event.target.innerText)
              
              if (isIn === 0) {
                  setFilters(values => ({...values, ['semesters']: [...filters.semesters, event.target.innerText]}))
              }
          }
      } else if (mode === 2) {
          if (filters.creditWeight === undefined) {
              setFilters(values => ({...values, ['creditWeight']: [event.target.innerText]}))
          } else {
              //check if filter already exists
              isIn = checkIfInArray(filters.creditWeight, event.target.innerText)

              if (isIn === 0) {
                  setFilters(values => ({...values, ['creditWeight']: [...filters.creditWeight, event.target.innerText]}))
              }
          }
      } else if (mode === 3) {
          const val = event.target.value?.toString()
          if (filters.level === undefined) {
              setFilters(values => ({...values, ['level']: [val]}))
          } else {
              //check if filter already exists
              isIn = checkIfInArray(filters.level, val)

              if (isIn === 0) {
                  setFilters(values => ({...values, ['level']: [...filters.level, val]}))
              }
          }
      } else if (mode === 4) {
          const val = event.target.innerText
          if (filters.department === undefined) {
              setFilters(values => ({...values, ['department']: [val]}))
          } else {
              //check if filter already exists
              isIn = checkIfInArray(filters.department, val)

              if (isIn === 0) {
                  setFilters(values => ({...values, ['department']: [...filters.department, val]}))
              }
          }
      }
  }

  const changeUni = (event) => {
      console.log(event.target.value)
      console.log(event.target)
      setUni(event.target.value)
  }

  //creating a state
  
    

  //function to update the graph div
  function addGraph() {
      setGraphData(data1)
  }

  //function to clear the graph div
  function clearGraph() {
      setGraphData(null)
  }

  const handleCloseGraph = async(event) => {
      
  }

  const classes = useStyles();

  //menu functionality
  
  
  const handleClose = () => {
    setAnchorEl(null)
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  };


  const updatePage = (event) => {
    const newPage = event.target.to.split("/")
    setPage(newPage)
  }
  
  const theme = useTheme();


  

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const myConfig = {
    nodeHighlightBehavior: true,
    highlightOpacity: 0.1,
    initialZoom: 0.5,
    height: 1300,
    width: 1300,
    directed: true,
    d3: {
        linkLength: 90,
        gravity: -400,
    },
    node: {
      color: "lightgreen",
      fontSize: 15,
      size: 200,
      highlightStrokeColor: "red",
      highlightFontSize: 17,
    },
    link: {
      highlightColor: "red",
    },
  };
  
  
  const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };
  
  const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  return (
    
    <Box sx={{ display: 'flex', backgroundColor: '#0a1929', color: 'white'}}>
      
      <ThemeProvider theme={theme}>
      <CssBaseline />
      
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
          <a href="#home">
            <ListItem button key={"Home"} onClick={handleDrawerClose}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </a>

          {/* SCROLL TO COURSE SEARCH */}
          <a href="#course-search">
            <ListItem button key={"Course Search"} onClick={handleDrawerClose}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary={"Course Search"} />
            </ListItem>
          </a>

          {/* SCROLL TO CREATE GRAPHS*/}
          <a href="#create-graphs">
            <ListItem button key={"Course Graph"} onClick={handleDrawerClose}>
              <ListItemIcon>
                <AnalyticsIcon />
              </ListItemIcon>
              <ListItemText primary={"Course Graph"} />
            </ListItem>
          </a>  

        </List>
      </Drawer>
      
        
        
      <Main open={open}>
        <DrawerHeader />
        <div id="home" style={{height: height}}>
          
          <h1>University Course Utility</h1>
          <Typography>Navigate to pages using the menu bar!</Typography>
        </div>

        {/* COURSE SEARCH SECTION */}
        <div id="course-search" style={{height: height}}>
            <h1>Course Search</h1>

            <Typography variant='h5'>Select the filters you would like to apply for course search</Typography>

            <br></br>

            <div  style={{margin: '5px'}}>
                {/* form to send set filters and fetch courses */}
                <form className='flex_div'>
                    <label className='flex_item_md'>
                        <Typography variant='body1'>Course Name</Typography>
                        <input
                            className='input_field'
                            type='text'
                            name="name"
                            value={filters.name || ""}
                            placeholder='ex: Software Engineering'
                            onChange={handleChange}
                        />
                    </label>

                    <label className='flex_item_sm'>
                        <Typography variant='body1'>Course Code</Typography>
                        <input
                            className='input_field'
                            type='text'
                            name="cCode"
                            value={filters.cCode || ""}
                            placeholder='ex: CIS*3760'
                            onChange={handleChange}
                        />
                    </label>
                    
                    <label className='flex_item_sm'>
                        <Typography variant='body1'>Course Pre-requisites</Typography>
                        <input
                            className='input_field'
                            type='text'
                            name="prereqs"
                            value={filters.prereqs || ""}
                            placeholder='ex: CIS*2750, CIS*3750'
                            onChange={handleChange}
                        />
                    </label>
                    
                    <label className='flex_item_sm'>
                        <Typography variant='body1'>Course Co-requisites</Typography>
                        <input
                            className='input_field'
                            type='text'
                            name="coreqs"
                            value={filters.coreqs || ""}
                            placeholder='ex: CIS*2750, CIS*3750'
                            onChange={handleChange}
                        />
                    </label>
                </form>
                {/* div to select the semester and credit filter */}
                <div>
                    <Button
                        id='semester-button'
                        style={{color: 'white', margin: '5px'}}
                        variant='contained'
                        color='secondary'
                        onClick={openMenuSem}
                    >
                        Semester
                        <ArrowDropDown style={{fill: 'white'}}/>
                    </Button>
                    <Menu
                        id='semester-menu'
                        anchorEl={anchorElSem}
                        open={Boolean(anchorElSem)}
                        onClose={handleCloseSem}
                        TransitionComponent={Zoom}
                    >
                        <MenuItem onClick={handleCloseSem}>Fall</MenuItem>
                        <MenuItem onClick={handleCloseSem}>Summer</MenuItem>
                        <MenuItem onClick={handleCloseSem}>Winter</MenuItem>
                    </Menu>

                    <Button
                        id='credit-button'
                        style={{color: 'white', margin: '5px'}}
                        variant='contained'
                        color='secondary'
                        onClick={openMenuCr}
                    >
                        Credit Weight
                        <ArrowDropDown style={{fill: 'white'}}/>
                    </Button>
                    <Menu
                        id='credit-menu'
                        anchorEl={anchorElCr}
                        open={Boolean(anchorElCr)}
                        onClose={handleCloseCr}
                        TransitionComponent={Zoom}
                    >
                        <MenuItem onClick={handleCloseCr}>0.25</MenuItem>
                        <MenuItem onClick={handleCloseCr}>0.50</MenuItem>
                        <MenuItem onClick={handleCloseCr}>0.75</MenuItem>
                        <MenuItem onClick={handleCloseCr}>1.00</MenuItem>
                        <MenuItem onClick={handleCloseCr}>1.25</MenuItem>
                        <MenuItem onClick={handleCloseCr}>1.50</MenuItem>
                    </Menu>

                    <Button
                        id='level-button'
                        style={{color: 'white', margin: '5px'}}
                        variant='contained'
                        color='secondary'
                        onClick={openMenuLv}
                    >
                        Course Level
                        <ArrowDropDown style={{fill: 'white'}}/>
                    </Button>
                    <Menu
                        id='level-menu'
                        anchorEl={anchorElLv}
                        open={Boolean(anchorElLv)}
                        onClose={handleCloseLv}
                        TransitionComponent={Zoom}
                    >
                        <MenuItem onClick={handleCloseLv} value='1000'>1000</MenuItem>
                        <MenuItem onClick={handleCloseLv} value='2000'>2000</MenuItem>
                        <MenuItem onClick={handleCloseLv} value='3000'>3000</MenuItem>
                        <MenuItem onClick={handleCloseLv} value='4000'>4000</MenuItem>
                    </Menu>

                    <Button
                        id='dept-button'
                        style={{color: 'white', margin: '5px'}}
                        variant='contained'
                        color='secondary'
                        onClick={openMenuDept}
                    >
                        Department
                        <ArrowDropDown style={{fill: 'white'}}/>
                    </Button>
                    <Menu
                        id='dept-menu'
                        anchorEl={anchorElDept}
                        open={Boolean(anchorElDept)}
                        onClose={handleCloseDept}
                        TransitionComponent={Zoom}
                    >
                        { depts.map(dept => (
                            <MenuItem key={dept} onClick={handleCloseDept}>{dept}</MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>

            {/* function to display currently applied filters */}
            <div style={{backgroundColor: '#001e3c', margin: '10px', overflowY: 'scroll', width: '80%', borderRadius: '7px', maxHeight: '240px', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px'}}>
                {filters && <div>{
                    Object.entries(filters).map(filter => {
                        return (
                            <div key={filter}>
                                    {(() => {
                                        // if the filter is an array, then traverse it's indexes
                                        //otherwise just return it
                                        if (Array.isArray(filter[1])) {
                                            return(
                                                <div key={filter[1]}>{
                                                    filter[1].map((f) => (
                                                        <Button key={f} style={{color: 'white', fontSize: '18px', margin: '5px'}} color='info' variant='contained'>
                                                            {filter[0]}:{f}
                                                            <Close id={filter[0]+':'+f} onClick={removeFilter}/>
                                                        </Button>
                                                    ))
                                                }</div>
                                            )
                                        } else {
                                            if (filter[1] !== null) {
                                                return(<Button key={filter[1]} style={{color: 'white', fontSize: '18px', margin: '5px'}} color='info' variant='contained'>
                                                            {filter[0]}:{filter[1]}
                                                            <Close id={filter[0]+':'+filter[1]} onClick={removeFilter}/>
                                                        </Button>
                                                )
                                            }
                                            
                                            
                                        }
                                    })()}
                            </div>
                        )
                    })
                }</div>}
            </div>

            <Button onClick = {fetchCourses} variant='contained' color='primary'>
                Search Courses
            </Button>

            {/* function to display the fetched data in a table */}
            {(() => {
                if (courses.length > 0) {
                    return (
                        <div style={{backgroundColor: 'white', margin: '10px', overflowY: 'scroll', maxHeight: '400px', maxWidth:'85%'}}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Course&nbsp;code</TableCell>
                                            <TableCell>Credits</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Semester</TableCell>
                                            <TableCell>Department</TableCell>
                                            <TableCell>Pre-requisites</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { courses.map(course => (
                                            <TableRow
                                                key={course.cCode}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>{course.cCode}</TableCell>
                                                <TableCell>{course.creditWeight}</TableCell>
                                                <TableCell>{course.name}</TableCell>
                                                <TableCell>{course.description}</TableCell>
                                                <TableCell>{course.semesters}</TableCell>
                                                <TableCell>{course.department}</TableCell>
                                                <TableCell>{course.prereqs}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )
                }
            })()}
        </div>

        {/* CREATE GRAPH SECTION */}
        <div id="create-graphs" style={{height: height}}>
            <h1>Create Graphs</h1>
            
            <Button onClick = {addGraph} variant='contained' color='primary' style={{margin: '5px'}}>
                Generate Graph
            </Button>

            <Button onClick = {clearGraph} variant='contained' color='primary' style={{margin: '5px'}}>
                Clear Graph
            </Button>
                    
            <Typography>Graph of CIS*3760</Typography>

            {/*Graph div*/}
            <div style={{ width: '30em', height: '20em', backgroundColor: 'white', margin: '5px', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px'}}>
                {(() => {
                    //function to create the tree graph
                    if (graph !== null) {
                        return (
                            <Tree
                                data={graph}
                                pathFunc='step'
                                orientation='vertical'
                                separation={{siblings: 2, nonSiblings: 2 }}
                                collapsible='true'
                                zoom='0.25'
                                translate={{x:450, y:200}}
                            />
                        )
                    }
                })()}
            </div>

            <Typography variant='body1'>Select a university</Typography>
                
            <Button id='guelph-button' onClick = {changeUni} variant='contained' color='primary' style={{margin: '5px'}} value='guelph'>
                Guelph
            </Button>

            <Button id='waterloo-button' onClick = {changeUni} variant='contained' color='primary' style={{margin: '5px'}} value='waterloo'>
                Waterloo
            </Button>
            {(() => {
                return(
                    <Typography variant='h5'>Selected University: UNIVERSITY OF {uni.toUpperCase()}</Typography>
                )
            })()}

            <div style={{margin: '10px'}}>
                <form>
                    <label>
                        <Typography variant='body1'>Subject Name</Typography>
                        <input
                            className='input_field'
                            type='text'
                            name='subject'
                            value={subject.subject || ""}
                            placeholder='CIS'
                            onChange={handleSubjectChange}
                        />
                    </label>

                    <br></br>

                    {/* Button for creating subject graph */}
                    <Button type='submit' variant='contained' color='primary' style={{margin: '5px'}}>
                        Generate Graph
                    </Button>
                </form>

                
                
            </div>
            
            <div style={{backgroundColor: 'white'}}>
                {(() => {
                    if (subjectGraph !== null && subjectGraph.nodes.length !== 0 && subjectGraph.links.length !== 0) {
                        return (
                            <Graph
                            id="graph-id" // id is mandatory
                            data={subjectGraph}
                            config={myConfig}
                            onClickNode={onClickNode}
                            onClickLink={onClickLink}
                            />
                        )
                        
                    } else {
                        return(<></>)
                    }
                })()}
            </div>

            <div style={{margin: '10px'}}>
                <form onSubmit={handleMajorChange}>
                    <label>
                        <Typography variant='body1'>Major Name</Typography>
                        <input
                            id='majorField'
                            className='input_field'
                            type='text'
                            name='major'
                            placeholder='CS'
                        />
                    </label>
                    <br></br>
                    <Button type='submit' variant='contained' color='primary' style={{margin: '5px'}}>
                        Generate Graph
                    </Button>
                </form>
            </div>
            
            
        </div>

      </Main>

      </ThemeProvider>
    </Box>
  );
}

export default App;