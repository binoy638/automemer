const Commando = require("discord.js-commando");
const Reddit = require("../../utils/reddit");
const { agenda } = require("../../config/agenda");
const {
  subNotAccessEmbed,
  subEmbed,
  subMediaEmbed,
  subNSFWEmbed,
} = require("../../utils/embed");

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
          key: "subreddits",
          prompt: "Enter subreddit names seperated with commas.",
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

    const subreddits = args.subreddits.split(",").map((sub) => sub.trim());

    const createJob = () => {
      const job = agenda.create("autoposts", {
        channel: channel.id,
        guild: channel.guild.id,
        subreddit: subreddits,
      });
      job.repeatEvery(`${args.interval} minutes`);
      job.save();
    };

    if (isExists.length)
      return message.reply(`this command is already activated on this channel`);

    const Promises = subreddits.map((subreddit) => {
      const subreddit = new Reddit(subreddit, "hot");
      return subreddit.isValid();
    });

    const val = await Promise.all(Promises);

    const isValid = val.every((v) => v === true);

    switch (isValid) {
      case 0:
        const Embed = subNotAccessEmbed();
        return message.channel.send(Embed);
      case 1:
        createJob();
        const Embed1 = subEmbed(subreddits, args.interval);
        return message.channel.send(Embed1);
      case 2:
        const Embed2 = subMediaEmbed();
        return message.channel.send(Embed2);
      case 3:
        if (channel.nsfw) {
          createJob();
          const Embed3 = subEmbed(subreddits, args.interval);
          return message.channel.send(Embed3);
        } else {
          const Embed4 = subNSFWEmbed();
          return message.channel.send(Embed4);
        }

      default:
        const Embed5 = subNotAccessEmbed();
        return message.channel.send(Embed5);
    }
  }
};
