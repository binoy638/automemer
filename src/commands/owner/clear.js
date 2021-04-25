const Commando = require("discord.js-commando");
const { redisCache } = require("../../config/cache");

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "flushdb",
      group: "owner",
      memberName: "flushdb",
      description: "flush redis database",
      ownerOnly: true,
    });
  }
  async run(message) {
    try {
      const success = redisCache.flushall();
      if (success) return message.reply("Redis flushed successfully");
      else return message.reply("Something went wrong couldn't flush redis.");
    } catch (error) {
      console.log(error);
      message.reply("Something went wrong couldn't flush redis.");
    }
  }
};
