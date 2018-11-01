const mongodb = require('../mongodb/wechatMini');

const http = require('https');

const wx = require('../plugins/wechat/getUserID');

module.exports = function (req, res) {
  if(req.body.code){
    const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wx.AppId + '&secret=' + wx.AppSecret + '&js_code=' + req.body.code + '&grant_type=authorization_code';
    http.get(url, (Res) => {
      Res.setEncoding('utf8');
      Res.on('data', (d) => {
        if(JSON.parse(d).openid){
          login(JSON.parse(d).openid,res);
        }else{
          res.send({
            code: 400,
            msg: '获取用户ID失败'
          })
        }
      });

    }).on('error', () => {
      Res.send({
        code: 400,
        msg: '获取用户ID失败'
      })
    });
  }else {
    res.send({
      code: 400,
      msg: '参数错误'
    })
  }
};

function login(id,res) {
  mongodb.findDocuments('userList', {userId: id},
    function (data) {
      if (data) {
        if (data.length === 0) {
          mongodb.insertDocuments('userList', [{
            userId: id
          }], function (docs, err) {
            if (docs.result.ok === 1) {
              res.send({
                code: 200,
                msg: '成功',
                data: {
                  userID: id
                }
              })
            } else {
              res.send({
                code: 400,
                msg: '插入数据库错误'
              })
            }
          })
        } else {
          res.send({
            code: 200,
            msg: '成功',
            data: {
              userID: id
            }
          })
        }
      } else {
        res.send({
          code: 400,
          msg: '查询数据库错误'
        })
      }
    });
}