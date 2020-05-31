const http = require('http');
const app = require('./app');
const { init } = require('./api/config/socket_io');

const server = http.createServer(app);

init(server);

const port = process.env.PORT || 3030;
server.listen(port, () => console.log(`Server is running on port ${port}`));
