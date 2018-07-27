let socket = require('socket.io');
let express = require('express');
let http = require('http');
let fs = require('fs');
let qs = require('qs');
let MYSQLEvents = require('mysql-events');
let mysql = require('mysql');

let app = express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});
let server = http.createServer(app);

let io = socket.listen(server);
console.log('Server Started');


let dsn = {
    host : 'localhost',
    user : 'root',
    password : '',
}
let testMySQML = () => {
    let dsn2 = {
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'testsocketio'
    }
    let connection = mysql.createConnection(dsn2);
    connection.connect();
    connection.query('SELECT * FROM user',(err,rows,fields)=>{
        if(err) throw err;
        console.log(rows);
    });
}

let mysqlEventWatcher = MYSQLEvents(dsn);

let watcher = mysqlEventWatcher.add('testsocketio.user', ( oldRow , newRow , e ) => {
    console.log(oldRow,newRow);
    if( oldRow === null ){
        console.log(newRow);
        io.sockets.emit('message',newRow);
    }

    if( newRow === null ){

    }

    if( newRow !== null && newRow !== null){

    }
});


io.sockets.on('connection', client => {
    console.log('new client');
    client.on('message', data => {

    })
})

server.listen(8080,()=>{
    console.log('listen');
})