const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'destek-kanal-kapat',
			aliases: ['destekkanalkapat', 'destekkanalkapat'],
			group: 'ayarlar',
			memberName: 'destek-kanal-kapat',
			description: 'Destek kanalını kapatmanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
		var ch = await args.channel;
			const vt = this.client.provider.get(msg.guild.id, 'destekkanal', []);
			const db = this.client.provider.get(msg.guild.id, 'destekkanalK', []);
			if (vt === false) {
				this.client.provider.set(msg.guild.id, 'destekkanalK', false);
				msg.channel.send(`<:xx:509661885973397504> Destek kanalı zaten kapalı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'destekkanal', false);
				this.client.provider.set(msg.guild.id, 'destekkanalK', false);
        msg.guild.settings.set('destekkanal', false);
				msg.guild.settings.set('destekkanalK', false);
				return msg.channel.send(`<:check:509661885843505153> Destek kanalı kapatıldı`);
			}
    }
};