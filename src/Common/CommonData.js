var serviceUrl = "http://192.168.0.51/contact-book/public/api/";

import { REQUEST_FAIL } from '../Actions/types';

export const apiRequestPost = (method, formBody, dispatch) => {
    return fetch(serviceUrl + method, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formBody
    })
        .then(function (res) {
            if (!res.ok) {
                throw Error(res.status);
            } else {
                return res.json();
            }
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log('request error ' + method);
            console.log(err.message);
            dispatch({
                type: REQUEST_FAIL
            });
        });
}


export const apiRequestGet = (method, dispatch) => {
    return fetch(serviceUrl + method, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (res) {
            if (!res.ok) {
                throw Error(res.status);
            } else {
                // convert response data to JSON
                return res.json();
            }
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log('request error');
            console.log(err);
            dispatch({
                type: REQUEST_FAIL
            });
        });
}
