const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "test",
      group: "owner",
      memberName: "test",
      description: "test command",
      ownerOnly: true,
    });
  }
  async run(message, args) {
    const Embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Title")
      .setImage(
        "https://thisiscolossal.com/wp-content/uploads/2018/04/agif1opt.gif"
      );
    message.channel.send(Embed);
  }
};
