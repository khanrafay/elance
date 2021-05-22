import logo from './logo.svg';
import './app.css';
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
import {connect} from "react-redux";
import {RootState} from "./duck/_root/root.state";
import {isUserLoggedIn} from "./duck/auth/auth.selector";
import {getBootstrapError, hasBootstrapped} from "./duck/app/app.selector";
import {bootstrap} from "./duck/app/app.action";
import {userLoggedOut} from "./duck/auth/auth.action";
import { bindActionCreators, Dispatch } from 'redux';
import {FunctionComponent, useEffect} from "react";

export interface AppProps {
  bootstrap: () => void;
  userLoggedOut: () => void;
  isLoggedIn?: boolean;
  hasBootstrapped?: boolean;
  bootstrapError?: Error;
}


const AppComponent: FunctionComponent<AppProps> = (props) => {

    useEffect(() => {
        props.bootstrap();
    }, []);

  const { isLoggedIn, hasBootstrapped, bootstrapError } = props;

  if (!!bootstrapError) {
    return <div>An error occurred while initializing application</div>;
  }

  if (!hasBootstrapped) {
    return null;
  }

  return (
    <Router>
      <Switch>
        <Route path={HOMEPAGE} exact render={(props) => <Main />} />
        <Route path={LOGIN} render={(props) => <Login />} />
        <Route path={SIGNUP} render={(props) => <Signup />} />
        <Route path={SEARCH_ROUTE} render={(props) => <Search />} />
        <Route path={SERVICE_ROUTE} render={(props) => <Service {...props} />} />
      </Switch>
    </Router>
  );
};

const App = connect(
    (state: RootState) => ({
      isLoggedIn: isUserLoggedIn(state),
      hasBootstrapped: hasBootstrapped(state),
      bootstrapError: getBootstrapError(state),
    }),
    (dispatch: Dispatch) =>
        bindActionCreators(
            {
              bootstrap: bootstrap,
              userLoggedOut,
            },
            dispatch
        )
)(AppComponent);

export default App;
