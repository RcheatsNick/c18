const commando = require('discord.js-commando');
const Discord = require('discord.js');
const ms = require('ms');
const fs = require("fs");
const db = require('quick.db')

module.exports = class AvatarCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'rol-ver',
            aliases: ['rolver'],
            group: 'ayarlar',
            memberName: 'rol-ver',
            description: 'Sunucudaki kişiye istediğiniz rolü verir.',
            guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 10
             },
                     args: [
                {
                    key: 'rol',
                    prompt: 'Hangi rolü vermek istersin?',
                    type: 'role',
                },
				{
				key: 'user',
				prompt: 'Kime vermek istersin?',
				type: 'member',
				},
       {
				key: 'sure',
				prompt: 'Rol ne kadar dursun?',
				type: 'string',
				},
            ]
        });
    }
  
  hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_ROLES")
	}
  
  async run(msg ,args) {
  const {rol,user , sure} = args;
  
       if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_ROLES')) {
            return msg.channel.send('Rolü vermek için yetkim yok?\n**Not:** Rolü verebilmem için rolleri yönet yetkisine sahip olmamlazım ve rolümün verilecek rolün üstünde olması lazım.');
        }

db.set(`sürelirol.${user.id}.user`, user.id)    
db.set(`sürelirol.${user.id}.sunucu`, msg.guild.id)
db.set(`sürelirol.${user.id}.rol`, rol.id)
db.set(`sürelirol.${user.id}.süre`, Date.now() + parseInt(sure) * 1000)
let member = msg.guild.member(user.id)
await(member.addRole(rol.id));
    const embed = new Discord.RichEmbed()
   .setColor(0x79cec1)
  .setDescription(`**${rol.name}** Adlı rol **${user.user.username}** adlı kişiye verildi.`)
  msg.channel.send(embed); 
}
      
  };
