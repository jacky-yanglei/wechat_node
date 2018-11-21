const mongodb = require('../mongodb/wechatMini');
module.exports = function (req, res) {
  mongodb.removeDocument('goodsList', {_id: req.body._id} ,function (data, err) {
    res.send({
      code: 200,
      msg: '删除成功'
    })
  }, true);
};