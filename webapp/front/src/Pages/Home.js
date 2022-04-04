import React, { useState, useEffect, Component } from 'react';
import { Typography } from '@mui/material/';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import termsFrPath from '../Data/README.md';

const markdown = `Just a link: https://reactjs.com.`



// function Home() {

//     return (
//         <div className="home">
//             //*MAIN BOX
//             <Box sx = {{
//                     backgroundColor: '#0a1929',
//                     color: 'white',
//                     paddingTop: 5,
//             }}>
//               <Box sx = {{
//                     backgroundColor: '#3e4491',
//                     color: 'white',
//                     borderRadius: 2,
//                     p: 2,
//               }}>
//                 <h1>University Course Utility</h1>
//                 <Divider></Divider>
//                 <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
                
//                 <Typography>Navigate to pages using the menu bar!</Typography>
//               </Box>
//             </Box>
//         </div>
//     );
// }

class Home extends Component {

  constructor(props) {
    super(props)

    this.state = { terms: null }
  }

  componentWillMount() {
    fetch(termsFrPath).then((response) => response.text()).then((text) => {
      this.setState({ terms: text })
    })
  }

  render() {
    return (
 
      <div className="home">
            {/* //*MAIN BOX */}
            <Box sx = {{
                    backgroundColor: '#0a1929',
                    color: 'white',
                    paddingTop: 5,
            }}>
              <Box sx = {{
                    backgroundColor: '#D5E7F2',
                    color: 'black',
                    borderRadius: 2,
                    p: 2,
              }}>
                {/* <h1>University Course Utility</h1> */}
                {/* <Divider></Divider> */}
                {/* <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} /> */}
                <ReactMarkdown children={this.state.terms} remarkPlugins={[remarkGfm]}/>
                
                <Typography>Navigate to pages using the menu bar!</Typography>
              </Box>
            </Box>
      </div> 
    )
  }
}

export default Home;
