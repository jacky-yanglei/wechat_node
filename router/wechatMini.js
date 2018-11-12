const login = require('../wechatMini/login');
const shoppingCartDetaill = require('../wechatMini/shoppingCartDetaill');
const addShoppingCart = require('../wechatMini/addShoppingCart');
let Router = {
    get: [{
      route: '/search/shopping_cart',
      callback: shoppingCartDetaill
    }],
    post: [{
        route: '/login',
        callback: login
    },{
        route: '/add/shopping_cart',
        callback: addShoppingCart
    }],
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