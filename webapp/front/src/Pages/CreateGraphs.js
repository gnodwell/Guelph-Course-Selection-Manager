import Button from '@mui/material/Button';
import Tree from 'react-d3-tree';
import Typography from '@mui/material/Typography';
//temporarily add the mock data set this way
import data from '../Data/mockdataset.json';
import { useState } from 'react';
// import { useRef } from 'react';

function Graph() {


    //creating a state
    const [graph, setGraphData] = useState(null)
    

    //function to update the graph div
    function addGraph() {
        setGraphData(data)
    }

    //function to clear the graph div
    function clearGraph() {
        setGraphData(null)
    }

    const handleCloseGraph = async(event) => {
        
    }

    return (
        <div className="CreateGraphs">
            <p>Hello From Graphs</p>
            
            <Button onClick = {addGraph} variant='contained' color='primary' style={{margin: '5px'}}>
                Generate Graph
            </Button>

            <Button onClick = {clearGraph} variant='contained' color='primary' style={{margin: '5px'}}>
                Clear Graph
            </Button>

            {/* <Button
                        id='sel-graph-button'
                        style={{color: 'white', margin: '5px'}}
                        variant='contained'
                        color='secondary'
                        onClick={openMenuSem}
                    >
                        Graph Name
                        <ArrowDropDown style={{fill: 'white'}}/>
                    </Button>
                    <Menu
                        id='sel-graph-menu'
                        anchorEl={anchorElSem}
                        open={Boolean(anchorElSem)}
                        onClose={handleCloseGraph}
                        TransitionComponent={Zoom}
                    >
                        <MenuItem onClick={handleCloseGraph}>
                            G1
                        </MenuItem>
                        <MenuItem onClick={handleCloseGraph}>
                            G2
                        </MenuItem>
                        <MenuItem onClick={handleCloseGraph}>
                            G3
                        </MenuItem>
                    </Menu> */}
                    
            <Typography>Graph of CIS*3760</Typography>

            {/*Graph div*/}
            <div style={{ width: '30em', height: '20em', backgroundColor: 'white', margin: '5px'}}>
                {(() => {
                    //function to create the tree graph
                    if (graph != null) {
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
        
        </div>
    );
    
}

export default Graph;