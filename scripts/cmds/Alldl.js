const fs = require("fs-extra");
const axios = require("axios");
const request = require("request");
const tinyurl = require("tinyurl");

function loadAutoLinkStates() {
  try {
    const data = fs.readFileSync("autolink.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

function saveAutoLinkStates(states) {
  fs.writeFileSync("autolink.json", JSON.stringify(states, null, 2));
}

let autoLinkStates = loadAutoLinkStates();

module.exports = {
  config: {
    name: 'alldl',
    version: '0.0.1',
    author: 'ArYAN',
    countDown: 5,
    role: 0,
    shortDescription: 'Facebook tik tok YouTube Instagram Pinterest Google drive all downloader',
    category: 'downloader',
  },

onStart: async function ({ api, event }) {
    const threadID = event.threadID;
    const message = event.body;

    const linkMatch = message.match(/(https?:\/\/[^\s]+)/);
    if (!linkMatch) return;

    const url = linkMatch[0];

    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    try {
      const res = await axios.get(`https://aryan-008.onrender.com/alldl?url=${encodeURIComponent(url)}`);
      if (!res.data.data || (!res.data.data.high && !res.data.data.low)) {
        return api.sendMessage("⚠️ This link is not being used", event.threadID, event.messageID);
      }

      const { title, high, low, description } = res.data.data;

      const highTinyUrl = await getTinyUrl(high);
      const lowTinyUrl = await getTinyUrl(low);

      const msg = `Your video download is complete\nTitle: ${title}`;

      const videoUrl = high || low;

      request(videoUrl).pipe(fs.createWriteStream("video.mp4")).on("close", () => {
        api.sendMessage(
          {
            body: msg,
            attachment: fs.createReadStream("video.mp4")
          },
          event.threadID,
          () => {
            fs.unlinkSync("video.mp4");
          }
        );
      });

    } catch (err) {
      console.error("Error downloader fetching video", err);
      api.sendMessage("downloading please wait...", event.threadID, event.messageID);
    }
  }
};

async function getTinyUrl(url) {
  return new Promise((resolve, reject) => {
    tinyurl.shorten(url, function(result) {
      if (result.includes("error")) {
        reject(new Error("Failed to generate TinyURL"));
      } else {
        resolve(result);
      }
    });
  });
  }
