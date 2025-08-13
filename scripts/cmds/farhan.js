module.exports = {
 config: {
	 name: "bayjid",
	 version: "1.0",
	 author: "AceGun",
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "farhan") {
 return message.reply({
 body: " 「❥︎----ღ᭄_ᴬˢˢᴬᴸᴬᴹᴼᴸᴬᴵᴷᵁᴹ ..\n❥︎----ღ᭄_  ᴮᴿᴼᵀᴴᴱᴿ❞࿐.🌴.\n❥ ғᴀʀʜᴀɴ ᴀʜᴍᴇᴅ\n\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥\n𝐅𝐀𝐑𝐇𝐀𝐍 𝐀𝐇𝐌𝐄𝐃」",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/XlyIOMR.mp4")
 });
 }
 }
}
