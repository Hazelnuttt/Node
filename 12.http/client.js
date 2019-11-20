const http = require('http')
let options = {
  host: 'localhost',
  port: 3000,
  path: '/',
  method: 'post',
  headers: { 'Content-Type': 'application/json' }
}
let client = http.request(options, function(res) {
  res.on('data', function(chunk) {
    console.log(chunk.toString())
  })
})

// client.end(JSON.stringify({ name: 'wly' }))
client.end(JSON.stringify({ name: 'www' }))
