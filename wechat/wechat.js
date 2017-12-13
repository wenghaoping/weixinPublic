/**
 * Created by Admin on 2017/12/12.
 */
'use strict';
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const util = require('./util');
// 总的请求地址
const URL = 'https://api.weixin.qq.com/cgi-bin/';
// 请求地址汇总
const api = {
    // access_token  https请求方式: GET
    access_token: URL + 'token?grant_type=client_credential'
}

function Wechat (opts) {
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;
    this.getAccessToken()
        .then((data) => {
            try {
                data = JSON.parse(data);
            }
            catch(e) {
                return this.updateAccessToken();
            }
            if (this.isValidAccessToken(data)) {
                return Promise.resolve(data);
            } else {
                return this.updateAccessToken();
            }
        })
        .then((data) => {
            this.access_token = data.access_token;
            this.expires_in = data.expires_in;
            this.saveAccessToken(data);
        })
}
// 验证token有效性
Wechat.prototype.isValidAccessToken = function (data) {
    if (!data || !data.access_token || !data.expires_in) {
        return false;
    }

    const access_token = data.access_token;
    const expires_in = data.expires_in;
    const now = (new Date().getTime());

    if (now > expires_in) {
        return true;
    } else {
        return false;
    }
};
// 更新token
Wechat.prototype.updateAccessToken = function (data) {
    const appID = this.appID;
    const appSecret = this.appSecret;
    const url = `${api.access_token}&appid=${appID}&secret=${appSecret}`;
    return new Promise(function (resolve, reject) {
        request({url: url, json: true}).then(function (response) {
            const data = response.body;
            const now = (new Date().getTime());
            const expires_in = now + (data.expires_in - 20) * 1000;
            data.expires_in = expires_in;
            resolve(data);
        })
    })

};
// 回复函数
Wechat.prototype.reply = function () {
    // 拿到回复的内容
    let content = this.body;
    let message = this.weixin;
    // 通过工具函数，生成回复的数据
    let xml = util.tpl(content, message);
    this.status = 200;
    this.type = 'application/xml';
    this.body = xml;
    console.log(xml);
};

module.exports = Wechat;