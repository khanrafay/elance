import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';


const Categories = () => {
    return (<ListGroup flush>
        <ListGroupItem disabled tag="a" href="#">Categories</ListGroupItem>
        <ListGroupItem tag="a" href="#">Programmers</ListGroupItem>
        <ListGroupItem tag="a" href="#">Plumbers</ListGroupItem>
        <ListGroupItem tag="a" href="#">Drivers</ListGroupItem>
        <ListGroupItem tag="a" href="#">Securities</ListGroupItem>
        <ListGroupItem tag="a" href="#">Lawyers</ListGroupItem>
        <ListGroupItem tag="a" href="#">Web Designers</ListGroupItem>
        <ListGroupItem tag="a" href="#">Ios/Android Developers</ListGroupItem>
    </ListGroup>);
}

export default Categories;