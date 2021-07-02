import './app.css';
import Main from './containers/main/main';
import Login from './containers/login/login';
import Signup from './containers/signup/signup';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import {
  DASHBOARD,
  EARNINGS,
  HOMEPAGE,
  INBOX,
  LOGIN, ORDER_PAYMENT,
  ORDERS,
  SEARCH_ROUTE,
  SERVICE_ROUTE,
  SIGNUP,
  SINGLE_MESSAGE, SINGLE_ORDER, PROFILE, SERVICES
} from "./routes";
import Search from "./containers/search/search";
import {Service} from "./containers/service/service";
import {connect} from "react-redux";
import {RootState} from "./duck/_root/root.state";
import {isUserLoggedIn} from "./duck/auth/auth.selector";
import {getBootstrapError, hasBootstrapped} from "./duck/app/app.selector";
import {bootstrap} from "./duck/app/app.action";
import {userLoggedOut} from "./duck/auth/auth.action";
import {bindActionCreators, Dispatch} from 'redux';
import {FunctionComponent, useEffect} from "react";
import {Redirect} from "react-router";
import {Dashboard} from "./containers/dashboard/dashboard";
import {Inbox} from "./containers/dashboard/inbox";
import {Orders} from "./containers/dashboard/order/orders";
import {Earnings} from "./containers/dashboard/earnings";
import {QueryString} from "./lib/location/query.string";
import {useLogout} from "./duck/auth/hooks/useLogout";
import {Order} from "./containers/dashboard/order/order";
import {OrderPayment} from "./containers/dashboard/order/payment";
import {Profile} from "./containers/dashboard/profile/profile";
import {ServicesComponent} from "./containers/dashboard/services/services";

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
    function handleException(){
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
        <Route path={HOMEPAGE} exact render={(props) => <Main/>}/>
        <Route path={SEARCH_ROUTE} render={(props) => <Search/>}/>
        <Route path={SERVICE_ROUTE} render={(props) => <Service {...props} />}/>
        <Route path={LOGIN} render={(props) => {
          let queryString = QueryString.parse(props.location.search);
          let ref = queryString.ref as any;
          return (
            isLoggedIn ? (
              <Redirect to={ref || DASHBOARD} />
            ) : (
              <Login/>
            )
          );
        }}/>
        <Route path={SIGNUP} render={(props) => <Signup/>}/>
        {isLoggedIn ? (
          <>
            <Route path={DASHBOARD} exact render={() => <Dashboard/>} />
            <Route path={INBOX} exact render={(routeProps) => <Inbox {...routeProps} />} />
            <Route path={SINGLE_MESSAGE} render={(routeProps) => <Inbox {...routeProps} />} />
            <Route path={ORDERS} exact render={(routeProps) => <Orders {...routeProps}/>} />
            <Route path={ORDER_PAYMENT} exact render={(routeProps) => <OrderPayment {...routeProps}/>} />
            <Route path={SINGLE_ORDER} exact render={(routeProps) => <Order {...routeProps}/>} />
            <Route path={EARNINGS} exact render={() => <Earnings/>} />
            <Route path={PROFILE} exact render={() => <Profile />} />
            <Route path={SERVICES} exact render={() => <ServicesComponent />} />
          </>
        ) : (
          <Redirect to={LOGIN} />
        )}
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
