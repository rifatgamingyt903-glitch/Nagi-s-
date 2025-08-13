const axios = require("axios");

module.exports.config = {
  name: "ramadan",
  aliases: ["rdm"],
  author: "Anthony",
  category: "islamic"
};

module.exports.onStart = async function ({ api, event, args, commandName }) {
  return api.sendMessage(
    `📌 Select an option:\n\n1⃣ Sehri & Iftar Time\n2⃣ Prayer Times\n3⃣ Fasting Niyyat\n4⃣ Fasting Invalidators\n\nReply with the corresponding number.`,
    event.threadID,
    (error, info) => {
      if (error) return console.log(error);
      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        author: event.senderID,
        type: "selectOption"
      });
    }
  );
};

module.exports.onReply = async function ({ api, event, Reply }) {
  if (event.senderID !== Reply.author) return;

  let choice = event.body.trim();

  if (Reply.type === "selectOption") {
    if (choice === "1" || choice === "2") {
      return api.sendMessage(
        "📍 Please type your **District Name** to get the information.",
        event.threadID,
        (error, info) => {
          if (error) return console.log(error);
          global.GoatBot.onReply.set(info.messageID, {
            commandName: Reply.commandName,
            author: event.senderID,
            type: "getZilla",
            choice: choice
          });
        }
      );
    } else {
      let url;

      if (choice === "3") url = "https://bd-prayer-time.vercel.app/islam/niyot";
      if (choice === "4") url = "https://bd-prayer-time.vercel.app/islam/ruja-vangar-karon";

      if (!url) return api.sendMessage("❌ Invalid choice! Please reply with 1-4.", event.threadID);

      try {
        let { data } = await axios.get(url);
        let message = "";

        if (choice === "3") {
          message = `🕌 **Fasting Niyyat**\n\n📖 Arabic: ${data["রোজার আরবি নিয়ত"]}\n🔤 Pronunciation: ${data["রোজার বাংলা উচ্চারণ"]}\n💬 Meaning: ${data["রোজার অর্থ"]}`;
        }
        if (choice === "4") {
          let reasons = Object.values(data)
            .map((item, index) => `${index + 1}. ${item}`)
            .join("\n");
          message = `🚫 **Fasting Invalidators**\n\n${reasons}`;
        }

        return api.sendMessage(message, event.threadID);
      } catch (err) {
        return api.sendMessage("⚠ Error fetching data. Try again later.", event.threadID);
      }
    }
  }

  if (Reply.type === "getZilla") {
    let zilla = event.body.trim().toLowerCase();
    let url;

    if (Reply.choice === "1") {
      url = `https://bd-prayer-time.vercel.app/islam/sehri-ifter-time?zilla=${zilla}`;
    }
    if (Reply.choice === "2") {
      url = `https://bd-prayer-time.vercel.app/islam/prayerTime?zilla=${zilla}`;
    }

    try {
      let { data } = await axios.get(url);
     let response = await axios.get(url);
        let times = response.data.times;

      if (!data.zilla) {
        return api.sendMessage("❌ District name not found! Try again.", event.threadID);
      }

      let message = "";

      if (Reply.choice === "1") {
          message = `🌙 **Sehri & Iftar Time**\n📍 Location: ${response.data.zilla}\n\n🗓 **Today (${times.today.todayDate})**\n🕌 Ramadan Day: ${times.today.ramadan_no}\n⏰ Sehri: ${times.today.sehri}\n🌅 Iftar: ${times.today.iftar}\n\n🗓 **Tomorrow (${times.tomorrow.tomorrowDate})**\n🕌 Ramadan Day: ${times.tomorrow.ramadan_no}\n⏰ Sehri: ${times.tomorrow.sehri}\n🌅 Iftar: ${times.tomorrow.ifter}`;
      }

      if (Reply.choice === "2") {
        let times = data.prayerTimes;
        message = `🕌 **Prayer Times**\n📍 District: ${data.zilla}\n\n🌙 Fajr: ${times["Fazar Waqt Start"]}\n🌞 Sunrise: ${times["Sun Rise"]}\n🕰 Dhuhr: ${times["Dhuhr Waqt Start"]}\n🕰 Asr: ${times["Asr Waqt Start"]}\n🌅 Maghrib/Iftar: ${times["Maghrib and Iftar Time"]}\n🌙 Isha: ${times["Isha Waqt Start"]}`;
      }

      return api.sendMessage(message, event.threadID);
    } catch (err) {
      return api.sendMessage("❌ Error fetching data. Please check the district name and try again.", event.threadID);
    }
  }
};
