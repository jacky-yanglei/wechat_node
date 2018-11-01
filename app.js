const express = require('express');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const wechatMinirouter = require('./router/wechatMini');

const app = express();

// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*.*', express.static(__dirname + '/static'));

for(let i = 0; i < wechatMinirouter.get.length; i++){
    let router = wechatMinirouter.get;
    app.get('/wechat/mini' + router[i].route, function (req, res) {
        router[i].callback(req, res);
    });
}
for(let i = 0; i < wechatMinirouter.post.length; i++){
    let router = wechatMinirouter.post;
    app.post('/wechat/mini' + router[i].route, function (req, res) {
        router[i].callback(req, res);
    });
}
for(let i = 0; i < wechatMinirouter.all.length; i++){
    let router = wechatMinirouter.all;
    app.all('/wechat/mini' + router[i].route, function (req, res) {
        router[i].callback(req, res);
    });
}

let server = app.listen(PORT, function () {
    let port = server.address().port;
    console.log('Example app listening at ', port);
});
