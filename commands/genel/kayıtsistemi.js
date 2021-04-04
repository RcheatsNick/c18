const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kayıtsistemi',
			aliases: ['kayıtsistem','kayıt-sistemi'],
			group: 'genel',
			memberName: 'kayıtsistemi',
			description: 'Kayıt sistemi ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	async run(msg) {
    const embed = new Discord.RichEmbed()
    .setAuthor(`${this.client.user.username} Kayıt sistemi`,this.client.user.avatarURL)
    .addField(`• ${msg.guild.commandPrefix}kayıt-kanal #kanal 》`, "Üyelerin kayıt olacağı ve kayıt mesajının atılacağı kanalı ayarlar.")
    .addField(`• ${msg.guild.commandPrefix}kayıt-rol <rolismi> 》`, "Üyelerin kayıt olurken emojiye bastıklarında alacakları rolü ayarlar.")
    .addField(`• ${msg.guild.commandPrefix}kayıt-mesaj <mesaj> 》`, "Üyelere kayıt olurken emojiye basacakları mesajı ayarlar.")
    .addField(`• ${msg.guild.commandPrefix}kayıt-emoji <emojiid> 》`, "Üyelerin kayıt olurken alacakları rol için basacakları emojiyi ayarlar")
    .addField(`• ${msg.guild.commandPrefix}kayıt-sistemi-kapat 》`, "Kayıt sistemini kapatır ve tüm ayarları sıfırlar.")
    .setFooter(`© ${this.client.user.username}`,this.client.user.avatarURL)
    .setTimestamp();
		return msg.channel.send({embed});
	}
};
