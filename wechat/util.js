/**
 * Created by Admin on 2017/12/12.
 */
'use strict'

const xml2js = require('xml2js');
const Promise = require('bluebird');
const tpl = require('./tpl');
// 解析xml转换成json格式
exports.parseXMLAsync = function (xml) {
    return new Promise(function (resolve, reject) {
        xml2js.parseString(xml, {trim: true, explicitArray : false}, function (err, content) {
            if (err) reject(err);
            else resolve(content);
        })
    })
};

// 拿到对应的回复参数，去调用函数，拼成回复模板
exports.tpl = function (content, message) {
    console.log(message);
    let info = {};
    let type = 'text';
    let FromUserName = message.FromUserName;
    let ToUserName = message.ToUserName;
    if (Array.isArray(content)) {
        type = 'news';
    }
    type = content.type || type;
    info.content = content;
    info.createTime = Date.parse(new Date())/1000;
    info.msgType = type;
    info.toUserName = FromUserName;
    info.fromUserName = ToUserName;

    return tpl.compiled(info);
}







function formatMessage(result) {
    let message = {};
    console.log('result' + result.toString());
    if (typeof result === 'object') {
        let keys = Object.keys(result);

        for (let i = 0; i < keys.length; i++) {
            let item = result[keys[i]];
            let key = keys[i];

            if(!(item instanceof Array) || item.length === 0) {
                continue;
            }

            if(item.length === 1) {
                let val = item[0];
                if(typeof val === 'object') {
                    message[key] = formatMessage(val);
                } else {
                    message[key] = (val || '').trim();
                }
            } else {
                message[key] = [];

                for(let j = 0, k = item.length; j < k; j++) {
                    message[key].push(formatMessage(item[j]))
                }
            }
        }
    }
    return message;
}

exports.formatMessage = function (xml) {
    return new Promise(function (resolve, reject) {
        xml2js.parseString(xml, {trim: true, explicitArray : false}, function (err, content) {
            if (err) reject(err);
            else resolve(content);
        })
    })
};