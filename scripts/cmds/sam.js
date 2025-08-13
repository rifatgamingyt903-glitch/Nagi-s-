const axios = require("axios");

module.exports.config = {
  name: "sam",
  version: "1.0.0",
  role: 0,
  author: "Anthony",
  description: "Better than SimSimi with multiple conversations",
  guide: { en: "[message]" },
  category: "ChatBots",
  coolDowns: 5,
};

module.exports.onReply = async function ({ api, event }) {
  try {
    if (event.type === "message_reply") {
      const reply = event.body;
      if (isNaN(reply)) {
        const response = await axios.get(
          `https://anthony-noobs-baby-apis.onrender.com/sim?ask=${encodeURIComponent(reply)}`
        );

        const botReply = response.data.respond;
        api.sendMessage(botReply, event.threadID, (error, info) => {
          if (!error) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: this.config.name,
              type: "reply",
              messageID: info.messageID,
              author: event.senderID,
              link: botReply,
            });
          }
        }, event.messageID);
      }
    }
  } catch (error) {
    console.error(`Error in onReply: ${error.message}`);
  }
};

module.exports.onChat = async function ({ event, api }) {
  try {
    if (event.body && ["sam", "simma"].includes(event.body.toLowerCase())) {
      const greetings = [
        "𝘀𝗮𝗺 বলে অসম্মান করচ্ছিছ,😰😿",
        "দূরে যা, তোর কোনো কাজ নাই, শুধু 𝘀𝗮𝗺 𝘀𝗮𝗺 করিস 😉😋🤣",
        "বলেন Sir___🧟‍🧟‍",
        "বলো আমার ফুলটুসি____😻😽😽💙",
        "𝗕𝗯𝘆 বললে চাকরি থাকবে না____😰😰☠",
        "এত 𝘀𝗮𝗺 𝘀𝗮𝗺 করস কেন কি হইছে বল___😾😾🔪🔪",
        "দূরে গিয়ে মর এত 𝘀𝗮𝗺 𝘀𝗮𝗺 না করে___😾😾🔪🔪"
      ];

      const botReply = greetings[Math.floor(Math.random() * greetings.length)];
      api.sendMessage(botReply, event.threadID, (error, info) => {
        if (!error) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            link: botReply,
          });
        }
      }, event.messageID);
    }
  } catch (error) {
    console.error(`Error in onChat: ${error.message}`);
  }
};

module.exports.onStart = async function ({ api, args, event }) {
  try {
    const obfuscatedAuthor = String.fromCharCode(65, 110, 116, 104, 111, 110, 121);
    if (this.config.author !== obfuscatedAuthor) {
      return api.sendMessage(
        "You are not authorized to change the author's name.\n\nPlease keep the correct name to use this command.",
        event.threadID,
        event.messageID
      );
    }

    const userInput = args.join(" ").trim();
    if (!userInput) {
      return api.sendMessage("Please type `sam hi` 🐰", event.threadID, event.messageID);
    }

    const response = await axios.get(
      `https://anthony-noobs-baby-apis.onrender.com/sim?ask=${encodeURIComponent(userInput)}`
    );

    const botReply = response.data.respond;
    api.sendMessage(botReply, event.threadID, (error, info) => {
      if (!error) {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID,
          link: botReply,
        });
      }
    }, event.messageID);
  } catch (error) {
    console.error(`Error in onStart: ${error.message}`);
    api.sendMessage(`An error occurred: ${error.message}`, event.threadID, event.messageID);
  }
};
