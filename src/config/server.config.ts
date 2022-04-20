const http = require("http");
const {app} = require('./express.config')


const APP_PORT = process.env.PORT || 4007;
const APP_SERVER = http.createServer(app);


APP_SERVER.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));

exports.server = APP_SERVER;