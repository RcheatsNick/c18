const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');
const ms = require('parse-ms')
const db = require('quick.db')

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sunucutanıt',
			aliases: [],
			group: 'genel',
			memberName: 'sunucutanıt',
			description: 'Kayıt sistemi ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},
		});
	}

	async run(msg) {
  let timeout = 86400000
  let daily = await db.fetch(`sunucutanıt_${msg.guild.id}`);
      if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        msg.channel.send(`<:xx:509661885973397504> Sunucunu tanıtmışsın zaten, **${time.days} Gün ${time.hours} Saat  ${time.minutes} Dakika ${time.seconds} Saniye** Sonra Tekrar Deneyiniz!`)
    } else {
      let davet;
          if (msg.channel.permissionsFor(this.client.user).has("CREATE_INSTANT_INVITE")) {
            await msg.channel.createInvite({temporary: false, maxAge: 0, maxUses: 0, unique: false}).then(i => { davet = i.url });
        } else davet = 'Davet linkini almak için yeterli yetkim yok.';
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField('Sunucu Adı:', msg.guild.name)
  .addField('Sunucu Bölgesi', msg.guild.region)
  .addField('Sunucu Sahibi', msg.guild.owner.user.tag)
  .addField('Sunucudaki Üye Sayısı', msg.guild.members.filter(m => !m.user.bot).size)
  .addField('Sunucudaki Bot Sayısı', msg.guild.members.filter(m => m.user.bot).size)
  .addField('Emoji Sayısı', msg.guild.emojis.size)
  .addField('Rol Sayısı', msg.guild.roles.size)
  .addField('Davet Linki', davet)
  .setFooter(`© ${this.client.user.username} - Sunucu Tanıtma Sistemi`,this.client.user.avatarURL)
  .setTimestamp();
  msg.channel.send(embed)
      db.set(`sunucutanıt_${msg.guild.id}`, Date.now())
    }
	}
};
