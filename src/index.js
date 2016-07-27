import env from './env'
import Redis from 'ioredis-eventemitter'
import Redis_true from 'ioredis'
import helmet from 'helmet'
import express from 'express'
import {Server} from 'http'
import socketIo from 'socket.io'
import prompt from 'prompt'

let app = express()
let http = Server(app)
let io = socketIo(http)

let messages = []

app.use(helmet())
app.use(express.static(__dirname + '/public'))

let redis = new Redis({
	port: env.redis.port,
	host: env.redis.host,
	password: env.redis.password
})

let red = new Redis_true({
	port: env.redis.port,
	host: env.redis.host,
	password: env.redis.password
})

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected')
//   })
// })

redis.on('tipologia:*', (channel, msg) => {
	if(channel === 'message:new'){
		messages.push(msg.data)
		red.set('messages', JSON.stringify(messages))
		io.emit('new message', msg)
	}
})

let i_d = 0

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html')
})

http.listen(env.port, function () {
	red.get('messages').then(function (result) {
		messages = JSON.parse(result)
	});
	console.log('listening on *: ' + env.port)
	startPrompt()
})

const startPrompt = () => {
		prompt.start();

	  prompt.get(['Message'], function (err, result) {
			redis.emit('message:new', { data: {author: 'System', message: result.Message},id:i_d++ })
			startPrompt()
	  });
}

// setInterval(()=>{
// 	redis.emit('message:new', { data: quotes[Math.floor(Math.random()*5+1) ],id:i_d++ })
// },2000)

let quotes = [{
	message: "Stay Hungry. Stay Foolish.",
	author: "Steve Jobs"
},{
	message: "Good Artists Copy, Great Artists Steal.",
	author: "Pablo Picasso"
},{
	message: "Argue with idiots, and you become an idiot.",
	author: "Paul Graham"
},{
	message: "Be yourself; everyone else is already taken.",
	author: "Oscar Wilde"
},{
	message: "Simplicity is the ultimate sophistication.",
	author: "Leonardo Da Vinci"
},{
	message: "I`d Rather Die than Lose My Life.",
	author: "The Crimson Grasshopper"
}]
