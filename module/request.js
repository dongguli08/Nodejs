module.exports.A=1  

function encrypt(data){
    return "encrypted data"
}

 
function send(url,data){
    const encryptedData = encrypt(data);
    console.log(`${encryptedData} is being sent to ${url}`)
}

module.exports = {
    send    //send 함수를 다른 파일에서도 사용할 수 있도록 내보내는 역할을 하는 거야.
 } //require('./request') 사용하면 이 파일에 있는 send함수를 사용할수 있다.