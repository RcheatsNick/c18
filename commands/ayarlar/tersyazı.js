const { Command } = require('discord.js-commando');

module.exports = class ReverseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ters',
			group: 'ayarlar',
			memberName: 'ters',
			description: 'Yazdığınız cümleyi ters çevirir.',
			args: [
				{
					key: 'text',
					prompt: 'Neyi ters çevirmek istersiniz?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { text } , bakım) {
	msg.channel.send(text.split('').reverse().join(''));
	}
};