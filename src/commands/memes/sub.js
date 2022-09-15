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
          key: "interval",
          prompt: "Please enter interval in minutes.",
          type: "integer",
          min: 1,
          max: 1440,
        },
        {
          key: "subreddits",
          prompt: "Enter subreddit names seperated with commas.",
          type: "string",
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
      const _subreddit = new Reddit(subreddit, "hot");
      return _subreddit.isValid();
    });

    const val = await Promise.all(Promises);

    let isValid = 1;

    for (let i = 0; i < val.length; i++) {
      if (val[i] === 0 || val[i] === 2) {
        isValid = val[i];
        break;
      }
      if (val[i] === 1 || val[i] === 3) {
        isValid = val[i];
      }
    }

    if (isValid === 1 || isValid === 3) {
      const isNSFW = val.some((v) => v === 3);
      if (isNSFW) {
        isValid = 3;
      }
    }

    switch (isValid) {
      case 0:
        const notAccessableSubs = subreddits
          .filter((_, i) => val[i] === 0)
          .join();
        const Embed = subNotAccessEmbed(notAccessableSubs);
        return message.channel.send(Embed);
      case 1:
        createJob();
        const Embed1 = subEmbed(subreddits, args.interval);
        return message.channel.send(Embed1);
      case 2:
        const noMediaSubs = subreddits.filter((_, i) => val[i] === 2).join();
        const Embed2 = subMediaEmbed(noMediaSubs);
        return message.channel.send(Embed2);
      case 3:
        if (channel.nsfw) {
          createJob();
          const Embed3 = subEmbed(subreddits, args.interval);
          return message.channel.send(Embed3);
        } else {
          const nsfwSubs = subreddits.filter((_, i) => val[i] === 3).join();
          const Embed4 = subNSFWEmbed(nsfwSubs);
          return message.channel.send(Embed4);
        }

      default:
        const Embed5 = subNotAccessEmbed();
        return message.channel.send(Embed5);
    }
  }
};
