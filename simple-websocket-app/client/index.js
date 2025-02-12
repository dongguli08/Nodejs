const ws = new WebSocket('ws://localhost:7071/ws')

ws.onmessage = (WebSocketMessage) =>{
    console.log(WebSocketMessage)
    console.log(WebSocketMessage.data)
}


document.body.onmousemove = (event) =>{
    const messageBody = {
        x: event.clientX,
        y: event.clientY
    }
    ws.send(JSON.stringify(messageBody));

}