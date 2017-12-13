/**
 * Created by Admin on 2017/12/12.
 */
'use strict'

const ejs = require('ejs');
const heredoc = require('heredoc');

let tpl = heredoc(function () {/*
<xml>
<ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
<FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
<CreateTime><%= createTime %></CreateTime>
<MsgType><![CDATA[<%= msgType %>]]></MsgType>
<% if (msgType === 'text') { %>
<Content><![CDATA[<%= content %>]]></Content>
<% } else if (msgType === 'image') { %>
 <Image>
 <MediaId><![CDATA[<%= media_id %>]]></MediaId>
 </Image>
<% } else if (msgType === 'voice') { %>
<Voice>
    <MediaId><![CDATA[<%= media_id %>]]></MediaId>
</Voice>
<% } else if (msgType === 'video') { %>
 <Video>
     <MediaId><![CDATA[<%= media_id %>]]></MediaId>
     <Title><![CDATA[<%= title %>]]></Title>
     <Description><![CDATA[<%= description %>]]></Description>
 </Video>
<% } else if (msgType === 'music') { %>
 <Music>
     <Title><![CDATA[<%= TITLE %>]]></Title>
     <Description><![CDATA[<%= DESCRIPTION %>]]></Description>
     <MusicUrl><![CDATA[<%= MUSIC_Url %>]]></MusicUrl>
     <HQMusicUrl><![CDATA[<%= HQ_MUSIC_Url %>]]></HQMusicUrl>
     <ThumbMediaId><![CDATA[<%= media_id %>]]></ThumbMediaId>
 </Music>
<% } else if (msgType === 'news') { %>
 <ArticleCount><%= content.length %></ArticleCount>
 <Articles>
     <% content.forEach(function(item) { %>
     <item>
         <Title><![CDATA[<%= item.title %>]]></Title>
         <Description><![CDATA[<%= item.description1 %>]]></Description>
         <PicUrl><![CDATA[<%= item.picurl %>]]></PicUrl>
         <Url><![CDATA[<%= item.url %>]]></Url>
     </item>
 <% }) %>
 </Articles>
<% } %></xml>
*/});


let compiled = ejs.compile(tpl);

module.exports = {
    compiled: compiled
};
