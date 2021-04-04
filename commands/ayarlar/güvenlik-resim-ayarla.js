const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'güvenlik-resim-ayarla',
			aliases: ['güvenlikresim', 'güvenlikresimayarla'],
			group: 'ayarlar',
			memberName: 'güvenlik-resim-ayarla',
			description: 'Güvenlik resmini ayarlamanızı sağlar. (Güvenlik kanal hesabı 30 gün önce açılan hesapları tesbit eder.)',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'resim',
					prompt: 'Resim urlsi yazın.\n',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
		var ch = await args.resim;
		if (ch.type == 'voice') return msg.reply('Sesli kanallar seçilemez!');
        if (args.resim) {
			const vt = this.client.provider.get(msg.guild.id, 'güvenlikresim', []);
			const db = this.client.provider.get(msg.guild.id, 'güvenlikkresimK', []);
			if (vt === args.resim) {
				this.client.provider.set(msg.guild.id, 'güvenlikkresimK', true);
				msg.channel.send(`<:xx:509661885973397504> Güvenlik resim zaten aynı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'güvenlikresim', args.resim);
				this.client.provider.set(msg.guild.id, 'güvenlikkresimK', true);
				return msg.channel.send(`<:check:509661885843505153> Güvenlik resmi olarak ayarlanan resim: **${args.resim}**`);
			}
        }
    }
};