import * as Discord from "discord.js"
import * as dotenv from 'dotenv'
import handleMessage from "./handleMessage";

dotenv.config({
	debug: false,
})

const client = new Discord.Client();

client.on('ready', () => {
	if (client.user) {
		console.log(`Logged in as ${client.user?.tag}!`);
	} else {
		console.log('Logged in but user is not defined...?')
	}
});

client.on('message', (msg: Discord.Message) => {
	handleMessage(client, msg).catch((e) => {
		console.error(e)
		return msg.reply(e)
	})
});

// TODO: Generate token on https://discord.com/developers store in .env as TOKEN
client.login(process.env.TOKEN).catch((e) => {
	console.error(e)
	// TODO: Log to file
	process.exit(0)
})
