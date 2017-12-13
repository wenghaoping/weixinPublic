/**
 * Created by Admin on 2017/12/11.
 */
'use strict';
// 接口验证
const sha1 = require('sha1');
const getRawBody = require('raw-body'); // 得到xml数据
const Wechat = require('./wechat');
const util = require('./util');

module.exports = function (opts, handler) {
    let wechat = new Wechat(opts);

    return function *(next) {
        console.log(this.query);
        // 我们在传入这个中间件的时候，首先初始化这个 Wechat，获取到一个实例，后面使用
        const token = opts.token;
        const signature = this.query.signature;
        const nonce = this.query.nonce;
        const timestamp = this.query.timestamp;
        const echostr = this.query.echostr;
        // 字典排序
        const str = [token, timestamp, nonce].sort().join('');
        // 加密
        const sha = sha1(str);
        // 第一次get请求，来验证是不是开发者
        if (this.method === 'GET') {
            if (sha === signature) {
                this.body = echostr + '';
            } else {
                this.body = 'wrong';
            }
        } else if (this.method === 'POST') {
            if (sha !== signature) {
                this.body = 'wrong';
                return false;
            };
            // 拿到微信返回的xml数据
            let data = yield getRawBody(this.req, {
                length: this.length,
                limit: '1mb',
                encoding: this.charset
            });
            // xml解析成json格式
            let content = yield util.parseXMLAsync(data);
            // 取出消息中的主体部分
            let message = content.xml;

            // 解析后挂在在微信一个参数上，方便在wechat.js中获取
            this.weixin = message;
            // 这里的 handler 就是 app.js 里面传进来的 reply.reply
            yield handler.call(this, next);
            // 把参数传给wechat
            wechat.reply.call(this);
        }
    }
};

