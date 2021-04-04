const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');
const ms = require('parse-ms')
module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yılbaşı',
			aliases: [],
			group: 'genel',
			memberName: 'yılbaşı',
			description: 'Kayıt sistemi ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},
		});
	}

	async run(msg) {
  let yılbaşı = new Date('2021-1-1:00:00')
    let zaman = ms(yılbaşı - Date.now())
    msg.channel.send(`Yılbaşının kutlanmasına **${zaman.days}** gün **${zaman.hours}** saat **${zaman.minutes}** dakika kaldı!`)
	}
};
