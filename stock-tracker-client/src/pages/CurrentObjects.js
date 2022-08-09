import React, { useEffect, useState } from "react";
import { sendGetAllObjectsRequest } from "../util/requests";

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

    const renderTestObjects = () => {
        return (
            testObjects.map(testObject => {
                return (<>
                    <h4>{testObject.testId}</h4>
                    <h4>{testObject.testEmail}</h4>
                    <h4>{testObject.testName}</h4>
                    <br />
                </>)
            })
        );
    }

    if (hasErr) {
        return (
            <h1>An error occured retreiving the test objects.</h1>
        );
    } else {
        return (
            <>
                <h1>Test Objects:</h1>
                {renderTestObjects()}
            </>

        );
    }
}

export default CurrentObjects;