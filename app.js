const http = require('http')
const fs = require('fs')

// OLD
// function requestListener(req, res) {

// }

// http.createServer(requestListener)

//EVENT DRIVEN
// http.createServer(function(req, res) {

// })

// ARROW

const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method
  if (url === '/') {
    res.write('<html>')
    res.write('<head><title>My Response Page</title></head>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">SUBMIT</button></form></body>')
    res.write('</html>')
    return res.end()
  }
  if (url === '/message' && method === 'POST') {
    const body = []
    req.on('data', (chunk) => {

      console.log(chunk)
      body.push(chunk)
    })
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      const message = parsedBody.split('=')[1]
      fs.writeFileSync('message.txt', message)
    })

    // fs.writeFileSync('message.txt', 'MESSAGE RECEIVED')
    res.statusCode = 302
    res.setHeader('Location', '/')
    return res.end()
  }

  // console.log(req.url)
  // console.log(req.method)
  // console.log(req.headers)
  // console.log(req.body)
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head><title>My Response Page</title></head>')
  res.write('<body><h1 style="color:cornflowerblue;">Hello World!</h1></body>')
  res.write('</html>')
  res.end()
})

server.listen(3000)