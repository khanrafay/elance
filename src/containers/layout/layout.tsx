import React, {FunctionComponent} from 'react';
import Navigation from "../navbar/navbar";
import {Container} from "reactstrap";

export interface Props{
    isLoading?: boolean;
}

const Layout: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <Navigation />
      <br />
      <Container fluid>
        {props.isLoading ? 'Loading...' : props.children}
        <div className="text-center mt-3 py-3">
            {process.env.REACT_APP_WEBSITE_NAME} &copy; all right reserved {new Date().getFullYear()}
        </div>
      </Container>
    </div>
  );
};

export default Layout;