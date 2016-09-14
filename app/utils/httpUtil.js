/**
 * Created by zad on 16/7/29.
 */

import 'whatwg-fetch';

const domain = 'http://localhost:5000';

/**
 * Throw error when response status is not ok
 * @param {Response} res
 * @returns {Response}
 */
function checkStatus(res) {
    if (res.ok) {
        return res;
    } else {
        throw {errorCode: res.status, message: res.statusText};
    }
}

/**
 * Encode an object to a query string
 * @param {String} url
 * @param {Object} params
 * @returns {string} url
 */
function urlBuilder(url, params = {}) {
    let result = [];
    for (let prop in params) {
        if (params.hasOwnProperty(prop)) {
            result.push(prop + '=' + encodeURIComponent(params[prop]));
        }
    }
    return url + (result.length ? '?' + result.join('&') : '');
}

export default class HTTPUtil {
    /**
     * General settings for methods
     * @param {string} method
     * @param {string} url
     * @param {Object} [payload]
     * @returns {Promise}
     */
    static send(method = 'POST', url, payload = {}) {
        const fetchOption = {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8'
            },
            mode: 'cors'
        };
        if (method !== 'GET') {
            fetchOption.body = JSON.stringify(payload);
        }
        return fetch(domain + url, fetchOption)
            .then(checkStatus)
            .then((res)=>res.json());
    }

    static POST(url, payload) {
        return HTTPUtil.send('POST', url, payload);
    }

    static GET(url, params) {
        return HTTPUtil.send('GET', urlBuilder(url, params));
    }

    static PUT(url, payload) {
        return HTTPUtil.send('PUT', url, payload);
    }

    static DELETE(url, payload) {
        return HTTPUtil.send('DELETE', url, payload);
    }
}