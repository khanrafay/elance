import React, { useState } from 'react';
import './navbar.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Button
} from 'reactstrap';
import {Link} from "react-router-dom";
import {LOGIN, SIGNUP} from "../../routes";


const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="navigation">
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">{process.env.REACT_APP_WEBSITE_NAME}</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className="justify-content-end">
                    <div className="navigation__services">
                        <Link className="btn btn-link" to={LOGIN}>Login</Link>
                        <Link className="btn btn-link" to={SIGNUP}>Signup</Link>
                    </div>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;