const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json')
module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reboot',
			aliases: ['reboott'],
			group: 'ayarlar',
			memberName: 'reboot',
			description: 'Emoji büyütür.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author)
	}

	async run(message, args) {
        let em = new Discord.RichEmbed()
.setDescription(":wave: Yeniden başlatılıyor...")
.setTimestamp()
.setColor("GOLD")
        message.channel.send(em).then((msg) => {
        client.destroy().then(() => client.login(ayarlar.token)).then(() => {
let embed = new Discord.RichEmbed()
.setDescription(`:thumbsup: ${this.client.user.username} Yeniden başlatıldı`)
.setThumbnail(this.client.user.avatarURL)
.setTimestamp()
.setColor("GOLD")
            msg.edit(embed)
        });
    });
  }
  
}