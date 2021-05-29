import React, {createRef, FunctionComponent, useCallback, useEffect, useState} from 'react';
import Layout from "../layout/layout";
import {RouteComponentProps} from "react-router";
import {jsonRequest, request} from "../../api/request/request";
import {SEND_MESSAGE, THREAD_MESSAGES, THREADS_LIST} from "../../api/routing/routes/dashboard";
import {Thread} from "../../api/model/thread";
import {Message} from "../../api/model/message";
import {Link} from "react-router-dom";
import {SINGLE_MESSAGE} from "../../routes";
import {Image} from "../../components/image/image";
import moment from "moment";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {QueryString} from "../../lib/location/query.string";

export interface InboxProps extends RouteComponentProps<{id: string}>{

}

export const Inbox: FunctionComponent<InboxProps> = (props) => {
	
	const [threadList, setThreadList] = useState<Thread[]>([]);
	const [isThreadsLoading, setIsThreadsLoading] = useState(false);
	const [isMessagesLoading, setIsMessagesLoading] = useState(false);
	const [activeThread, setActiveThread] = useState<Thread|undefined>();
	const [messagesList, setMessagesList] = useState<Message[]>([]);
	const listRef = createRef<HTMLDivElement>();
	const [isMessageSending, setMessageSending] = useState(false);
	
	const {handleSubmit, register} = useForm();
	
	const loadThreadsList = async () => {
		setIsThreadsLoading(true);
		try {
			let response = await jsonRequest(THREADS_LIST);
			let threadList = await response.json();
			
			setThreadList(threadList.threads);
		}catch(exception){
		
		}finally {
			setIsThreadsLoading(false);
		}
	};
	
	const loadMessagesList = async () => {
		if(activeThread) {
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
		if(filterThread.length > 0){
			setActiveThread(filterThread[0]);
		}else{
			if(threadList.length > 0){
				setActiveThread(threadList[0]);
			}
		}
	}, [props.match.params.id, threadList]);
	
	const sendMessage = useCallback(async (values) => {
		if(!activeThread){
			return false;
		}
		
		setMessageSending(true);
		let queryString = new URLSearchParams();
		queryString.append('message', values.message);
		
		try{
			let response = await request(SEND_MESSAGE.replace(':id', activeThread.id.toString()), {
				body: queryString,
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			});
			
			let message = await response.json();
			setMessagesList([...messagesList, message.message]);
			scrollToBottom();
		}catch(exception){
			throw exception;
		}finally {
			setMessageSending(false);
		}
		
	}, [messagesList]);
	
	useEffect(() => {
		scrollToBottom();
	}, [listRef, activeThread]);
	
	const scrollToBottom = useCallback(() => {
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight - listRef.current.clientHeight;
		}
	}, [listRef]);
	
	return (
		<Layout>
			<h1>Inbox</h1>
			<div className="container-fluid inbox">
				<div className="row">
					<nav className="col-md-3 d-none d-md-block bg-light sidebar p-0">
						<div className="sidebar-sticky">
							<ul className="nav flex-column">
								{threadList.map((thread, index) => (
									<li className={`nav-item${thread === activeThread ? ' active' : ''}`} onClick={() => setActiveThread(thread)} key={index}>
										<Link to={SINGLE_MESSAGE.replace(':id', thread.id.toString())} className="nav-link contact-item">
											<div className="thread-image-placeholder">
												<Image image={thread.recipient.profilePicture} w={45} h={45} circle fit="crop" default="profile" />
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
										<Image image={activeThread.recipient.profilePicture} w={45} h={45} circle fit="crop" default="profile" />
									</div>
									<div className="thread-user-info">
										<span className="ml-2">{activeThread.recipient.displayName}</span>
									</div>
								</div>
								<div className="messages-list" ref={listRef}>
									{messagesList.map((message, index) => {
										let isMe = message.me;
										let profilePicture = isMe ? message.sender.profilePicture : message.recepient.profilePicture;
										let name = isMe ? message.sender.displayName : message.recepient.displayName;
										return (
											<div key={index} className="message">
												<div className="thread-image-placeholder">
													<Image image={profilePicture} w={45} h={45} circle fit="crop" default="profile" />
												</div>
												<div className="thread-user-info">
													<div className="ml-2">
														{name}
														<span className="text-xs ml-2 text-black-50" title={moment(message.createdAt).format('YYYY-MM-DD hh:mm:ss A')}>{moment(message.createdAt).fromNow()}</span>
													</div>
													<div className="ml-2">{message.message}</div>
												</div>
											</div>
										);
									})}
								</div>
								<div className="message-form">
									<form method="POST" onSubmit={handleSubmit(sendMessage)} className="w-100">
										<div className="input-group">
											<input type="text" {...register('message', {required: true})} className="form-control border-primary shadow-none rounded-0" placeholder="Enter something" autoFocus />
											<div className="input-group-append">
												<button className="btn btn-outline-primary rounded-0" type="submit">
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