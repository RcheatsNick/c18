const { Command } = require('discord.js-commando');
const conf = require('../../ayarlar.json')

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'koruma-sistemi-kapat',
			aliases: ['korumakapat', 'korumasistemikapa'],
			group: 'ayarlar',
			memberName: 'koruma-sistemi-kapat',
			description: 'Koruma sistemini kapatmanızı sağlar.',
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
			const vt = this.client.provider.get(msg.guild.id, 'KlogsChannel', []);
			const db = this.client.provider.get(msg.guild.id, 'KlogsEnable', []);
			if (vt === false) {
				this.client.provider.set(msg.guild.id, 'KlogsEnable', false);
        this.client.provider.set(msg.guild.id, 'kanalLimit',  false);
        this.client.provider.set(msg.guild.id, 'rolLimit',  false);
        this.client.provider.set(msg.guild.id, 'banLimit',  false);
				msg.channel.send(`${conf.customEmoji.basarisiz} Koruma sistemi zaten kapalı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'KlogsChannel', false);
				this.client.provider.set(msg.guild.id, 'KlogsEnable', false);
        this.client.provider.set(msg.guild.id, 'kanalLimit',  false);
        this.client.provider.set(msg.guild.id, 'rolLimit',  false);
        this.client.provider.set(msg.guild.id, 'banLimit',  false);
				return msg.channel.send(`${conf.customEmoji.basarili} Koruma sistemi kapatıldı`);
			}
    }
};