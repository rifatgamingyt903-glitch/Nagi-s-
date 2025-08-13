module.exports = {
  config: {
    name: "slot",
    version: "1.0",
    author: "OtinXSandip",
    shortDescription: {
      en: "Slot game",
    },
    longDescription: {
      en: "Slot game.",
    },
    category: "Game",
  },
  langs: {
    en: {
      invalid_amount: "𝑬𝒏𝒕𝒆𝒓 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐚𝐧𝐝 𝐩𝐨𝐬𝐬𝐢𝐭𝐢𝐯𝐞 𝐚𝐦𝐨𝐮𝐧𝐭 𝐭𝐨 𝐛𝐞 𝐜𝐡𝐚𝐧𝐜𝐞 𝐭𝐨 𝐝𝐨𝐮𝐛𝐥𝐞.🎀",
      not_enough_money: "𝐜𝐡𝐞𝐜𝐤 𝐲𝐨𝐮𝐫 𝐛𝐚𝐥𝐞𝐧𝐜𝐞 𝐢𝐟 𝐲𝐨𝐮 𝐡𝐚𝐯𝐞  𝐭𝐡𝐚𝐭 𝐚𝐦𝐨𝐮𝐧𝐭.>🎀",
      spin_message: "Spinning...",
      win_message: ">🎀•𝐁𝐚𝐛𝐲, 𝐘𝐨𝐮 𝐖𝐨𝐧$%1, buddy!",
      lose_message: "  >🎀    𝐘𝐨𝐮 𝐥𝐨𝐬𝐭 $%1,           			•𝐆𝐚𝐦𝐞 𝐑𝐞𝐬𝐮𝐥𝐭𝐬 .",
      jackpot_message: "Jackpot! You won $%1 with three %2 symbols, buddy!",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);
    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply(getLang("invalid_amount"));
    }

    if (amount > userData.money) {
      return message.reply(getLang("not_enough_money"));
    }

    // Spin the slots
    const slots = ["💚", "💛", "💙", "💛", "💚", "💙", "💙", "💛", "💚"];
    const slot1 = slots[Math.floor(Math.random() * slots.length)];
    const slot2 = slots[Math.floor(Math.random() * slots.length)];
    const slot3 = slots[Math.floor(Math.random() * slots.length)];

    // Random chance of winning (22.2%)
    const winChance = Math.random() * 100;
    let winnings = 0;

    if (winChance <= 22.2) {
      winnings = calculateWinnings(slot1, slot2, slot3, amount);
    } else {
      winnings = -amount; // Loss
    }

    await usersData.set(senderID, {
      money: userData.money + winnings,
      data: userData.data,
    });

    const messageText = getSpinResultMessage(slot1, slot2, slot3, winnings, getLang);

    return message.reply(messageText);
  },
};

function calculateWinnings(slot1, slot2, slot3, betAmount) {
  if (slot1 === "💚" && slot2 === "💚" && slot3 === "💚") {
    return betAmount * 10; // Big win
  } else if (slot1 === "💛" && slot2 === "💛" && slot3 === "💛") {
    return betAmount * 5;  // Moderate win
  } else if (slot1 === slot2 && slot2 === slot3) {
    return betAmount * 3;  // Small win
  } else if (slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
    return betAmount * 2;  // Small win
  } else {
    return -betAmount; // Loss
  }
}

function getSpinResultMessage(slot1, slot2, slot3, winnings, getLang) {
  if (winnings > 0) {
    if (slot1 === "💙" && slot2 === "💙" && slot3 === "💙") {
      return getLang("jackpot_message", winnings, "💙");
    } else {
      return getLang("win_message", winnings) + ` [ ${slot1} | ${slot2} | ${slot3} ]`;
    }
  } else {
    return getLang("lose_message", -winnings) + ` [ ${slot1} | ${slot2} | ${slot3} ]`;
  }
}
