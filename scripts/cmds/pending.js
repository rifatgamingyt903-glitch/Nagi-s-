module.exports = {
  config: {
    name: "pending",
    version: "1.0",
    author: "ArYan 🐔",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "ArYan"
  },

langs: {
    en: {
        invaildNumber: "%1 is not an invalid number",
        cancelSuccess: "Refused %1 thread!",
        approveSuccess: "Approved successfully %1 threads!",

        cantGetPendingList: "Can't get the pending list!",
        returnListPending: "»「PENDING」«❮ The whole number of threads to approve is: %1 thread ❯\n\n%2",
        returnListClean: "[ 𝑷𝒆𝒏𝒅𝒊𝒏𝒈] 𝑻𝒉𝒆𝒓𝒆 𝒊𝒔 𝒏𝒐 𝑻𝒉𝒓𝒆𝒂𝒅 𝒊𝒏 𝒕𝒉𝒆 𝑷𝒆𝒏𝒅𝒊𝒏𝒈 𝒍𝒊𝒔𝒕 𝒃𝒃𝒚..🐥🌸"
    }
  },

onReply: async function({ api, event, Reply, getLang, commandName, prefix }) {
    if (String(event.senderID) !== String(Reply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const ArYanIndex of index) {
            console.log(ArYanIndex);
            if (isNaN(ArYanIndex) || ArYanIndex <= 0 || ArYanIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", ArYanIndex), threadID, messageID);
            api.removeUserFromGroup(api.getCurrentUserID(), Reply.pending[ArYanIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("cancelSuccess", count), threadID, messageID);
    }
    else {
        const index = body.split(/\s+/);
        for (const ArYanIndex of index) {
            if (isNaN(ArYanIndex) || ArYanIndex <= 0 || ArYanIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", ArYanIndex), threadID, messageID);
            api.sendMessage(`𝒂𝒑𝒑𝒓𝒐𝒗𝒆 𝒉𝒂𝒔 𝒃𝒆𝒆𝒏 𝒔𝒖𝒄𝒄𝒆𝒔𝒔𝒇𝒖𝒍𝒍𝒚 🐥🌸 
🌎 𝐆𝐥𝐨𝐛𝐚𝐥 𝐩𝐫𝐞𝐟𝐢𝐱: !
📚 𝐘𝐨𝐮𝐫 𝐠𝐫𝐨𝐮𝐩 𝐩𝐫𝐞𝐟𝐢𝐱: !

╭‣ 𝐀𝐝𝐦𝐢𝐧 👑
╰‣ 𝑺𝒂𝒌𝒊𝒃

╭‣ 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 ⓕ
╰‣ 𝐓𝐚𝐧𝐣𝐢𝐫𝐨 𝐤𝐚𝐦𝐚𝐝𝐨 https://www.facebook.com/share/15VoqHov4x/ `, Reply.pending[ArYanIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("approveSuccess", count), threadID, messageID);
    }
},

onStart: async function({ api, event, getLang, commandName }) {
  const { threadID, messageID } = event;

    var msg = "", index = 1;

    try {
    var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
    var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
  } catch (e) { return api.sendMessage(getLang("cantGetPendingList"), threadID, messageID) }

  const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const ArYan of list) msg += `${index++}/ ${ArYan.name}(${ArYan.threadID})\n`;

    if (list.length != 0) return api.sendMessage(getLang("returnListPending", list.length, msg), threadID, (err, info) => {
    global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
  }, messageID);
    else return api.sendMessage(getLang("returnListClean"), threadID, messageID);
}
};
