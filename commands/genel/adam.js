const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Canvas = require('canvas');
const snekfetch = require('snekfetch');

module.exports = class WastedCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'adam',
			aliases: ['adam'],
			group: 'genel',
			memberName: 'adam',
			description: 'İstediğiniz bir kişye adam efekti verir.',
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'user',
					label: 'kullanıcı',
					prompt: 'Kime adam demek istersin?',
					type: 'user',
				}
			]
		});
	}

async run(message, { user }) {
  var user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(user.id); 

  const canvas = Canvas.createCanvas(500, 500);
  const ctx = canvas.getContext('2d');
  const {body: downloadedImageBuffer} = await snekfetch.get(user.user.displayAvatarURL)
  const background = await Canvas.loadImage( downloadedImageBuffer );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#009688"
  ctx.font = '40px serif';
  ctx.fillText('BU PROFiLiN SAHiBi', 50, 100, 400);
  
  ctx.fillStyle = "#0097A7"
  ctx.font = '40px serif';
  ctx.fillText('ADAMDIR', 140, 400, 400);


  const attachment = new Discord.Attachment(canvas.toBuffer(), "dreambotadamdir.png");
 // message.channel.send(attachment);
                  const embed = new Discord.RichEmbed()
                        .setImage(`attachment://dreambotadamdir.png`)
                        .setColor("RANDOM")
                message.channel.send({embed, files:[{attachment:canvas.toBuffer(),name:"dreambotadamdir.png"}]})
}

};