const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'destek-kanal-ayarla',
			aliases: ['destekkanal', 'destekkanalayarla'],
			group: 'ayarlar',
			memberName: 'destek-kanal-ayarla',
			description: 'Destek kanalını değiştirmenizi/ayarlamanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'channel',
					prompt: 'Destek kanalı hangi kanal olsun? (#kanalismi şeklinde yazınız)\n',
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
			const vt = this.client.provider.get(msg.guild.id, 'destekkanal', []);
			const db = this.client.provider.get(msg.guild.id, 'destekkanalK', []);
			if (vt === args.channel.id) {
				this.client.provider.set(msg.guild.id, 'destekkanalK', true);
				msg.channel.send(`<:xx:509661885973397504> Destek kanalı zaten **${args.channel.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'destekkanal', args.channel.id);
				this.client.provider.set(msg.guild.id, 'destekkanalK', true);
				return msg.channel.send(`<:check:509661885843505153> Destek olarak ayarlanan kanal: **${args.channel.name}**`);
			}
        }
    }
};