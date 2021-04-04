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
			name: 'deneme44',
			aliases: [],
			group: 'ekonomi',
			memberName: 'deneme44',
			description: 'Kayıt sistemi ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},

		});
	}

	async run(msg) {   
    
        var Canvas = require('canvas')
        var canvas = Canvas.createCanvas(400, 200)
        var ctx = canvas.getContext('2d');
        const vuran = await Canvas.loadImage(msg.author.displayAvatarURL);
        const arka = await Canvas.loadImage('https://cdn.discordapp.com/attachments/662961967413067806/679445243694940180/seviye.png');
  ctx.drawImage(arka , 0 , 0);
  ctx.strokeStyle = '#3F51B5';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#3F51B5';
  ctx.shadowBlur = 3;
  ctx.beginPath();
  ctx.arc(80, 130, 50, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.save();
  ctx.clip();
  ctx.drawImage(vuran, 30, 80, 100, 100);
  ctx.restore();
  ctx.fillStyle = "#fff"
  ctx.font = '15px serif';
  ctx.fillText(msg.author.tag, 170, 50, 400);
  ctx.fillStyle = "#fff"
  ctx.font = '13px serif';
  ctx.fillText('1', 240, 100, 400);
  ctx.fillStyle = "#fff"
  ctx.font = '13px serif';
  ctx.fillText('1', 230, 137, 400);
  ctx.fillStyle = "#fff"
  ctx.font = '13px serif';
  ctx.fillText('1', 205, 173, 400);
  msg.channel.send({files:[{attachment:canvas.toBuffer(),name:"dreambotadamdır.png"}]})
  }
};
