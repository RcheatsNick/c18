const commando = require('discord.js-commando')
const Discord = require('discord.js');

module.exports = class steamCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'korumasistemi',
      group: 'ayarlar',
      memberName: 'korumasistemi',
      description: 'Koruma sistemi ayarları',
      examples: [''],
      throttling: {
        usages: 1,
        duration: 5
      },
    })
  }

  async run(message, args) {
    const embed = new Discord.RichEmbed()
    .setAuthor(this.client.user.username, this.client.user.avatarURL)
    .addField(`${message.guild.commandPrefix}koruma-log #logkanal`, '```Koruma kayıtlarının gönderileceği kanalı ayarlar.```')
    .addField(`${message.guild.commandPrefix}koruma-banlimit <sayı>`, '```Sunucuda birsi belirtilen sayı üzerinde ban atarsa o kişinin yetkilerini alır.```')
    .addField(`${message.guild.commandPrefix}koruma-kanallimit <sayı>`, '```Sunucuda birsi belirtilen sayı üzerinde kanal silerse o kişinin yetkilerini alır.```')
    .addField(`${message.guild.commandPrefix}koruma-rollimit <sayı>`, '```Sunucuda birsi belirtilen sayı üzerinde rol silerse o kişinin yetkilerini alır.```')
    .addField(`${message.guild.commandPrefix}selfbotkoruması`, 'Self botlara karşı sunucunuzu korur.')
    .addField(`${message.guild.commandPrefix}anti-raid-bot-sistemi aç/kapat #logkanal`, 'Sunucunuzu yabancı botlara karşı korur sadece sunucu sahibi onaylı botlar girebilir.')
    .addField(`${message.guild.commandPrefix}güvenlikkanal`, 'Sunucuya gelen kişinin güvenlir olup olmadığını gösterir.')
    .setColor('RANDOM')
    .setFooter(`© ${this.client.user.username} Koruma sistemi`,this.client.user.avatarURL)
    .setTimestamp();
    message.channel.send(embed)
  }
}