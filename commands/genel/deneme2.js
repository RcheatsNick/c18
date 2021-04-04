const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'deneme2',
			aliases: [],
			group: 'genel',
			memberName: 'deneme2',
			description: 'Kayıt sistemi ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},

		});
	}

	async run(msg , args) {
    var hi = this.client.users.array();
      var usr = hi[`${Math.floor(Math.random() * this.client.users.size)}`];
      var embed = new Discord.RichEmbed();
      embed.setTitle(`Random avatarın sahibi ${usr.username}`);
      if (usr.displayAvatarURL.includes('.gif'))
        embed.setImage(`${usr.displayAvatarURL}&.gif`);
      else
        embed.setImage(usr.displayAvatarURL);


      embed.setColor('#89ff89');
      msg.channel.send({ embed });
	}
};
