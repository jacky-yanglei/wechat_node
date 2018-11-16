const login = require('../wechatMini/login');
const shoppingCartDetaill = require('../wechatMini/shoppingCartDetaill');
const addShoppingCart = require('../wechatMini/addShoppingCart');
const uploadGoodsInfo = require('../wechatMini/uploadGoodsInfo');
let Router = {
    get: [
      // 查询购物车
      {
        route: '/search/shopping_cart',
        callback: shoppingCartDetaill
      }
    ],
    post: [
      // 登录接口
      {
        route: '/login',
        callback: login
      },
      // 加入购物车接口
      {
        route: '/add/shopping_cart',
        callback: addShoppingCart
      }
    ],
    all: [
        {
            route: '/',
            callback: function (req, res){
                res.send('微信小程序！');
            }
        }
    ]
};
module.exports = Router;