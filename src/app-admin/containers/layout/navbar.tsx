import React, {useState} from 'react';
import {Button, Collapse, Navbar, NavbarToggler} from 'reactstrap';
import {Link} from "react-router-dom";
import {
  CATEGORIES,
  DASHBOARD, FEATURED,
  HOMEPAGE,
  ORDERS,
  PROFILE, USERS
} from "../../routes/frontend.routes";
import {useSelector} from "react-redux";
import {getAuthorizedUser} from "../../../duck/auth/auth.selector";
import {useLogout} from "../../../duck/auth/hooks/useLogout";
import {useLocation} from "react-router";
import {Image} from "../../../app-common/components/image/image";


const Navigation = () => {
  
  const getUser = useSelector(getAuthorizedUser);
  
  const location = useLocation();
  
  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = () => setIsOpen(!isOpen);
  
  const [logoutState, logoutAction] = useLogout();
  
  
  return (
    <div className="navigation">
      <Navbar color="light" light expand="md">
        <Link className="navbar-brand" to={"/"}>{process.env.REACT_APP_WEBSITE_NAME}</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-end navbar-nav">
          {getUser === null ? (
            <>
              <Link className={`nav-item nav-link${location.pathname === HOMEPAGE ? ' active' : ''}`} to={HOMEPAGE}>Login</Link>
            </>
          ) : (
            <>
              <Link className={`nav-item nav-link${location.pathname === DASHBOARD ? ' active' : ''}`} to={DASHBOARD}>Dashboard</Link>
              <Link className={`nav-item nav-link${location.pathname === CATEGORIES ? ' active' : ''}`} to={CATEGORIES}>Categories</Link>
              <Link className={`nav-item nav-link${location.pathname === FEATURED ? ' active' : ''}`} to={FEATURED}>Featured</Link>
              <Link className={`nav-item nav-link${location.pathname === USERS ? ' active' : ''}`} to={USERS}>Users</Link>
              <Link className={`nav-item nav-link${location.pathname === ORDERS ? ' active' : ''}`} to={ORDERS}>Orders</Link>
              <Link className={`nav-item nav-link${location.pathname === PROFILE ? ' active' : ''}`} to={PROFILE}>
                (<Image h={20} w={20} image={getUser.profilePicture} circle /> {getUser.displayName})
              </Link>
              <Button color="danger" type="button" onClick={logoutAction} className="ml-3">Logout</Button>
            </>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;