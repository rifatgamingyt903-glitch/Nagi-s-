module.exports = {
  config: {
    name: "var",
    aliases: [],
    version: "1.0",
    author: "♡︎ 𝐻𝑎𝑠𝑎𝑛 ♡︎",
    countDown: 3, 
    role: 0,
    longDescription: {
      vi: "",
      en: "Get images from text.",
    },
    category: "image",
    guide: {
      en:
        "{pn} prompt to generate an anime picture",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    try {
      const text = args.join(" ");
      if (!text) {
        return message.reply("Please provide a prompt.");
      }

      let prompt = text;


      
      const waitingMessage = await message.reply("~wait koro bby 🥳😘...");
          api.setMessageReaction("⏳", event.messageID, () => {}, true);

      const toxicity = "https://hasan-all-apis.onrender.com";
      const API = `${toxicity}/var?prompt=${encodeURIComponent(prompt)}`;

      
      const imageStream = await global.utils.getStreamFromURL(API);

      
      await message.reply({
        attachment: imageStream,
      });

api.setMessageReaction("✅", event.messageID, () => {}, true);

      
      await api.unsendMessage(waitingMessage.messageID);

    } catch (error) {
      console.log(error);
      message.reply("Failed to generate the image. Please try again later.");
    }
  },
};
