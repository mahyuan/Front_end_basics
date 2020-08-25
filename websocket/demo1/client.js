
const port = 4005
let count = 0;
let ws = new WebSocket(`ws://localhost:${port}/ws/chat`);

ws.onmessage = function(event) {
    console.log(`[CLIENT] open()`);
    console.log(`[CLIENT] Received: ${event}`, event);
    var data = event.data;
    console.log('data:', data);
    domInit(data, 1)
    count++;
    if (count > 23) {
        ws.send('Goodbye!');
        ws.close();
    } else {
        setTimeout(() => {
            let msg = `Hello, I'm Mr No.${count}!`
            ws.send(msg);
            domInit(msg, 0)
        }, 1000);
    }
}

ws.onopen = () => {
    console.log('on open');
    ws.send('hello ws opened')
}


function domInit(data, isMessage) {
    const app = document.getElementById('app')
    if(isMessage) {}
    const el = document.createElement('div')
    el.className = isMessage ? 'question' : 'message'
    el.innerText = data
    app.appendChild(el)
}
