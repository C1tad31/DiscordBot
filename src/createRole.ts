import Discord from "discord.js";

type CreateRoleOptions = {
	reason?: string,
	allowDuplicateName?: boolean
}

export default async function createRole(guild: Discord.Guild, data: Discord.RoleData, options?: CreateRoleOptions) {
	if (!options?.allowDuplicateName) {
		const role = guild.roles.cache.find(role => role.name === data.name);
		if (role) return;
	}
	return guild.roles.create({data, reason: options?.reason})
}
