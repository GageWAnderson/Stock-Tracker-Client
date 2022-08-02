import React, { useState } from "react";
import axios from "axios";
import urls from "../data/urls";
import endpoints from "../data/endpoints";
import saveStatus from "../util/saveStatus";

const CreateOrUpdateObject = () => {

    const getObjectUrl = (id) => urls.LOGIC_LOCAL_URL + endpoints.getTestObject(id);
    const updateObjectUrl = (id) => urls.LOGIC_LOCAL_URL + endpoints.updateTestObject(id);
    const saveObjectUrl = urls.LOGIC_LOCAL_URL + endpoints.saveTestObject;

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

    const submitObject = (event) => {
        event.preventDefault();
        if (!id || isNaN(id) || !name || !email) {
            console.log("You must submit a name, id (must be a number), and email.");
            return;
        }
        const updatedObject = { testId: id, testName: name, testEmail: email };
        console.log(updatedObject);
        setSaveState(saveStatus.LOADING);
        axios.get(getObjectUrl(id)).then((response) => {
            console.log(response);
            if (response.data) {
                axios.put(updateObjectUrl(id), updatedObject).then(() => {
                    setSaveState(saveStatus.SUCCESS);
                }).catch(() => {
                    setSaveState(saveStatus.FAILURE);
                })
            } else {
                axios.post(saveObjectUrl, updatedObject).then(() => {
                    setSaveState(saveStatus.SUCCESS);
                }).catch(() => {
                    setSaveState(saveStatus.FAILURE);
                })
            }
        })
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