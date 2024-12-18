const express = require('express');
const mysql = require('mysql8'); // npm install mysql
const path = require('path');
const static = require('serve-static'); // 경로 때문에 사용
const dbconfig = require('./config/dbconfig.json');
const { error } = require('console');
const { exec } = require('child_process');

// Database connection pool 
const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database,
    debug: false
});

const app = express();
app.use(express.urlencoded({ extended: true })); // ?user[name]=John&user[age]=25 같은 데이터를 user: { name: 'John', age: '25' } 형태로 만듬
app.use(express.json()); // 클라이언트가 JSON 데이터를 전송하면, Express가 그 데이터를 자동으로 파싱해서 req.body에 객체 형태로 담아준다.
app.use('/public', static(path.join(__dirname, 'public')));


app.post('/process/login',(req,res)=>{
    console.log('/process/login 호출됨' + req);
    const {id,password} = req.body 

    console.log('로그인 요청'+id+' '+password);

    pool.getConnection((err,conn)=>{
        if (err) {
            console.error('Mysql getConnection error: ' + err);
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
            res.write('<h2>DB서버 연결 실패</h2>');
            res.end();
            return;
        }
        conn.query('select id,`password` from `users` where `id`=? and `password`=?',
            [id,password],
            (err,rows) => {
                conn.release();
                console.log('실행된 SQL 쿼리:' + exec.sql)
                if(err){
                    console.dir(err)
                    console.error('SQL 실행시 오류 발생: ' + err);
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
                    res.write('<h2>SQL 쿼리 실행 실패</h2>');
                    res.end(); 
                    return;
                }
                if(rows.length>0){
                    console.log('아이디 [%s], 패스워드가 일치하는 사용자[%s] 찾음',id,rows[0].name )
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
                    res.write('<h2>로그인 성공 </h2>');
                    res.end();
                    return
                }
                else{
                    console.log('아이디 [%s], 패스워드가 일치 없음',id)
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
                    res.write('<h2>로그인 실패 아이디와 패스워드를 확인하세요</h2>');
                    res.end();
                    return
                }
            }
        )
    })
 });  

app.post('/process/adduser', (req, res) => {
    console.log('/process/adduser 호출됨' + req);

    const { id, name, age, password } = req.body;

    pool.getConnection((err, conn) => {
        if (err) {
            console.error('Mysql getConnection error: ' + err);
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
            res.write('<h2>DB서버 연결 실패</h2>');
            res.end();
            return;
        }
    

        //console.log(id,name,age,password);
        console.log('데이터베이스와 연동됨.');

        const exec = conn.query(
            'INSERT INTO users(id, name, age, password) VALUES(?, ?, ?,?);',
            [id, name, age, password],
            (err, result) => {
                conn.release(); // 연결을 반드시 종료시켜야 함

                if (err) {
                    console.error('SQL 실행시 오류 발생: ' + err);
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
                    res.write('<h2>SQL 쿼리 실행 실패</h2>');
                    res.end();
                    return;
                }

                if (result) {
                    console.log('Inserted 성공');
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
                    res.write('<h2>사용자 추가 성공</h2>');
                    res.end();
                } else {
                    console.log('Inserted 실패');
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
                    res.write('<h2>사용자 추가 실패</h2>');
                    res.end();
                }
            }
        );
    });
});

app.listen(8000, () => {
    console.log('localhost:8000');
});
