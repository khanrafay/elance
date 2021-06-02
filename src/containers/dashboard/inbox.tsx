import React, {createRef, FunctionComponent, useCallback, useEffect, useState} from 'react';
import Layout from "../layout/layout";
import {RouteComponentProps} from "react-router";
import {jsonRequest, request} from "../../api/request/request";
import {MEDIA_DOWNLOAD_URL, SEND_MESSAGE, THREAD_MESSAGES, THREADS_LIST} from "../../api/routing/routes/dashboard";
import {Thread} from "../../api/model/thread";
import {Message} from "../../api/model/message";
import {Link} from "react-router-dom";
import {SINGLE_MESSAGE} from "../../routes";
import {Image} from "../../components/image/image";
import moment from "moment";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperclip, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import TimeAgo from 'react-timeago'

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
  const formRef = createRef<HTMLFormElement>();
  const [messageErrors, setMessageErrors] = useState<string | undefined>();
  const [uploadedFileName, setUploadedFileName] = useState('');
  
  const {handleSubmit, register} = useForm();
  
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
    
    setMessageErrors(undefined);
    
    setMessageSending(true);
    let queryString = new FormData();
    queryString.append('message', values.message);
    queryString.append('file', values.file[0]);
    
    try {
      let response = await request(SEND_MESSAGE.replace(':id', activeThread.id.toString()), {
        body: queryString,
        method: 'POST',
      });
      
      let message = await response.json();
      setMessagesList([...messagesList, message.message]);
      scrollToBottom();
      clearMessageBox();
    } catch (exception) {
      throw exception;
    } finally {
      setMessageSending(false);
    }
    
  }, [messagesList, formRef]);
  
  useEffect(() => {
    scrollToBottom();
  }, [listRef, activeThread]);
  
  const scrollToBottom = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight - listRef.current.clientHeight;
    }
  }, [listRef]);
  
  const clearMessageBox = useCallback(() => {
    console.log(formRef.current);
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [formRef]);
  
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
													{moment(thread.message.createdAt).fromNow()}
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
                    let isMe = message.me;
                    let profilePicture = isMe ? message.sender.profilePicture : message.recepient.profilePicture;
                    let name = isMe ? message.sender.displayName : message.recepient.displayName;
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
                        <div className="clearfix"></div>
                      </div>
                    );
                  })}
                </div>
                <div className="message-form">
                  <form method="POST"
                        onSubmit={handleSubmit(sendMessage)}
                        className="w-100"
                        ref={formRef}
                        autoComplete="off"
                        encType="multipart/form-data">
                    <div className="input-group">
                      <input type="text" {...register('message')}
                             className="form-control border-primary shadow-none rounded-0"
                             placeholder="Enter something"
                             autoFocus />
                      <div className="input-group-append"
                           title={uploadedFileName}>
                        <label className="file-picker btn btn-outline-primary mb-0">
                          <FontAwesomeIcon icon={faPaperclip} />
                          <input type="file" {...register('file')} />
                        </label>
                      </div>
                      <div className="input-group-append">
                        <button className="btn btn-outline-primary rounded-0"
                                type="submit"
                                disabled={isMessageSending}>
                          <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};