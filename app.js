const express = require('express');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const wechatMinirouter = require('./router/wechatMini');

const app = express();

app.use(bodyParser.json({limit:'50mb'}));

app.use(bodyParser.urlencoded({limit:'50mb', extended:true, parameterLimit: 1000000}));

app.all('*.*', express.static(__dirname + '/static'));

for(let i = 0; i < wechatMinirouter.get.length; i++){
    let router = wechatMinirouter.get;
    app.get('/wechat/mini' + router[i].route, function (req, res) {
        router[i].callback(req, res);
    });
}
const router = express.Router();
// const mongodb = require('../mongodb/wechatMini');
// const fs = require('fs');
const multer  = require('multer');
const upload = multer({dest: 'upload_tmp/'});
router.post('/wechat/mini/upload/goods_info', upload.any(), function (req, res) {
  console.log(req.files[0]);
});

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
