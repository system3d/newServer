import env from './env'
import Redis from 'ioredis-eventemitter'
import helmet from 'helmet'

let app = require('express')()
let http = require('http').Server(app)

app.use(helmet())

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
	res.send('<h1>Hello world</h1>')
})

http.listen(env.port, function () {
	console.log('listening on *: ' + env.port)
})
