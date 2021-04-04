const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'giriş-mesaj-ayarla',
			aliases: ['girişmesajayarla','giriş-mesaj-ayarla','giriş-mesajı-ayarla','giriş-mesaj'],
			group: 'ayarlar',
			memberName: 'giriş-mesaj-ayarla',
			description: 'Sunucuya giren kişiler otomatik rol verir.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'mesaj',
					prompt: 'Giriş mesajı ne olsun? (Sunucu adı eklemek için {sunucu} kullanıcı eklemek için {kullanıcı} ekleye bilirsiniz.)',
					type: 'string',
				},
      {
					key: 'channel',
					prompt: 'Giriş mesajı hangi kanala gönderilsin?',
					type: 'channel',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
    const { channel} = args;
      msg.guild.settings.set('girişKanal', channel.id);
	        const vt = this.client.provider.get(msg.guild.id, 'girisMesaj', []);
			const db = this.client.provider.get(msg.guild.id, 'girisMesajK', []);
			if (vt === args.mesaj) {
				this.client.provider.set(msg.guild.id, 'girisMesajK', true);
				msg.channel.send(`<:xx:509661885973397504> Giriş mesajı zaten ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'girisMesaj', args.mesaj);
				this.client.provider.set(msg.guild.id, 'girisMesajK', true);
				return msg.channel.send(`<:check:509661885843505153> Giriş mesajı aktif edildi.\n<:check:509661885843505153> Giriş mesaj kanalı **${args.channel.name}**\n<:check:509661885843505153> Giriş mesajı: **${args.mesaj}**`);
			}
	}
};