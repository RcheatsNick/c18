const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
var search = require('youtube-search');
 
var opts = {
  maxResults: 10,
  key: 'AIzaSyCO5YZJdRx0V9wk5Hn1JxGn3jG-C2SWD84'
};

module.exports = class ReverseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'youtube-video-ara',
      aliases: ['youtubevideoara'],
			group: 'ayarlar',
			memberName: 'youtube-video-ara',
			description: 'İstediğiniz videoyu youtubeda arar',
        args: [
				{
					key: 'ara',
          label:'arama',
					prompt: 'Aramak istediğiniz videonun adını yazın.',
					type: 'string',
				}
			]
		});
	}

	run(message , args) { 
     search(args.ara, opts, function(err, results) {
  if(err) return console.log(err);
  

const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.addField('Videonun Adı' , results[0].title)
.addField('Videonun Linki', `[Tıklayın](${results[0].link})` , true)
.addField('Video ID', results[0].id , true)
.addField('Videonun Yüklenme Tarihi', results[0].publishedAt , true)
.addField('Kanalın Adı', results[0].channelTitle , true)
.addField('Kanal ID', results[0].channelId , true)
.addField('Kanalın Linki', `[Tıklayın](https://www.youtube.com/channel/${results[0].channelId})` , true)
.addField('Videonun Açıklaması', results[0].description , true)
.setThumbnail(`https://img.youtube.com/vi/${results[0].id}/maxresdefault.jpg`)
.setFooter(message.author.tag + ' Tarafından istendi' , message.author.displayAvatarURL)

message.channel.send(embed)
});
	}
};