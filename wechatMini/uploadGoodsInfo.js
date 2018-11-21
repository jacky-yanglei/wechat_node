const mongodb = require('../mongodb/wechatMini');

module.exports = function (req, res) {
  let time = new Date().getTime();

  if(!(req.body.goods_name&&req.body.goods_dec&&req.body.goods_pic_url&&req.body.goods_price)){
    res.send({
      code: 500,
      msg: '参数错误'
    })
  }

  mongodb.insertDocuments('goodsList', [{
    goods_name: req.body.goods_name,
    goods_dec: req.body.goods_dec,
    goods_pic_url: req.body.goods_pic_url,
    goods_price: req.body.goods_price,
    init_time: time,
    update_time: time
  }], function (data,err) {
    res.send({
      code: 200,
      msg: '成功',
    })
  })
};