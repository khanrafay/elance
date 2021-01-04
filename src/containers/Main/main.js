import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Seller from '../../components/Seller/seller';
import Categories from '../Catergories/categories';
import Navigation from '../Navbar/navbar';
import Sellers from '../Sellers/sellers';
import Services from '../Services/services';


const Main = () => {
    return (
        <div>
            <Navigation />
            <br />
            <Container>
                <Row>
                    <Col xs={12} lg={3}>
                        <Categories />
                    </Col>
                    <Col xs={12} lg={9}>
                        <Services />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={9}>
                        <Sellers />
                    </Col>
                </Row>
            </Container>
        </div>);
}

export default Main;