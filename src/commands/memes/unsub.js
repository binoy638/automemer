const Commando = require("discord.js-commando");
const { agenda } = require("../../config/agenda");
const { unSubEmbed, unSubNAEmbed } = require("../../utils/embed");
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
    const prefix = message.guild._commandPrefix || "#";

    const isRemoved = await agenda.cancel({ "data.channel": channel.id });
    let Embed;
    if (isRemoved === 0) {
      Embed = unSubNAEmbed(prefix);
      return message.channel.send(Embed);
    } else {
      Embed = unSubEmbed();
      return message.channel.send(Embed);
    }
  }
};
