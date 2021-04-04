const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'giriş-rolü-kapat',
			aliases: ['girişrolükapat', 'girisrolukapat' , 'otorolkapat'],
			group: 'ayarlar',
			memberName: 'giriş-rolü-kapat',
			description: 'Giriş rolünü kapatmanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			}
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			const db = this.client.provider.get(msg.guild.id, 'girisRolK', []);
			if (db === true) {
	  this.client.provider.set(msg.guild.id, 'girisRolK', false);
        this.client.provider.set(msg.guild.id, 'girisRol', false);
				msg.channel.send(`<:check:509661885843505153> Giriş rolü kapatıldı.`);
			} else {
				return msg.channel.send(`<:xx:509661885973397504> Giriş rolü zaten kapalı.`);
			}
	}
};