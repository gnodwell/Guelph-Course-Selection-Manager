import Button from '@material-ui/core/Button'
import logo from '../logo.svg';




function home() {
    return (
        <div className="homePage">
            <h2>Home Page</h2>

            <img src={logo} className="App-logo" alt="logo" />

            <Button onClick = {fetchCourses} variant='contained' color='primary'>
            Fetch Courses
            </Button>

            
        
        </div>
    );
}

export default home;

