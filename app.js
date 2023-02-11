const http = require('http')
const routes = require('./routes')

// FUNCTION DEFINED IN SITU
// const server = http.createServer((req, res) => {
//   routes(req, res)
// })

// FUNCTION PREDEFINED, WITH IMPLICIT ARGUMENTS PASSED IN
// createServer req -->
//              res --> routes --> (req, res)
const server = http.createServer(routes)

server.listen(3000)