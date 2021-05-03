import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Categories from '../Catergories/categories';
import Navigation from '../Navbar/navbar';
import Sellers from '../Sellers/sellers';
import Services from '../Services/services';
import Layout from "../Layout/layout";


const Main = () => {
  return (
    <Layout>
      <Row>
        <Col xs={12} lg={3}>
          <Categories />
        </Col>
        <Col xs={12} lg={9}>
          <Services />
          <Sellers />
        </Col>
      </Row>
    </Layout>
  );
};

export default Main;