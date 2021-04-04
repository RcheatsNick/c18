const { Command } = require('discord.js-commando');

module.exports = class ModChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'duyuru-kanal-ayarla',
            aliases: ['duyurukanal'],
            group: 'ayarlar',
            memberName: 'duyuru-kanal-ayarla',
            description: 'Duyuru kanalı ayarlar.',
            guildOnly: true,
			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'channel',
                    prompt: 'Duyuru kanalınız hangi kanal olsun?',
                    type: 'channel'
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
        const vt = this.client.provider.get(msg.guild.id, 'duyurukanal', []);
			  const db = this.client.provider.get(msg.guild.id, 'duyurukanalK', []);
			if (vt === args.channel.id) {
				this.client.provider.set(msg.guild.id, 'duyurukanalK', true);
				msg.channel.send(`<:xx:509661885973397504> Duyuru kanal zaten ayarlı`);
			} else {
				this.client.provider.set(msg.guild.id, 'duyurukanal', args.channel.id);
        this.client.provider.set(msg.guild.id, 'duyurukanalK', true);
				msg.guild.settings.set('duyurukanal', channel.id);
				return msg.channel.send(`<:check:509661885843505153> Duyuru kananalı <#${channel.id}> olarak ayarlandı.`);
			}
    }
};