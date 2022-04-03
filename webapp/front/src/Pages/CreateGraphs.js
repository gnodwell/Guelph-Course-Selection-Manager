import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import data1 from '../Data/mockdataset.json';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Canvas } from 'reaflow';
import { Node } from 'reaflow';
import { Edge } from 'reaflow';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function CreateGraphs() {

    const subjectGraphRef = useRef(null)
    const majorGraphRef = useRef(null)
    const [graph, setGraphData] = useState(null)
    const [uni, setUni] = useState('guelph')
    const [subjectGraph, setSubjectGraph] = useState({'nodes': [], 'edges': []})
    const [droppedGraph, setDroppedGraph] = useState({'nodes': [], 'edges': []})
    const [majorGraph, setMajorGraph] = useState({'nodes': [], 'edges': []})
    const [courseInfo, setCourseInfo] = useState(null)
    const [openSubject, setOpenSubject] = useState(false)
    const [openMajor, setOpenMajor] = useState(false)
    const [openInfo, setOpenInfo] = useState(false)
    const [openDropped, setOpenDropped] = useState(false)
    const [subject, setSubject] = useState('')
    const [major, setMajor] = useState('')
    //const [nodes, setNodes] = 
    const [currNodeId, setCurrNodeId] = useState('')

    useEffect(() => {
        //scroll to centre the dialog
        //console.log(subjectGraph)
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

    const handleDroppedClose = () => {
        setOpenDropped(false)
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
        setUni(event.target.value)
    }

    const getSubjectGraph = async(event) => {
        
        event.preventDefault()
        setOpenSubject(true)
        const obj = {
            'subject': event.target.elements.subjectField.value,
            'uni': uni
        }
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

        setSubject(event.target.elements.subjectField.value)
    }

    const getMajorGraph = async(event) => {
        event.preventDefault()
        setOpenMajor(true)
        const obj = {
            'major': event.target.elements.majorField.value
        }
    
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

        setMajor(event.target.elements.majorField.value)
    }

    const onClickNode = function(nodeId) {
        console.log(nodeId)
        const obj = {
            'cCode': nodeId,
            'uni': uni
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
                'course': courseInfo.cCode
            }
        }
        
        setOpenInfo(false)
        
    }

    function addGraph() {
        setGraphData(data1)
    }

    function clearGraph() {
        setGraphData(null)
    }

    return (
        <div id="create-graphs">
           <h1>Create Graphs</h1>
            
            <Button onClick = {addGraph} variant='contained' color='primary' style={{margin: '5px'}}>
                Generate Course Graph
            </Button>

            <Button onClick = {clearGraph} variant='contained' color='primary' style={{margin: '5px'}}>
                Clear Course Graph
            </Button>
                    
            <Typography>Graph of CIS*3760</Typography>

            {/*Graph div*/}
            {(() => {
                //function to create the tree graph
                if (graph !== null) {
                    return (
                        <div style={{ width: '30em', height: '20em', backgroundColor: 'white', margin: '5px', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px'}}>
                            <Tree
                                data={graph}
                                pathFunc='step'
                                orientation='vertical'
                                separation={{siblings: 2, nonSiblings: 2 }}
                                collapsible='true'
                                zoom='0.25'
                                translate={{x:450, y:200}}
                            />
                        </div>
                    )
                }
            })()}
            
            <br></br>
            <br></br>

            {/* buttons for selecting the university */}
            <Typography variant='body1'>Select a university</Typography>
                
            <Button id='guelph-button' onClick = {changeUni} variant='contained' color='primary' style={{margin: '5px'}} value='guelph'>
                Guelph
            </Button>

            <Button id='waterloo-button' onClick = {changeUni} variant='contained' color='primary' style={{margin: '5px'}} value='waterloo'>
                Waterloo
            </Button>

            {/* function to tell the user which university is selected */}
            {(() => {
                return(
                    <Typography variant='h5'>Selected University: UNIVERSITY OF {uni.toUpperCase()}</Typography>
                )
            })()}

            {/* form for the subject graph */}
            <div style={{margin: '10px'}}>
                <form onSubmit={getSubjectGraph}>
                    <label>
                        <Typography variant='body1'>Subject Name</Typography>
                        <input
                            id='subjectField'
                            className='input_field'
                            type='text'
                            name='subject'
                            placeholder='CIS'
                        />
                    </label>

                    <br></br>

                    {/* Button for creating subject graph */}
                    <Button type='submit' variant='contained' color='primary' style={{margin: '5px'}}>
                        Generate Subject Graph
                    </Button>
                </form>      
            </div>

            {/* form for the major */}
            <div style={{margin: '10px'}}>
                <form onSubmit={getMajorGraph}>
                    <label>
                        <Typography variant='body1'>Major Name</Typography>
                        <input
                            id='majorField'
                            className='input_field'
                            type='text'
                            placeholder='CS'
                        />
                    </label>
                    <br></br>
                    <Button type='submit' variant='contained' color='primary' style={{margin: '5px'}}>
                        Generate Major Graph
                    </Button>
                </form>
            </div>
            
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

            {/* Dialog for displaying course information */}
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
                            console.log(courseInfo)
                            if (courseInfo !== null && Object.keys(courseInfo).length !== 0) {
                                console.log("here")
                                return(
                                    <div key={courseInfo}>{
                                        Object.entries(courseInfo).map(info => {
                                            if (info[1] == null) {
                                                return;
                                            }
                                            else if (info[0] == 'cCode') {
                                                return(
                                                    <div key={info[0]}>
                                                        <Typography component={'span'}>
                                                            {'Course Code'}: {info[1]}
                                                        </Typography>
                                                    </div>
                                                )
                                            }
                                            else if (info[0] == 'creditWeight') {
                                                return(
                                                    <div key={info[0]}>
                                                        <Typography component={'span'}>
                                                            {'Credit Weight'}: {info[1]}
                                                        </Typography>
                                                    </div>
                                                )
                                            }
                                            else if (info[0] == 'department') {
                                                return(
                                                    <div key={info[0]}>
                                                        <Typography component={'span'}>
                                                            {'Department'}: {info[1]}
                                                        </Typography>
                                                    </div>
                                                )
                                            }
                                            else if (info[0] == 'description') {
                                                return(
                                                    <div key={info[0]}>
                                                        <Typography component={'span'}>
                                                            {'Description'}: {info[1]}
                                                        </Typography>
                                                    </div>
                                                )
                                            }
                                            else if (info[0] == 'lec') {
                                                return(
                                                    <div key={info[0]}>
                                                        <Typography component={'span'}>
                                                            {'Lectures'}: {info[1]}
                                                        </Typography>
                                                    </div>
                                                )
                                            }
                                            else if (info[0] == 'location') {
                                                return(
                                                    <div key={info[0]}>
                                                        <Typography component={'span'}>
                                                            {'Location'}: {info[1]}
                                                        </Typography>
                                                    </div>
                                                )
                                            }
                                            else if (info[0] == 'name') {
                                                return(
                                                    <div key={info[0]}>
                                                        <Typography component={'span'}>
                                                            {'Course Name'}: {info[1]}
                                                        </Typography>
                                                    </div>
                                                )
                                            }
                                            else if (info[0] == 'prereqs') {
                                                return(
                                                    <div key={info[0]}>
                                                        <Typography component={'span'}>
                                                            {'Prerequisites'}: {info[1]}
                                                        </Typography>
                                                    </div>
                                                )
                                            }
                                            else if (info[0] == 'semesters') {
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

        </div>
    );
}

export default CreateGraphs;
