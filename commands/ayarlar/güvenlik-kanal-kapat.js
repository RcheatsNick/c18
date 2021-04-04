const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'güvenlik-kanal-kapat',
			aliases: ['güvenlikkanalkapat', 'güvenlikkanal-kapat'],
			group: 'ayarlar',
			memberName: 'güvenlik-kanal-kapat',
			description: 'Güvenlik kanalını kapatmanızı sağlar.',
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
			const vt = this.client.provider.get(msg.guild.id, 'güvenlikkanal', []);
			const db = this.client.provider.get(msg.guild.id, 'güvenlikkanalK', []);
			if (vt === false) {
				this.client.provider.set(msg.guild.id, 'güvenlikkanalK', false);
				msg.channel.send(`<:xx:509661885973397504> Güvenlik kanalı zaten kapalı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'güvenlikkanal', false);
				this.client.provider.set(msg.guild.id, 'güvenlikkanalK', false);
        msg.guild.settings.set('güvenlikkanal', false);
				msg.guild.settings.set('güvenlikkanal', false);
				return msg.channel.send(`<:check:509661885843505153> Güvenlik kanalı kapatıldı`);
			}
    }
};