const mongodb = require('../mongodb/wechatMini');
const fs = require('fs');
const multer  = require('multer');
const upload = multer({dest: 'upload_tmp/'});
module.exports = function (req, res) {
  // console.log(req.body);
  console.log(req.files);
  // mongodb.insertDocuments('goodsList', req.body, function () {
  //
  // })
  res.send({
    msg: '成功',
    code: 200
  })
};