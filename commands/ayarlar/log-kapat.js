const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'log-kapat',
            aliases: ['logkapat', 'logkapa', 'logdevredışı', 'logskapa', 'logskapat'],
            group: 'ayarlar',
            memberName: 'log-kapat',
            description: 'Log kanalını kapatmanızı sağlar.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 60
            }
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
    }

    async run(msg, args) {
           const vt = this.client.provider.get(msg.guild.id, 'logsChannel', []);
			const db = this.client.provider.get(msg.guild.id, 'logsEnable', []);
			if (vt === false) {
				this.client.provider.set(msg.guild.id, 'logsEnable', false);
				msg.channel.send(`<:xx:509661885973397504> Log zaten devre dışı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'logsChannel', false);
				this.client.provider.set(msg.guild.id, 'logsEnable', false);
				msg.guild.settings.set('logsChannel', false);
				msg.guild.settings.set('logsEnable', false);
				return msg.channel.send(`<:check:509661885843505153> Log devre dışı bırakıldı`);
    }
	}
};