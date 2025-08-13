 const os = require("os");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

module.exports = {
    config: {
        name: "uptime4",
        aliases: ["upt4", "up4"],
        version: "5.0",
        author: "Siama Dev",
        role: 0,
        shortDescription: { en: "Check system uptime & performance stats." },
        longDescription: { en: "Shows CPU Load, RAM Usage, Uptime, and Disk Space with animated loading." },
        category: "SYSTEM",
        guide: { en: "Type {pn} to check bot & system status." }
    },

    onStart: async function ({ message, event, api }) {
        try {
            const loadingMessage = await api.sendMessage("🔄 Loading... 0%", event.threadID);
            const loadingSteps = ["🔄 Loading... 20%", "🔄 Loading... 40%", "🔄 Loading... 60%", "🔄 Loading... 80%", "✅ Loaded! Fetching stats..."];
            let index = 0;

            // Animate loading
            const intervalId = setInterval(async () => {
                if (index < loadingSteps.length) {
                    await api.editMessage(loadingSteps[index], loadingMessage.messageID);
                    index++;
                } else {
                    clearInterval(intervalId);
                }
            }, 1000);

            // Delay for full animation effect
            await new Promise(resolve => setTimeout(resolve, 5000));

            // Fetch system stats
            const uptime = os.uptime();
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);

            const totalMem = os.totalmem();
            const freeMem = os.freemem();
            const usedMem = totalMem - freeMem;
            const memUsage = ((usedMem / totalMem) * 100).toFixed(2);

            const cpuModel = os.cpus()[0].model;
            const cpuCores = os.cpus().length;
            const cpuLoad = await getCpuLoad();

            const diskUsage = await getDiskUsage();

            const finalMessage = `
━━━━━━━━━━━━━━━━━━━
🎀 𝗕𝗼𝘁 𝗨𝗽𝘁𝗶𝗺𝗲 𝗦𝘁𝗮𝘁𝘀 🎀
━━━━━━━━━━━━━━━━━━━
⏳ 𝗨𝗣𝗧𝗜𝗠𝗘: ${hours}h ${minutes}m ${seconds}s
🔋 𝗠𝗘𝗠𝗢𝗥𝗬 𝗨𝗦𝗘: ${memUsage}%
💾 𝗗𝗜𝗦𝗞 𝗨𝗦𝗘: ${diskUsage.used} / ${diskUsage.total} GB
🖥 𝗖𝗣𝗨: ${cpuModel} (${cpuCores} Cores)
⚡ 𝗖𝗣𝗨 𝗟𝗢𝗔𝗗: ${cpuLoad}%
━━━━━━━━━━━━━━━━━━━

            `;

            await api.editMessage(finalMessage, loadingMessage.messageID);
        } catch (error) {
            console.error("Uptime Error:", error);
            message.reply("⚠️ Error while fetching uptime data.");
        }
    }
};

// Function to get CPU Load
async function getCpuLoad() {
    const { stdout } = await exec("cat /proc/loadavg");
    return stdout.split(" ")[0];
}

// Function to get Disk Usage
async function getDiskUsage() {
    const { stdout } = await exec("df -h /");
    const lines = stdout.split("\n");
    const diskInfo = lines[1].split(/\s+/);
    return { total: diskInfo[1], used: diskInfo[2] };
    }
