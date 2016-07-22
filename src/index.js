import env from './env'
import Redis from 'ioredis-eventemitter'
import helmet from 'helmet'
import express from 'express'

let app = express()
let http = require('http').Server(app)

app.use(helmet())
app.use(express.static(__dirname + '/public'));

let redis = new Redis({
	port: env.redis.port,
	host: env.redis.host,
	password: env.redis.password
})

redis.on('*:newuser', (channel, user) => {
	console.log(channel);
	console.log(user);
})

setTimeout(()=>{
	redis.emit('myservice:newuser', { id:'a1b2c3', email:'foo@example.com' });
},2000)

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html')
})

http.listen(env.port, function () {
	console.log('listening on *: ' + env.port)
})
