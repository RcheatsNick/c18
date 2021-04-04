const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'selam',
			aliases: ['selamcak'],
			group: 'genel',
			memberName: 'selam',
			description: 'Sunucuya giren kişiler otomatik rol verir.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},
		});
	}

	async run(msg, args) {
	msg.channel.send('sa')
	}
};