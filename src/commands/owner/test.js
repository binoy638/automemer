const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { promisify } = require("util");
const { redisCache } = require("../../config/cache");
const getCacheAsync = promisify(redisCache.get).bind(redisCache);
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
    redisCache.setex("hi", 10, "hello");

    const val = await getCacheAsync("hi");

    setTimeout(async () => {
      const val = await getCacheAsync("hi");

      console.log(val);
    }, 9000);

    message.channel.send("yo");
  }
};
