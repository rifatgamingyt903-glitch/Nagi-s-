module.exports = {
  config: {
    name: "ff",
    version: "1.0",
    author: "Jadid",
    countDown: 20,
    role: 0,
    shortDescription: "get sigma video",
    longDescription: "get random free fire video",
    category: "game",
    guide: "{pn}",
  },

  sentVideos: [],

  onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;

    const loadingMessage = await message.reply({
      body: "Loading free fire 🔥  video... Please wait! ❤️‍🔥",
    });

    const link = [
      "https://i.imgur.com/jiGqDvh.mp4",// video credits xaiko-jadid (tiktok)
         "https://i.imgur.com/0G5bdEL.mp4",
      "https://i.imgur.com/HmEjrKT.mp4",
      "https://i.imgur.com/cnNos7d.mp4",
      "https://i.imgur.com/iAe53o4.mp4",
      "https://i.imgur.com/sOcNMuK.mp4",
      "https://i.imgur.com/dDfghV8.mp4",
      "https://i.imgur.com/rYol0jl.mp4",
      "https://i.imgur.com/3AKyhW5.mp4",

"https://i.imgur.com/xTaC2Bi.mp4",

"https://i.imgur.com/nSnBW3z.mp4",

"https://i.imgur.com/wWMxgrZ.mp4",

"https://i.imgur.com/WSM5MCj.mp4",

"https://i.imgur.com/6nxJFwB.mp4",

"https://i.imgur.com/NeYjAKg.mp4",

"https://i.imgur.com/Rsktftp.mp4",

"https://i.imgur.com/VTcH66o.mp4",

"https://i.imgur.com/EYXZR79.mp4",

"https://i.imgur.com/4BpgEos.mp4",

"https://i.imgur.com/SPSCsoL.mp4",

"https://i.imgur.com/pcc3RL6.mp4",

"https://i.imgur.com/1C3fQK1.mp4",

"https://i.imgur.com/9VK833x.mp4",

"https://i.imgur.com/5oYiQd2.mp4",

"https://i.imgur.com/VwTpWl9.mp4",

"https://i.imgur.com/klpD01h.mp4",

"https://i.imgur.com/fC8gjAD.mp4",

"https://i.imgur.com/sQBBfDV.mp4",

"https://i.imgur.com/QG8DEb8.mp4",

"https://i.imgur.com/2nhUpjN.mp4",

"https://i.imgur.com/xWbQls8.mp4",

"https://i.imgur.com/ZJGJdcL.mp4",

"https://i.imgur.com/ekfNkRo.mp4",

"https://i.imgur.com/hfqQyqY.mp4",
 "https://i.imgur.com/TXTTYxQ.mp4",// Add more video links here
    ];

    const availableVideos = link.filter(video => !this.sentVideos.includes(video));

    if (availableVideos.length === 0) {
      this.sentVideos = [];
    }

    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    const randomVideo = availableVideos[randomIndex];

    this.sentVideos.push(randomVideo);

    if (senderID !== null) {
      message.reply({
        body: '[FREE FIRE STATUSVIDEO❤️‍🔥❤️‍🔥] ',
        attachment: await global.utils.getStreamFromURL(randomVideo),
      });

      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 5000);
    }
  },
};
