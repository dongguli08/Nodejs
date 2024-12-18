const {send} = require('./request');//./request와 ./response 파일에서 모듈을 불러오는 코드다
const {read} = require('./response');//request.js와 response.js 파일을 불러오고 각각 request와 response 변수에 저장



function make_request(url,data){
    //요청을 보내기 
    send(url,data)
    //데이터를 리턴하기
   return read()
    
}

const responseData = make_request('https://naver.com','any data')  //make_request 함수가 실행된 결과값이 responseData로 들어가게 된다
console.log(responseData)