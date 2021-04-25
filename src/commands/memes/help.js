const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "help",
      group: "memes",
      memberName: "help",
      description: "Show list of commands",
    });
  }
  async run(message) {
    const prefix = message.guild._commandPrefix || "#";

    const Embed = new MessageEmbed()
      .setColor("black")
      .setTitle("Available Commands")
      .setDescription(
        `\`${prefix}sub [subreddit] [interval(min)]\`\n
      \`${prefix}unsub\`
      `
      );

    message.channel.send(Embed);
  }
};
