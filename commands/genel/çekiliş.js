const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const giveaways = require("discord-giveaways");
const ms = require('ms');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'çekiliş',
			aliases: [],
			group: 'genel',
			memberName: 'çekiliş',
			description: 'Çekiliş yapmanızı sağlar.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},
                args: [
				{
					key: 'channel',
					prompt: 'Çekiliş hangi kanalda yapılsın?',
					type: 'channel'
				},
        				{
					key: 'time',
					prompt: 'Çekiliş ne kadar sürsün?\n1s: Saniye\n1m: 1 Dakika.\n1h: 1 Saat.\n1d: 1 Gün\n1w: 1 Hafta.?',
					type: 'string'
				},
                				{
					key: 'title',
					prompt: 'Çekiliş ödülü ne olsun?',
					type: 'string'
				},
                        				{
					key: 'winner',
					prompt: 'Kaç kişi kazansın?',
					type: 'string'
				}
			]
		});
	}

	async run(message , args) {
    giveaways.start(args.channel, {
            time: ms(args.time),
            prize: args.title,
            winnersCount: parseInt(args.winner),
            messages: {
        giveawayEnded: "@everyone\n\n🎉🎉 **Çekiliş bitti** 🎉🎉",
        timeRemaining: "Kalan süre: **{duration}**!",
        inviteToParticipate: "Çekilişe katılmak için 🎉 emojisine tıklayın!",
        winMessage: "Tebrikler, {winners}! kazandın **{prize}**!",
        embedFooter: "Giveaways",
        noWinner: "Çekiliş iptal edildi yeterli katılım yok.",
        winners: "kazanan(lar)",
        endedAt: "Bitti",
        units: {
            seconds: "saniye",
            minutes: "dakika",
            hours: "saat",
            days: "gün"
        }
        }
        }).then((gData) => {
            console.log(gData); // {...} (messageid, bitiş tarihi ve daha fazlası)
        });   
       message.channel.send(`Çekiliş ${args.channel} kanalında başladı!`)
	}
};
