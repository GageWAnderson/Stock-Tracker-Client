import endpoints from "../data/endpoints";

const generateRequest = (method, data = null) => {
    if (data) {
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    } else {
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

}

const processResponse = (response) => {
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Response type must be JSON.");
    } else if (!response.ok) {
        throw new Error(`Error with getting object, error code = ${response.status}`);
    } else {
        return response.json();
    }
}

const processRequest = async (url, data = null) => {
    if (data === null) {
        return fetch(url)
            .then((response) => {
                return processResponse(response);
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw new Error(`Error with getting object, error = ${error}`);
            });
    } else {
        return fetch(url, data)
            .then((response) => {
                return processResponse(response);
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw new Error(`Error with getting object, error = ${error}`);
            });
    }
}

export const sendGetObjectRequest = async (id) => {
    return processRequest(endpoints.getTestObject(id));
}

export const sendGetAllObjectsRequest = async () => {
    return processRequest(endpoints.getTestObjects);
}

export const sendSaveObjectRequest = async (data) => {
    return processRequest(endpoints.saveTestObject, generateRequest('POST', data));
}

export const sendUpdateObjectRequest = async (id, data) => {
    return processRequest(endpoints.updateTestObject(id), generateRequest('PUT', data));
}

export const sendDeleteObjectRequest = async (id) => {
    return fetch(endpoints.deleteTestObject(id), generateRequest('DELETE'))
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to delete object, response = ${response.status}`);
            }
        })
        .catch((err) => {
            throw new Error(`Failed to delete object, err = ${err}`);
        })
}