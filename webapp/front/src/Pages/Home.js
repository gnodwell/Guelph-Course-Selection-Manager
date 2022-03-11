import Button from '@material-ui/core/Button'
import logo from '../logo.svg';




function home() {
    return (
        <div className="homePage">
            <h2>Home Page</h2>

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
        
        </div>
    );
}

export default home;

