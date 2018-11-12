const mongodb = require('../mongodb/wechatMini');

module.exports = function (req, res) {
  mongodb.findDocuments('allShoppingDetail', {
    userId: req.body.userId
  },function (data, err) {
    console.log(data);
    if(data.length === 0){
      mongodb.insertDocuments('allShoppingDetail', [req.body], function (data, err) {
        res.send({
          code: 200,
          msg: '成功',
        })
      })
    }else {
      mongodb.updateDocuments('allShoppingDetail', {
        userId: req.body.userId
      }, req.body, function (data,err) {
        console.log(data);
        console.log(err);
        res.send({
          code: 200,
          msg: '成功'
        })
      })
    }
  });

};