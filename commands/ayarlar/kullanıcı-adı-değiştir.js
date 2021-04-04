const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ReverseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kullanıcı-adı-değiştir',
      aliases: ['kullanıcıadıdeğiştir'],
			group: 'ayarlar',
			memberName: 'kullanıcı-adı-değiştir',
			description: 'İstediğiniz kullanıcının sunucudaki kullanıcı adını değiştirirsiniz. ',
        args: [
				{
					key: 'user',
          label:'kullanıcı',
					prompt: 'Kimin kullanıcı adını değiştirmek istersin?',
					type: 'user',
				},
          {
					key: 'yeniisim',
          label:'yeniisim',
					prompt: 'Ne yapmak istersin adını?',
					type: 'string',
				}
			]
		});
	}

  	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_NICKNAMES")
	}

  
	run(message , args) { 
      if (message.channel.permissionsFor(this.client.user).has("MANAGE_NICKNAMES")) {  
   const member = message.guild.member(args.user.id)
   member.setNickname(args.yeniisim) 
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Kullanıcı adı değiştirildi')
    .setThumbnail(member.user.displayAvatarURL)
    .addField('Eski isim', member.user.username , true)
    .addField('Yeni isim', args.yeniisim , true)
    .setFooter(`${message.author.tag} Tarafından değiştirildi` , message.author.displayAvatarURL)
    message.channel.send(embed)
      }else {
        message.channel.send('Kullanıcıları yönet yetkim yok kardeşim.')
      }
	}
};