/**
 * Created by Administrator on 14-10-13.
 */
var mongoose = require('mongoose');
var db       = mongoose.createConnection('mongodb://127.0.0.1:27017/MbiDb');
db.on('error', function(error) {     console.log(error); });

// Schema 结构
var mongooseSchema = new mongoose.Schema({     mid : {type : String, default : 'id'},     item    : {type : String} });
// 添加 mongoose 实例方法
mongooseSchema.methods.findbymid = function(mid, callback) {     return this.model('mainMaterial').find({mid: mid}, callback); }

// 添加 mongoose 静态方法，静态方法在Model层就能使用
mongooseSchema.statics.findbyitem = function(item, callback) {     return this.model('mainMaterial').find({item: item}, callback); }

// model
var mongooseModel = db.model('mainMaterial', mongooseSchema);

// 增加记录 基于 entity 操作
var doc = {mid : '2', item : 'rock'};
var mongooseEntity = new mongooseModel(doc);
mongooseEntity.save(function(error) {
    if(error) {
        console.log(error);     }
    else {
        console.log('saved OK!');
    }
// 关闭数据库链接
//db.close();
});


// 增加记录 基于model操作
var doc = {mid : '3', item : 'water'};
mongooseModel.create(doc, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('save ok');
    }     // 关闭数据库链接
 //   db.close();
});
db.close();

