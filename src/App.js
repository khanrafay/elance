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
import {HOMEPAGE, LOGIN, SEARCH_ROUTE, SIGNUP} from "./routes";
import {Error404} from "./components/Error/404";
import Search from "./containers/Search/search";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={LOGIN}>
          <Login />
        </Route>
        <Route path={SIGNUP}>
          <Signup />
        </Route>
        <Route path={SEARCH_ROUTE}>
          <Search />
        </Route>
        <Route path={HOMEPAGE}>
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
