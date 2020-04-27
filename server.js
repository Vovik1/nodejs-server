const http = require('http');
const app = require('./app');
const server = http.createServer(app);

require('./api/config/socket_io')(server);

/*const io = require('socket.io')(server);

    io.on('connection', socket => {
    console.log(socket);
});*/


const port = process.env.PORT || 3030;
server.listen(port, () => console.log(`Server is running on port ${port}`));