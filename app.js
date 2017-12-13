/**
 * Created by Admin on 2017/12/11.
 */
'use strict';

const Koa = require('koa');
const path = require('path');
const wechat = require('./wechat/g');
const util = require('./libs/util');
const config = require('./config');
const weixin = require('./weixin');
const wechat_file = path.join(__dirname, './config/wechat.txt');

const app = new Koa();
// weixin.reply等于handler
app.use(wechat(config.wechat, weixin.reply));

app.listen(80);
console.log('开始80');