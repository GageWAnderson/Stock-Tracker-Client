import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Home = () => {
    return (
        <>
            <h1>Stock Tracker Home Page</h1>
            <ListGroup horizontal>
                <ListGroupItem>
                    <span><b>Email: </b> gwanders380@gmail.com</span>
                </ListGroupItem>
                <ListGroupItem>
                    <span><b>LinkedIn: </b> linkedin.com/in/gagewanderson</span>
                </ListGroupItem>
                <ListGroupItem>
                    <span><b>GitHub: </b> https://github.com/GageWAnderson</span>
                </ListGroupItem>
            </ListGroup>
        </>

    );
}

export default Home;