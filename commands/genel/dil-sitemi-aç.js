const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');
const conf = require('../../ayarlar.json')

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dil-sistemi-aç',
			aliases: ['dilsitemiaç'],
			group: 'genel',
			memberName: 'dil-sistemi-aç',
			description: 'Botun dilin değiştirmenizi sağlar.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},
                args: [
				{
					key: 'string',
					prompt: 'Botu hangi dilde kullanmak istersin? (en veya tr)',
					type: 'string',
					validate: string => {
						if (string === 'tr' || string === 'en') return true;
						else return 'Lütfen `tr` yada `en` yazın.';
					}
				}
			]
		});
	}

	async run(message , args) {
       if (args.string === 'tr') {
         			const vt = this.client.provider.get(message.guild.id, 'botDil', []);
			const db = this.client.provider.get(message.guild.id, 'botDilK', []);
			if (vt === args.string) {
				this.client.provider.set(message.guild.id, 'botDilK', true);
				message.channel.send(`${conf.customEmoji.basarisiz} Bot dili zaten **${args.string}** olarak ayarlı!`);
			} else {
				this.client.provider.set(message.guild.id, 'botDil', args.string);
				this.client.provider.set(message.guild.id, 'botDilK', true);
				return message.channel.send(`${conf.customEmoji.basarili} Bot dili "**${args.string}**"  olarak ayarlandı.`);
			}
       }
  if (args.string === 'en') {
     			const vt = this.client.provider.get(message.guild.id, 'botDil', []);
			const db = this.client.provider.get(message.guild.id, 'botDilK', []);
			if (vt === args.string) {
				this.client.provider.set(message.guild.id, 'botDilK', true);
				message.channel.send(`${conf.customEmoji.basarisiz} Bot dili zaten **${args.string}** olarak ayarlı!`);
			} else {
				this.client.provider.set(message.guild.id, 'botDil', args.string);
				this.client.provider.set(message.guild.id, 'botDilK', true);
				return message.channel.send(`${conf.customEmoji.basarili} Bot dili "**${args.string}**"  olarak ayarlandı.`);
			}
       }
	}
};
