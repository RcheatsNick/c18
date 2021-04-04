const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ReverseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'slowmode',
			group: 'ayarlar',
			memberName: 'slowmode',
			description: 'Kanala gönderilen mesajlarını yavaş gelmesini sağlar.',
			args: [
				{
					key: 'limit',
					prompt: 'Limit kaç olsun?',
					type: 'string'
				}
			]
		});
	}
  
  	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_CHANNELS")
	}

	run(msg, { limit }) {
    	if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_CHANNELS')) {
		return msg.channel.send('Slowmode yönetmek için `Kanalları Yönet` yetkim yok?');
	}
	if (msg.channel.type !== "text") return;
    if (limit > 120) {
    return msg.channel.sendEmbed(new Discord.RichEmbed().setDescription("Süre limiti maksimum **120** saniye olabilir.").setColor('RANDOM'));
}
msg.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır.`).setColor('RANDOM'));
		msg.channel.setRateLimitPerUser(limit)
	}
};