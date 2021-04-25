const Commando = require("discord.js-commando");
const Reddit = require("../../utils/reddit");
const { convertToEmbed } = require("../../utils/helper");
const { agenda } = require("../../config/agenda");

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "sub",
      group: "memes",
      memberName: "sub",
      description: "Activate automemes on a channel.",
      userPermissions: ["ADMINISTRATOR"],
      args: [
        {
          key: "subreddit",
          prompt: "Enter a subreddit.",
          type: "string",
        },
        {
          key: "interval",
          prompt: "Please enter a id.",
          type: "integer",
          min: 1,
          max: 1440,
        },
      ],
    });
  }
  async run(message, args) {
    const { channel } = message;
    const isExists = await agenda.jobs({ "data.channel": channel.id });

    const createJob = () => {
      const job = agenda.create("autoposts", {
        channel: channel.id,
        guild: channel.guild.id,
        subreddit: args.subreddit,
      });
      job.repeatEvery(`${args.interval} minutes`);
      job.save();
    };

    if (isExists.length)
      return message.reply(`this command is already activated on this channel`);
    const subreddit = new Reddit(args.subreddit, "hot");
    const isValid = await subreddit.isValid();
    switch (isValid) {
      case 0:
        return message.reply(`couldn't access \`r/${args.subreddit}\`.`);
      case 1:
        createJob();
        return message.reply(
          `fetching from \`r/${args.subreddit}\` every \`${args.interval} minutes\``
        );
      case 2:
        return message.reply(
          `r/${args.subreddit} doesn't have enough media for me to fetch.`
        );
      case 3:
        if (channel.nsfw) {
          createJob();
          return message.reply(
            `fetching from \`r/${args.subreddit}\` every \`${args.interval} minutes\``
          );
        } else
          return message.reply(
            `\`r/${args.subreddit}\` is NSFW, make sure this is a NSFW channel before using this command again.`
          );
      default:
        return message.reply(`couldn't access \`r/${args.subreddit}\`.`);
    }
  }
};
