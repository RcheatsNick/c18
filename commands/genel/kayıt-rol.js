const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kayıt-rolü-ayarla',
			aliases: ['kayıt-rol','kayıtrol'],
			group: 'genel',
			memberName: 'kayıt-rolü-ayarla',
			description: 'Giriş rolünü belirlemenizi/ayarlamanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'rol',
					prompt: 'kayıt rolü hangi rol olsun? (rol ismini yazınız)\n',
					type: 'role',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			const vt = this.client.provider.get(msg.guild.id, 'kayitRol', []);
			const db = this.client.provider.get(msg.guild.id, 'kayitRolK', []);
			if (vt === args.rol.id) {
				this.client.provider.set(msg.guild.id, 'kayitRolK', true);
				msg.channel.send(`Kayıt rolü zaten **${args.rol.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'kayitRol', args.rol.id);
				this.client.provider.set(msg.guild.id, 'kayitRolK', true);
				return msg.channel.send(`:white_check_mark:  Kayıt rolü olarak ayarlanan rol: **${args.rol.name}**`);
			}
	}
};