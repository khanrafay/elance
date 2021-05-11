import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Categories from '../categories/categories';
import Navigation from '../navbar/navbar';
import Sellers from '../sellers/sellers';
import Services from '../services/services';
import Layout from "../layout/layout";


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