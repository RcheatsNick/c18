const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require("fs");
const hastebins = require('hastebin-gen');
const conf = require('../../ayarlar.json')
var backups = JSON.parse(fs.readFileSync("./sunucuyedekleri.json", "utf8"));
module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sunucuyedekle',
			aliases: [],
			group: 'genel',
			memberName: 'sunucuyedekle',
			description: 'Kayıt sistemi ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},
			args: [
				{
          key: 'string',
					prompt: 'Sunucuyu yedeklemekmi istersin yüklemek mi?',
          type: 'string',
          default: '' 
        },
      	{
          key: 'id',
					prompt: 'id?',
          type: 'string',
          default: '' 
        }
			]
		});
	}
  
  	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(message, args) {
   try{
            let info =  "ℹ️"
            let waiting = "⌛"
            let green = conf.customEmoji.basarili
            let error = conf.customEmoji.basarisiz
            let warning =  "⚠️"


            let guildsonlyEmbed = new Discord.RichEmbed()
            .setTitle(`${error} Error`)
            .setDescription(`Bu komut ** özel ** mesajda ** kullanılamaz
            
            [Destek](https://discord.gg/zBtAktj)`)
            .setColor("#a11616")
            if (message.channel.type === 'dm') return message.channel.send(guildsonlyEmbed);
            if(args.string === "yedekle") {
             await   message.guild.roles.filter(r => r.name !== message.guild.member(this.client.user.id).highestRole.name).forEach(r => {
                    if (r.comparePositionTo(message.guild.member(this.client.user.id).highestRole) > 0){
                        let havnthighest = new Discord.RichEmbed()
                            .setTitle(`${warning}  Uyarı`)
                            .setDescription(`${this.client.user.username} Rolü Sunucudaki En Yüksek Rol Değil, Bu Yedekleme Yüklenirken Bazı Hatalara Neden Olabilir.
                            
                            [Destek](https://discord.gg/zBtAktj)`)
                            .setColor("#a11616")
                        return message.channel.send(havnthighest) 
                    }
                })

                

                let creatingEmbed = new Discord.RichEmbed()
                .setTitle(`${waiting}  Lütfen bekleyin ...`)
                .setDescription("Yedekleniyor... Lütfen bekleyin")
                message.channel.send(creatingEmbed).then(m => {

                let id = makeid(16)

                    const channels = message.guild.channels.sort(function (a, b) { return a.position - b.position; }).array().map(c => {
                    const channel = {
                        type: c.type,
                        name: c.name,
                        postion: c.calculatedPosition
                    }
                    if (c.parent) channel.parent = c.parent.name
                    return channel;
                });
                  
                    const emojis = message.guild.emojis.map(c => {
                    const emojis = {
                        url: c.url,
                        name: c.name,
                        postion: c.calculatedPosition
                    }
                });

      
            
                    const roles = message.guild.roles.filter(r => r.name !== "@everyone").sort(function (a, b) { return a.position - b.position; }).array().map(r => {
                    const role = {
                        name: r.name,
                        color: r.color,
                        hoist: r.hoist,
                        permissions: r.permissions,
                        mentionable: r.mentionable,
                        position: r.position
                    }
                    return role;
                }); 
                if(!backups[message.author.id]) backups[message.author.id] = {}
                backups[message.author.id][id] = {
                    icon: message.guild.iconURL,
                    name: message.guild.name,
                    owner: message.guild.ownerID,
                    members: message.guild.memberCount,
                    createdAt: message.guild.createdAt,
                    region: message.guild.region,
                    roles,
                    channels,
                    emojis
                }
                
            save();
                let result = new Discord.RichEmbed()
                .setTitle(`${info}  Bilgi`)
                .setDescription(`Oluşturulan yedekleme **${message.guild.name}** Yedekleme kimliğiyle \`${id}\``)
                .addField("Kullanım", `\`\`\`${message.guild.commandPrefix}sunucuyedekle yükle ${id}\`\`\`
\`\`\`${message.guild.commandPrefix}sunucuyedekle bilgi ${id}\`\`\``)
                .setColor("#5DBCD2")

            message.author.send(result)

            let resultPublic = new Discord.RichEmbed()
            .setTitle(`${green}  İşte!`)
            .setDescription(`Oluşturulan yedekleme **${message.guild.name}** Yedekleme kimliğiyle \`${id}\``)
            .addField("Kullanım", `\`\`\`${message.guild.commandPrefix}sunucuyedekle yükle ${id}\`\`\`
\`\`\`${message.guild.commandPrefix}sunucuyedekle bilgi ${id}\`\`\``)
            .setColor("#59C57B")

        m.edit(resultPublic)
            
              })
            }


            if(args.string === "sil") {
                let code = args.id;
                let errorEmbed = new Discord.RichEmbed()
                .setTitle(`${error}  Hata`)
                .setDescription(`Yedekleme idini girmeyi unuttunuz.
[Destek](https://discord.gg/zBtAktj)`)
                .setColor("#a11616")
                if(!code) return message.channel.send(errorEmbed)

                let cantfindbackup = new Discord.RichEmbed()
                .setTitle(`${error}  Hata`)
                .setTitle(`Kimliğine sahip yedeklemeniz yok ${code}.`)
                .setDescription(`
[Destek](https://discord.gg/zBtAktj)`)
                .setColor("#a11616")
                if(!backups[message.author.id][code]) return message.channel.send(cantfindbackup)

                delete backups[message.author.id][code];
                save();

                let deletedsuc = new Discord.RichEmbed()
                    .setTitle(`${green}  İşte!`)
                    .setDescription(`Başarılı **bir şekilde silindi**.`)
                    .setColor("#59C57B")
                    message.channel.send(deletedsuc)

            }

            if(args.string === "yükle") {
                let error = conf.customEmoji.basarisiz
                let code = args.id;
                let errorEmbed = new Discord.RichEmbed()
                .setTitle(`${error}  Hata`)
                .setDescription(`Yedekleme idini girmeniz lazım..
[Destek](https://discord.gg/zBtAktj)`)
                if(!code) return message.channel.send(errorEmbed)
                let cantfindbackup = new Discord.RichEmbed()
                .setTitle(`${error}  Hata`)
                .setTitle(`Kimliğine sahip bir yedeğiniz yok ${code}.`)
                .setDescription("[Destek](https://discord.gg/zBtAktj)")
                .setColor("#a11616")
                if(!backups[message.author.id][code]) return message.channel.send(cantfindbackup)
                
                message.guild.channels.forEach(channel => {
                    channel.delete('Yedek yükleniyor..')
                })

                message.guild.roles.filter(role => role.members.every(member => !member.user.bot)).forEach(role => {
                    role.delete('Yedekleme Yüklemek için')
                })
                await backups[message.author.id][code].roles.forEach(async function (role) {
                        message.guild.createRole({ name: role.name, color: role.color, permissions: role.permissions, hoist: role.hoist, mentionable: role.mentionable, position: role.position }).then(role => {
                            role.setPosition(role.position)
                        })
                
                });             
               await backups[message.author.id][code].channels.filter(c => c.type === "category").forEach(async function (ch)  {
                        message.guild.createChannel(ch.name, {type: ch.type, permissionOverwrites: ch.permissionOverwrites})
                }); 

               await backups[message.author.id][code].channels.filter(c => c.type !== "category").forEach(async function(ch) {
                        message.guild.createChannel(ch.name, {type:ch.type, permissionOverwrites:ch.permissionOverwrites}).then(c => {
                            const parent = message.guild.channels.filter(c => c.type === 'category').find(c => c.name === ch.parent);
                            ch.parent ? c.setParent(parent) : '';
                        });
                });
              
                              await backups[message.author.id][code].emojis.forEach(async function (r) {
                        message.guild.createRole({ url: r.url, name: r.name})
                
                });             
              
                 message.guild.setName(backups[message.author.id][code].name)
                 message.guild.setIcon(backups[message.author.id][code].icon)
                 message.guild.setRegion(backups[message.author.id][code].region)
            }


            if(args.string === "bilgi") {
                let id = args.id;
                let MissingbackupinfoEmbed = new Discord.RichEmbed()
                .setTitle(`${error}  Hata`)
                    .setDescription(`Yedekleme idini girmeyi unuttunuz. 
                    [Destek](https://discord.gg/zBtAktj)`)
                .setColor("#a11616")
                if(!id) return message.channel.send(MissingbackupinfoEmbed)

                let cantfindEmbed = new Discord.RichEmbed()
                .setTitle(`${error}  Hata`)
                .setDescription(`Kimliğine sahip ** yedeğiniz yok ** \`${id}\`.
                "[Destek](https://discord.gg/zBtAktj)`)
                .setColor("#a11616")
                if(!backups[message.author.id][id]) return message.channel.send(cantfindEmbed)

                try{
                let infoEmbed = new Discord.RichEmbed()
                .setTitle(backups[message.author.id][id].name)
                .setThumbnail(backups[message.author.id][id].icon)
                .addField("Sahip", `<@${backups[message.author.id][id].owner}>`, true)
                .addField("Kullanıcılar", backups[message.author.id][id].members, true)
                .addField("Oluşturulma tarihi", backups[message.author.id][id].createdAt)
                .addField("Kanallar", `\`\`\`${backups[message.author.id][id].channels.map(channel => channel.name).join('\n')}\`\`\``, true)
                .addField("Roller", `\`\`\`${backups[message.author.id][id].roles.map(role => role.name).join('\n')}\`\`\``, true)
                message.channel.send(infoEmbed)
                }catch(e) {
                    hastebins(backups[message.author.id][id].channels.map(channel => channel.name).join('\n'), 'txt').then(ch => {
                        hastebins(backups[message.author.id][id].roles.map(role => role.name).join('\n'), 'txt').then(ro => {
                    let infoEmbed = new Discord.RichEmbed()
                        .setTitle(backups[message.author.id][id].name)
                        .setThumbnail(backups[message.author.id][id].icon)
                        .addField("Sahip", `<@${backups[message.author.id][id].owner}>`, true)
                        .addField("Kullanıcılar", backups[message.author.id][id].members, true)
                        .addField("Oluşturulma tarihi", backups[message.author.id][id].createdAt)
                        .addField("Kanallar", ch, true)
                        .addField("Roller", ro, true)
                    message.channel.send(infoEmbed)
                    })
                })
                }

                
            }

            if(args.string === "temizle") {
              let errorEmbed = new Discord.RichEmbed()
              .setTitle(`${error}  Hata`)
              .setDescription(`Henüz hiçbir sunucuyu yedeklemediniz
[Destek](https://discord.gg/zBtAktj)`)
                .setColor("#a11616")
              if(!backups[message.author.id]) return message.channel.send(errorEmbed)
              
                let warningEmbed = new Discord.RichEmbed()
                .setTitle(`${warning}  Uyarı`)
                .setDescription(`Tüm yedeklerinizi silmek istediğinizden emin misiniz?
__Bu geri alınamaz!`)
                message.channel.sendEmbed(warningEmbed).then(msg => {
                    msg.react('✅')
                        .then(() => msg.react('❌'))


                    let yesFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                    let noFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

                    let yes = msg.createReactionCollector(yesFilter, { time: 0 });
                    let no = msg.createReactionCollector(noFilter, { time: 0});


                    yes.on("collect", r => {
                        delete backups[message.author.id];

                        let deletedsuc = new Discord.RichEmbed()
                            .setTitle(`${green}  İşte!`)
                            .setDescription(`Tüm yedekler silindi`)
                            .setColor("#59C57B")
                        message.channel.send(deletedsuc)
                      msg.delete();
                    })

                    no.on("collect", r => {
                        msg.delete();
                    })

                })
            }


            if(args.string === '') {
                
                const embed = new Discord.RichEmbed()
                .setAuthor(`${this.client.user.username} - Sunucu yedekleme sistemi` , this.client.user.avatarURL)
                .setColor("#5DBCD2")
                .addField(`${message.guild.commandPrefix}sunucuyedekle yedekle 》`, 'Sunucunuzu yedekler.')
                .addField(`${message.guild.commandPrefix}sunucuyedekle sil <code> 》`, 'Yedeklediniz sunucuyu db den siler.')
                .addField(`${message.guild.commandPrefix}sunucuyedekle bilgi <code> 》`, 'Yedeklediğniz sunucu hakkında bilgi verir.')
                .addField(`${message.guild.commandPrefix}sunucuyedekle liste 》`, 'Sunucu yedekleme listesini atar.')
                .addField(`${message.guild.commandPrefix}sunucuyedekle yükle <code> 》`, 'Yedeklediğiniz sunucuyu yükler.')
                .addField(`${message.guild.commandPrefix}sunucuyedekle temizle`, 'Tüm yedekleri siler.')
                .setFooter(`© ${this.client.user.username}`,this.client.user.avatarURL)
               .setTimestamp();
                message.channel.send(embed)
                return;
            }

            function makeid(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                   result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
             }

             function save() {
                fs.writeFile("./sunucuyedekleri.json", JSON.stringify(backups), (err) => {
                    if (err) console.error(err)
                  })
              }
             
        }catch(e) {
            throw e;
        }
	}
};
