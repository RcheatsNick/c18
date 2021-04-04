const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'deneme',
			aliases: [],
			group: 'genel',
			memberName: 'deneme',
			description: 'Kayıt sistemi ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},

      args: [ 
        {
    key: 'channel', 
    prompt: 'Hangi kanaldan mesajları almak istersin?\n', 
    type: 'channel' 
        } 
      ]
		});
	}

	async run(msg , args) {
     const channel = this.client.channels.get(args.channel.id)
   let x = 10; // x should be form 0 to 25
channel.fetchMessages({limit: x}).then(messages => {
  let messageArray = messages.array(); 
  const embed = new Discord.RichEmbed()
 for (let i = 0; i < messageArray.length; i++ ) {// you loop through them
    let curr = messageArray[i],
      str = curr.content.trim();
    if (str.length > 2048) str = str.substring(0, 2045) + '...';
   embed.setColor('RANDOM')
   embed.addField(curr.author.tag, str);
 }
  msg.channel.send(embed)
}).catch(console.error);
  
	}
};
