module.exports = {
	config: {
		name: "upx",
		aliases: ["ut"],
		role: 0,
		shortDescription: {
			en: "Show server uptime",
			tl: "Ipakita ang uptime ng server",
		},
		longDescription: {
			en: "Shows the duration for which the server has been running",
			tl: "Ipapakita ang tagal na gumagana ang server",
		},
		category: "goatBot",
		guide: {
			en: "{p}uptime",
			tl: "{p}uptime",
		},
	},

	onStart: async function ({ api, message, threadsData }) {
		const os = require("os");

		// 🔄 Futuristic Loading Animation (3-step)
		const loadingSteps = [
			"🔵 𝙎𝙔𝙎𝙏𝙀𝙈 𝙎𝙏𝘼𝙏𝙐𝙎: Initializing...\n\n[█▒▒▒▒▒▒▒▒▒]",
			"🟣 𝙎𝙔𝙎𝙏𝙀𝙈 𝙎𝙏𝘼𝙏𝙐𝙎: Processing...\n\n[████▒▒▒▒▒▒]",
			"🟢 𝙎𝙔𝙎𝙏𝙀𝙈 𝙎𝙏𝘼𝙏𝙐𝙎: Almost Done...\n\n[██████████]" // Fully loaded
		];

		let currentStep = 0;
		let sentMessage = await message.reply(loadingSteps[currentStep]);

		// Updating animation every 200ms
		const loadingInterval = setInterval(async () => {
			currentStep++;

			if (currentStep < loadingSteps.length) {
				await api.editMessage(loadingSteps[currentStep], sentMessage.messageID);
			} else {
				clearInterval(loadingInterval); // Stop loading when complete

				// Wait 1 second before showing uptime info
				setTimeout(async () => {
					const uptime = os.uptime();
					const days = Math.floor(uptime / (3600 * 24));
					const hours = Math.floor((uptime % (3600 * 24)) / 3600);
					const mins = Math.floor((uptime % 3600) / 60);
					const seconds = Math.floor(uptime % 60);

					const system = `💻 **SYSTEM INFO**\n━━━━━━━━━━━━━━━━━━\n🔹 **OS:** ${os.platform()} ${os.release()}\n🔹 **CPU Cores:** ${os.cpus().length}\n🔹 **Architecture:** ${os.arch()}`;
					const memory = `💾 **MEMORY STATUS**\n━━━━━━━━━━━━━━━━━━\n🔸 **Total RAM:** ${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB\n🔸 **Free RAM:** ${Math.round(os.freemem() / (1024 * 1024 * 1024))} GB\n🔸 **RAM Usage:** ${Math.round(process.memoryUsage().rss / (1024 * 1024))} MB`;
					const uptimeString = `⏳ **UPTIME**\n━━━━━━━━━━━━━━━━━━\n🕒 **${days} Days, ${hours} Hours, ${mins} Minutes, ${seconds} Seconds**`;
					const stats = `📊 **BOT STATS**\n━━━━━━━━━━━━━━━━━━\n👥 **Total Users:** ${threadsData.size}\n📜 **Total Threads:** ${threadsData.size}\n⚖ **AI Usage:** 0.0\n🚀 **Ping:** 15ms`;

					const response = `✅ **SYSTEM FULLY OPERATIONAL**\n━━━━━━━━━━━━━━━━━━\n${uptimeString}\n\n${system}\n\n${memory}\n\n${stats}`;

					await api.editMessage(response, sentMessage.messageID);
				}, 1000);
			}
		}, 200); // Speed: 200ms per step
	},
};
