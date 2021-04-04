const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sahte',
			aliases: [],
			group: 'genel',
			memberName: 'sahte',
			description: 'Kayıt sistemi ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},
                args: [
				{
					key: 'string',
					prompt: 'Sahte ayrılmakmı katılmak mı istersin',
					type: 'string',
					validate: string => {
						if (string === 'katıl' || string === 'ayrıl') return true;
						else return 'Lütfen `katıl` yada `ayrıl` yazın.';
					}
				}
			]
		});
	}

	async run(msg , args) {
       if (args.string === 'ayrıl') {
          msg.channel.send('Başarılı')
          this.client.emit('guildMemberRemove', msg.member || await msg.guild.fetchMember(msg.author));
         
        
       }
  if (args.string === 'katıl') {
     msg.channel.send('Başarılı')
     this.client.emit('guildMemberAdd', msg.member || await msg.guild.fetchMember(msg.author));
        
       }
	}
};
