const { Command } = require('discord.js-commando');
const { Canvas } = require("canvas");
const { resolve, join } = require("path");
const { Attachment } = require("discord.js");
const fetch = require("node-fetch"); 
const request = require('node-superfetch');
const snekfetch = require('snekfetch');
module.exports = class ProfilCard extends Command {
	constructor(client) {
		super(client, {
			name: 'deneme33',
			aliases: [],
			group: 'ekonomi',
			memberName: 'deneme33',
			description: 'Kayıt sistemi ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},
      args: [
				{
					key: 'user',
					prompt: 'Kime tokat atıcan?',
					type: 'user',
				}
			]

		});
	}

	async run(msg , {user}) {   
        var user = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(user.id); 
        var Canvas = require('canvas')
        var canvas = Canvas.createCanvas(599, 318)
        var ctx = canvas.getContext('2d');
        const { body: mentionedBuffer } = await snekfetch.get(user.user.displayAvatarURL);
        const avatar = await Canvas.loadImage(mentionedBuffer);
        const vuran = await Canvas.loadImage(msg.author.displayAvatarURL);
        const arka = await Canvas.loadImage('https://cdn.discordapp.com/attachments/663220987948564531/679125272100077568/tokatla.png');
  ctx.drawImage(arka , 0 , 0);
  ctx.strokeStyle = '#3F51B5';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#3F51B5';
  ctx.shadowBlur = 3;
  ctx.beginPath();
  ctx.arc(166, 66, 50, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.save();
  ctx.clip();
  ctx.drawImage(vuran, 116, 15, 100, 100);
  ctx.restore();
  ctx.strokeStyle = '#3F51B5';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#3F51B5';
  ctx.shadowBlur = 3;
  ctx.beginPath();
  ctx.arc(400, 95, 50, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.save();
  ctx.clip();
  ctx.drawImage(avatar, 350, 44, 100, 100);
  msg.channel.send({files:[{attachment:canvas.toBuffer(),name:"dreambotadamdır.png"}]})
  }
};
