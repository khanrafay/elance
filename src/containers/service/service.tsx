import React, {FunctionComponent, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import Layout from "../layout/layout";
import {Service as ServiceModel} from "../../api/model/service";
import {jsonRequest} from "../../api/request/request";
import { GET_SERVICE} from "../../api/routing/routes/dashboard";
import {Button, Card, CardText, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap/es";
import {Image} from "../../components/image/image";
import classnames from 'classnames';
import {Package} from "../../api/model/package";

export interface ServiceProps extends RouteComponentProps<{id: string}>{

}

export const Service: FunctionComponent<ServiceProps> = (props) => {
    const [service, setService] = useState<ServiceModel>();
    const [isLoading, setLoading] = useState(false);

    const [activeTab, setActiveTab] = useState(0);

    const toggle = (tab: number) => {
        if(activeTab !== tab) setActiveTab(tab);
    };

    const loadService = async (id: string) => {
        let response, list;
        setLoading(true);
        try {
            response = await jsonRequest(`${GET_SERVICE.replace(':id', id)}`);
            list = await response.json();
        }catch(exception){
            console.log(exception);
        }finally {
            setLoading(false);
        }

        setService(list.service);
    };

    useEffect(() => {
        loadService(props.match.params.id);
    }, [props.match.params.id]);

    const contactSeller = (sellerId: string) => {
        alert('Contacting seller...');
    };

    const createOrder = (sellerId: string, serviceId: string, packageId: string) => {
        alert('Creating order...');
    };

    return (
        <Layout isLoading={isLoading}>
            <Row>
                {service && (
                    <>
                        <Col md={8}>
                            <h1>{service.title}</h1>
                            <Image image={service.seller.profilePicture} h={36} fit="crop"/> {service?.seller.name}
                            <Row className="mt-3">
                                <Col>
                                    {service.images.length > 0 && (
                                        <Image image={service.images[0]}/>
                                    )}
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <h3>About Service</h3>
                                    <p>
                                        {service.description}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3>About Seller</h3>
                                    <p>
                                        <Row>
                                            <Col className="col-3">
                                                <Image image={service.seller.profilePicture} w={100}/>
                                            </Col>
                                            <Col>
                                                {service?.seller.name}
                                                <br/>
                                                <Button color="primary" onClick={() => {contactSeller(service.seller.id.toString())}}>
                                                    Contact me
                                                </Button>
                                            </Col>
                                        </Row>

                                    </p>
                                    <p>
                                        {service.seller.description}
                                    </p>

                                    <h3>Reviews</h3>
                                    <p className="p-5 text-center bg-dark text-light h5">Nothing yet</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4}>
                            <div style={{position: 'sticky', top: '1rem'}}>
                                <Nav pills fill justify>
                                    {service.packages.map((pack: Package, index) => (
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === index })}
                                                onClick={() => { toggle(index); }}
                                            >
                                                {pack.name}
                                            </NavLink>
                                        </NavItem>
                                    ))}
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    {service.packages.map((pack: Package, index) => (
                                        <TabPane tabId={index} className="mt-5">
                                            <Row>
                                                <Col sm="12">
                                                    <h5 className="mb-5">
                                                        {pack.name}
                                                        <span className="float-right">${pack.price}</span>
                                                    </h5>
                                                    <p>{pack.description}</p>
                                                    <p><i className="fa fa-clock"></i> {pack.duration}</p>
                                                    <ul>
                                                        {pack.itemsIncluded.map(item => (
                                                            <li>{item}</li>
                                                        ))}
                                                    </ul>
                                                    <Button block color="success" onClick={() => createOrder(service.seller.id.toString(), service.id.toString(), pack.id.toString())}>
                                                        Continue (${pack.price})
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    ))}
                                </TabContent>
                            </div>
                        </Col>
                    </>
                )}
            </Row>
        </Layout>
    );
};