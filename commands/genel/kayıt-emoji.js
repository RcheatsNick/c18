const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kayıt-emoji',
			aliases: ['kayıt-emoji-ayarla','kayitemoji'],
			group: 'genel',
			memberName: 'kayıt-emoji',
			description: 'Kayit emojisini ayarlamanızı/değiştirmenizi sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'emojiid',
					prompt: 'Kayıt emojisi hangi emoji olsun? (Emoji id yazınız.)',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message, args) {
			const vt = this.client.provider.get(message.guild.id, 'kayitEmoji', []);
			const db = this.client.provider.get(message.guild.id, 'kayitEmojiK', []);
			if (vt === args.emojiid) {
				this.client.provider.set(message.guild.id, 'kayitEmojiK', true);
				message.channel.send(`:x: Kayıt emojisi zaten ${this.client.emojis.get(args.emojiid)} olarak ayarlı!`);
			} else {
				this.client.provider.set(message.guild.id, 'kayitEmoji', args.emojiid);
				this.client.provider.set(message.guild.id, 'kayitEmojiK', true);
				return message.channel.send(`:white_check_mark: Kayıt emojisi **${this.client.emojis.get(args.emojiid)}** olarak ayarlandı.`);
			}
	}
};