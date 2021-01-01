import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Categories from '../Catergories/categories';
import Navigation from '../Navbar/navbar';
import Services from '../Services/services';

const Main = () => {
    return (
        <div>
            <Navigation />
            <Row>
                <Col xs={3}>
                    <Categories />
                </Col>
                <Col xs={9}>
                   <Services/>
                </Col>
            </Row>
        </div>);
}

export default Main;