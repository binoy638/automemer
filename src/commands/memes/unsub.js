const Commando = require("discord.js-commando");
const { agenda } = require("../../config/agenda");

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "unsub",
      group: "memes",
      memberName: "unsub",
      description: "Unsubscribe from automemes",
      userPermissions: ["ADMINISTRATOR"],
    });
  }
  async run(message) {
    const { channel } = message;

    const isRemoved = await agenda.cancel({ "data.channel": channel.id });

    if (isRemoved === 0)
      return message.reply(`automemes not activated on this channel.`);

    message.reply(`automemes has been successfully deactivated.`);
  }
};
