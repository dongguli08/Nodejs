const express = require('express');
const router = express.Router(); //라우터 객체(router)를 생성하기 위해 사용하는 코드야.
router.use(express.json());

const OrderController = require('./controller');//controller 파일에서 요청을 불러옴

router.get("/list",OrderController.GetAllOrder);
router.get("/user/:id",OrderController.GetOrderByUserId);
router.get("/:id",OrderController.GetOrderByOrderId);
router.put("/:id",OrderController.UpdateOrderByOrderId);
router.post("/",OrderController.AddOrderByOrderId);
router.delete("/:id",OrderController.DeleteOrderByOrderId);

module.exports = router; 
///Router: 말 그대로 특정 경로로 들어온 요청을 controller로 routing을 하기 위해 사용
