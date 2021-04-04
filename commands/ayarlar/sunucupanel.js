const Discord = require('discord.js')
const { Command } = require('discord.js-commando');

module.exports = class WhitelistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sunucupanel',
			aliases: ['sunucu-paneli-oluştur','sunucu-panel'],
			group: 'ayarlar',
			memberName: 'sunucupanel',
			description: 'Sunucuya kanallardan oluşan panel yapar.',
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}
	
    async run(message, args) {
				const vt = this.client.provider.get(message.guild.id, 'sunucuPanel', []);
				this.client.provider.set(message.guild.id, 'sunucuPanel', true);
  var sunucupanel = message.guild.createChannel("» Sunucu Panel", "category").then(sp => {
	var toplamkullanıcı =  message.guild.createChannel(`Toplam Kullanıcı Sayısı: ${message.guild.memberCount}`, "voice").then(ss => {
        ss.setParent(sp)
     				this.client.provider.set(message.guild.id, 'toplamKullanici', ss.id);
                   let role = message.guild.roles.find(a => a.name ===  "@everyone");
        ss.overwritePermissions(role, {
            CONNECT: false,
        });
})
var toplamkişi =  message.guild.createChannel(`Toplam Kişi Sayısı: ${message.guild.members.filter(m => !m.user.bot).size}`, "voice").then(ss => {
	ss.setParent(sp)
				 this.client.provider.set(message.guild.id, 'toplamKişi', ss.id);
			   let role = message.guild.roles.find(a => a.name ===  "@everyone");
	ss.overwritePermissions(role, {
		CONNECT: false,
	});
})
var toplambot =  message.guild.createChannel(`Toplam Bot Sayısı: ${message.guild.members.filter(m => m.user.bot).size}`, "voice").then(ss => {
	ss.setParent(sp)
				 this.client.provider.set(message.guild.id, 'toplamBot', ss.id);
			   let role = message.guild.roles.find(a => a.name ===  "@everyone");
	ss.overwritePermissions(role, {
		CONNECT: false,
	});
})
var banlı = message.guild.fetchBans().then(bans => message.guild.createChannel(`Toplam Banlı Sayısı: ${bans.size}`, "voice")).then(ss => {
	ss.setParent(sp)
				 this.client.provider.set(message.guild.id, 'toplamBanli', ss.id);
			   let role = message.guild.roles.find(a => a.name ===  "@everyone");
	ss.overwritePermissions(role, {
		CONNECT: false,
	});
})
  })
  message.channel.send("Sunucu panel ayarlandı!")
}
}