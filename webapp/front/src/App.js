import logo from './logo.svg';
import './App.css';

import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppBar>
          <Toolbar>
            <IconButton>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6'>
              CIS*3760 Team 4
            </Typography>
          </Toolbar>
        </AppBar>
        <img src={logo} className="App-logo" alt="logo" />

        <Button onClick = {()=>alert('Hello World!')} variant='contained' color='primary'>
          Hello World
        </Button>
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        More
        </a>
        <p>sheeesh 🥶🥶</p>
      </header>
    </div>
  );
}

export default App;
