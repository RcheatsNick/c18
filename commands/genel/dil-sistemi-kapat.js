const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');
const conf = require('../../ayarlar.json')

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dil-sistemi-kapat',
			aliases: ['dilsistemikapat'],
			group: 'genel',
			memberName: 'dil-sistemi-kapat',
			description: 'Dil sistemini kapatır.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},
		});
	}

	async run(message , args) {
      const vt = this.client.provider.get(message.guild.id, 'botDil', []);
			const db = this.client.provider.get(message.guild.id, 'botDilK', []);
			if (vt === false) {
				this.client.provider.set(message.guild.id, 'botDilK', false);
				message.channel.send(`${conf.customEmoji.basaririz} Dil sistemi zaten kapalı`);
			} else {
				this.client.provider.set(message.guild.id, 'botDil', false);
				this.client.provider.set(message.guild.id, 'botDilK', false);
				return message.channel.send(`${conf.customEmoji.basarili} Dil sistemi başarılı bir şekilde kapatıldı.`);
			}
	}
};
