const fs = require("fs-extra");

module.exports = {
	config: {
		name: "restart",
		version: "1.1",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		category: "Owner",
		guide: {
			vi: "   {pn}: Khởi động lại bot",
			en: "   {pn}: Restart bot"
		}
	},

	langs: {
		vi: {
			𝑹𝒆𝒔𝒕𝒂𝒓𝒕𝒊𝒏𝒈: "🥹🥲 | Đang khởi động lại bot..."
		},
		en: {
			restartting: "🥹 | 𝒀𝒐𝒖𝒓 𝒃𝒃𝒚 𝒉𝒂𝒔 𝒃𝒆𝒆𝒏 𝒓𝒆𝒔𝒕𝒂𝒓𝒕𝒊𝒏𝒈"
		}
	},

	onLoad: function ({ api }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		if (fs.existsSync(pathFile)) {
			const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
			api.sendMessage(`✅ | 𝑩𝒃𝒚 𝒉𝒂𝒔 𝒃𝒆𝒆𝒏 𝒓𝒆𝒔𝒕𝒂𝒓𝒕\n⏰🥹 | Time: ${(Date.now() - time) / 1000}s`, tid);
			fs.unlinkSync(pathFile);
		}
	},

	onStart: async function ({ message, event, getLang }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
		await message.reply(getLang("restartting"));
		process.exit(2);
	}
};
