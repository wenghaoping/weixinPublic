/**
 * Created by Admin on 2017/12/12.
 */
'use strict'

exports.reply = function* (next) {
    let message = this.weixin;
    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log(`扫二维码：${message.EventKey}/${message.ticket}`);
            }
            this.body = `恭喜你订阅了啊`;
        } else if (message.Event === 'unsubscribe') {
            console.log('取消关注');
            this.body = '';
        } else if (message.Event === 'LOACTION') {
            this.body = `您上报的位置是：${message.Latitude}：${message.Longitude}：${message.Precision}`;
        } else if (message.Event === 'CLICK') {
            this.body = `您点击了菜单：${message.EventKey}`;
        } else if (message.Event === 'SCAN') {
            console.log(`关注后扫二维码：${message.EventKey}/${message.ticket}`);
            this.body = `看到你扫码了哦`;
        } else if (message.Event === 'VIEW') {
            this.body = `你点击了菜单中的链接：${message.EventKey}`;
        }
    } else if (message.MsgType === 'text') {
        let content = message.Content;
        let reply = `额，你说的${message.Content}太复杂了`;
        if (content === '1') {
            reply = `天下第一`;
        } else if (content === '2') {
            reply = `天下第二`;
        }
        this.body = reply;
    }
    yield next;
}