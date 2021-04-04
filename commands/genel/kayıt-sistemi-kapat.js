const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kayıt-sistemi-kapat',
			aliases: ['kayıtsistemikapat'],
			group: 'genel',
			memberName: 'kayıt-sistemi-kapat',
			description: 'Kayıt sistemini kapatmanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message, args) {
				this.client.provider.set(message.guild.id, 'kayitKanal', false);
				this.client.provider.set(message.guild.id, 'kayitKanalK', false);
        message.guild.settings.set('kayitKanal', false);
				message.guild.settings.set('kayitKanalK', false);
        this.client.provider.set(message.guild.id, 'kayitEmoji', false);
				this.client.provider.set(message.guild.id, 'kayitEmojiK', false);
    		this.client.provider.set(message.guild.id, 'kayitMesaj', false);
				this.client.provider.set(message.guild.id, 'kayitMesajK', false);
        this.client.provider.set(message.guild.id, 'kayitRol', false);
				this.client.provider.set(message.guild.id, 'kayitRolK', false);
    message.channel.send('Kayıt sistemi devre dışı bırakıldı.')
	}
};