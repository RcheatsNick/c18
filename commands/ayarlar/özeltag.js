const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'özel-tag',
            aliases: ['özel-tag-ayarla','özeltagayarla','özeltag'],
            group: 'ayarlar',
            memberName: 'özel-tag',
            description: 'Sunucuya gelen kişiyi kim davet ettiğini gösterir.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            },

            args: [
                {
                    key: 'tag',
                    prompt: 'Özel tag ne olsun?\n',
                    type: 'string'
                },
                    {
                    key: 'kanal',
                    prompt: 'Özel tag mesajı hangi kanala gitsin?\n',
                    type: 'channel'
                }
            ]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
    }

    async run(msg, args) {
       if (args.kanal.type == 'voice') return msg.reply('<:xx:509661885973397504> Sesli kanallar seçilemez!');
        const vt = this.client.provider.get(msg.guild.id, 'ozeltagKanal', []);
			  const db = this.client.provider.get(msg.guild.id, 'ozeltagKanalK', []);
			if (vt === args.kanal.id) {
				this.client.provider.set(msg.guild.id, 'ozeltagKanalK', true);
				this.client.provider.set(msg.guild.id, 'tag', args.no , true);
				msg.channel.send(`<:xx:509661885973397504> Özel tag ve mesaj kanalı ayarlı`);
			} else {
				this.client.provider.set(msg.guild.id, 'ozeltagKanal', args.kanal.id);
        this.client.provider.set(msg.guild.id, 'ozeltagKanalK', true);
				this.client.provider.set(msg.guild.id, 'tag', args.tag , true);
				msg.guild.settings.set('ozeltagKanal', args.kanal.id);
				return msg.channel.send(`<:check:509661885843505153> Özel tag mesaj kanalı: **<#${args.kanal.id}>** olarak ayarlandı\n<:check:509661885843505153> Özel tagda: \`${args.tag}\` olarak ayarlandı. `);
			}
    }
};