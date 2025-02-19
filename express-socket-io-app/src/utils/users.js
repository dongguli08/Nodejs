const users = [];

// 유저 추가
const addUser = ({ id, username, room }) => {
    username = username.trim();
    room = room.trim();

    if (!username || !room) {
        return {
            error: '사용자 이름과 방이 필요합니다.'
        };
    }

    const existingUser = users.find((user) => user.room === room && user.username === username);
    if (existingUser) {
        return {
            error: '사용자 이름이 사용 중입니다.'
        };
    }

    // 유저 저장
    const user = { id, username, room };
    users.push(user);
    return { user };
};

// 특정 방에 있는 유저들 반환
const getusersInRoom = (room) => {
    room = room.trim();
    return users.filter((user) => user.room === room);
};

// id로 유저 찾기
const getUser = (id) => {
    return users.find((user) => user.id === id);
};

const removeUser = (id) =>{
    const index = users.findIndex((user)=>user.id === id);
}

module.exports = {
    addUser,
    getusersInRoom,
    getUser
};
