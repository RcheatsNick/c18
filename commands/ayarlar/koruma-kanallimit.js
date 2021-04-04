const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'koruma-kanallimit',
			aliases: ['korumakanallimit', 'kanallimit', 'kanallimits'],
			group: 'ayarlar',
			memberName: 'koruma-kanallimit',
			description: 'Koruma kanal limitini ayarlamanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'limit',
					prompt: 'Kanal limiti kaç olsun?\n',
					type: 'integer'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
        if (args.limit) {
			const vt = this.client.provider.set(msg.guild.id, 'kanalLimit', args.limit , true);
			if (vt === args.limit) {
			this.client.provider.set(msg.guild.id, 'kanalLimit', args.limit , true);
				msg.channel.send(`<:xx:509661885973397504> Kanal limiti zaten **${args.limit}** olarak ayarlı.`);
			} else {
      	this.client.provider.set(msg.guild.id, 'kanalLimit', args.limit , true);
				return msg.channel.send(`<:check:509661885843505153> Kanal limiti **${args.limit}** olarak ayarlandı.`);
			}
        }
    }
};