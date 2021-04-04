const commando = require('discord.js-commando')
const Discord = require('discord.js');
var steam = require('steam-provider')
var provider = new steam.SteamProvider();

module.exports = class steamCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'steam',
      group: 'ayarlar',
      memberName: 'steam',
      description: 'Steamda oyun arar',
      examples: ['steam "oyun ismi"'],
      throttling: {
        usages: 1,
        duration: 5
      },
      			args: [
				{
					key: 'oyun',
					prompt: 'Lütfen steamda olan bir oyun ismi girin',
					type: 'string',
				},
			]
    })
  }

  async run(message, args) {
        let steampng = "https://cdn.discordapp.com/attachments/458004691402489856/470344660364034049/steam.png"
    provider.search(args.oyun).then(result => {
    provider.detail(result[0].id, "turkey", "tr").then(results => {
        console.log(results)
    const embed = new Discord.RichEmbed()
    .setAuthor('Steam', steampng)
    .setTitle(result[0].name)
    .addField(`Oyunun ID'sı`, result[0].id)
    .setThumbnail(results.otherData.imageUrl)
    .addField('Türleri', results.genres)
    .addField('Fiyatı', `Normal Fiyat **${results.priceData.initialPrice}** TL İndirimli Fiyat **${results.priceData.finalPrice}** TL`,)
    .addField('Platformlar', results.otherData.platforms,)
    .addField('Metacritic Puanı', results.otherData.metacriticScore,)
    .addField('Etiketleri', results.otherData.features,)
    .addField('Geliştiricileri', results.otherData.developer,)
    .addField('Yayımcıları', results.otherData.publisher)
    .setColor('ffb900')
    message.channel.send(embed).catch(e => {
        console.log(e)
        message.channel.send('Hata Oluştu yada `' + args.oyun + '` Adlı Oyun Bulunamadı')
    })
})
})
  }
}