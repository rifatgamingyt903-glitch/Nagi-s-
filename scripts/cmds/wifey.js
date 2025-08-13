module.exports = {
 config: {
	 name: "wifey",
	 version: "1.0",
	 author: "Farhan_Ahmed",
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "wifey") {
 return message.reply({
 body: " 「❥︎----ღ᭄_𝗛𝗲𝘆 𝗧𝗵𝗶𝘀 𝗜𝘀 𝗙𝗮𝗿𝗵𝗮𝗻 𝗪𝗶𝗳𝗲 🥰💖 ..\n❥︎----ღ᭄_  𝗗𝗼 𝗡𝗼𝘁 𝗗𝗶𝘀𝘁𝘂𝗿𝗯 𝗛𝗶𝗺 😒❞࿐.🌴.\n❥ ᴊᴀɴɴᴀᴛᴜʟ ᴋᴏɴᴋᴀ\n\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥\n𝐅𝐀𝐑𝐇𝐀𝐍 𝐀𝐇𝐌𝐄𝐃」",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/u13ANOw.mp4")
 });
 }
 }
}
