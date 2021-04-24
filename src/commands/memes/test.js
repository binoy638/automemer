const Commando = require("discord.js-commando");
const Reddit = require("../../utils/reddit");
const { convertToEmbed } = require("../../utils/helper");
const { redisCache } = require("../../config/cache");
const { promisify } = require("util");
const getCacheAsync = promisify(redisCache.get).bind(redisCache);

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "test",
      group: "memes",
      memberName: "test",
      description: "test command",
      //   args: [
      //     {
      //       key: "key",
      //       prompt: "Enter a key.",
      //       type: "string",
      //     },
      //     {
      //       key: "value",
      //       prompt: "Enter a value.",
      //       type: "string",
      //     },
      //   ],
    });
  }
  async run(message, args) {
    // const key = args.key;
    // const val = args.value;
    // redisCache.set(key, val);
    let p = await getCacheAsync("arr");
    p = JSON.parse(p);
    const np = p.shift();
    // console.log(np);
    console.log(np);
    console.log(p);
  }
};
