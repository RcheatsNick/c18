const { Command } = require('discord.js-commando');

module.exports = class ReverseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'özeloda',
			group: 'ayarlar',
			memberName: 'özeloda',
			description: 'Yazdığınız cümleyi ters çevirir.',
		});
	}

	run(message) {
		message.guild.createChannel("Özel Odalar", "category").then(sp => {
	  message.guild.createChannel(`${message.author.username}`, "voice").then(ss => {
        ss.setParent(sp)
                   let role = message.guild.roles.find(a => a.name ===  "@everyone");
        ss.overwritePermissions(role, {
            CONNECT: false,
        });
              ss.overwritePermissions(message.author.id, {
            CONNECT: true,
        });
})
  })
    message.channel.send('Özel odan oluşturuldu sayın: <@' + message.author.id + '>')
	}
};