const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sunucukurulum',
			aliases: [],
			group: 'genel',
			memberName: 'sunucukurulum',
			description: 'Sunucuya giren kişiler otomatik rol verir.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {

    msg.guild.channels.forEach(m => {m.delete()})

var bilgipanel = msg.guild.createChannel("» Bilgi Kanalları", "category").then(bilgipanel => {
  var kural = msg.guild.createChannel(`📑│kurallar-bilgi`, "text").then(kural => {
            let role = msg.guild.roles.find(a => a.name === "@everyone");
        kural.overwritePermissions(role, {
            SEND_MESSAGES: false,
        });
         kural.setParent(bilgipanel) 
kural.send('```' + `md
> Kurallar
1. Küfür etmek, hakaretlerde bulunmak yasaktır!
2. Reklam yapmak, link atmak sunucu içersin de de, sunucudaki bir üyeye özelden mesaj olarak ta kesinlikle yasaktır!
3. #komutlar kanalı dışında bir kanalda komut kullanmak yasaktır!
4. Sesli kanallarda bas açmak vb. hareketler yapmak yasaktır!
5. Din, dil, ırk ayrımı yapmak yasaktır!
6. Siyaset hakkında tartışmak, konuşmak yasaktır!
7. Spam ve flood yapmak yasaktır!
8. Uygunsuz davranışlarda bulunmak, uygunsuz paylaşımlar yapmak yasaktır!
- Kuralları okumamak kesinlikle yasaktır!` + 
'```')
    kural.send('```' + `md
[NOT]: Sunucudaki her üye *yetkili dahil* kuralları okumuş olarak kabul edilir.
Buradaki maddelere herhangi bir karşı gelme olayı olduğu an "bilmiyordum, 
okumamıştım" gibi bahanelerin *hiç biri* umursanmaz ve gerekli işlem yapılır!` +
'```')
    })
    var duyuru = msg.guild.createChannel(`📢│duyurular`, "text").then(duyuru => {
      let role = msg.guild.roles.find(a => a.name === "@everyone");
        duyuru.overwritePermissions(role, {
            SEND_MESSAGES: false,
        });
         duyuru.setParent(bilgipanel) 
    })
        var öneri =   msg.guild.createChannel(`✉️│önerileriniz`, "text").then(öneri => {
         öneri.setParent(bilgipanel) 
    })
    })

var sohbetpanel = msg.guild.createChannel("» Sohbet Kanalları", "category").then(sohbetpanel => {
  var sohbet = msg.guild.createChannel(`💬│sohbet`, "text").then(sohbet => {
         sohbet.setParent(sohbetpanel) 
    sohbet.send("Sunucu kuruluyor lütfen bekleyin....")
    .then(nmsg => nmsg.edit('Kanallar oluşturuluyor....'))
    .then(nmsg => nmsg.edit('Kanallar düzenleniyor....'))
    .then(nmsg => nmsg.edit('Roller Oluşturuluyor....'))
    .then(nmsg => nmsg.edit('Roller düzenleniyor....'))
    .then(nmsg => nmsg.edit('Sunucu kurulumu tamamlandı.'));
    })
    var botdeneme = msg.guild.createChannel(`🤖│bot-deneme`, "text").then(botdeneme => {
         botdeneme.setParent(sohbetpanel) 
    })
        var resim = msg.guild.createChannel(`📸│resim-yükle`, "text").then(resim => {
         resim.setParent(sohbetpanel) 
    })
    })

var botpaneli = msg.guild.createChannel("» Bot Paneli", "category").then(panel => {
let role = msg.guild.roles.find(a => a.name === "@everyone");
panel.overwritePermissions(role, {
            SEND_MESSAGES: false,
        });
  var gelengiden = msg.guild.createChannel(`📥│gelen-giden`, "text").then(gelengiden => {
  let role = msg.guild.roles.find(a => a.name === "@everyone");
         gelengiden.setParent(panel) 
gelengiden.overwritePermissions(role, {
            SEND_MESSAGES: false,
        });
    })
    var modlog = msg.guild.createChannel(`📝│mod-log`, "text").then(modlog => {
  let role = msg.guild.roles.find(a => a.name === "@everyone");
         modlog.setParent(panel) 
modlog.overwritePermissions(role, {
            SEND_MESSAGES: false,
        });
    })
        var log = msg.guild.createChannel(`📋│log`, "text").then(log => {
        this.client.provider.set(msg.guild.id, 'logsChannel', log.id);
				this.client.provider.set(msg.guild.id, 'logsEnable',  true);
  let role = msg.guild.roles.find(a => a.name === "@everyone");
         log.setParent(panel) 
log.overwritePermissions(role, {
            SEND_MESSAGES: false,
        });
    })
  var sayaç = msg.guild.createChannel(`⏰│sayaç`, "text").then(sayaç => {
  let role = msg.guild.roles.find(a => a.name === "@everyone");
         sayaç.setParent(panel) 
sayaç.overwritePermissions(role, {
            SEND_MESSAGES: false,
        });
    })
    })

