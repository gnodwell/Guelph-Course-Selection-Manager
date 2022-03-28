
import React, { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ArrowDropDown, Close } from '@mui/icons-material/';
import Zoom from '@mui/material/Zoom';
import { Menu, MenuItem, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material/';









function CourseSearch() {

    const [courses, setCourses] = useState([])
    const [filters, setFilters] = useState({})
    const [anchorElSem, setAnchorElSem] = useState(null)
    const [anchorElCr, setAnchorElCr] = useState(null)
    const [anchorElLv, setAnchorElLv] = useState(null)
    const [anchorElDept, setAnchorElDept] = useState(null)
    const [depts, setDepts] = useState([])

    
    // useEffect(() => {async function getDepartments () {
    //     await
    //     fetch('http://127.0.0.1:5000/api/getDepartments', {
    //         method: 'GET',
    //         referrerPolicy: 'unsafe-url'
    //     })
    //     .then(res => res.json())
    //     .then(foundData => setDepts(foundData))
    //     .catch(error => console.log(error))
    // }
    // getDepartments()
    // }, [])
    useEffect(() => {async function getDepartments () {
        try {
            await
            fetch('https://131.104.49.104/api/getDepartments', {
                method: 'GET',
             referrerPolicy: 'unsafe-url'
            })
            .then(res => res.json())
            .then(foundData => setDepts(foundData))
            .catch(error => console.log(error))
        }
        catch (e) {
            console.log(e)
        }
    }
    getDepartments()
        
    }, [])

    

    const fetchCourses = async(event) => {
        event.preventDefault()
        
        //splitting the coreqs and prereqs
        const prereqs = event.target.elements.prereqField.value===''?[]:event.target.elements.prereqField.value.split(',')
        const coreqs = event.target.elements.coreqField.value===''?[]:event.target.elements.coreqField.value.split(',')
    
        const obj = {
            'cCode': event.target.elements.courseCodeField.value,
            'coreqs': coreqs,
            'creditWeight': filters.creditWeight?filters.creditWeight: '',
            'department': filters.department?filters.department: '',
            'name': event.target.elements.courseNameField.value,
            'prereqs': prereqs,
            'semesters': filters.semesters?filters.semesters: '',
            'level': filters.level?filters.level: ''
        }
    
        setFilters(obj)
        
        //if server is taking a long time to fetch then run the api locally
        fetch('https://131.104.49.104/api', {
            method: 'POST',
            body: JSON.stringify(obj),
            referrerPolicy: "unsafe-url",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(foundData => setCourses(foundData))
        .catch(error => console.log(error))
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

//   const handleChange = (event) => {
//       const name = event.target.name
//       const value = event.target.value

//       //allows user to enter multiple courses separated by commas
//       if (value !== "" && value !== null) {
//           if (name === 'prereqs' || name === 'coreqs') {
//               const vals = value.split(",")
//               setFilters(values => ({...values, [name]: vals}))
//           } else {
//               setFilters(values => ({...values, [name]: value}))
//           }
//       }
      
//   }


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

    const removeFilter = (event)  => {
        const arr = event.currentTarget.id.split(":")
  
        const tempObj = filters
        const tempFilters = tempObj[arr[0]]
  
        if (Array.isArray(tempFilters)) {
            if (tempFilters.length > 0) {
              if(tempFilters.includes(arr[1])){
                  var newFilters = tempFilters.filter((f) => {return f !== arr[1]})
              }
              setFilters(values => ({...values, [arr[0]]: newFilters}))
            } else {
              setFilters(values => ({...values, [arr[0]]: null}))
            }
        } else {
            setFilters(values => ({...values, [arr[0]]: null}))
        }
    }

    function checkIfInArray (array, item) {
        for(let i = 0; i < array.length; i++) {
            if (array[i] === item) {
                return(1)
            }
        }
        return(0)
    }

    return (
        <div className="courseSearch">
              <h1>Course Search</h1>

            <Typography variant='h5'>Select the filters you would like to apply for course search</Typography>

            <br></br>

            <div  style={{margin: '5px'}}>
                {/* form to send set filters and fetch courses */}
                <form className='flex_div' onSubmit={fetchCourses}>
                    <label className='flex_item_md'>
                        <Typography variant='body1'>Course Name</Typography>
                        <input
                            id='courseNameField'
                            className='input_field'
                            type='text'
                            name="name"
                            placeholder='ex: Software Engineering'
                        />
                    </label>

                    <label className='flex_item_sm'>
                        <Typography variant='body1'>Course Code</Typography>
                        <input
                            id='courseCodeField'
                            className='input_field'
                            type='text'
                            name="cCode"
                            placeholder='ex: CIS*3760'
                        />
                    </label>
                    
                    <label className='flex_item_sm'>
                        <Typography variant='body1'>Course Pre-requisites</Typography>
                        <input
                            id='prereqField'
                            className='input_field'
                            type='text'
                            name="prereqs"
                            placeholder='ex: CIS*2750, CIS*3750'
                        />
                    </label>
                    
                    <label className='flex_item_sm'>
                        <Typography variant='body1'>Course Co-requisites</Typography>
                        <input
                            id='coreqField'
                            className='input_field'
                            type='text'
                            name="coreqs"
                            placeholder='ex: CIS*2750, CIS*3750'
                        />
                    </label>

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
                        
                        <br></br>

                        <Button type='submit' variant='contained' color='primary'>
                            Search Courses
                        </Button>
                    </div>

                </form>
                
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
                                            if (filter[1].length > 0) {
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
                                                return(
                                                    <div key={filter[1]}>{
                                                        <Button key={filter[1]} style={{color: 'white', fontSize: '18px', margin: '5px'}} color='info' variant='contained'>
                                                            {filter[0]}:{filter[1][0]}
                                                            <Close id={filter[0]+':'+filter[1]} onClick={removeFilter}/>
                                                        </Button>
                                                    }</div>
                                                )
                                            }
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
    );
}

export default CourseSearch;
