import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material/';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

function Home() {
    return (
        <div className="home">
            //*MAIN BOX
            <Box sx = {{
                    backgroundColor: '#0a1929',
                    color: 'white',
                    paddingTop: 5,
                    
            }}>
              <Box sx = {{
                    backgroundColor: '#3e4491',
                    color: 'white',
                    borderRadius: 2,
                    p: 2,

              }}>
                <h1>University Course Utility</h1>
                <Divider></Divider>
                
                <Typography>Navigate to pages using the menu bar!</Typography>
              </Box>
            </Box>
        </div>
    );
}

export default Home;
