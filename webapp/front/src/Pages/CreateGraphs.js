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

    const graphRef = useRef(null)
    const [graph, setGraphData] = useState(null)
    const [uni, setUni] = useState('guelph')
    const [subjectGraph, setSubjectGraph] = useState({'nodes': [], 'edges': []})
    const [majorGraph, setMajorGraph] = useState(null)
    const [courseInfo, setCourseInfo] = useState(null)
    const [open, setOpen] = useState(false)
    const [openInfo, setOpenInfo] = useState(false)
    const [subject, setSubject] = useState('')

    useEffect(() => {
        //scroll to centre the dialog
        if(subjectGraph !== null && subjectGraph.nodes.length !== 0) {
            const child = graphRef.current.children[0]
            const scrollOptions = {
                left: (child.offsetWidth - graphRef.current.offsetWidth) / 2,
                top: (child.offsetHeight - graphRef.current.offsetHeight) / 2
            }
            graphRef.current.scroll(scrollOptions)
        }
    }, [subjectGraph])

    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseInfo = () => {
        setOpenInfo(false)
    }
    
    const changeUni = (event) => {
        setUni(event.target.value)
    }

    const getSubjectGraph = async(event) => {
        event.preventDefault()
        setOpen(true)
        //setOpenInfo(false)
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

    const myConfig = {
        nodeHighlightBehavior: true,
        highlightDegree: 1,
        highlightOpacity: 0.1,
        initialZoom: 1,
        height: 400,
        width: 800,
        directed: true,
        d3: {
            linkLength: 90,
            gravity: -500,
        },
        node: {
          fontSize: 15,
          size: 200,
          highlightStrokeColor: "blue",
          highlightFontSize: 17,
        },
        link: {
          highlightColor: "black",
          color: 'black'
        },
    };

    const onClickNode = function(nodeId) {
        const obj = {
            'cCode': nodeId,
            'uni': uni
        }

        setOpenInfo(true)

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

    //const onClickLink = function(source, target) {
    //    window.alert(`Clicked link between ${source} and ${target}`);
    //};

    const getMajorGraph = async(event) => {
        event.preventDefault()
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
            
            {/* graph for the subject */}
            {/* <div style={{backgroundColor: 'white'}}>
                {(() => {
                    if (subjectGraph !== null && subjectGraph.nodes.length !== 0 && subjectGraph.links.length !== 0) {
                        return (
                            <Graph
                            id="graph-id-1" // id is mandatory
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
            </div> */}
            {/* <div style={{backgroundColor: 'white', height: '600px', borderRadius: '7px', border: '2px solid #194472'}}>
                
            </div> */}
            
            

            {/* form for the major */}
            <div style={{margin: '10px'}}>
                <form onSubmit={getMajorGraph}>
                    <label>
                        <Typography variant='body1'>Major Name</Typography>
                        <input
                            id='majorField'
                            className='input_field'
                            type='text'
                            //name='major'
                            placeholder='CS'
                        />
                    </label>
                    <br></br>
                    <Button type='submit' variant='contained' color='primary' style={{margin: '5px'}}>
                        Generate Major Graph
                    </Button>
                </form>
            </div>

            {/* graph for the major */}
            {/* <div style={{backgroundColor: 'white'}}>
                {(() => {
                    if (majorGraph !== null && majorGraph.nodes.length !== 0 && majorGraph.links.length !== 0) {
                        return (
                            <Graph
                            id="graph-id-2" // id is mandatory
                            data={majorGraph}
                            config={myConfig}
                            onClickNode={onClickNode}
                            onClickLink={onClickLink}
                            />
                        )
                        
                    } else {
                        return(<></>)
                    }
                })()}
            </div> */}
            <div style={{backgroundColor: 'white', height: '600px', borderRadius: '7px', border: '2px solid #194472'}}>
                {(() => {
                    //console.log(windowWidth)
                    //console.log(window.innerWidth)
                    if((subjectGraph.nodes !== null && subjectGraph.nodes.length !== 0 && subjectGraph.nodes !== undefined) && 
                    (subjectGraph.edges !== null && subjectGraph.edges.length !== 0 && subjectGraph.edges !== undefined)) {
                        return(
                            <TransformWrapper
                                wheel={{step: 1.5}}
                                // options={{
                                //     maxScale: 1,
                                //     limitToBounds: false,
                                // }}
                                initialScale={1}
                            >
                                <TransformComponent>
                                    <Canvas
                                        maxWidth={800}
                                        maxHeight={600}
                                        //zoom={0.2}
                                        nodes={subjectGraph.nodes}
                                        edges={subjectGraph.edges}
                                        node = {(node) => (

                                            <Node
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
            </div>
            
            
            {/* alert for node information */}
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    maxWidth='xl'
                >
                    <DialogTitle id="alert-dialog-title" className='center'>
                    Graph of {subject}
                    </DialogTitle>
                    <DialogContent id='subject-dialog' ref={graphRef}>
                            {/* {(() => {
                                if (courseInfo !== null) {
                                    return(
                                        <div key={courseInfo}>{
                                            Object.entries(courseInfo).map(info => {
                                                return(
                                                    <div key={info[0]}>
                                                        <Typography component={'span'}>{info[0]}:{info[1]}</Typography>
                                                    </div>
                                                )
                                            })
                                        }</div>
                                    )
                                } else {
                                    return(
                                        <Typography component={'span'}>No course information to show</Typography>
                                    )
                                }
                            })()} */}
                            {(() => {
                                if((subjectGraph.nodes !== null && subjectGraph.nodes.length !== 0 && subjectGraph.nodes !== undefined) && 
                                (subjectGraph.edges !== null && subjectGraph.edges.length !== 0 && subjectGraph.edges !== undefined)) {
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
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>

                </Dialog>
            </div>

            <div>
                <Dialog
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
                            if (courseInfo !== null) {
                                return(
                                    <div key={courseInfo}>{
                                        Object.entries(courseInfo).map(info => {
                                            return(
                                                <div key={info[0]}>
                                                    <Typography component={'span'}>{info[0]}:{info[1]}</Typography>
                                                </div>
                                            )
                                        })
                                    }</div>
                                )
                            } else {
                                return(
                                    <Typography component={'span'}>No course information to show</Typography>
                                )
                            }
                        })()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseInfo}>Close</Button>
                    </DialogActions>

                </Dialog>
            </div>


        </div>
    );
}

export default CreateGraphs;
