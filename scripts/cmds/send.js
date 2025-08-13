module.exports = {
  config: {
    name: "send", // Send Money
    version: "1.0",
    author: "RL",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Transfer money to another user"
    },
    description: {
      en: "Transfer money to another user by tagging, replying to their message, or using their UID."
    },
    category: "Economy",
    guide: {
      en: "{pn} <amount> [@tag | reply | uid]"
    }
  },
  langs: {
    en: {
      missingArgs: "Please specify the amount of money you want to transfer.",
      invalidAmount: "The amount must be a positive number.",
      notEnoughBalance: "You don't have enough balance to transfer this amount.",
      userNotFound: "Could not find the recipient. Please tag, reply, or provide their UID.",
      transferSuccess: "Successfully transferred %1 to %2."
    }
  },
  onStart: async function ({
    api,
    args,
    event,
    threadsData,
    usersData,
    message,
    getLang
  }) {
    const { senderID, mentions, replyMessage } = event;

    // Validate amount
    const amount = parseInt(args[0]);
    if (!amount || isNaN(amount) || amount <= 0)
      return message.reply(getLang("invalidAmount"));

    // Check sender balance
    const senderBalance = await usersData.get(senderID, "money", 0);
    if (amount > senderBalance)
      return message.reply(getLang("notEnoughBalance"));

    // Determine recipient
    let recipientID;
    if (Object.keys(mentions).length > 0) {
      recipientID = Object.keys(mentions)[0];
    } else if (replyMessage) {
      recipientID = replyMessage.senderID;
    } else if (args[1]) {
      recipientID = args[1];
    } else {
      return message.reply(getLang("userNotFound"));
    }

    // Ensure recipient exists in the database
    const recipientBalance = await usersData.get(recipientID, "money", 0);

    // Perform transfer
    await usersData.set(senderID, { money: senderBalance - amount });
    await usersData.set(recipientID, { money: recipientBalance + amount });

    // Notify success
    const recipientName =
      (await usersData.get(recipientID, "name")) || recipientID;
    return message.reply(
      getLang("transferSuccess", amount, recipientName)
    );
  }
};
