const { Command } = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class PreEnableCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'premium-aktifleştir',
            aliases: ['premium-aktif', 'pre-aktif'],
            group: 'ayarlar',
            memberName: 'premium-aktifleştir',
            description: 'Bir sunucu için premiumu aktifleştirmeyi sağlar.',
            throttling: {
                usages: 2,
                duration: 3
            },

            args: [
                {
                    key: 'guild',
                    label: 'sunucu',
                    prompt: 'Premiumu aktifleştirmek istediğiniz sunucu IDi nedir?',
                    type: 'string'
                },
                {
					key: 'kullanici',
					label: 'kullanici',
					prompt: 'Kimin için Premium aktifleştiriyorsunuz?',
					type: 'user'
                },
                {
					key: 'tarih',
					label: 'tarih',
					prompt: 'Süresi ne zaman bitsin?',
					type: 'string'
                },
            ]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    async run(msg, args) {
        const tarih = args.tarih;
        const kullanici = args.kullanici;
        const sunucu = args.guild;
		const preAktif = this.client.provider.get(sunucu, 'preAktif', []);
		if (preAktif == true) return msg.channel.send('<:xx:509661885973397504> **Bu sunucuda zaten premium aktif.**');
        this.client.provider.set(sunucu, 'preAktif', true);

                var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setDescription(`**Aktifleştirme Detayları**`)
				.setThumbnail(this.client.user.avatarURL)
				.addField('► Sunucu Adı/ID:', `${this.client.guilds.get(sunucu).name} / ${sunucu}`)
				.addField('► Sunucu Sahibi / Ekleten:', `${kullanici.tag}`)
        .addField('► Premium Biteceği Tarih:', `${tarih}`)
				.setTimestamp();
        
        this.client.channels.get('535152601373868032').send({embed});

        return msg.channel.send('<:check:509661885843505153> Başarıyla `' + this.client.guilds.get(sunucu).name + '` adlı sunucuda `' + this.client.users.get(kullanici.id).tag + '` için `' + tarih + '` tarihine kadar aktifleştirildi.');
		
    }
};