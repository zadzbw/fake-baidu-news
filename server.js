/**
 * Created by zad on 16/7/29.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use('/download', (req, res, next)=> {
    res.header('Content-Type', 'application/octet-stream;charset=utf-8');
    next();
});

app.post('/auth', (req, res)=> {
    var {grant_type} = req.body;

    if (grant_type == 'password') {
        var {username, password} = req.body;
        if (username == 'admin' && password == 'admin') {
            return res.json({
                access_token: Math.random().toString(36).substring(7),
                refresh_token: Math.random().toString(36).substring(7),
                expires_in: '1251238627',
                token_type: 'JWT'
            });
        } else {
            res.status(404).send({
                error: 'unauthorized'
            });
        }
    } else if (grant_type == 'refresh_token') {
        return res.json({
            access_token: Math.random().toString(36).substring(7),
            refresh_token: Math.random().toString(36).substring(7),
            expires_in: '1251238627',
            token_type: 'JWT'
        });
    } else {
        res.status(404).send({
            error: 'incorrect grant_type'
        });
    }
});

app.listen(5000, ()=> {
    console.log('server has started!!!');
});