import React, { useState } from "react";
import saveStatus from "../util/saveStatus";
import {
    sendGetObjectRequest,
    sendUpdateObjectRequest,
    sendSaveObjectRequest,
} from "../util/requests";

const CreateOrUpdateObject = () => {

    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [saveState, setSaveState] = useState(saveStatus.UNSAVED);

    const changeId = (e) => {
        e.preventDefault();
        setId(e.target.value);
    }

    const changeName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const changeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const objectDoesNotExist = (response) => {
        return !response || Object.entries(response).length === 0;
    }

    const submitObject = (event) => {
        event.preventDefault();
        if (!id || isNaN(id) || !name || !email) {
            return;
        }
        const updatedObject = { testId: id, testName: name, testEmail: email };
        setSaveState(saveStatus.LOADING);
        sendGetObjectRequest(id)
            .then((response) => {
                if (objectDoesNotExist(response)) {
                    sendSaveObjectRequest(updatedObject)
                    .then(() => {
                        setSaveState(saveStatus.SUCCESS);
                    })
                    .catch(() => {
                        setSaveState(saveStatus.FAILURE);
                    })
                } else {
                    sendUpdateObjectRequest(id, updatedObject)
                    .then(() => {
                        setSaveState(saveStatus.SUCCESS);
                    })
                    .catch(() => {
                        setSaveState(saveStatus.FAILURE);
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                setSaveState(saveStatus.FAILURE);
            });
    }

    if (saveState === saveStatus.LOADING) {
        return (
            <h1>Create/Update Menu Loading...</h1>
        );
    } else if (saveState === saveStatus.FAILURE) {
        return (
            <h1>An Error Occured while saving your object.</h1>
        );
    } else if (saveState === saveStatus.SUCCESS) {
        return (
            <h1>Your Object was sucessfully saved!</h1>
        );
    } else {
        return (
            <>
                <form onSubmit={submitObject}>
                    <label htmlFor="name">ID: </label>
                    <input type="text" id="id" onChange={changeId} />
                    <br />
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" onChange={changeName} />
                    <br />
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" onChange={changeEmail} />
                    <br />
                    <input type="submit" value="Submit Test Object" />
                </form>
            </>
        );
    }

};

export default CreateOrUpdateObject;