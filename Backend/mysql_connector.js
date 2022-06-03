const mysql=require("mysql")

const sqlconnection=mysql.createPool({
    connectionLimit:1000,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'album_database'
})


module.exports=sqlconnection