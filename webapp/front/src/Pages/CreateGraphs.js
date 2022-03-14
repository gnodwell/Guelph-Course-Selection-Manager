import Button from '@material-ui/core/Button';
import Tree from 'react-d3-tree';
import Typography from '@material-ui/core/Typography';
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

    return (
        <div className="CreateGraphs">
            <p>Hello From Graphs</p>
            
            <Button onClick = {addGraph} variant='contained' color='primary'>
                Generate Graph
            </Button>

            <Button onClick = {clearGraph} variant='contained' color='primary'>
                Clear Graph
            </Button>

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