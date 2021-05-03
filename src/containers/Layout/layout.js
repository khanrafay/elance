import React from 'react';
import Navigation from "../Navbar/navbar";
import {Container} from "reactstrap";


const Layout = (props) => {
  return (
    <div>
      <Navigation />
      <br />
      <Container>
        {props.children}
      </Container>
    </div>
  );
};

export default Layout;