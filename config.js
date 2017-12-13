/**
 * Created by Admin on 2017/12/12.
 */
const path = require('path');

const util = require('./libs/util');
const wechat_file = path.join(__dirname, './config/wechat.txt');

const config = {
    wechat: {
        appID: 'wx759e64d76fb5e328',
        appSecret: 'c72dd4c64de08c17f71d3424ed1d47ab',
        token: 'wenghaoping',
        getAccessToken: function () {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken: function (data) {
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data);
        }
    }
};
module.exports = config;