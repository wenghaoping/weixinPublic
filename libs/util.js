/**
 * Created by Admin on 2017/12/12.
 */
'use strict'

const fs = require('fs');
const Promise = require('bluebird');

exports.readFileAsync = function (fpath, encoding) {
    return new Promise(function (resolve, reject) {
        // 读取文件
        fs.readFile(fpath, encoding, function (err, content) {
            if (err) reject(err)
            else resolve(content);
        });
    })
};

exports.writeFileAsync = function (fpath, encoding) {
    return new Promise(function (resolve, reject) {
        // 读取文件
        fs.writeFile(fpath, encoding, function (err, content) {
            if (err) reject(err)
            else resolve(content);
        });
    })
}