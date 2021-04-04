const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'koruma-rollimit',
			aliases: ['korumarollimit', 'rollimit', 'rollimits'],
			group: 'ayarlar',
			memberName: 'koruma-rollimit',
			description: 'Koruma rollimitini ayarlamanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'limit',
					prompt: 'Rollimiti kaç olsun?\n',
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
			const vt = this.client.provider.set(msg.guild.id, 'rolLimit', args.limit , true);
			if (vt === args.limit) {
			this.client.provider.set(msg.guild.id, 'rolLimit', args.limit , true);
				msg.channel.send(`<:xx:509661885973397504> Rol limiti zaten **${args.limit}** olarak ayarlı.`);
			} else {
      	this.client.provider.set(msg.guild.id, 'rolLimit', args.limit , true);
				return msg.channel.send(`<:check:509661885843505153> Rol limit **${args.limit}** olarak ayarlandı.`);
			}
        }
    }
};