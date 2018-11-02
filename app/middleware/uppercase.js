module.exports = () =>{
    return async function uppercase(ctx,next) {
        if(ctx.query.name =='ok'){
            await next()
        }else {
            await ctx.render('index2.ejs')
        }
        
    }
}