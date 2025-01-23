// Controller: 라우팅을 통해 받은 request를 처리하는 핵심 로직을 구현하는 코드을 의미
// 기본적으로 model 과 view 와 분리하기 위해 controller 모듈?을 사용
const repo = require('./repository');

class OrderController {
    async GetAllOrder(req, res) {   // 모든 주문 데이터를 가져오는 메서드 선언
        try {                          // 에러 발생 시도를 감싸는 try 블록 시작
            const orders = await repo.findAll();  // 데이터베이스에서 모든 주문 데이터를 비동기적으로 가져옴
            
            if (orders) {               // 주문 데이터가 존재하는지 확인
                return res.status(200).json(orders);  // 데이터가 있으면 200 응답과 함께 주문 데이터 반환
            } else {                    // 주문 데이터가 존재하지 않으면
                return res.status(200).json({ message: "no user" });  // "no user" 메시지와 함께 200 응답 반환
            }
        }  catch (err) {               // 에러가 발생한 경우
            console.log(err);         // 오류 콘솔에 출력
            return res.status(500).json({ message: "Error! Repository Fail." });  // 500 응답과 함께 에러 메시지 반환
        }
    }    

    async GetOrderByUserId(req, res) {  // 특정 사용자 ID에 해당하는 주문 데이터를 가져오는 메서드 선언
        try {                           // 에러 발생 시도를 감싸는 try 블록 시작
            const orders = await repo.findByUserId(req.params.id);  // 사용자 ID를 기반으로 주문 데이터를 비동기적으로 가져옴
            
            if (orders) {               // 주문 데이터가 존재하는지 확인
                return res.status(200).json(orders);  // 데이터가 있으면 200 응답과 함께 주문 데이터 반환
            } else {                    // 주문 데이터가 존재하지 않으면
                return res.status(200).json({ message: "no user" });  // "no user" 메시지와 함께 200 응답 반환
            }
        } catch (err) {                // 에러가 발생한 경우
            console.log(err);          // 오류 콘솔에 출력
            return res.status(500).json({ message: "Error! Repository Fail." });  // 500 응답과 함께 에러 메시지 반환
        }
    }
    

    async GetOrderByOrderId(req, res) {  // 특정 주문 ID에 해당하는 주문 데이터를 가져오는 메서드 선언
        try {                             // 에러 발생 시도를 감싸는 try 블록 시작
            const orders = await repo.findByOrderId(req.params.id);  // 주문 ID를 기반으로 주문 데이터를 비동기적으로 가져옴
            
            if (orders) {                 // 주문 데이터가 존재하는지 확인
                return res.status(200).json(orders);  // 데이터가 있으면 200 응답과 함께 주문 데이터 반환
            } else {                      // 주문 데이터가 존재하지 않으면
                return res.status(200).json({ message: "no user" });  // "no user" 메시지와 함께 200 응답 반환
            }
        } catch (err) {                  // 에러가 발생한 경우
            console.log(err);            // 오류 콘솔에 출력
            return res.status(500).json({ message: "Error! Repository Fail." });  // 500 응답과 함께 에러 메시지 반환
        }
    }
    

    async UpdateOrderByOrderId(req, res) {  // 특정 주문 ID의 주문 데이터를 업데이트하는 메서드 선언
        try {                                 // 에러 발생 시도를 감싸는 try 블록 시작
            const orders = await repo.updateByOrderId(req.params.id, req.body);  
            // 주문 ID와 함께 업데이트 데이터를 전달하여 주문 데이터를 비동기적으로 업데이트
            
            if (orders) {                    // 업데이트가 성공했는지 확인
                return res.status(200).json({ message: "success" });  // 성공 시 200 응답과 함께 "success" 메시지 반환
            } else {                         // 업데이트에 실패한 경우
                return res.status(200).json({ message: "fail" });  // 실패 시 200 응답과 함께 "fail" 메시지 반환
            }
        } catch (err) {                     // 에러가 발생한 경우
            console.log(err);               // 오류 콘솔에 출력
            return res.status(500).json({ message: "Error! Repository Fail." });  // 500 응답과 함께 에러 메시지 반환
        }
    }
    

    async AddOrderByOrderId(req, res) {  // 특정 주문 ID에 새로운 주문 데이터를 추가하는 메서드 선언
        try {                            // 에러 발생 시도를 감싸는 try 블록 시작
            const orders = await repo.addWithId(req.body);  
            // 전달받은 `req.body`를 사용해 비동기적으로 새로운 주문 데이터를 추가
            
            if (orders) {                // 추가가 성공했는지 확인
                return res.status(200).json({ message: "success" });  // 성공 시 200 응답과 함께 "success" 메시지 반환
            } else {                     // 추가에 실패한 경우
                return res.status(200).json({ message: "fail" });  // 실패 시 200 응답과 함께 "fail" 메시지 반환
            }
        } catch (err) {                // 에러가 발생한 경우
            console.log(err);          // 오류 콘솔에 출력
            return res.status(500).json({ message: "Error! Repository Fail." });  // 500 응답과 함께 에러 메시지 반환
        }
    }
    

    async DeleteOrderByOrderId(req, res) {  // 특정 주문 ID에 해당하는 주문 데이터를 삭제하는 메서드 선언
        try {                               // 에러 발생 시도를 감싸는 try 블록 시작
            const orders = await repo.deleteByOrderId(req.params.id);  
            // 주문 ID를 기반으로 데이터베이스에서 주문 데이터를 비동기적으로 삭제
            
            if (orders) {                  // 삭제가 성공했는지 확인
                return res.status(200).json({ message: "success" });  // 성공 시 200 응답과 함께 "success" 메시지 반환
            } else {                       // 주문 데이터가 존재하지 않는 경우
                return res.status(200).json({ message: "no user" });  // "no user" 메시지와 함께 200 응답 반환
            }
        } catch (err) {                   // 에러가 발생한 경우
            console.log(err);             // 오류 콘솔에 출력
            return res.status(500).json({ message: "Error! Repository Fail." });  // 500 응답과 함께 에러 메시지 반환
        }
    }
    
}

module.exports = new OrderController();