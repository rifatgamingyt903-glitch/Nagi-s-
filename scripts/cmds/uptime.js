 module.exports = {
  config: {
    name: "uptime",
    aliases: ["up"],
    version: "1.2",
    author: "✨𝐒𝐚𝐤𝐢𝐛✨",
    countDown: 5,
    role: 0,
    shortDescription: "⏳ Show bot uptime and stats",
    longDescription: "Displays how long the bot has been online, total users, total groups, and ping.",
    category: "system",
    guide: {
      en: "{pn}"
    },
    usePrefix: false,
    onChat: true
  },

  onStart: async function ({ message, event, usersData, threadsData }) {
    const os = require("os");
    const fs = require("fs");

    const uptimeSeconds = process.uptime();
    const totalSavedUptime = getTotalSavedUptime();
    const combinedUptime = uptimeSeconds + totalSavedUptime;

    function getTotalSavedUptime() {
      const file = __dirname + "/../data/uptime.json";
      if (!fs.existsSync(file)) return 0;
      try {
        const data = JSON.parse(fs.readFileSync(file));
        return data.total || 0;
      } catch {
        return 0;
      }
    }

    function formatDuration(seconds) {
      const d = Math.floor(seconds / (3600 * 24));
      const h = Math.floor((seconds % (3600 * 24)) / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      return `${d}d ${h}h ${m}m ${s}s`;
    }

    const botUptime = formatDuration(uptimeSeconds);
    const systemUptime = formatDuration(os.uptime());
    const totalUptime = formatDuration(combinedUptime);

    const totalUsers = (await usersData.getAll()).length;
    const totalGroups = (await threadsData.getAll()).length;

    // Calculate bot ping
    const botPing = event.timestamp ? Date.now() - event.timestamp : "N/A";

    message.reply(
      `╭──⏳ 𝗨𝗣𝗧𝗜𝗠𝗘 𝗦𝗧𝗔𝗧𝗦\n│\n` +
      `│ 🧸 𝗕𝗼𝘁 𝗨𝗽𝘁𝗶𝗺𝗲: ${botUptime}\n` +
      `│ ⚙️ 𝗦𝘆𝘀𝘁𝗲𝗺 𝗨𝗽𝘁𝗶𝗺𝗲: ${systemUptime}\n` +
      `│ ⌛ 𝗧𝗼𝘁𝗮𝗹 𝗨𝗽𝘁𝗶𝗺𝗲: ${totalUptime}\n` +
      `│ 👥 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿𝘀: ${totalUsers}\n` +
      `│ 🏠 𝗧𝗼𝘁𝗮𝗹 𝗚𝗿𝗼𝘂𝗽𝘀: ${totalGroups}\n` +
      `│ 📶 𝗕𝗼𝘁 𝗣𝗶𝗻𝗴: ${botPing}ms\n` +
      `│\n╰─✨ 𝐎𝐰𝐧𝐞𝐫: 𝐒𝐚𝐤𝐢𝐛`
    );
  },

  onStop: async function () {
    const fs = require("fs");
    const file = __dirname + "/../data/uptime.json";
    const currentUptime = process.uptime();

    let saved = 0;
    if (fs.existsSync(file)) {
      try {
        saved = JSON.parse(fs.readFileSync(file)).total || 0;
      } catch {}
    }

    fs.writeFileSync(file, JSON.stringify({
      total: saved + currentUptime
    }));
  },

  onChat: async function ({ message, event, usersData, threadsData }) {
    const content = message.body.toLowerCase();
    if (content === "uptime" || content === "up") {
      this.onStart({ message, event, usersData, threadsData });
    }
  }
};
