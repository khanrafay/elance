import React, {FunctionComponent, useCallback, useEffect, useState} from "react";
import {RouteComponentProps, useHistory} from "react-router";
import Layout from "../layout/layout";
import {Service as ServiceModel} from "../../../api/model/service";
import {jsonRequest} from "../../../api/request/request";
import {CREATE_THREAD, GET_SERVICE} from "../../../api/routing/routes/dashboard";
import {
  Button,
  Col,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap/es";
import {Image} from "../../components/image/image";
import classnames from 'classnames';
import {Package} from "../../../api/model/package";
import {Seller} from "../../../api/model/seller";
import {useForm} from "react-hook-form";
import {ConstraintViolation} from "../../../lib/validator/validation.result";
import {useSelector} from "react-redux";
import {getAuthorizedUser} from "../../../duck/auth/auth.selector";
import {LOGIN, SINGLE_MESSAGE} from "../../routes/frontend.routes";

export interface ServiceProps extends RouteComponentProps<{ id: string }> {

}

export const Service: FunctionComponent<ServiceProps> = (props) => {
  const [service, setService] = useState<ServiceModel>();
  const [isLoading, setLoading] = useState(false);
  const [isSendingMessage, setSendingMessage] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedSeller, setSelectedSeller] = useState<Seller | undefined>();
  const [selectedService, setSelectedService] = useState<ServiceModel | undefined>();
  const [selectedPackage, setSelectedPackage] = useState<Package | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const {register, handleSubmit} = useForm();
  
  const toggleModal = () => setModal(!modal);
  
  const toggleTabs = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  
  const user = useSelector(getAuthorizedUser);
  const history = useHistory();
  
  const loadService = async (id: string) => {
    let response, list;
    setLoading(true);
    try {
      response = await jsonRequest(`${GET_SERVICE.replace(':id', id)}`);
      list = await response.json();
    } catch (exception) {
      // console.log(exception);
    } finally {
      setLoading(false);
    }
    
    setService(list.service);
  };
  
  useEffect(() => {
    loadService(props.match.params.id);
  }, [props.match.params.id]);
  
  const contactSeller = (sellerId: string) => {
    setModalType('contact');
    
    setSelectedSeller(service?.seller);
    setSelectedPackage(undefined);
    setSelectedService(undefined);
    
    toggleModal();
  };
  
  const createOrder = (seller: Seller, service: ServiceModel, pack: Package) => {
    if (user !== null) {
      setSelectedSeller(seller);
      setSelectedPackage(pack);
      setSelectedService(service);
      
      setModalType('contact');
      toggleModal();
    } else {
      history.push(`${LOGIN}?ref=${props.match.path.replace(':id', service.id.toString())}`);
    }
  };
  
  const onSubmit = useCallback(async (values) => {
    setSendingMessage(true);
    try {
      let response = await jsonRequest(CREATE_THREAD, {
        body: JSON.stringify(values),
        method: 'post'
      });
      
      let json = await response.json();
      history.push(SINGLE_MESSAGE.replace(':id', json.message.threadId));
      
      toggleModal();
    } catch (exception) {
      let exceptionResponse = await exception.response.json();
      
      if (exceptionResponse.message) {
        setErrorMessage(exceptionResponse.message);
      }
      
      if (exceptionResponse.errorMessage) {
        setErrorMessage(exceptionResponse.errorMessage);
      }
      
      if (exceptionResponse.violations.length) {
        setErrorMessage(exceptionResponse.violations.map((error: ConstraintViolation) => {
          return `${error.propertyPath}: ${error.errorMessage}`;
        }).join('<br/>'))
      }
    } finally {
      setSendingMessage(false);
    }
  }, []);
  
  return (
    <Layout isLoading={isLoading}>
      <Row>
        {service && (
          <>
            <Col md={8}>
              <h1>{service.title}</h1>
              <Image image={service.seller.profilePicture} h={36} w={36} fit="crop" circle />
              {' '}{service?.seller.name}
              <Row className="mt-3">
                <Col>
                  {service.images.length > 0 && (
                    <Image image={service.images[0]} />
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
                        <Image image={service.seller.profilePicture} w={100} />
                      </Col>
                      <Col>
                        {service?.seller.name}
                        <br />
                        <Button color="primary" onClick={() => {
                          contactSeller(service.seller.id.toString())
                        }}>
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
                <Nav pills fill>
                  {service.packages.map((pack: Package, index) => (
                    <NavItem key={index}>
                      <NavLink
                        className={classnames({active: activeTab === index})}
                        onClick={() => {
                          toggleTabs(index);
                        }}
                      >
                        {pack.name}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
                <TabContent activeTab={activeTab}>
                  {service.packages.map((pack: Package, index) => (
                    <TabPane tabId={index} className="mt-5" key={index}>
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
                          <Button block color="success" onClick={() =>
                            createOrder(service.seller, service, pack)
                          }>
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
      <div>
        <Modal isOpen={modal} toggle={toggleModal} size="lg" fade={false} backdrop="static">
          <ModalHeader toggle={toggleModal}>To {selectedSeller && selectedSeller.name}</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)} action={CREATE_THREAD} method={'POST'}>
            <ModalBody>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              {selectedService && selectedPackage && selectedSeller && (
                <>
                  <p>Service: {selectedService.title}</p>
                  <p>Package: {selectedPackage.name}</p>
                  <p>Price: ${selectedPackage.price}</p>
                  <input type="hidden" {...register('serviceId')} value={selectedService.id} />
                  <input type="hidden" {...register('packageId')} value={selectedPackage.id} />
                  <input type="hidden" {...register('sellerId')} value={selectedSeller.id} />
                </>
              )}
              <FormGroup>
                <Label>Message</Label>
                <textarea className="form-control" {...register('message', {required: true})} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success" type="submit" disabled={isSendingMessage}>Send Message</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};