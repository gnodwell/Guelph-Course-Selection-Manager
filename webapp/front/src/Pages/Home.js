import Button from '@material-ui/core/Button'
import logo from '../logo.svg';
import React, { useState, useEffect } from 'react';
import { Divider, IconButton, TableContainer, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/core/';
import { MenuItem } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import { ArrowDropDown } from '@material-ui/icons';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';





function Home() {
    const [courses, setCourses] = useState([])
    const [filters, setFilters] = useState({})
    const [anchorElSem, setAnchorElSem] = useState(null)
    const [anchorElCr, setAnchorElCr] = useState(null)

    const fetchCourses = async() => {
        fetch('https://131.104.49.104/api', {
            method: 'POST',
            body: JSON.stringify(filters),
            referrerPolicy: "unsafe-url",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setCourses(data))
        .catch(error => console.log(error))
    };

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        
        //allows user to enter multiple courses separated by commas
        if (name === 'prereqs' || name === 'coreqs') {
            const vals = value.split(",")
            setFilters(values => ({...values, [name]: vals}))
        } else {
            setFilters(values => ({...values, [name]: value}))
        }
        
        
    }

    const handleCloseSem = async(event) => {
        //add the semester to the filters
        updateFilters(event, 1)
        setAnchorElSem(null)
    }

    const handleCloseCr = async(event) => {
        //add the credit weight to the filters
        updateFilters(event, 2)
        setAnchorElCr(null)
    }

    const openMenuSem = (event) => {
        setAnchorElSem(event.currentTarget)
    }

    const openMenuCr = (event) => {
        setAnchorElCr(event.currentTarget)
    }

    function updateFilters (event, mode) {
        //updating either the semester or credit attr. based on the mode
        if (mode === 1) {
            if (filters.semesters === undefined) {
                setFilters(values => ({...values, ['semesters']: [event.target.innerText]}))
            } else {
                setFilters(values => ({...values, ['semesters']: [...filters.semesters, event.target.innerText]}))
            }
        } else if (mode === 2) {
            if (filters.creditWeight === undefined) {
                setFilters(values => ({...values, ['creditWeight']: [event.target.innerText]}))
            } else {
                setFilters(values => ({...values, ['creditWeight']: [...filters.creditWeight, event.target.innerText]}))
            }
        }
    }

    return (
        <div className="homePage">
            <h1>Home Page</h1>

            {/* <img src={logo} className="App-logo" alt="logo" /> */}

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
                            placeholder='ex: cis*2750, cis*3750'
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
                            placeholder='ex: cis*2750, cis*3750'
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
                </div>
                
            </div>

            <Button onClick = {fetchCourses} variant='contained' color='primary'>
                Fetch Courses
            </Button>
            
            {/* function to display the fetched data in a table */}
            {(() => {
                if (courses.length > 0) {
                    return (
                        <div style={{backgroundColor: 'white', margin: '10px', overflowY: 'scroll', maxHeight: '400px', maxWidth:'73%'}}>
                            
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Course&nbsp;code</TableCell>
                                            <TableCell>Credits</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Description</TableCell>
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
    );
}

export default Home;

