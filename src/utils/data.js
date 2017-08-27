var sqlite3 = require('sqlite3').verbose();
var config = require('../../config');

var dataBase = [];
console.log(config.dbFile);
var db = new sqlite3.Database(config.dbFile);


createTable();

function createTable() {
    db.serialize(function() {
        db.run('create table if not exists html (id integer primary key autoincrement,href text,html text)', function(err) {
            if (err) console.log(err);
        });
        db.run('create unique index if not exists html_index on html (href asc)', function(err) {
            if (err) console.log(err);
        });
    });
}
exports.db = db;

exports.asyncFindLink = async function(link) {
    return new Promise(function (resolve, reject) {
        db.all('select * from html where href = ? limit 0,1',[link],function(err,res){
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        });
    });
}

exports.asyncInsertLink = async function(link,html) {
    return new Promise(function (resolve, reject) {
        db.all('insert into html (href,html) values (?,?)',[link,html],function(err,res){
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        });
    });
}

exports.asyncUpdateLink = async function(link,html) {
    return new Promise(function (resolve, reject) {
        db.all('update html set href = ?,html = ? where href = ?',[link,html,link],function(err,res){
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        });
    });
}