var yetkilipanel = msg.guild.createChannel("» Yetkili Odaları", "category").then(yetkilipanel => {
let role = msg.guild.roles.find(a => a.name === "@everyone");
yetkilipanel.overwritePermissions(role, {
            VIEW_CHANNEL: false,
        });
  var yönetim =   msg.guild.createChannel(`💬│yönetim`, "text").then(yönetim => {
  let role = msg.guild.roles.find(a => a.name === "@everyone");
         yönetim.setParent(yetkilipanel) 
yönetim.overwritePermissions(role, {
            VIEW_CHANNEL: false,
        });
    })
  var sohbet =   msg.guild.createChannel(`🔊│Sesli Sohbet`, "voice").then(sohbet => {
  let role = msg.guild.roles.find(a => a.name === "@everyone");
  let role2 = msg.guild.roles.find(a => a.name ===  "Admin");
  let role3 = msg.guild.roles.find(a => a.name ===  "Yetkili");
  let role4 = msg.guild.roles.find(a => a.name ===  "Moderatör");
         sohbet.setParent(yetkilipanel) 
sohbet.overwritePermissions(role, {
            VIEW_CHANNEL: false,
            CONNECT: false,
        });
    sohbet.overwritePermissions(role2, {
            CONNECT: true,
        });
    sohbet.overwritePermissions(role3, {
            CONNECT: true,
        });
    sohbet.overwritePermissions(role4, {
            CONNECT: true,
        });
    })
    })

var müzik =  msg.guild.createChannel("» Müzik", "category").then(c => {
   var müzik1 =     msg.guild.createChannel(`🔊│Müzik 1`, "voice").then(müzik => {
     müzik.setParent(c)
   })
    var müzik2 =    msg.guild.createChannel(`🔊│Müzik 2`, "voice").then(müzik => {
    müzik.setParent(c)})
        let role = msg.guild.roles.find(a => a.name ===  "@everyone");
        c.overwritePermissions(role, {
            CONNECT: false,
        });
    })

msg.guild.createRole({
        name: 'Admin',
        hoist: true,
        color: '#f44336',
        setPosition: '1',
        permissions: [
  'VIEW_AUDIT_LOG',        
  'CREATE_INSTANT_INVITE',
  'KICK_MEMBERS',
  'BAN_MEMBERS',
  'ADMINISTRATOR',
  'MANAGE_CHANNELS',
  'MANAGE_GUILD',
  'ADD_REACTIONS',
  'READ_MESSAGES',
  'SEND_MESSAGES',
  'SEND_TTS_MESSAGES',
  'MANAGE_MESSAGES',
  'EMBED_LINKS',
  'ATTACH_FILES',
  'READ_MESSAGE_HISTORY',
  'MENTION_EVERYONE',
  'EXTERNAL_EMOJIS',
  'CONNECT',
  'SPEAK',
  'MUTE_MEMBERS',
  'DEAFEN_MEMBERS',
  'MOVE_MEMBERS',
  'USE_VAD',
  'CHANGE_NICKNAME',
  'MANAGE_NICKNAMES',
  'MANAGE_ROLES_OR_PERMISSIONS',
  'MANAGE_WEBHOOKS',
  'MANAGE_EMOJIS'
    ]
      })
      msg.guild.createRole({
        name: 'Yetkili',
        hoist: true,
        color: 'BLUE',
        setPosition: '2',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ]
      })
      msg.guild.createRole({
        name: 'Moderatör',
        hoist: true,
        color: '#4CAF50',
        setPosition: '3',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
      })
      msg.guild.createRole({
        name: 'Botlar',
        hoist: true,
        color: '#009688',
        setPosition: '4',
      })
      msg.guild.createRole({
        name: 'Üye',
        hoist: true,
        color: '#607D8B',
        setPosition: '5',
      })
}
};