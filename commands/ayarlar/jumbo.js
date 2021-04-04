const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'jumbo',
			aliases: ['jumboo'],
			group: 'ayarlar',
			memberName: 'jumbo',
			description: 'Emoji büyütür.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'emoji',
					prompt: 'Bir emoji ismi girin.',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(message, args) {
try {
let emojijumbo = this.client.emojis.find(e => e.name === `${args.emoji}`).id

const emoj = new Discord.Attachment(`https://cdn.discordapp.com/emojis/${emojijumbo}`, 'emoji.png')
  message.channel.send(emoj)
} catch (e) {
    const error = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('Bir hata ile karşılaştık : \n`' + e.message + '')
    return message.channel.sendEmbed(error);
}
    
  }
  
}