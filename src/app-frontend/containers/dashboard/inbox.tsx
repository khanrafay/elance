import React, {createRef, FunctionComponent, useCallback, useEffect, useState} from 'react';
import Layout from "../layout/layout";
import {RouteComponentProps, useHistory} from "react-router";
import {jsonRequest, request} from "../../../api/request/request";
import {
  CREATE_OFFER,
  MEDIA_DOWNLOAD_URL,
  SEND_MESSAGE,
  THREAD_MESSAGES,
  THREADS_LIST
} from "../../../api/routing/routes/backend.app";
import {Thread} from "../../../api/model/thread";
import {Message} from "../../../api/model/message";
import {Link} from "react-router-dom";
import {SINGLE_MESSAGE, SINGLE_ORDER} from "../../routes/frontend.routes";
import {Image} from "../../../app-common/components/image/image";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperclip, faPaperPlane, faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import TimeAgo from 'react-timeago'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Row, Tooltip} from "reactstrap/es";
import {ConstraintViolation} from "../../../lib/validator/validation.result";
import {useSelector} from "react-redux";
import {getAuthorizedUser} from "../../../duck/auth/auth.selector";
import {ServiceShort} from "../../components/service/service.short";
import {Service} from "../../../api/model/service";
import _ from 'lodash';
import {Offer} from '../../components/offer/offer';

export interface InboxProps extends RouteComponentProps<{ id: string }> {

}

