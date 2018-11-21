const mongodb = require('../mongodb/wechatMini');
module.exports = function (req, res) {
  mongodb.findDocuments('goodsList', {}, function (data,err) {
    res.send({
      code: 200,
      msg: '获取成功',
      data: data
    })
  })
};