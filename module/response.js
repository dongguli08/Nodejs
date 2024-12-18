function decrypt(data){
    return 'decrypted data'
}

function read(){
    return decrypt('data');
} //read 함수는 decrypt함수의 결과값을 반환
// 즉, read 함수는 decrypt 함수를 호출하는 중간다리 역할을 하고 있는 거지.

module.exports = {
    read
}