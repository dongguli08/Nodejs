const io = require('socket.io-client');  // socket.io-client 모듈을 가져옵니다.
const socket = io('ws://localhost:8080');  // 서버에 연결

socket.on('message', text => {
    const element = document.createElement('li');
    element.innerHTML = text;
    document.querySelector('ul').appendChild(element);
});

document.querySelector('button').onclick = () => {
    const text = document.querySelector('input').value;
    socket.emit('message', text);  // 서버로 메시지 전송
};
