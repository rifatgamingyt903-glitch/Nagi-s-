 module.exports = {
 config: {
	 name: "sakib",
	 version: "1.0",
	 author: "AceGun",
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix", },
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "sakib") {
 return message.reply({
 body: " 「𝐀𝐒𝐒𝐋𝐀𝐌𝐔𝐀𝐋𝐈𝐊𝐔𝐍 ..\n 𝐘𝐎𝐔𝐑 𝐁𝐎𝐘.💀☠️.\𝐓𝐀𝐍𝐉𝐈𝐑𝐎 𝐊𝐀𝐌𝐀𝐃𝐎\n\n𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑\n𝐒𝐀𝐊𝐈𝐁」",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/J4qA45d.mp4")
 });
 }
 }
}
