
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Menu, MenuItem, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material/';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import fetch from 'cross-fetch';


function CourseSearch() {

    const [courses, setCourses] = useState([])
    const [filters, setFilters] = useState({})
    const [nameValue, setValueName] = useState('')
    const [codeValue, setValueCode] = useState('')
    const [prereqValue, setValuePreReq] = useState('')
    const [coreqValue, setValueCoReq] = useState('')
    const [semValue, setValueSem] = useState('')
    const [creditValue, setValueCredit] = useState('')
    const [levelValue, setValueLevel] = useState('')
    const [deptValue, setValueDept] = useState('')

    const [anchorElSem, setAnchorElSem] = useState(null)
    const [anchorElCr, setAnchorElCr] = useState(null)
    const [anchorElLv, setAnchorElLv] = useState(null)
    const [anchorElDept, setAnchorElDept] = useState(null)
    const [depts, setDepts] = useState([])

    useEffect(async () => {
        async function getDepartments () {
            try {
                await
                fetch('https://131.104.49.104/api/getDepartments', {
                    method: 'GET',
                    referrerPolicy: 'unsafe-url',
                })
                .then(res => res.json())
                .then(foundData => setDepts(foundData))
                .catch(error => console.log(error))
            }
            catch (e) {
                console.log(e)
            }
        }
        await getDepartments()
    }, [])

    const fetchCourses = async(event) => {
        event.preventDefault()
        
        //console.log("Search name: ", nameValue);
        //console.log(filters);
        //splitting the coreqs and prereqs
        
        var prereqs = []     
        var coreqs = []

        if(prereqValue !== null && prereqValue !== '') {
            prereqs = prereqValue.split(',');
            
        }
        if(coreqValue !== null && coreqValue !== '') {
            coreqs = coreqValue.split(',');
        }
        
        //console.log("prereqs: ", prereqs);
    
        const obj = {
            'cCode': codeValue,
            'coreqs': coreqs,
            'creditWeight': creditValue,
            'department': deptValue,
            'name': nameValue,
            'prereqs': prereqs,
            'semesters': semValue,
            'level': levelValue
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

    //*COURSE SEARCH HANDLERS
    const handleNameChange = (event) => {
        setValueName(event.target.value);
    }

    const handleCodeChange = (event) => {
        setValueCode(event.target.value);
    }

    const handleCoReqChange = (event) => {
        setValueCoReq(event.target.value);
    }

    const handlePreReqChange = (event) => {
        setValuePreReq(event.target.value);
    }

    const handleSemChange = (event) => {
        //console.log(event.target.value)
        setValueSem(event.target.value);
        //console.log(semValue)
        updateFilters(event, 1);
    }

    const handleCreditChange = (event) => {
        setValueCredit(event.target.value);
        updateFilters(event, 2);
    }

    const handleLevelChange = (event) => {
        setValueLevel(event.target.value);
        updateFilters(event, 3);
    }

    const handleDeptChange = (event) => {
        setValueDept(event.target.value);
        updateFilters(event, 4);
    }

    function updateFilters (event, mode) {
        //updating either the semester, credit or level attr. based on the mode
        var isIn = 0
        if (mode === 1) {
            if (filters.semesters === undefined) {
                //console.log(event.target.value);
                setFilters(values => ({...values, ['semesters']: [event.target.value]}))
            } else {
                //check if filter already exists
                isIn = checkIfInArray(filters.semesters, semValue)
                
                if (isIn === 0) {
                    setFilters(values => ({...values, ['semesters']: [...filters.semesters, semValue]}))
                }
            }
        } else if (mode === 2) {
            if (filters.creditWeight === undefined) {
                setFilters(values => ({...values, ['creditWeight']: [event.target.value]}))
            } else {
                //check if filter already exists
                isIn = checkIfInArray(filters.creditWeight, event.target.value)
  
                if (isIn === 0) {
                    setFilters(values => ({...values, ['creditWeight']: [...filters.creditWeight, creditValue]}))
                }
            }
        } else if (mode === 3) {
            const val = event.target.value
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
            const val = event.target.value
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
        //* 🔍COURSE SEARCH SECTION
        
        <div id="course-search" >
            <Divider variant="middle" />
            <Box sx = {{
                    backgroundColor: '#D5E7F2',
                    color: 'black',
                    borderRadius: 3,
                    p: 2,
                    
            }}>
                <h2>🔍Course Search</h2>
                <Divider variant="middle" />
                <Box sx = {{
                    backgroundColor: '#D5E7F2',
                    color: 'black',
                    borderRadius: 9,
                    p: 1,

                }}>
                    <div style={{margin: '5px'}}>
                        {/* form to send set filters and fetch courses */}
                        <form className='flex_div' onSubmit={fetchCourses}>
                            <label className='flex_item_md'>
                                <Typography variant='body1'>Course Name</Typography>
                                <TextField 
                                    value={nameValue == null ? '' : nameValue}
                                    onChange={handleNameChange}
                                    id='courseNameField'
                                    className='input_field'
                                    type='text'
                                    name="name"
                                    placeholder='ex: Software Engineering'
                                />
                            </label>

                            <label className='flex_item_sm'>
                                <Typography variant='body1'>Course Code</Typography>
                                <TextField
                                    value={codeValue == null ? '' : codeValue}
                                    onChange={handleCodeChange}
                                    id='courseCodeField'
                                    className='input_field'
                                    type='text'
                                    name="cCode"
                                    placeholder='ex: CIS*3760'
                                />
                            </label>
                            
                            <label className='flex_item_sm'>
                                <Typography variant='body1'>Course Pre-requisites</Typography>
                                <TextField
                                    value={prereqValue || ''}
                                    onChange={handlePreReqChange}

                                    id='prereqField'
                                    className='input_field'
                                    type='text'
                                    name="prereqs"
                                    placeholder='ex: CIS*2750, CIS*3750'
                                />
                            </label>
                            
                            <label className='flex_item_sm'>
                                <Typography variant='body1'>Course Co-requisites</Typography>
                                <TextField
                                    value={coreqValue == null ? '' : coreqValue}
                                    onChange={handleCoReqChange}
                                    id='coreqField'
                                    className='input_field'
                                    type='text'
                                    name="coreqs"
                                    placeholder='ex: CIS*2750, CIS*3750'
                                />
                            </label>

                            {/* div to select the semester and credit filter */}
                            <div>
                                {/* SEMESTER SELECT MENU */}
                                <Box sx = {{
                                    backgroundColor: '#D5E7F2', color: 'black', borderRadius: '3%',
                                    p: 0.7,
                                }}>
                                    <FormControl fullWidth size='small' margin='dense'>
                                        <InputLabel id="semester-select-label">Semester</InputLabel>
                                        <Select
                                            value = {semValue == null ? '' : semValue}
                                            labelId='semester-select-label'
                                            id='dept-menu2'
                                            label="Semester" 
                                            onChange={handleSemChange}
                                        >   
                                            <MenuItem value="">All</MenuItem>
                                            <MenuItem value="Fall">Fall</MenuItem>
                                            <MenuItem value="Summer">Summer</MenuItem>
                                            <MenuItem value="Winter">Winter</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                {/* CREDIT WEIGHT SELECT MENU */}
                                <Box sx = {{
                                    backgroundColor: '#D5E7F2', color: 'black', borderRadius: '3%',
                                    p: 0.7,
                                }}>
                                    <FormControl fullWidth size='small' margin='dense'>
                                        <InputLabel id="credit-select-label">Credit Weight</InputLabel>
                                        <Select
                                            
                                            value = {creditValue == null ? '' : creditValue}
                                            labelId='credit-select-label'
                                            id='dept-menu2'
                                            label="Credit Weight" 
                                            onChange={handleCreditChange}
                                        >   
                                            <MenuItem value="">All</MenuItem>
                                            <MenuItem value='0.25'>0.25</MenuItem>
                                            <MenuItem value='0.50'>0.50</MenuItem>
                                            <MenuItem value='0.75'>0.75</MenuItem>
                                            <MenuItem value='1.00'>1.00</MenuItem>
                                            <MenuItem value='1.25'>1.25</MenuItem>
                                            <MenuItem value='1.50'>1.50</MenuItem>
                                            {/* <MenuItem value={0.25}>0.25</MenuItem>
                                            <MenuItem value={0.50}>0.50</MenuItem>
                                            <MenuItem value={0.75}>0.75</MenuItem>
                                            <MenuItem value={1.00}>1.00</MenuItem>
                                            <MenuItem value={1.25}>1.25</MenuItem>
                                            <MenuItem value={1.50}>1.50</MenuItem> */}

                                        </Select>
                                    </FormControl>
                                </Box>

                                {/* COURSE LEVEL SELECT MENU */}
                                <Box sx = {{
                                    backgroundColor: '#D5E7F2', color: 'black', borderRadius: '3%',
                                    p: 0.7,
                                }}>
                                    <FormControl fullWidth size='small' margin='dense'>
                                        <InputLabel id="level-select-label">Course Level</InputLabel>
                                        <Select

                                            value= {levelValue == null ? '' : levelValue}
                                            labelId='level-select-label'
                                            id='dept-menu2'
                                            label="Course Level" 
                                            onChange={handleLevelChange}
                                        >   
                                            <MenuItem value="">All</MenuItem>
                                            <MenuItem value='1000'>1000</MenuItem>
                                            <MenuItem value='2000'>2000</MenuItem>
                                            <MenuItem value='3000'>3000</MenuItem>
                                            <MenuItem value='4000'>4000</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                {/* DEPARTMENT SELECT MENU */}
                                <Box sx = {{
                                    backgroundColor: '#D5E7F2', color: 'black', borderRadius: '3%',
                                    p: 0.7,
                                }}>
                                    <FormControl fullWidth size='small' margin='dense'>
                                        <InputLabel id="dept-select-label">Department</InputLabel>
                                        <Select
                                            value= {deptValue == null ? '' : deptValue}
                                            labelId='dept-select-label'
                                            id='dept-menu2'
                                            label="Department" 
                                            onChange={handleDeptChange}
                                        >   
                                            <MenuItem value="">All</MenuItem>
                                            { depts.map(dept => (
                                            <MenuItem key={dept} value={dept == null ? '' : dept}>{dept}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                
                                
                                <br></br>
                                <Box sx = {{
                                    backgroundColor: '#D5E7F2',
                                    color: 'black',
                                    borderRadius: '3%',
                                    p: 0.7,

                                }}>
                                    <Button onClick ={fetchCourses} variant='outlined' color='primary' >
                                    Search Courses
                                    </Button>

                                    

                                    {/* function to display the fetched data in a table */}
                                    {(() => {
                                        if (courses.length > 0) {
                                            return (
                                                <Box sx = {{
                                                    backgroundcolor: '#D5E7F2',
                                                    color: 'black',
                                                    borderRadius: '3%',
                                                    p: 0.7,
                                                    paddingTop: 5
                                                }}>
                                                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                                        <TableContainer sx={{ maxHeight: 800 }} backgroundcolor='#D5E7F2'>
                                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                                    </Paper>
                                                </Box>
                                                
                                            )
                                        } else {
                                            return(
                                                <Box sx = {{
                                                    backgroundcolor: '#D5E7F2',
                                                    color: 'black',
                                                    borderRadius: '3%',
                                                    p: 0.7,
                                                    paddingTop: 5
                                                }}>
                                                    <Typography>No courses found</Typography>
                                                </Box>
                                        
                                            )
                                        }
                                    })()}
                                </Box>                
                                
                            </div>

                        </form>
                        
                    </div>

                </Box>
            </Box>

             {/* function to display currently applied filters
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
            </div> */}

            
        </div>
    );
}

export default CourseSearch;
