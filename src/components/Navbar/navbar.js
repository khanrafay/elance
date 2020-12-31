import React from 'react';
import './navbar.css';
import { Button } from "reactstrap";

const Navigation = () => {
    return (
        <div className="navigation">
            <div className="navigation__services">
                <Button>Post a service request</Button>
                <Button>Request a VIP service</Button>
            </div>
        </div>
    );
}

export default Navigation;