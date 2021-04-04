const { Command } = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'banlist',
			aliases: ['banlists'],
			group: 'genel',
			memberName: 'banlist',
			description: 'Bot info.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 60
			}
		});
	}

	
	async run(message, args) {
  var userlist = message.guild.fetchBans();
   userlist.then(collection =>
   {
     if(collection.first() == null)
     {
       const embed = new Discord.RichEmbed()
       .setAuthor(`${message.guild.name} | Sunucusu banlı kişiler`,message.guild.iconURL)
       .setDescription('Banlı kişi yok')
       .setColor("RANDOM");
       message.channel.send({embed});
     }
     else
     {
       const embed = new Discord.RichEmbed()
       .setAuthor(`${message.guild.name} | Sunucusu banlı kişiler`,message.guild.iconURL)
       .setColor("RANDOM");
       for(userlist of collection)
       {
           var user = userlist[1];
           embed.addField(user.tag,user.id);
       }
       message.channel.send({embed});
     }
   });
	}
};