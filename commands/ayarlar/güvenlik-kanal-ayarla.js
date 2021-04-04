const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'güvenlik-kanal-ayarla',
			aliases: ['güvenlikkanal', 'güvenlikkanalayarla'],
			group: 'ayarlar',
			memberName: 'güvenlik-kanal-ayarla',
			description: 'Güvenlik kanalını ayarlamanızı sağlar. (Güvenlik kanal hesabı 30 gün önce açılan hesapları tesbit eder.)',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'channel',
					prompt: 'Güvenlik kanalı hangi kanal olsun? (#kanalismi şeklinde yazınız)\n',
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
			const vt = this.client.provider.get(msg.guild.id, 'güvenlikkanal', []);
			const db = this.client.provider.get(msg.guild.id, 'güvenlikkanalK', []);
			if (vt === args.channel.id) {
				this.client.provider.set(msg.guild.id, 'güvenlikkanalK', true);
				msg.channel.send(`<:xx:509661885973397504> Güvenlik kanalı zaten **${args.channel.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'güvenlikkanal', args.channel.id);
				this.client.provider.set(msg.guild.id, 'güvenlikkanalK', true);
				return msg.channel.send(`<:check:509661885843505153> Güvenlik kanlaı olarak ayarlanan kanal: **${args.channel.name}**`);
			}
        }
    }
};