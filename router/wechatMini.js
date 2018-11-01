let login = require('../wechatMini/login');
let Router = {
    get: [],
    post: [{
        route: '/login',
        callback: login
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