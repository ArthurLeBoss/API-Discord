const fetch = require('node-fetch');

const Discord = require('discord.js');

module.exports = {
    name: "covid",
    description: "Cas covid partout dans le monde",

    run (client, message, args){

        let countries = args.join(" ");

        // Const message erreur
        const noArgs = new Discord.MessageEmbed()
        .setTitle("Une erreur est survenue, qu\'est-ce t\'as fichu ?")
        .setColor(0xFF0000)
        .setDescription("Il manque un argument (ex: -covid France ou -covid Belgium)")
        .setTimestamp()
        // Const message erreur
        const invalid = new Discord.MessageEmbed()
        .setTitle("Une erreur est survenue, qu\'est-ce t\'as fichu ?")
        .setColor(0xFF0000)
        .setDescription("Le pays n\'est sûrement pas correct, vérifie l\'orthographe. Pour rappel, il doit être écrit en Anglais.")
        .setTimestamp()

        // Const message help
        const bienvenue = new Discord.MessageEmbed()
        .setTitle("Bienvenue sur L\'API Covid-19 : https://covid19.mathdro.id/api")
        .setDescription("Bonjour à toi jeune aventurier, tu as besoin de te renseigner sur le covid-19 ? Rien de plus simple. Suis la docs et tout ira bien !")
        .setColor(0x2b9348)
        // Const message help
        const fonctionnement = new Discord.MessageEmbed()
        .setTitle("Comment fonctionne l\'api ?")
        .setDescription("La commande : -covid all permet d\'avoir les chiffres du monde entier. \n Sinon, tous les noms de pays sont à mettre en Anglais. Exemple : Si vous voulez les statistiques de la Belgique il faudrat mettre : -covid Belgium")
        .setColor(0x52796f)
        // Const message help
        const utilite = new Discord.MessageEmbed()
        .setTitle("Que fait cette api ?")
        .setDescription("C\'est une api qui recence toutes les données du covid-19 dans le monde et dans chaques pays demandés")
        .setColor(0x52796f)

        if(args[0] === "help") {
            return message.channel.send(bienvenue), message.channel.send(fonctionnement), message.channel.send(utilite);
        }

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Statisque Total Covid-19 : Monde 🌎`)
                .addField('Cas confirmés ✅', confirmed)
                .addField('Cas recencés ⭕', recovered)
                .addField('Morts 💀', deaths)

                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setColor(0xffe6a7)
                .setTitle(`Statisque Total Covid-19 pour : **${countries}** 🌎`) 
                .addField('Cas confirmés ✅', confirmed)
                .addField('Cas recencés ⭕', recovered)
                .addField('Morts 💀', deaths)

                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send(invalid)
            })
        }
    }
}