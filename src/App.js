import logo from './logo.svg';
import './App.css';
import Main from './containers/Main/main';
import Login from './containers/Login/login';
import Signup from './containers/Signup/Signup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
