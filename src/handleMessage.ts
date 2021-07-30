import {splitByWhitespace} from "./util";
import createRole from "./createRole";
import addRoleToUser from "./addRoleToUser";
import Discord from "discord.js";

export default async function handleMessage(client: Discord.Client, msg: Discord.Message) {
	if (msg.author.id === client.user?.id) {
		return // Ignore my own messages
	}

	if (msg.content === 'ping') {
		return msg.reply('pong');
	}

	if (msg.content.startsWith("!role create")) {
		if (!msg.guild) return;
		const [, , roleName, color] = splitByWhitespace(msg.content)
		if (!roleName) return msg.reply("roleName required")

		return createRole(msg.guild, {
			name: roleName,
			color: color.toUpperCase(),
		}).then((role) => {
			if (!role) return msg.reply(`Role "${roleName}" already exists`)
			return msg.reply(`created role: ${role}`)
		}).catch((e) => {
			console.error(e)
			return msg.reply('failed to create role')
		})
	}

	if (msg.content.startsWith('!role add')) {
		if (!msg.guild) return;
		const [, , roleName] = splitByWhitespace(msg.content)
		return addRoleToUser(msg.guild, msg.author, roleName).then((user: Discord.GuildMember | undefined): unknown => {
			if (!user) return msg.reply('no go')
			return msg.react('👀')
		}).catch((error) => {
			return msg.reply(error)
		})
	}

	if (msg.content === '!role list') {
		const roles = msg.guild?.roles.cache.array()
		if (!roles) return msg.reply(`no roles found`)
		return msg.reply(`roles: ${roles?.join(', ')}`)
	}
}
