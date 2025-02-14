const http = require('http').createServer();

const io = require('socket.io')(http,{
    cors:{origin:"*"} //어디서든 요청이 와도 다 받아줌
});

io.on('connection',(socket)=>{
    console.log('a user connected')

    socket.on('message',(message)=>{
        io.emit('message',`${socket.id.substr(0,2)}said${message}`);
    });
});

http.listen(8080,()=>{
    console.log('listening on http://localhost:8080')
})