import React, {useState} from 'react';
import {Button, Collapse, Navbar, NavbarToggler} from 'reactstrap';
import {Link} from "react-router-dom";
import {DASHBOARD, EARNINGS, INBOX, LOGIN, ORDERS, SIGNUP} from "../../routes";
import {useSelector} from "react-redux";
import {getAuthorizedUser} from "../../duck/auth/auth.selector";
import {useLogout} from "../../duck/auth/hooks/useLogout";


const Navigation = () => {
  
  const getUser = useSelector(getAuthorizedUser);
  
  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = () => setIsOpen(!isOpen);
  
  const [logoutState, logoutAction] = useLogout();
  
  
  return (
    <div className="navigation">
      <Navbar color="light" light expand="md">
        <Link className="navbar-brand" to={"/"}>{process.env.REACT_APP_WEBSITE_NAME}</Link>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar className="justify-content-end navbar-nav">
          {getUser === null ? (
            <>
              <Link className="nav-item nav-link" to={LOGIN}>Login</Link>
              <Link className="nav-item nav-link" to={SIGNUP}>Signup</Link>
            </>
          ) : (
            <>
              <Link className="nav-item nav-link" to={DASHBOARD}>Dashboard</Link>
              <Link className="nav-item nav-link" to={INBOX}>Inbox</Link>
              <Link className="nav-item nav-link" to={ORDERS}>Orders</Link>
              <Link className="nav-item nav-link" to={EARNINGS}>Earnings</Link>
              <Link className="nav-item nav-link" to="#">({getUser.displayName})</Link>
              <Button color="danger" onClick={logoutAction} className="ml-3">Logout</Button>
            </>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;