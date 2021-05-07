const weather = require('weather-js');
const Discord = require('discord.js');

module.exports = {
    name: "weather",
    description: "Visioner la méteo",

    async run (client, message, args) {
        weather.find({search: args.join(" "), degreeType: '°C'}, function (error, result) {
            if(error) return message.channel.send(error);
            if(!args[0]) return message.channel.send('Merci de spécifier une localisation')

            if(result === undefined || result.length === 0) return message.channel.send('***Location Invalide***');

            var current = result[0].current;
            var location = result[0].location;
            var d = new Date();
            var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

            const weatherinfo = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Prévisions météorologiques pour ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(0x111111)
            .addField('Fuseau horaire', `UTC${location.timezone}`, true)
            .addField('Heure', `${hours}`)
            .addField('Température', `${current.temperature}°`, true)
            .addField('Vent', current.winddisplay, true)
            .addField('Ressenti', `${current.feelslike}°`, true)
            .addField('Humidité', `${current.humidity}%`, true)


            message.channel.send(weatherinfo)       
        })
    }
}