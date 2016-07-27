import env from './env'
import Redis from 'ioredis-eventemitter'
import clc from 'cli-color'

const author = clc.xterm(56).italic
const notice = clc.xterm(14)
const cyan = clc.xterm(10).bold
const js = clc.xterm(28).bold
console.log(js('Este esta Coisando com Javascript'))
let redis = new Redis({
	port: env.redis.port,
	host: env.redis.host,
	password: env.redis.password
})

redis.on('*', (channel, msg) => {
	if (channel === 'message:new') {
		console.log(' ');
		console.log(cyan('New Message:'));
		console.log(notice(' '+msg.data.message));
		console.log(author(' - '+msg.data.author));
	}
})
