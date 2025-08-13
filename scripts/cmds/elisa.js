 const axios = require("axios");

module.exports.config = {
  name: "elisa",
  aliases: ["janu", "janvi", "bby"],
  version: "1.0.0",
  role: 0,
  author: "Anthony",
  description: "Better than all Sim Simi with multiple conversations",
  guide: { en: "[message]" },
  category: "ChatBots",
  coolDowns: 5,
};

module.exports.onReply = async function ({ api, event }) {
  if (event.type == "message_reply") {
    const reply = event.body;
    if (isNaN(reply)) {
      try {
        const response = await axios.get(
          `http://65.109.80.126:20409/sim?ask=${encodeURIComponent(reply)}`
        );
        const botReply = response.data.respond;

        await api.sendMessage(botReply, event.threadID, (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            link: botReply,
          });
        }, event.messageID);
      } catch (error) {
        console.error("Error fetching response:", error);
      }
    }
  }
};

module.exports.onChat = async function ({ event, api }) {
  if (event.body && ["elisa", "janu", "janvi", "bby"].includes(event.body.toLowerCase())) {
    const responses = [
      "𝗕𝗯𝘆 বলে অসম্মান করচ্ছিছ,😰😿",
      "দূরে যা, তোর কোনো কাজ নাই, শুধু 𝗯𝗯𝘆 𝗯𝗯𝘆 করিস  😉😋🤣",
      "তুই আমাকে 𝗕𝗯𝘆 বলে ডাকিস তোর বউ যদি শুনে তাহলে তোরে জুতা খুলে মুজা দিয়ে মারবে 😫🤣🤣",
      "ইস 𝗕𝗯𝘆 বলিস নারে এখন আমি বড় হইছি 😑😾😾",
      "এত গরম এ-ও তুই 𝗕𝗯𝘆 বলে ডাকস লজ্জা নাই তোর 😟😾😹",
      "বলেন Sir___🧟‍🧟‍",
      "বলো আমার ফুলটুসি____😻😽😽💙",
      "আজও কারো 𝗕𝗯𝘆 হতে পারলাম নাহ___😌💙💙",
      "আমি ঠিক সময় বিয়ে করলে ৩ বছর এর একটা bby থাকতো আর তুমি আমাকে 𝗕𝗯𝘆 বলছো__😾😾🤣",
      "𝗕𝗯𝘆 বললে চাকরি থাকবে না____😰😰☠",
      "এত 𝗕𝗯𝘆 𝗕𝗯𝘆 করস কেন কি হইছে বল___😾😾🔪🔪",
      "দূরে গিয়ে মর এত 𝗕𝗯𝘆 𝗕𝗯𝘆 না করে___😾😾🔪🔪"
    ];
    const reply = responses[Math.floor(Math.random() * responses.length)];

    await api.sendMessage(reply, event.threadID, (error, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: this.config.name,
        type: "reply",
        messageID: info.messageID,
        author: event.senderID,
        link: reply,
      });
    }, event.messageID);
  }
};

module.exports.onStart = async function ({ api, args, event }) {
  try {
    const obfuscatedAuthor = String.fromCharCode(65, 110, 116, 104, 111, 110, 121);
    if (this.config.author !== obfuscatedAuthor) {
      return api.sendMessage(
        "You are not authorized to change the author name.\n\nPlease fix the author name to use this command.",
        event.threadID,
        event.messageID
      );
    }

    const msg = args.join(" ").trim();
    if (!msg) {
      return api.sendMessage("𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐲𝐩𝐞 'janu hii' 🐰", event.threadID, event.messageID);
    }

    if (args[0].toLowerCase() === "teach") {
      const input = msg.slice(5).trim();
      const pairs = input.split('|').map(pair => pair.trim());

      if (pairs.length === 0 || pairs.length > 50) {
        return api.sendMessage(
          "📚 𝐘𝐨𝐮 𝐜𝐚𝐧 𝐓𝐞𝐚𝐜𝐡 **𝐮𝐩 𝐭𝐨 50** question-answer pairs at once.\n\nUse: teach question1 - answer1 | question2 - answer2 | ... | question50 - answer50",
          event.threadID,
          event.messageID
        );
      }

      let successCount = 0;
      for (const pair of pairs) {
        const parts = pair.split('-').map(p => p.trim());
        if (parts.length === 2) {
          const [question, answer] = parts;
          try {
            await axios.get(`http://65.109.80.126:20409/teach?ask=${encodeURIComponent(question)}&ans=${encodeURIComponent(answer)}`);
            successCount++;
          } catch (error) {
            console.error(`Failed to teach: ${pair}`);
          }
        }
      }

      return api.sendMessage(
        `𝐍𝐄𝐖 𝐑𝐄𝐒𝐏𝐎𝐍𝐒𝐄𝐒 𝐀𝐃𝐃 🎀🐥! **${successCount}**  .¥ 𝐤𝐞𝐞𝐩 𝐭𝐫𝐚𝐢𝐧𝐢𝐧𝐠 𝐦𝐞 𝐁𝐛𝐲¥ 🐥🎀`,
        event.threadID,
        event.messageID
      );
    }

    if (args[0].toLowerCase() === "list") {
      try {
        const data = await axios.get(`http://65.109.80.126:20409/info`);
        return api.sendMessage(
          `. 𝐇𝐄𝐘 𝐁𝐁𝐘 🎀
𝐓𝐎𝐓𝐀𝐋 𝐓𝐄𝐀𝐂𝐇 𝐋𝐈𝐒𝐓 𝐇𝐄𝐑𝐄 🎀🐥:**\n\n➠🎀 𝐁𝐛𝐲 ¥𝐓𝐨𝐭𝐚𝐥 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧𝐬:¥ ${data.data.totalKeys}\n➠ ¥🎀 𝐁𝐛𝐲, 𝐓𝐨𝐭𝐚𝐥 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐞:¥ ${data.data.totalResponses}`,
          event.threadID,
          event.messageID
        );
      } catch (error) {
        return api.sendMessage("⚠ Something went wrong while fetching data.", event.threadID, event.messageID);
      }
    }

    if (msg) {
      const response = await axios.get(
        `http://65.109.80.126:20409/sim?ask=${encodeURIComponent(msg)}`
      );
      const botResponse = response.data.respond;

      await api.sendMessage(botResponse, event.threadID, (error, info) => { global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID,
          link: botResponse,
        });
      }, event.messageID);
    }
  } catch (error) {
    console.error("Error processing command:", error);
    api.sendMessage(`⚠ An error occurred: ${error.message}`, event.threadID, event.messageID);
  }
};
