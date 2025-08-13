videconst axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const ytSearch = require("yt-search");

const CACHE_FOLDER = path.join(__dirname, "cache");

async function downloadVideo(videoId, filePath) {
    const url = `https://yt-dl-api-48r3.onrender.com/download-video?id=${videoId}`;
    const writer = fs.createWriteStream(filePath);

    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });

    return new Promise((resolve, reject) => {
        response.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
}

async function fetchVideoFromReply(api, event, message) {
    const attachment = event.messageReply.attachments[0];
    if (!attachment || (attachment.type !== "video" && attachment.type !== "audio")) {
        throw new Error("Please reply to a valid video or audio attachment.");
    }

    const shortUrl = attachment.url;
    const reconApi = `https://audio-recon-api.onrender.com/adil?url=${encodeURIComponent(shortUrl)}`;

    const videoRecResponse = await axios.get(reconApi);
    return {
        title: videoRecResponse.data.title,
        videoId: null
    };
}

async function fetchVideoFromQuery(query) {
    const searchResults = await ytSearch(query);
    if (searchResults && searchResults.videos && searchResults.videos.length > 0) {
        return {
            title: searchResults.videos[0].title,
            videoId: searchResults.videos[0].videoId
        };
    } else {
        throw new Error("No results found for the given query.");
    }
}

async function handleVideoCommand(api, event, args, message) {
    api.setMessageReaction("🕢", event.messageID, () => {}, true);

    try {
        let result;
        if (event.messageReply && event.messageReply.attachments && event.messageReply.attachments.length > 0) {
            result = await fetchVideoFromReply(api, event, message);
            // If we got title from reply, now search YouTube for that title
            const searchData = await fetchVideoFromQuery(result.title);
            result.videoId = searchData.videoId;
            result.title = searchData.title; // Use the YouTube title instead
        } else if (args.length > 0) {
            const query = args.join(" ");
            result = await fetchVideoFromQuery(query);
        } else {
            message.reply("Please provide a query or reply to a valid video/audio attachment.");
            return;
        }

        const filePath = path.join(CACHE_FOLDER, `${result.videoId}.mp4`);
        await downloadVideo(result.videoId, filePath);

        const videoStream = fs.createReadStream(filePath);
        message.reply({ 
            body: `🎥 ${result.title}`,
            attachment: videoStream 
        });
        api.setMessageReaction("✅", event.messageID, () => {}, true);

    } catch (error) {
        console.error("Error:", error.message);
        message.reply("An error occurred while processing your request.");
        api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
}

module.exports = {
    config: {
        name: "video",
        version: "1.0",
        author: "ADIL",
        countDown: 10,
        role: 0,
        shortDescription: "Download and send video from YouTube.",
        longDescription: "Download video from YouTube based on a query or attachment.",
        category: "video",
        guide: "{p}video [query] or reply to a video/audio attachment",
    },
    onStart: function ({ api, event, args, message }) {
        return handleVideoCommand(api, event, args, message);
    },
};      body: "Loading random anime video... Please wait! 🕐", // change this loading msg
    });

    if (args.length === 0) {
      api.unsendMessage(loadingMessage.messageID);
      return message.reply({
        body: `Please specify a category. Available categories: ${Object.keys(this.videos).join(", ")}`,
      });
    }

    const category = args[0].toLowerCase();

    if (!this.videos.hasOwnProperty(category)) {
      api.unsendMessage(loadingMessage.messageID);
      return message.reply({
        body: `Invalid category. Available categories: ${Object.keys(this.videos).join(", ")}`,
      });
    }

    const availableVideos = this.videos[category].filter(video => !this.sentVideos[category].includes(video));

    if (availableVideos.length === 0) {
      this.sentVideos[category] = [];
    }

    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    const randomVideo = availableVideos[randomIndex];

    this.sentVideos[category].push(randomVideo);

    if (senderID !== null) {
      message.reply({
        body: `Enjoy the ${category} video... 🤍`,  // this is video body change this if you want
        attachment: await global.utils.getStreamFromURL(randomVideo),
      });

      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 5000);  // its a time that unsend loading msg you can increase it 
    }
  },
};


/* guid to generate drive link
1. upload your video on drive
2. make the video acces anyone with the link 
3. first upload all video and you can select all video and change access to anyone with the link for saving time
4. now one by one copy link of video and go to website drive direct link converter 
5. paste the link copy direct link and paste that in code continue like  this 
*/
