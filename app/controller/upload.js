'use strict';
const path = require('path')
const fs = require("fs")
const md5 = require('md5')

const Controller = require('egg').Controller;

class UploadController extends Controller {
    async upload() {
        try {
            var fileStream = await this.ctx.getFileStream();
            if (fileStream) {
                var mimeType = fileStream.mimeType;
                var filename = fileStream.filename;
                if (mimeType.indexOf("image/") <= -1) {
                    this.ctx.body = await {
                        code: -1,
                        msg: "上传的图片必须是png,jpg,jpeg类型"
                    }
                }
                else {
                    var nameArr = filename.split(".");
                    var initFileName = md5('liyue' + Math.random() * 1000000) + '.' + nameArr[nameArr.length - 1];
                    var p = path.resolve(__dirname, '../public/upload/' + initFileName);
                    let result = await new Promise((resolve, reject) => {
                        var creatF = fs.createWriteStream(p);
                        fileStream.pipe(creatF);
                        let errFlag = false;
                        creatF.on('error', err => {
                            errFlag = true;
                            creatF.destroy();
                            reject(err)
                        });
                        creatF.on('finish', async () => {
                            if (errFlag) {
                                resolve({
                                    code: -1,
                                    msg: "图片传输异常",
                                    
                                })
                                return
                            }
                            var ss = fs.statSync(p);//这也是同步的
                            if(ss && ss.size/1024/1024>1){
                                // fs.unlinkSync(p)//同步，这里因为每张图片不一样的名字，可以考虑异步
                                fs.unlink(p)
                                resolve({
                                    code: -1,
                                    msg: "上传的文件必须小于1M"
                                });
                                return;
                            }
                            resolve({
                                result:{
                                    link:this.app.config.preUploadUrl+'/public/upload/'+initFileName
                                },
                                code:1,
                                msg: 'ok'
                            })
                        });
                    });
                    this.ctx.body = {
                        ...result
                    }
                }
            } 
            else {
                this.ctx.body = {
                    code: -1,
                    msg: "没有对应的图片数据~"
                }
            }
        } catch (e) {
            console.log(e)
            this.ctx.body = {
                code: -1,
                msg: "上传图片异常",
                e
            }
        }
    };
}

module.exports = UploadController;