const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'starboard-kanal-ayarla',
			aliases: ['starboard-kanal-ayarla','starboardchannel','starboardkanalayarla','starboardkanal'],
			group: 'genel',
			memberName: 'starboard-kanal-ayarla',
			description: 'Kayıt kanalı ayarlamanızı/değiştirmenizi sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'kanal',
					prompt: 'Kayıt kanalı hangi kanal olsun?',
					type: 'channel'
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(msg, args) {
    		var ch = await args.kanal;
		if (ch.type == 'voice') return msg.reply('Sesli kanallar seçilemez!');
        if (args.kanal) {
			const vt = this.client.provider.get(msg.guild.id, 'starboardChannel', []);
			const db = this.client.provider.get(msg.guild.id, 'starboardChannelK', []);
			if (vt === args.kanal.id) {
				this.client.provider.set(msg.guild.id, 'starboardChannelK', true);
				msg.channel.send(`<:xx:509661885973397504> Starboard kanalı zaten **${args.kanal.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'starboardChannel', args.kanal.id);
				this.client.provider.set(msg.guild.id, 'starboardChannelK', true);
				return msg.channel.send(`<:check:509661885843505153> Starboard kanlaı olarak ayarlanan kanal: **${args.kanal.name}**`);
			}
	}
  }
};