var os = require("os");
const Commando = require("discord.js-commando");
const { statsEmbed } = require("../../utils/embed");

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "stats",
      group: "owner",
      memberName: "stats",
      description: "Check system stats.",
      ownerOnly: true,
    });
  }
  async run(message) {
    const NodeUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    const SystemTotal = os.totalmem() / 1024 / 1024;
    const SystemFree = os.freemem() / 1024 / 1024;

    const Embed = statsEmbed(
      Math.floor(NodeUsage),
      Math.floor(SystemTotal),
      Math.floor(SystemFree)
    );
    message.channel.send(Embed);
  }
};
