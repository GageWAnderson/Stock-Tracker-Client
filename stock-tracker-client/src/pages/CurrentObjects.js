import React, { useEffect, useState } from "react";
import axios from "axios";
import endpoints from "../data/endpoints";
import urls from "../data/urls";

const CurrentObjects = () => {

    const testObjectUrl = urls.LOGIC_LOCAL_URL + endpoints.getTestObjects;

    const [testObjects, setTestObjects] = useState([]);
    const [hasErr, setHasErr] = useState(false);

    useEffect(() => {
        axios.get(testObjectUrl).then((response) => {
            setTestObjects(response.data);
        }).catch((err) => {
            setHasErr(true);
        })
    }, [testObjectUrl]);

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