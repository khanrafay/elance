import './app.css';
import Login from './containers/login/login';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import {
  CATEGORIES,
  CREATE_CATEGORY,
  DASHBOARD,
  FEATURED,
  HOMEPAGE,
  ORDERS,
  PROFILE, SINGLE_CATEGORY,
  USERS
} from "./routes/frontend.routes";
import {connect} from "react-redux";
import {RootState} from "../duck/_root/root.state";
import {isUserLoggedIn} from "../duck/auth/auth.selector";
import {getBootstrapError, hasBootstrapped} from "../duck/app/app.selector";
import {bootstrap} from "../duck/app/app.action";
import {userLoggedOut} from "../duck/auth/auth.action";
import {bindActionCreators, Dispatch} from 'redux';
import {FunctionComponent, useEffect} from "react";
import {Redirect} from "react-router";
import {QueryString} from "../lib/location/query.string";
import {useLogout} from "../duck/auth/hooks/useLogout";
import {Dashboard} from "./containers/dashboard/dashboard";
import {Orders} from "./containers/dashboard/orders/list";
import {Profile} from "./containers/dashboard/profile/profile";
import {Users} from "./containers/dashboard/users/list";
import {FeaturedItems} from "./containers/dashboard/featured/list";
import {Categories} from "./containers/dashboard/categories/list";
import {CreateCategory} from "./containers/dashboard/categories/create";
import {EDIT_CATEGORY} from "../api/routing/routes/backend.admin";
import {EditCategory} from "./containers/dashboard/categories/edit";

export interface AppProps {
  bootstrap: () => void;
  userLoggedOut: () => void;
  isLoggedIn?: boolean;
  hasBootstrapped?: boolean;
  bootstrapError?: Error;
}


const AppComponent: FunctionComponent<AppProps> = (props) => {
  
  const [logoutState, logoutAction] = useLogout();
  
  useEffect(() => {
    props.bootstrap();
    
    function handleException() {
      logoutAction();
    }
    
    window.addEventListener('unhandledrejection', handleException);
    
    return () => window.removeEventListener('unhandledrejection', handleException);
  }, []);
  
  const {isLoggedIn, hasBootstrapped, bootstrapError} = props;
  
  if (!!bootstrapError) {
    return <div>An error occurred while initializing application</div>;
  }
  
  if (!hasBootstrapped) {
    return null;
  }
  
  return (
    <Router>
      <Switch>
        <Route path={HOMEPAGE} exact render={(props) => {
          let queryString = QueryString.parse(props.location.search);
          let ref = queryString.ref as any;
          return (
            isLoggedIn ? (
              <Redirect to={ref || DASHBOARD} />
            ) : (
              <Login />
            )
          );
        }} />
        <Route path={DASHBOARD + '*'} exact render={({match}) => (
          <>
            {isLoggedIn ? (
              <>
                <Route path={DASHBOARD} exact render={() => <Dashboard/>} />
                
                <Route path={ORDERS} exact render={() => <Orders/>} />
  
                <Route path={USERS} exact render={() => <Users/>} />
                
                <Route path={CATEGORIES} exact render={() => <Categories/>} />
                <Route path={CREATE_CATEGORY} exact render={() => <CreateCategory/>} />
                <Route path={SINGLE_CATEGORY} exact render={(props) => <EditCategory {...props} />} />
  
                <Route path={FEATURED} exact render={() => <FeaturedItems/>} />
  
                <Route path={PROFILE} exact render={() => <Profile/>} />
                
              </>
            ) : (
              <Redirect to={HOMEPAGE + '?ref=' + match.url} />
            )}
          </>
        )} />
      </Switch>
    </Router>
  );
};

export const App = connect(
  (state: RootState) => ({
    isLoggedIn     : isUserLoggedIn(state),
    hasBootstrapped: hasBootstrapped(state),
    bootstrapError : getBootstrapError(state),
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