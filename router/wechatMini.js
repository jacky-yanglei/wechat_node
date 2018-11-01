let login = require('../wechatMini/login');
let Router = {
    get: [],
    post: [{
        route: '/login',
        callback: login
    }],
    all: []
};
module.exports = Router;