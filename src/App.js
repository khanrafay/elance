import logo from './logo.svg';
import './App.css';
import Main from './containers/main/main';
import Login from './containers/login/login';
import Signup from './containers/signup/signup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {HOMEPAGE, LOGIN, SEARCH_ROUTE, SERVICE_ROUTE, SIGNUP} from "./routes";
import Search from "./containers/search/search";
import {Service} from "./containers/service/service";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={LOGIN} render={(props) => <Login />} />
        <Route path={SIGNUP} render={(props) => <Signup />} />
        <Route path={SEARCH_ROUTE} render={(props) => <Search />} />
        <Route path={SERVICE_ROUTE} render={(props) => <Service {...props} />} />
        <Route path={HOMEPAGE}>
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
