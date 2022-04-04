import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Tree from 'react-d3-tree';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Canvas } from 'reaflow';
import { Node } from 'reaflow';
import { Edge } from 'reaflow';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Divider } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { TextField } from '@mui/material';

function CreateGraphs() {

    const subjectGraphRef = useRef(null)
    const majorGraphRef = useRef(null)
    const courseGraphRef = useRef(null)
    const [uni, setUni] = useState('guelph')
    const [courseGraph, setCourseGraph] = useState({'name': '', 'children': []})
    const [subjectGraph, setSubjectGraph] = useState({'nodes': [], 'edges': []})
    const [majorGraph, setMajorGraph] = useState({'nodes': [], 'edges': []})
    const [courseInfo, setCourseInfo] = useState(null)
    const [openCourse, setOpenCourse] = useState(false)
    const [openSubject, setOpenSubject] = useState(false)
    const [openMajor, setOpenMajor] = useState(false)
    const [openInfo, setOpenInfo] = useState(false)
    const [course, setCourse] = useState('')
    const [subject, setSubject] = useState('')
    const [major, setMajor] = useState('')
    const [currNodeId, setCurrNodeId] = useState('')

    const [courseValue, setValueCourse] = useState('')
    const [subjectValue, setValueSubject] = useState('')
    const [majorValue, setValueMajor] = useState('')


    useEffect(() => {
        //scroll to centre the dialog

        if(subjectGraph !== null && subjectGraph.nodes.length !== 0 && openSubject) {
            const child = subjectGraphRef.current.children[0]
            const scrollOptions = {
                left: (child.offsetWidth - subjectGraphRef.current.offsetWidth) / 2,
                top: (child.offsetHeight - subjectGraphRef.current.offsetHeight) / 2
            }
            subjectGraphRef.current.scroll(scrollOptions)
        } else if(majorGraph !== null && majorGraph.nodes.length !== 0 && openMajor) {
            const child = majorGraphRef.current.children[0]
            const scrollOptions = {
                left: (child.offsetWidth - majorGraphRef.current.offsetWidth) / 2,
                top: (child.offsetHeight - majorGraphRef.current.offsetHeight) / 2
            }
            majorGraphRef.current.scroll(scrollOptions)
        }
    }, [subjectGraph, majorGraph])


    const handleCourseGraphChange = (event) => {
        setValueCourse(event.target.value);
    }

    const handleSubjectGraphChange = (event) => {
        setValueSubject(event.target.value);
    }

    const handleMajorGraphChange = (event) => {
        setValueMajor(event.target.value);
    }

    const handleCourseClose = () => {
        setOpenCourse(false)
    }

    const handleMajorClose = () => {
        setOpenMajor(false)
    }

    const handleSubjectClose = () => {
        setOpenSubject(false)
    }

    const handleCloseInfo = () => {
        setOpenInfo(false)
    }
    
    const changeUni = (event) => {
        console.log(event.target.value)
        setUni(event.target.value)
    }

    const getCourseGraph = async(event) => {
        console.log(courseValue)
        event.preventDefault()
        setOpenCourse(true)

        const obj = {
            'course': courseValue
        }

        fetch('https://131.104.49.104/api/createCourseGraph', {
        method: 'POST',
        body: JSON.stringify(obj),
        referrerPolicy: "unsafe-url",
        headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(foundData => {setCourseGraph(foundData)})
        .catch(error => console.log(error))

        setCourse(courseValue)
    }

    const getSubjectGraph = async(event) => {
        
        event.preventDefault()
        setOpenSubject(true)
        const obj = {
            'subject': subjectValue,
            'uni': uni
        }

        setSubjectGraph({'nodes': [], 'edges': []})

        fetch('https://131.104.49.104/api/createSubjectGraph', {
        method: 'POST',
        body: JSON.stringify(obj),
        referrerPolicy: "unsafe-url",
        headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(foundData => {setSubjectGraph(foundData)})
        .catch(error => console.log(error))

        setSubject(subjectValue)
    }

    const getMajorGraph = async(event) => {
        event.preventDefault()
        setOpenMajor(true)
        const obj = {
            'major': majorValue
        }
        
        setMajorGraph({'nodes': [], 'edges': []})

        fetch('https://131.104.49.104/api/createMajorGraph', {
            method: 'POST',
            body: JSON.stringify(obj),
            referrerPolicy: 'unsafe-url',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()
        .then(foundData => {setMajorGraph(foundData)}))
        .catch(error => console.log(error))

        setMajor(majorValue)
    }

    const onClickNode = function(nodeId) {
        
        let obj = {}
        if(openSubject){
            obj = {
                'cCode': nodeId,
                'uni': uni
            }
        } else {
            obj = {
                'cCode': nodeId,
                'uni': 'guelph'
            }
        }

        setOpenInfo(true)
        setCurrNodeId(nodeId)

        fetch('https://131.104.49.104/api/getCourseInfo', {
            method: 'POST',
            body: JSON.stringify(obj),
            referrerPolicy: 'unsafe-url',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(foundData => {setCourseInfo(foundData)})
        .catch(error => console.log(error))
    };

    const dropCourse = () => {
        if (openSubject) {
            
            const obj = {
                'graph': subjectGraph,
                'course': currNodeId
            }

            setSubjectGraph({'nodes': [], 'edges': []})

            fetch("https://131.104.49.104/api/dropCourseGraph", {
                method: 'POST',
                body: JSON.stringify(obj),
                referrerPolicy: 'unsafe-url',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(foundData => setSubjectGraph(foundData))
            .catch(error => console.log(error))
            
        } else if (openMajor) {

            const obj = {
                'graph': majorGraph,
                'course': currNodeId
            }

            setMajorGraph({'nodes': [], 'edges': []})

            fetch("https://131.104.49.104/api/dropCourseGraph", {
                method: 'POST',
                body: JSON.stringify(obj),
                referrerPolicy: 'unsafe-url',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(foundData => setMajorGraph(foundData))
            .catch(error => console.log(error))

        }
        
        setOpenInfo(false)
        
    }

    return (
        <div id="create-graphs">

            <Box sx = {{
                    backgroundColor: '#D5E7F2',
                    color: 'black',
                    borderRadius: 3,
                    p: 2,
                    
            }}>
                <h2>📈 Create Graphs</h2>
                <Divider></Divider>

                {/* Dialog displaying course graph*/}
                {(() => {
                    //function to create the tree graph
                    return(
                        <div>
                            <Dialog
                                keepMounted
                                open={openCourse}
                                onClose={handleCourseClose}
                                aria-labelledby="course-alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                fullWidth={true}
                                maxWidth='xl'
                            >
                                <DialogTitle id="course-alert-dialog-title" className='center'>
                                    {(() => {
                                        if (courseGraph.name !== '') {
                                            return(
                                                'Graph of ' + course
                                            )
                                        } else {
                                            return(
                                                'No graph to display'
                                            )
                                        }
                                    })()}
                                </DialogTitle>
                                <DialogContent id='course-dialog' ref={courseGraphRef} style={{height: '600px'}}>
                                        {(() => {
                                            if (courseGraph.name !== '') {
                                                return (
                                                    <Tree
                                                        data={courseGraph}
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
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCourseClose} variant='outlined'>Close</Button>
                                </DialogActions>

                            </Dialog>
                        </div>
                    )
                })()}

                {/* UNIVERSITY SELECT MENU */}
                <Box sx = {{
                    backgroundColor: '#D5E7F2', color: 'black', borderRadius: '3%',
                    p: 1,
                }}>
                        <FormControl fullWidth size='small' margin='dense'>
                            <InputLabel id="university-select-label">University</InputLabel>
                            <Select
                                value = {uni}
                                labelId='university-select-label'
                                id='dept-menu2'
                                label="University" 
                                onChange={changeUni}
                            >   
                                <MenuItem value="guelph">University of Guelph</MenuItem>
                                <MenuItem value="waterloo">University of Waterloo</MenuItem>
                            </Select>
                        </FormControl>
                </Box>
                <Divider></Divider>
                
                {/* COURSE Graph TextField */}
                <Box sx = {{paddingLeft: 1, paddingTop: 1}}>
                    <label className='flex_item_sm'>
                            <Typography variant='body1'>Course Code</Typography>
                            <TextField
                                value={courseValue == null ? '' : courseValue}
                                onChange={handleCourseGraphChange}
                                id='courseGraphField'
                                className='input_field'
                                type='text'
                                placeholder='EX: CIS*3760'
                            />
                    </label>
                </Box>
                <Box sx = {{paddingLeft: 1, paddingTop: 0, paddingBottom: 1}}>
                    {/* Button for creating subject graph */}
                    <Button onClick={getCourseGraph} variant='outlined' color='primary' style={{margin: '5px'}}>
                        Generate Course Graph
                    </Button>
                </Box>

                <Divider></Divider>

                {/* SUBJECT Graph TextField */}
                <Box sx = {{paddingLeft: 1, paddingTop: 1}}>
                    <label className='flex_item_sm'>
                            <Typography variant='body1'>Subject Name</Typography>
                            <TextField
                                value={subjectValue == null ? '' : subjectValue}
                                onChange={handleSubjectGraphChange}
                                id='subjectGraphField'
                                className='input_field'
                                type='text'
                                placeholder='EX: CIS'
                            />
                    </label>
                </Box>
                <Box sx = {{paddingLeft: 1, paddingTop: 0, paddingBottom: 1}}>
                    {/* Button for creating subject graph */}
                    <Button onClick={getSubjectGraph} variant='outlined' color='primary' style={{margin: '5px'}}>
                        Generate Subject Graph
                    </Button>
                </Box>

                <Divider></Divider>
                
                {/* MAJOR Graph TextField */}
                <Box sx = {{paddingLeft: 1, paddingTop: 1}}>
                    <label className='flex_item_sm'>
                            <Typography variant='body1'>Major Name</Typography>
                            <TextField
                                value={majorValue == null ? '' : majorValue}
                                onChange={handleMajorGraphChange}
                                id='majorGraphField'
                                className='input_field'
                                type='text'
                                placeholder='EX: CS'
                            />
                    </label>
                </Box>
                <Box sx = {{paddingLeft: 1, paddingTop: 0, paddingBottom: 1}}>
                    {/* Button for creating subject graph */}
                    <Button onClick={getMajorGraph} variant='outlined' color='primary' style={{margin: '5px'}}>
                        Generate Major Graph
                    </Button>
                </Box>

                {/* Dialog for displaying subject graph */}
                {(() => {
                        return(
                            <div>
                                <Dialog
                                    keepMounted
                                    open={openSubject}
                                    onClose={handleSubjectClose}
                                    aria-labelledby="subject-alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    fullWidth={true}
                                    maxWidth='xl'
                                >
                                    <DialogTitle id="subject-alert-dialog-title" className='center'>
                                        {(() => {
                                            if (subjectGraph.nodes.length !== 0) {
                                                return(
                                                    'Graph of ' + subject
                                                )
                                            } else {
                                                return(
                                                    'No graph to display'
                                                )
                                            }
                                        })()}
                                    </DialogTitle>
                                    <DialogContent id='subject-dialog' ref={subjectGraphRef}>
                                            {(() => {
                                                if((subjectGraph.nodes !== null && subjectGraph.nodes.length !== 0 && subjectGraph.nodes !== undefined)) {
                                                    return(
                                                        <TransformWrapper
                                                            wheel={{step: 0.2}}
                                                            centerOnInit={true}
                                                        >
                                                            <TransformComponent>
                                                                <Canvas
                                                                    zoom={0.2}
                                                                    nodes={subjectGraph.nodes}
                                                                    edges={subjectGraph.edges}
                                                                    node = {(node) => (
                                                                        <Node
                                                                            onClick={() => {onClickNode(node.properties.id)}}
                                                                            style = {{fill: node.properties.color}}
                                                                        />
                                                                    )}
                                                                    edge = {(edge) => (
                                                                        <Edge
                                                                            style = {{stroke: edge.properties.color}}
                                                                        />
                                                                    )}
                                                                />
                                                            </TransformComponent>
                                                        </TransformWrapper>
                                                    )
                                                }
                                            })()}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleSubjectClose}>Close</Button>
                                    </DialogActions>

                                </Dialog>
                            </div>
                        )
                })()}

                {/* Dialog for displaying major graph */}
                {(() => {
                    return(
                        <div>
                            <Dialog
                                keepMounted
                                open={openMajor}
                                onClose={handleMajorClose}
                                aria-labelledby="major-alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                fullWidth={true}
                                maxWidth='xl'
                            >
                                <DialogTitle id="major-alert-dialog-title" className='center'>
                                    {(() => {
                                        if (majorGraph.nodes.length !== 0) {
                                            return(
                                                'Graph of ' + major
                                            )
                                        } else {
                                            return(
                                                'No graph to display'
                                            )
                                        }
                                    })()}
                                </DialogTitle>
                                <DialogContent id='major-dialog' ref={majorGraphRef}>
                                        {(() => {
                                            if((majorGraph.nodes !== null && majorGraph.nodes.length !== 0 && majorGraph.nodes !== undefined)) {
                                                return(
                                                    <TransformWrapper
                                                        wheel={{step: 0.2}}
                                                        centerOnInit={true}
                                                    >
                                                        <TransformComponent>
                                                            <Canvas
                                                                zoom={0.2}
                                                                nodes={majorGraph.nodes}
                                                                edges={majorGraph.edges}
                                                                node = {(node) => (
                                                                    <Node
                                                                        onClick={() => onClickNode(node.properties.id)}
                                                                        style = {{fill: node.properties.color}}
                                                                    />
                                                                )}
                                                                edge = {(edge) => (
                                                                    <Edge
                                                                        style = {{stroke: edge.properties.color}}
                                                                    />
                                                                )}
                                                            />
                                                        </TransformComponent>
                                                    </TransformWrapper>
                                                    
                                                )
                                            }
                                        })()}
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleMajorClose}>Close</Button>
                                </DialogActions>

                            </Dialog>
                        </div>
                    )
                })()}

                {/* Dialog for displaying course information */}
                {(() => {
                    return (
                        <div>
                            <Dialog
                                keepMounted
                                open={openInfo}
                                onClose={handleCloseInfo}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                fullWidth={true}
                                maxWidth='md'
                            >
                                <DialogTitle className='center'>
                                Course Information
                                </DialogTitle>
                                <DialogContent>
                                    {(() => {
                                        if (courseInfo !== null && Object.keys(courseInfo).length !== 0) {
                                            return(
                                                <div key={courseInfo}>{
                                                    Object.entries(courseInfo).map(info => {
                                                        if (info[1] === null) {
                                                            return(<div key={info[0]}></div>);
                                                        }
                                                        else if (info[0] === 'cCode') {
                                                            return(
                                                                <div key={info[0]}>
                                                                    <Typography component={'span'}>
                                                                        {'Course Code'}: {info[1]}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        }
                                                        else if (info[0] === 'creditWeight') {
                                                            return(
                                                                <div key={info[0]}>
                                                                    <Typography component={'span'}>
                                                                        {'Credit Weight'}: {info[1]}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        }
                                                        else if (info[0] === 'department') {
                                                            return(
                                                                <div key={info[0]}>
                                                                    <Typography component={'span'}>
                                                                        {'Department'}: {info[1]}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        }
                                                        else if (info[0] === 'description') {
                                                            return(
                                                                <div key={info[0]}>
                                                                    <Typography component={'span'}>
                                                                        {'Description'}: {info[1]}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        }
                                                        else if (info[0] === 'lec') {
                                                            return(
                                                                <div key={info[0]}>
                                                                    <Typography component={'span'}>
                                                                        {'Lectures'}: {info[1]}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        }
                                                        else if (info[0] === 'location') {
                                                            return(
                                                                <div key={info[0]}>
                                                                    <Typography component={'span'}>
                                                                        {'Location'}: {info[1]}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        }
                                                        else if (info[0] === 'name') {
                                                            return(
                                                                <div key={info[0]}>
                                                                    <Typography component={'span'}>
                                                                        {'Course Name'}: {info[1]}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        }
                                                        else if (info[0] === 'prereqs') {
                                                            return(
                                                                <div key={info[0]}>
                                                                    <Typography component={'span'}>
                                                                        {'Prerequisites'}: {info[1]}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        }
                                                        else if (info[0] === 'semesters') {
                                                            return(
                                                                <div key={info[0]}>
                                                                    <Typography component={'span'}>
                                                                        {'Semesters Offered'}: {info[1]}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        }
                                                        else 
                                                        {
                                                            return(
                                                                <div key={info[0]}>
                                                                    <Typography component={'span'}>
                                                                        {info[0]}:{info[1]}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        }
                                                        
                                                    })
                                                }</div>
                                            )
                                        } else {
                                            return(
                                                <div style={{textAlign: 'center'}}>
                                                    <Typography component={'span'}>No course information to display</Typography>
                                                </div>
                                            )
                                        }
                                    })()}
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={dropCourse}>Drop Course</Button>
                                    <Button onClick={handleCloseInfo}>Close</Button>
                                </DialogActions>

                            </Dialog>
                        </div>
                    )
                })()}

            </Box>

            
           
            

        </div>
    );
}

export default CreateGraphs;
