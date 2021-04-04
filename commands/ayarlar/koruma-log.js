const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'koruma-log-ayarla',
			aliases: ['korumalogayarla', 'korumalog', 'korumalogs'],
			group: 'ayarlar',
			memberName: 'koruma-log-ayarla',
			description: 'Koruma log kanalını değiştirmenizi/ayarlamanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'channel',
					prompt: 'Koruma log kanalı hangi kanal olsun? (#kanalismi şeklinde yazınız)\n',
					type: 'channel'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
		var ch = await args.channel;
		if (ch.type == 'voice') return msg.reply('Sesli kanallar seçilemez!');
        if (args.channel) {
			const vt = this.client.provider.get(msg.guild.id, 'KlogsChannel', []);
			const db = this.client.provider.get(msg.guild.id, 'KlogsEnable', []);
			if (vt === args.channel.id) {
				this.client.provider.set(msg.guild.id, 'KlogsEnable', true);
				msg.channel.send(`<:xx:509661885973397504> Koruma log kanalı zaten **${args.channel.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'KlogsChannel', args.channel.id);
				this.client.provider.set(msg.guild.id, 'KlogsEnable', true);
				return msg.channel.send(`<:check:509661885843505153> Koruma log olarak ayarlanan kanal: **${args.channel.name}**`);
			}
        }
    }
};