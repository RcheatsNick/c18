const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kayıt-mesaj',
			aliases: ['kayıt-mesaj-ayarla','kayıtmesaj'],
			group: 'genel',
			memberName: 'kayıt-mesaj',
			description: 'Kayıt mesajını ayarlamanızı/değiştirmenizi sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'km',
					prompt: 'Kayıt mesajı ne olsun?\nSunucu ismini göstermek için {sunucu} Kullanıcı ismini göstermek için {kullanıcı} yaza bilirsin.',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message, args) {
			const vt = this.client.provider.get(message.guild.id, 'kayitMesaj', []);
			const db = this.client.provider.get(message.guild.id, 'kayitMesajK', []);
			if (vt === args.km) {
				this.client.provider.set(message.guild.id, 'kayitMesajK', true);
				message.channel.send(`:x: Kayıt mesajı zaten **${args.km}** olarak ayarlı!`);
			} else {
				this.client.provider.set(message.guild.id, 'kayitMesaj', args.km);
				this.client.provider.set(message.guild.id, 'kayitMesajK', true);
				return message.channel.send(`:white_check_mark: Kayıt mesajı "**${args.km}**"  olarak ayarlandı.`);
			}
	}
};