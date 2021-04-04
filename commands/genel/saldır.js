const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const ayarlar = require('../../ayarlar.json')

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'saldır',
			aliases: [],
			group: 'genel',
			memberName: 'saldır',
			description: 'Kayıt sistemi ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},
                args: [
                  				{
					key: 'user',
					prompt: 'Kime saldırmak istersin ?',
					type: 'user',     
					},
			]
		});
	}

	async run(msg , args) {
  if(args.user.id === ayarlar.owner) return msg.channel.send(`Hey sen sana diyorum <@${msg.author.id}> sen benim sahibime saldırı yapamassın.`)
  msg.channel.send('Saldırı başladı.')
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  
setTimeout(() => {
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 1000);

setTimeout(() => {
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 2000);

setTimeout(() => {
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 3000);

setTimeout(() => {
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 40000);

setTimeout(() => {
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 50000);

setTimeout(() => {
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 60000);

setTimeout(() => {
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 70000);

setTimeout(() => {
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 80000);

setTimeout(() => {
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 90000);

setTimeout(() => {
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 10000);

setTimeout(() => {
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 11000);

setTimeout(() => {
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 3000);

setTimeout(() => {
msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 3000);

setTimeout(() => {
 msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 3000);

setTimeout(() => {
 msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  }, 3000);

setTimeout(() => {
  msg.channel.send(`${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user} ${args.user}`)  
}, 3000);
  
	}
};
