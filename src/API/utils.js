
export const baseUrl = 'http://localhost:19002'; //TODO: update baseUrl to flask server

export const requestMethods = {
    get: 'GET',
    post: 'POST',
}

export const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr._response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject('Error Occurred! STATUS: ', xhr.status, xhr.statusText);
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;
};

