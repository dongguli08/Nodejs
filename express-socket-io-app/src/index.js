const express = require('express');  // Express 모듈 가져오기
const http = require('http');        // Node.js 기본 HTTP 모듈
const path = require('path');        // 파일 경로 조작 모듈
const { Server } = require('socket.io'); // Socket.IO 모듈 가져오기
const { addUser, getusersInRoom, getUser } = require('./utils/users'); // 유저 관리 함수
const { generateMessage } = require('./utils/messages'); // 메시지 생성 함수

const app = express(); // Express 애플리케이션 생성
const server = http.createServer(app); // HTTP 서버 생성
const io = new Server(server); // WebSocket 서버 생성 (Socket.IO 사용)

io.on('connection', (socket) => {
    console.log('새로운 사용자 연결됨:', socket.id);

    // 사용자가 방에 입장할 때 처리
    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options });
        if (error) {
            return callback(error); // 오류 발생 시 콜백 실행
        }

        socket.join(user.room); // 사용자를 특정 방에 입장시킴

        // 해당 사용자에게 환영 메시지 전송
        socket.emit('message', generateMessage('Admin', `${user.room}방에 오신 걸 환영합니다.`));

        // 같은 방의 다른 유저들에게 입장 알림 메시지 브로드캐스트
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username}가 방에 참여했습니다.`));

        // 방의 유저 목록을 업데이트하여 전체 방 사용자에게 전송
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getusersInRoom(user.room)
        });
    });

    // 사용자가 메시지를 보낼 때 처리
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id); // 사용자 정보 가져오기

        if (user) {
            io.to(user.room).emit('message', generateMessage(user.username, message)); // 메시지 전체 전송
        }
        callback(); // 메시지 전송 완료 후 클라이언트 측에서 실행할 콜백 호출
    });

    // 사용자가 연결을 종료할 때 처리
    socket.on('disconnect', () => {
        console.log('사용자 연결 해제됨:', socket.id);
        const user = removeUser(socket.id);
        // TODO: 사용자 목록에서 제거하는 로직 추가 가능
    });
});

// 정적 파일 제공 (클라이언트에서 HTML, CSS, JS 파일 로드 가능)
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

// 서버 실행
const port = 4000;
server.listen(port, () => {
    console.log(`서버 실행 중... 포트: ${port}`);
});
