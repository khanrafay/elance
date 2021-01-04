import React, { useState } from 'react';
import './navbar.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
} from 'reactstrap';


const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="navigation">

            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Elance</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className="justify-content-end">
                    <div className="navigation__services">
                        <Button>Post a service request</Button>
                        <Button>Request a VIP service</Button>
                    </div>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;