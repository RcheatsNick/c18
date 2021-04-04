const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'davetleri',
			aliases: ['davetlerim'],
			group: 'genel',
			memberName: 'davetleri',
			description: 'İstediğiniz kişinin veya kendi davetlerineze bakabilirsiniz..',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},
                args: [
				{
					key: 'user',
					prompt: 'Kimin davet sayısına bakmak istersin?',
					type: 'user',
          default: ''
				}
			]
		});
	}

	async run(message , {user}) {
    if (!user) user = message.author;

    var targetInvites = await message.guild.fetchInvites();

    var invitesUses = 0;
var embed = new Discord.RichEmbed()
    targetInvites.forEach(invite => {
        if (invite.inviter.id === user.id) {
            invitesUses += invite.uses;
           embed.addField("**• Davetleri(n) •**", `**${invite.code}** Adlı davet kodu ile ${invite.uses} kişi gelmiş.`)
        }
    });
    
     
    
    embed.setColor("#00c4eb")
    .setFooter(`${user.tag}`)
    .setTimestamp();
    message.channel.send(embed);
	}
};