export const Inbox: FunctionComponent<InboxProps> = (props) => {
  
  const [threadList, setThreadList] = useState<Thread[]>([]);
  const [isThreadsLoading, setIsThreadsLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [activeThread, setActiveThread] = useState<Thread | undefined>();
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const listRef = createRef<HTMLDivElement>();
  const [isMessageSending, setMessageSending] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const user = useSelector(getAuthorizedUser);
  const [offerService, setOfferService] = useState<Service | undefined>();
  const [offerId, setOfferId] = useState<number | undefined>();
  const history = useHistory();
  
  //offer form handler
  const {handleSubmit, register, setError, formState: {errors}, reset} = useForm();
  //message form handler
  const {handleSubmit: handleSubmitMessage, register: registerMessage, setError: setErrorMessage, formState: {errors: errorsMessage}, reset: resetMessage, clearErrors: clearErrorsMessage} = useForm();
  
  const loadThreadsList = async () => {
    setIsThreadsLoading(true);
    try {
      let response = await jsonRequest(THREADS_LIST);
      let threadList = await response.json();
      
      setThreadList(threadList.threads);
    } catch (exception) {
    
    } finally {
      setIsThreadsLoading(false);
    }
  };
  
  const loadMessagesList = async () => {
    if (activeThread) {
      setIsMessagesLoading(true);
      try {
        let response = await jsonRequest(THREAD_MESSAGES.replace(':id', activeThread?.id.toString()));
        let messagesList = await response.json();
        
        setMessagesList(messagesList.messages);
      } catch (exception) {
      
      } finally {
        setIsMessagesLoading(false);
      }
    }
  };
  
  useEffect(() => {
    loadThreadsList();
  }, []);
  
  useEffect(() => {
    loadMessagesList();
  }, [activeThread]);
  
  useEffect(() => {
    let filterThread = threadList.filter(thread => thread.id.toString() === props.match.params.id);
    if (filterThread.length > 0) {
      setActiveThread(filterThread[0]);
    } else {
      if (threadList.length > 0) {
        setActiveThread(threadList[0]);
      }
    }
  }, [props.match.params.id, threadList]);
  
  const sendMessage = useCallback(async (values) => {
    
    if (!activeThread) {
      return false;
    }
    
    setMessageSending(true);
    let queryString = new FormData();
    if (values.message) {
      queryString.append('message', values.message);
    }
    if (values.file) {
      queryString.append('file', values.file[0]);
    }
    if (offerId) {
      queryString.append('offerId', offerId.toString());
    }
    
    try {
      let response = await request(SEND_MESSAGE.replace(':id', activeThread.id.toString()), {
        body: queryString,
        method: 'POST',
      });
      
      let message = await response.json();
      setMessagesList([...messagesList, message.message]);
      scrollToBottom();
      resetMessage({
        message: ''
      });
      setOfferService(undefined);
      setOfferId(undefined);
    } catch (exception) {
      let expResponse = await exception.response.json();
      if (expResponse.code === 422) {
        if (expResponse.violations) {
          expResponse.violations.map((error: ConstraintViolation) => {
            setErrorMessage(error.propertyPath, {
              type: 'manual',
              message: error.errorMessage
            });
          });
        }
      }
      throw exception;
    } finally {
      setMessageSending(false);
    }
    
  }, [messagesList, offerId]);
  
  useEffect(() => {
    scrollToBottom();
  }, [listRef, activeThread]);
  
  const scrollToBottom = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight - listRef.current.clientHeight;
    }
  }, [listRef]);
  
  const [creatingOffer, setCreatingOffer] = useState(false);
  
  const onCreateOffer = useCallback(async (values) => {
    setCreatingOffer(true);
    
    let queryString = JSON.stringify({
      serviceId: values.serviceId,
      price: +values.price,
      description: values.description,
      duration: values.delivery_duration
    });
    
    try {
      let response = await jsonRequest(CREATE_OFFER, {
        method: 'POST',
        body: queryString
      });
      let json = await response.json();
      
      await setOfferId(json.offer.id);
      setModal(false);
      setOfferService(undefined);
      reset({
        price: '',
        description: '',
        duration: ''
      });
      
      clearErrorsMessage();
    } catch (exception) {
      let expResponse = await exception.response.json();
      if (expResponse.code === 422) {
        if (expResponse.violations) {
          expResponse.violations.map((error: ConstraintViolation) => {
            setError(error.propertyPath, {
              type: 'manual',
              message: error.errorMessage
            });
          });
        }
      }
    } finally {
      setCreatingOffer(false);
    }
    
  }, []);
  
  const [tooltipOpen, setTooltipOpen] = useState(false);
  
  const tooltipToggle = () => setTooltipOpen(!tooltipOpen);
  
  return (
    <Layout>
      <h1>Inbox</h1>
      <div className="container-fluid inbox">
        <div className="row">
          <nav className="col-md-3 d-none d-md-block bg-light sidebar p-0">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                {threadList.map((thread, index) => (
                  <li className={`nav-item${thread === activeThread ? ' active' : ''}`}
                    onClick={() => setActiveThread(thread)}
                    key={index}>
                    <Link to={SINGLE_MESSAGE.replace(':id', thread.id.toString())}
                      className="nav-link contact-item">
                      <div className="thread-image-placeholder">
                        <Image image={thread.recipient.profilePicture}
                          w={45}
                          h={45}
                          circle
                          fit="crop"
                          default="profile" />
                      </div>
                      <div className="thread-user-info">
                        <span className="ml-2">{thread.recipient.displayName}</span>
                        <span className="float-right thread-time">
                          <TimeAgo date={thread.message.createdAt} />
												</span>
                        <div className="thread-latest-message">
                          <span className="ml-2">{thread.message.message}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="col-md-9 p-0 message-header">
            {activeThread && (
              <>
                <div className="p-2 bg-light">
                  <div className="thread-image-placeholder">
                    <Image image={activeThread.recipient.profilePicture}
                      w={45}
                      h={45}
                      circle
                      fit="crop"
                      default="profile" />
                  </div>
                  <div className="thread-user-info">
                    <span className="ml-2">{activeThread.recipient.displayName}</span>
                  </div>
                </div>
                <div className="messages-list"
                  ref={listRef}>
                  {messagesList.map((message, index) => {
                    let profilePicture = message.sender.profilePicture;
                    let name = message.sender.displayName;
                    return (
                      <div key={index}
                        className="message">
                        <div className="message-image-placeholder">
                          <Image image={profilePicture}
                            w={45}
                            h={45}
                            circle
                            fit="crop"
                            default="profile" />
                        </div>
                        <div className="message-user-info">
                          <div className="">
                            {name}
                            <TimeAgo date={message.createdAt}
                              className="text-xs ml-2 text-black-50" />
                          </div>
                          <div className="">
                            {message.message}
                            {message.offer !== null && (
                              <Offer offer={message.offer} onAccept={(payload) => history.push(SINGLE_ORDER.replace(':id', payload?.id))} onCancel={() => loadMessagesList()} />
                            )}
                            <div>
                              {message.media && message.media.map((image, idx) => (
                                <React.Fragment key={idx}>
                                  <a href={MEDIA_DOWNLOAD_URL.replace(':id', image.id.toString())}>
                                    <Image image={image} h={100} />
                                  </a>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="clearfix"> </div>
                      </div>
                    );
                  })}
                </div>
                <div className="message-form">
                  <form method="POST"
                    onSubmit={handleSubmitMessage(sendMessage)}
                    className="w-100"
                    autoComplete="off"
                  >
                    <div className="input-group">
                      <input type="text" {...registerMessage('message')}
                        className="form-control border-primary shadow-none rounded-0"
                        placeholder="Enter something"
                        autoFocus />
                      <div className="input-group-append" title="Create offer" id="offer-button">
                        <button type="button" className="btn btn-outline-danger mb-0" onClick={() => setModal(true)}>
                          <FontAwesomeIcon icon={faPencilAlt} /> Offer
                        </button>
                      </div>
                      <div className="input-group-append" title={uploadedFileName}>
                        <label className="file-picker btn btn-outline-primary mb-0">
                          <FontAwesomeIcon icon={faPaperclip} />
                          <input type="file" {...registerMessage('file')} />
                        </label>
                      </div>
                      <div className="input-group-append">
                        <button className="btn btn-outline-success rounded-0"
                          type="submit"
                          disabled={isMessageSending}>
                          <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                      </div>
                      <Tooltip placement="top" isOpen={tooltipOpen} target="offer-button" toggle={tooltipToggle}>
                        Create offer
                      </Tooltip>
                    </div>
                    <div>{errorsMessage.message && (
                      <div className="alert alert-danger">{errorsMessage.message.message}</div>
                    )}</div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggleModal} size="lg" fade={false} backdrop="static">
        <ModalHeader toggle={toggleModal}>Create offer</ModalHeader>
        <form onSubmit={handleSubmit(onCreateOffer)} action={CREATE_OFFER}>
          <ModalBody>
            <h3>Select a service</h3>
            <Row>
              {user?.seller?.services.map((service, index) => (
                <div className="col-6" key={index}>
                  <label
                    className={`m-0 p-0 mb-2 text-left btn-service btn${service === offerService ? ' active' : ''}`}
                    onClick={() => setOfferService(service)}
                  >
                    <input type="radio" {...register('serviceId')} className="d-none" value={service.id} />
                    <ServiceShort service={service} />
                  </label>
                </div>
              ))}
            </Row>
            {errors.serviceId && (
              <div className="text-danger">{errors.serviceId.message}</div>
            )}
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" className="form-control" {...register('description', {required: true})} />
              {errors.description && (
                <div className="text-danger">{errors.description.message}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="delivery-days">Delivery days</label>
              <select id="delivery-days" className="form-control" {...register('delivery_duration', {required: true})}>
                {_.range(30).map((item, index) => (
                  <option value={index + 1}>{index + 1}</option>
                ))}
              </select>
              {errors.duration && (
                <div className="text-danger">{errors.duration.message}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="number" className="form-control" {...register('price', {required: true})} />
              {errors.price && (
                <div className="text-danger">{errors.price.message}</div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="submit" disabled={creatingOffer}>Create offer</Button>
          </ModalFooter>
        </form>
      </Modal>
    </Layout>
  );
};