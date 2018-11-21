const login = require('../wechatMini/login');
const shoppingCartDetaill = require('../wechatMini/shoppingCartDetaill');
const addShoppingCart = require('../wechatMini/addShoppingCart');
const uploadGoodsInfo = require('../wechatMini/uploadGoodsInfo');
const getGoodsList = require('../wechatMini/getGoodsList');
const deleteGoods = require('../wechatMini/deleteGoods');
let Router = {
    get: [
      // 查询购物车
      {
        route: '/search/shopping_cart',
        callback: shoppingCartDetaill
      },
      // 获取商品信息
      {
        route: '/goods_list',
        callback: getGoodsList
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
      },
      //上传商品信息
      {
        route: '/upload/goods_info',
        callback: uploadGoodsInfo
      },
      //删除商品信息/下架商品
      {
        route: '/delete/goods_info',
        callback: deleteGoods
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