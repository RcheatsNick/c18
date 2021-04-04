const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const client = new Discord.Client();
const DBL = require("dblapi.js"); 
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwMjE1MzQ3OTE2NDAwMjMwNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQxOTY1MjgxfQ.ZWkwa4qZien4RkFKYu18LpAQNpuoO0ytIdG_42eC0lY', client);

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dblbotara',
			aliases: ['dblbotarama'],
			group: 'ayarlar',
			memberName: 'dblbotara',
			description: 'Emoji bilgi.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'bot',
					prompt: 'DBL olan bir bot ismi girin?',
					type: 'string'
				},
        
			]
		});
	}


	async run(message, args) {
  try{

let botara = this.client.users.filter(user => user.username.toLowerCase() == args.bot.toLowerCase()).map(user => user)
dbl.getBot(botara.random().id).then(async bot => {
 dbl.getUser(bot.owners).then(async user => {
   if(bot.github) {
   let embed = {
     color: Math.floor(Math.random() * 16777214) + 1,
     timestamp: new Date(),
     "author": {
      "name": `${bot.username} | Discord Bot Bilgileri`,
      "url": `https://discordbots.org/bot/${bot.id}`,
      "icon_url": "https://images-ext-2.discordapp.net/external/TbdHBBza32atZL2n6wwJvE2PGwUkCeU3dr9Cig_JIYE/https/i.imgur.com/d9KjqZF.jpg"
    },
     "fields": [
      {
        "name": "Bot sahibi",
        "value": user.username + '#' + user.discriminator,
        "inline": true
      },
             {
        "name": "ID",
        "value": bot.id,
        "inline": true
      },
      {
        "name": "Açıklama",
        "value": bot.shortdesc,
        "inline": true
      },
      {
        "name": "Upvote Sayısı",
        "value": bot.points || '0',
        "inline": true
      },
      {
        "name": "Prefix",
        "value": bot.prefix,
        "inline": true
      },
      {
        "name": "Etiketler",
        "value": `${bot.tags}`,
      },
       {
        "name": "Kütüphane",
        "value": bot.lib,
        "inline": true
      },
       {
        "name": "Sertifikalı mı?",
        "value": `${bot.certifiedBot ? 'Evet' : 'Hayır'}`,
        "inline": true
      },
   {
        "name": "Destek sunucusu",
        "value": `[Buraya Tıkla](https://discord.gg/${bot.support})`,
        "inline": true
      },
   {
        "name": "Web Site",
        "value": `[Buraya Tıkla](https://discordbots.org/bot/${bot.website})`,
        "inline": true
      },
      {
        "name": "Github",
        "value": `[Buraya Tıkla](${bot.github})`,
        "inline": true
      },
       
   {
        "name": "Davet Bağlantısı",
        "value": `[Buraya Tıkla](${bot.invite})`,
        "inline": true
      }
    ],
      thumbnail: { url: `https://images.discordapp.net/avatars/${bot.id}/${bot.avatar}.png` },
      "footer": {
      "text": `© 2019 ${this.client.user.username}`
    },
   }
   message.channel.send({embed})
   }else{
     let embed = {
     color: Math.floor(Math.random() * 16777214) + 1,
     timestamp: new Date(),
     "author": {
      "name": `${bot.username} | Discord Bot Bilgileri`,
      "url": `https://top.gg/bot/${bot.id}`,
      "icon_url": "https://images-ext-2.discordapp.net/external/TbdHBBza32atZL2n6wwJvE2PGwUkCeU3dr9Cig_JIYE/https/i.imgur.com/d9KjqZF.jpg"
    },
     "fields": [
      {
        "name": "Bot sahibi",
        "value": user.username + '#' + user.discriminator,
        "inline": true
      },
             {
        "name": "ID",
        "value": bot.id,
        "inline": true
      },
      {
        "name": "Açıklama",
        "value": bot.shortdesc,
        "inline": true
      },
      {
        "name": "Upvote Sayısı",
        "value": bot.points || '0',
        "inline": true
      },
      {
        "name": "Prefix",
        "value": bot.prefix,
        "inline": true
      },
      {
        "name": "Etiketler",
        "value": `${bot.tags}`,
      },
       {
        "name": "Kütüphane",
        "value": bot.lib,
        "inline": true
      },
       {
        "name": "Sertifikalı mı?",
        "value": `${bot.certifiedBot ? 'Evet' : 'Hayır'}`,
        "inline": true
      },
   {
        "name": "Destek sunucusu",
        "value": `[Buraya Tıkla](https://discord.gg/${bot.support})`,
        "inline": true
      },
   {
        "name": "Web Site",
        "value": `[Buraya Tıkla](https://top.gg/bot/${bot.website})`,
        "inline": true
      },
       
   {
        "name": "Davet Bağlantısı",
        "value": `[Buraya Tıkla](${bot.invite})`,
        "inline": true
      }
    ],
      thumbnail: { url: `https://images.discordapp.net/avatars/${bot.id}/${bot.avatar}.png` },
      "footer": {
      "text": `© 2019 ${this.client.user.username}`
    },
   }
   message.channel.send({embed})
   }
   });
});
  }catch (e) {
  let embed = {
     color: Math.floor(Math.random() * 16777214) + 1,
       "author": {
      "name": 'Herhangi bir sonuç bulunamadı!'
    },
    "footer": {
      "text": `© 2019 ${this.client.user.username}`
    },
   }
    message.channel.send({embed});
}
  }
  
}