var http = require('http');
var https = require('https');
var koa = require('koa');
var koaBody = require('koa-body');
var router = require('./src/router');
var md = require('./src/mdware/md1');

var app = new koa();
//添加中间件或是路由
app.use(koaBody({ multipart: true }));
app.use(md); //排除http.status！=200 的情况
app.use(router.routes());

//创建服务
http.createServer(app.callback()).listen(63002);
// var options = {
//     key: fs.readFileSync('./ssl/server.key'),  //ssl文件路径
//     cert: fs.readFileSync('./ssl/server.pem')  //ssl文件路径
// };
// https.createServer(options,app.callback()).listen(444);
console.log('server is running');