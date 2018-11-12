const mongodb = require('../mongodb/wechatMini');
module.exports = function (req, res) {
  mongodb.findDocuments('allShoppingDetail',{
    userId: req.query.id
  },function (data,err) {
    if(data.length > 0){
      res.send({
        code: 200,
        data: data[0],
        msg: '成功'
      })
    }else {
      res.send({
        code: 200,
        data: {},
        msg: '成功'
      })
    }
  })
};