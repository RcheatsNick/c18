const { Command } = require('discord.js-commando');

module.exports = class ModChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sayaç-kanal-ayarla',
            aliases: ['sayaçkanalayarla' , 'sayaçkanalseç','sayaç-ayarla'],
            group: 'ayarlar',
            memberName: 'sayaç-kanal-ayarla',
            description: 'Sayaç kanalı ayarlar.',
            guildOnly: true,
			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'channel',
                    prompt: 'Sayaç kanalın hangi kanal olsun?',
                    type: 'channel'
                },
                  {
                    key: 'no',
                    prompt: 'Sayaçı kaç olarak ayarlamak istersiniz?',
                    type: 'integer'
                }
            ]
        });
    }
    
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('ADMINISTRATOR');
    }
    

    async run(msg, args) {
        
        const { channel } = args;
       if (channel.type == 'voice') return msg.reply('<:xx:509661885973397504> Sesli kanallar seçilemez!');
        const vt = this.client.provider.get(msg.guild.id, 'sayaçkanal', []);
			  const db = this.client.provider.get(msg.guild.id, 'sayaçkanalK', []);
        if (msg.guild.members.size > args.no) return msg.channel.send(`:x: Sunucudaki kişi sayısı \`${args.no}\` sayısından fazla!`)
			if (vt === args.channel.id) {
				this.client.provider.set(msg.guild.id, 'sayaçkanalK', true);
				this.client.provider.set(msg.guild.id, 'sayac', args.no , true);
				msg.channel.send(`<:xx:509661885973397504> Sayaç zaten ayarlı`);
			} else {
				this.client.provider.set(msg.guild.id, 'sayaçkanal', args.channel.id);
        this.client.provider.set(msg.guild.id, 'sayaçkanalK', true);
				this.client.provider.set(msg.guild.id, 'sayac', args.no , true);
				msg.guild.settings.set('sayaçkanal', channel.id);
				return msg.channel.send(`<:check:509661885843505153> Sayaç kanalı: **<#${args.channel.id}>** olarak ayarlandı\n<:check:509661885843505153> Sayaç: \`${args.no}\` olarak ayarlandı. `);
			}
    }
};