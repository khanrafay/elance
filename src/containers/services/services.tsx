import React, {useEffect, useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Col, Row} from 'reactstrap';
import Service from '../../components/service/service';
import {Service as ServiceModel} from "../../api/model/service";
import {jsonRequest} from "../../api/request/request";
import {FEATURED_SERVICES_LIST} from "../../api/routing/routes/dashboard";
import {Search as SearchBar} from '../../components/search/search';
import {Link} from "react-router-dom";
import {SERVICE_ROUTE} from "../../routes";

const Services = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: {max: 4000, min: 3000},
      items: 5
    },
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 3
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 2
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
      items: 1
    }
  };
  
  const [services, setServices] = useState<ServiceModel[]>([]);
  
  const loadServices = async () => {
    let response, list;
    try {
      response = await jsonRequest(`${FEATURED_SERVICES_LIST}`);
      list = await response.json();
    } catch (exception) {
      console.log(exception);
    }
    
    setServices(list.list);
  };
  
  useEffect(() => {
    loadServices();
  }, []);
  
  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <SearchBar />
        </Col>
      </Row>
      <h3>Featured services</h3>
      <Row>
        <Col>
          <Carousel responsive={responsive}>
            {services.map((service, index) => {
              return (
                <Link to={SERVICE_ROUTE.replace(':id', service.id.toString())} style={{textDecoration: 'none'}}>
                  <Service key={index} service={service} />
                </Link>
              );
            })}
          </Carousel>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Services;