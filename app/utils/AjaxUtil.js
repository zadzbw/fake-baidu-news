/**
 * Created by zad on 16/7/29.
 */
/**
 * Created by zad on 16/7/21.
 */
function checkStatus(res) {
    if (res.ok) {
        return res;
    } else {
        throw {errorCode: res.status, message: res.statusText};
    }
}

function urlBuilder(url, params) {
    if (params) {
        if (typeof params === 'string') {
            url += '?';
            url += params;
        } else if (typeof params === 'object' && Object.keys(params).length > 0) {
            // TODO: identify array
            url += '?';
            for (var param in params) {
                url += param + '=' + encodeURIComponent(params[param]) + '&';
            }
            url = url.replace(/&$/, '');
        }
        return url;
    } else {
        return url;
    }
}

function sendData(url, method, data = {}) {
    let fetchOption = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json; charset=UTF-8'
        }
    };
    if (method == 'POST') {
        fetchOption.body = JSON.stringify(data);
    }
    return fetch(url, fetchOption)
        .then(checkStatus)
        .then((res)=>res.json());

}

let ajaxUtil = {

    GET(url, params){
        return sendData(urlBuilder(url, params), 'GET');
    },

    POST(url, payload){
        return sendData(url, 'POST', payload);
    },

    PUT(url, payload){
        return sendData(url, 'PUT', payload);
    },

    DELETE(url, payload){
        return sendData(url, 'DELETE', payload);
    }
};

export default ajaxUtil;