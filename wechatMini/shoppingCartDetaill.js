const mongodb = require('../mongodb/wechatMini');
module.exports = function (req, res) {
  mongodb.findDocuments('allShoppingDetail',{
    userId: req.query.id
  },function (data, err) {
    if(data.length > 0){
      let sql = [];
      let searchData = data[0].shoppingData;
      for (let i = 0; i < searchData.length; i++) {
        sql.push({
          _id: searchData[i].id
        })
      }
      mongodb.findDocuments('goodsList', {$or: sql}, function (data2, err) {
        let sendData = {
          userId: data.userId,
          shoppingData: []
        };
        for (let i = 0; i < searchData.length; i++) {
          for (let j = 0; j < data2.length; j++) {
            if (data2[j]._id == searchData[i].id) {
              sendData.shoppingData.push({
                id: searchData[i].id,
                count: searchData[i].count,
                price: data2[j].goods_price,
                pic_url: data2[j].goods_pic_url,
                name: data2[j].goods_name
              })
            }
          }
        }
        res.send({
          code: 200,
          data: sendData,
          msg: '成功'
        })
      }, true);
    }else {
      res.send({
        code: 200,
        data: {
          userId: req.query.id,
          shoppingData: []
        },
        msg: '成功'
      })
    }
  })
};