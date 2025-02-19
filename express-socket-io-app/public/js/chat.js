const socket = io();  // 클라이언트에서 서버와 WebSocket 연결 생성

// 현재 페이지의 URL에서 username과 room 값을 가져옴
const query = new URLSearchParams(location.search);
const username = query.get('username');
const room = query.get('room');

// 서버에 join 이벤트를 보내 방에 참여 요청
socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = '/'; // 에러 발생 시 홈으로 이동
    }
});

// 사이드바 업데이트를 위한 Mustache 템플릿 가져오기
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// 방 정보 업데이트 (roomData 이벤트 수신)
socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    });
    document.querySelector('#sidebar').innerHTML = html;
});

// 메시지 리스트, 템플릿 요소 가져오기
const messages = document.querySelector('#messages');
const messageTemplate = document.querySelector('#message-template').innerHTML;

// 메시지 수신 시 UI 업데이트 (message 이벤트 수신)
socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });

    messages.insertAdjacentHTML('beforeend', html);
    scrollToBottom(); // 메시지를 추가할 때마다 자동 스크롤
});

// 스크롤을 가장 아래로 이동하는 함수
function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
}

// 메시지 전송 폼 관련 요소 가져오기
const messageForm = document.querySelector('#message-form');
const messageFormInput = messageForm.querySelector('input');
const messageFormButton = messageForm.querySelector('button');

// 메시지 전송 이벤트
messageForm.addEventListener('submit', (e) => {
    e.preventDefault(); // 폼의 기본 동작(새로고침) 방지

    messageFormButton.setAttribute('disabled', 'disabled'); // 전송 버튼 비활성화

    const message = e.target.elements.value; // 입력된 메시지 가져오기

    // 서버에 sendMessage 이벤트 전송
    socket.emit('sendMessage', message, (error) => {
        messageFormButton.removeAttribute('disabled'); // 응답이 오면 버튼 활성화
        messageFormInput.value = ''; // 입력 필드 초기화
        messageFormInput.focus(); // 입력 필드에 다시 포커스

        if (error) {
            console.log(error);
        }
    });
});
