const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kayıt-kanal',
			aliases: ['kayıt-kanal-ayarla','kayıtkanal'],
			group: 'genel',
			memberName: 'kayıt-kanal',
			description: 'Kayıt kanalı ayarlamanızı/değiştirmenizi sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'kanal',
					prompt: 'Kayıt kanalı hangi kanal olsun?',
					type: 'channel'
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message, args) {
			const vt = this.client.provider.get(message.guild.id, 'kayitKanal', []);
			const db = this.client.provider.get(message.guild.id, 'kayitKanalK', []);
			if (vt === args.kanal.id) {
				this.client.provider.set(message.guild.id, 'kayitKanalK', true);
				message.channel.send(`:x: Kayıt kanalı zaten **<#${args.kanal.id}>** kanalı olarak ayarlı!`);
			} else {
				this.client.provider.set(message.guild.id, 'kayitKanal', args.kanal.id);
				this.client.provider.set(message.guild.id, 'kayitKanalK', true);
				return message.channel.send(`:white_check_mark: Kayıt kanalı **<#${args.kanal.id}>** kanalı olarak ayarlandı.`);
			}
	}
};