const express = require('express');

const bodyParser = require('body-parser');

const path = require("path");

const URL = require("url");

const fs = require("fs");

const PORT = process.env.PORT || 3000;

const wechatMinirouter = require('./router/wechatMini');

const app = express();

app.use(bodyParser.json({limit:'50mb'}));

app.use(bodyParser.urlencoded({limit:'50mb', extended:true, parameterLimit: 1000000}));

app.all('*\.(jpg|png|gif)$', express.static(__dirname + '/static'));

const router = express.Router();

const multer  = require('multer');

const upload = multer({dest: 'static/wechatMini/', limits: '50mb'});


app.get('/admin/*', function (req, res) {
    const arr = req.url.split('/');
    res.sendFile(__dirname + '/templates/' + arr[arr.length-1]);
});

app.post("/wechat/mini/upload", upload.any() , (req,res) => {
  // 传多张
  "use strict";
  console.log(req.files[0]);
  for(let i=0;i<req.files.length;i++){
    let file=req.files[i];
    let type = req.files[i].originalname.split('.')[1];
    let oldPath = "static/wechatMini/"+file.filename;
    let newPath = "static/wechatMini/"+file.filename + "." + type;
    let result=fs.renameSync(oldPath, newPath);
    if (result === undefined) {
      if (i === req.files.length-1) {
        res.send({
          code: 200,
          msg: '上传成功',
          data: '/wechatMini/' + file.filename + '.' + type
        })
      }
    }else{
      res.send(`第${i}图片上传成功`);
    }
  }
});

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
