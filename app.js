/**
 * Created by Admin on 2017/12/11.
 */
'use strict';

const Koa = require('koa');
const sha1 = require('sha1');
const config = {
    wechat: {
        appID: 'wx759e64d76fb5e328',
        appSecret: 'c72dd4c64de08c17f71d3424ed1d47ab',
        token: 'wenghaoping'
    }
};

const app = new Koa();

app.use(function *(next) {
    console.log('收到请求了');
    console.log(this.query);
    const token = config.wechat.token;
    const signature = this.query.signature;
    const nonce = this.query.nonce;
    const timestamp = this.query.timestamp;
    const echostr = this.query.echostr;
    // 字典排序
    const str = [token, timestamp, nonce].sort().join('');
    // 加密
    const sha = sha1(str);

    if (sha === signature) {
        this.body = echostr + '';
    } else {
        this.body = 'wrong';
    }
})

app.listen(80);
console.log('开始8888');