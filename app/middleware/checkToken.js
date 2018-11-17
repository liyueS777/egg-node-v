module.exports = (options,app) =>{
    return async function checkoutToken(ctx,next) {
        // await app.redis.set("ii",123)
        console.log('ctx.headers1111111111111111111:',ctx.headers.token,ctx.session)
        if(!ctx.headers.token){
            ctx.body = await {
                code:-1,
                msg:"缺少token"
            }
        }else{
            var redisToken = await app.redis.get(ctx.session.sessionId);
            // var redisToken = await app.redis.get(ctx.headers.token);
            console.log('redisToken:',redisToken)
            // 有就是具体值，没有就是null
            if(redisToken){
                await next()
            }else {
                ctx.body = await {
                    code:-1,
                    msg:"token不存在或者已经失效"
                }
            }
            
        }
    }
}