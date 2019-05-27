import io from 'socket.io-client';

const chanel = "uiChanle";
const type = 'ui'

let socket;

export const connect = (handler) => {
    socket = io.connect(process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST);

    socket.on("connect", () => {
      socket.emit("onConnect", type, `${(new Date()).getTime()}_${Math.random()}`);
    })
  
    socket.on(chanel, (data) => {
        handler(data);
    })
}

export const disconnect = () => {
    if(socket) {
        socket.disconnect();
        socket = null;
    }
}