import Discord from "discord.js";

export default async function addRoleToUser(
	guild: Discord.Guild,
	user: Discord.User | Discord.GuildMember,
	role: Discord.Role | string,
) {
	const _role = (typeof role === 'string')
		? guild.roles.cache.find(r => r.name === role)
		: role;
	if (!_role) return;

	return (user instanceof Discord.GuildMember)
		? user.roles.add(_role)
		: guild.member(user)?.roles.add(_role)
}