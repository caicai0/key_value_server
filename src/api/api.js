var router = require('koa-router')();
var data = require('../utils/data');

var save = async function (ctx,next) {
    try{
        var url = ctx.request.body.url;
        var htmlString = ctx.request.body.html;
        if(url && htmlString){
            var html = await data.asyncFindLink(url);
            if(html && html.length){
                data.asyncUpdateLink(url,htmlString);
            }else{
                data.asyncInsertLink(url,htmlString);
            }
            ctx.body = JSON.stringify({code:0});
        }else{
            ctx.body = JSON.stringify({code:1,errMessage:'参数不全',url:url,html:htmlString});
        }
    }catch(e){
        ctx.throw(1000, e);
    }
}

var get = async function (ctx,next) {
    try{
        var url = ctx.request.body.url;
        if(url){
            var htmls = await data.asyncFindLink(url);
            if(htmls && htmls.length){
                var html = htmls[0];
                ctx.body = JSON.stringify({code:0,html:html.html});
            }else{
                ctx.body = JSON.stringify({code:1,errMessage:'不存在'});
            }
        }else{
            ctx.body = JSON.stringify({code:1,errMessage:'参数不全',url:url});
        }
    }catch(e){
        ctx.throw(1000, e);
    }
}

module.exports.save = save;
module.exports.get = get;