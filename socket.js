const { Server }= require('socket.io')

let io

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*'
        }
    })

    io.use((socket, next) => {
        const api_key = socket.handshake.auth.api_key;
        if (api_key === process.env.API_MAIN_KEY) {
            next();
        } else {
            next(new Error('Socket Authentication Error, invalid API Key'));
        }
    });

    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
            console.log('A User has disconnected!');
        });
    });

    return io;
}

const getSocketIO = () => {
    if(!io) {
        throw new Error('Socket.io is not initialized!')
    }

    return io
}

module.exports = {
    initSocket,
    getSocketIO,
};