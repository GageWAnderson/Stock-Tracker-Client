import React, { useEffect, useState } from "react";
import { sendGetAllObjectsRequest } from "../util/requests";
import { Container, ListGroup, ListGroupItem } from 'reactstrap';

const CurrentObjects = () => {

    const [testObjects, setTestObjects] = useState([]);
    const [hasErr, setHasErr] = useState(false);

    useEffect(() => {
        sendGetAllObjectsRequest()
            .then((response) => {
                setTestObjects(response)
            })
            .catch(() => {
                setHasErr(true);
            });
    }, []);

    const testObjectListItem = (testObject) => {
        return (
            <ListGroupItem>
                <span>
                    <b>ID:</b> {testObject.testId} <b>Email:</b> {testObject.testEmail} <b>Name:</b> {testObject.testName}
                </span>
            </ListGroupItem>
        );
    }

    const renderTestObjects = () => {
        return (
            <ListGroup>
                {testObjects.map(testObject => { return testObjectListItem(testObject); })}
            </ListGroup>
        );
    }

    if (hasErr) {
        return (
            <h1>An error occured retreiving the test objects.</h1>
        );
    } else {
        return (
            <Container>
                <h1>Test Objects:</h1>
                {renderTestObjects()}
            </Container>

        );
    }
}

export default CurrentObjects;