const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'selfbot-koruması',
			aliases: ['selfbotkoruma','selfbotkoruması'],
			group: 'ayarlar',
			memberName: 'selfbot-koruması',
			description: 'Self botlarına karşı sunucunuzu korur.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'string',
					prompt: 'Self bot koruması açılsın mı?\n Açmak için `aç` Kapatmak için `kapat` yazınız.',
					type: 'string',
					validate: string => {
						if (string === 'aç' || string === 'kapat') return true;
						else return 'Lütfen açmak için  `aç` yada kapatmak için `kapat` yazın.';
					}
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			if (args.string === "aç") {
				const vt = this.client.provider.get(msg.guild.id, 'selfbotkoruma', []);
				this.client.provider.set(msg.guild.id, 'selfbotkoruma', true);
				return msg.channel.send(`<:check:509661885843505153> Self bot koruması özelliği: **açıldı**.`);
			}
			if (args.string === "kapat") {
				const vt = this.client.provider.get(msg.guild.id, 'selfbotkoruma', []);
				this.client.provider.set(msg.guild.id, 'selfbotkoruma', false);
				return msg.channel.send(`<:check:509661885843505153> Self bot koruması özelliği: **kapatıldı**.`);
			}
	}
};