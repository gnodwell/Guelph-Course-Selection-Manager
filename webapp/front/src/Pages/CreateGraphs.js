import React, { useState, useEffect } from 'react';

import Tree from 'react-d3-tree';
import { Graph } from 'react-d3-graph'



import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



import data1 from '../Data/mockdataset.json';


function CreateGraphs() {

    const [graph, setGraphData] = useState(null)
    const [uni, setUni] = useState('guelph')
    const [subjectGraph, setSubjectGraph] = useState(null)
    const [majorGraph, setMajorGraph] = useState(null)

    

    
    
    const changeUni = (event) => {
        setUni(event.target.value)
    }

    const getSubjectGraph = async(event) => {
        event.preventDefault()
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
        window.alert(`Clicked node ${nodeId}`);
    };

    const onClickLink = function(source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };

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
        <div className="createGraphs">
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
            
            <div style={{backgroundColor: 'white'}}>
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
            </div>

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

            <div style={{backgroundColor: 'white'}}>
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
            </div>
            
            


        </div>
    );
}

export default CreateGraphs;
