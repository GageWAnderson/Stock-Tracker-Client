import React, { useState } from "react";
import axios from 'axios';
import urls from "../data/urls";
import endpoints from "../data/endpoints";
import saveStatus from "../util/saveStatus";

const DeleteObject = () => {

    const objectDeleteUrl = (id) => urls.LOGIC_LOCAL_URL + endpoints.updateTestObject(id);
    const getObjectUrl = (id) => urls.LOGIC_LOCAL_URL + endpoints.getTestObject(id);

    const [id, setId] = useState(null);
    const [saveState, setSaveState] = useState(saveStatus.UNSAVED);

    const handleChange = (e) => {
        e.preventDefault();
        setId(e.target.value);
    }

    const deleteObject = (e) => {
        e.preventDefault();
        if (!id || isNaN(id)) {
            return;
        }
        setSaveState(saveStatus.LOADING);
        axios.get(getObjectUrl(id)).then((response) => {
            if (response.data) {
                axios.delete(objectDeleteUrl(id)).then(() => {
                    setSaveState(saveStatus.SUCCESS);
                }).catch(() => {
                    setSaveState(saveStatus.FAILURE);
                })
            } else {
                setSaveState(saveStatus.FAILURE);
            }
        }).catch(() => {
            setSaveState(saveStatus.FAILURE)
        })

    }

    if (saveState === saveStatus.LOADING) {
        return (<h1>Deleting Object...</h1>);
    } else if (saveState === saveStatus.SUCCESS) {
        return (<h1>Successfully deleted object.</h1>);
    } else if (saveState === saveStatus.FAILURE) {
        return (<h1>Failed to delete object.</h1>);
    } else {
        return (
            <form onSubmit={deleteObject}>
                <label htmlFor="id">ID to Delete: </label>
                <input type="text" id="id" onChange={handleChange} />
                <br />
                <button type="submit">Delete Object</button>
            </form>
        );
    }
};

export default DeleteObject;