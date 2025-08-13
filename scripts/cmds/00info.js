 const fs = require('fs');const moment = require('moment-timezone');
module.exports = {
  config: {
    name: "info",
    aliases: ["inf", "in4"],
    version: "2.0",
    author: "Anthony | Edition by Xos Eren",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    longDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    category: "Information",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ message }) {
    this.sendInfo(message);
  },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.sendInfo(message);
    }
  },

  sendInfo: async function (message) {
    const botName = " 𝓨𝓸𝓾𝓻~𝓫𝓪𝓫𝔂🌼";
    const botPrefix = "!";
    const authorName = "𝐒𝐚𝐤𝐢𝐛";
    const authorFB = "𝐓𝐚𝐧𝐣𝐢𝐫𝐨 𝐤𝐚𝐦𝐚𝐝𝐨 🎀  https://www.facebook.com/tanjiro.kamado.414379";
    const authorInsta = "𝐋𝐨𝐚𝐝𝐢𝐧𝐠";
    const status = " 𝗦𝗶𝗻𝗴𝗹𝗲";

    const urls = JSON.parse(fs.readFileSync('scripts/cmds/assets/Ayan.json'));
    const link = urls[Math.floor(Math.random() * urls.length)];

    const now = moment().tz('Asia/Dhaka');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');

    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${hours}h ${minutes}m ${seconds}sec`;

    message.reply({
      body: `                              🎀           𝐀𝐝𝐦𝐢𝐧 𝐈𝐧𝐟𝐨         ☮
────────────────
𝐍𝐚𝐦𝐞 :  ${authorName}  

𝐅𝐛:  ${authorFB}

𝐏𝐫𝐞𝐟𝐢𝐱:  ${botPrefix}  

𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩:  ${status}     

𝐈𝐠:   ${authorInsta}

𝐓𝐢𝐦𝐞:   ${time}   

𝐔𝐩𝐭𝐢𝐦𝐞: ${uptimeString}

𝐁𝐨𝐭 :  ${botName}  `,
      attachment: await global.utils.getStreamFromURL(link)
    });
  }
};
