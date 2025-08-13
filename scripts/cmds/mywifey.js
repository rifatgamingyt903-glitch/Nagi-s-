 module.exports = {
 config: {
	 name: "mywifey",
	 version: "1.0",
	 author: "AceGun",
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix", },
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "mywifey") {
 return message.reply({
 body: " 「𝐘𝐨𝐮𝐫 𝐛𝐛𝐲  ..\n𝐦𝐞𝐨𝐰🐱🐱 .\𝐲𝐨𝐮𝐫 𝐛𝐚𝐛𝐲\n\n𝐘𝐨𝐮𝐫 𝐰𝐢𝐟𝐞𝐲🥹\n𝐊𝐨𝐫𝐞𝐚𝐧🥹」",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/Fh563mO.mp4")
 });
 }
 }
                         }
