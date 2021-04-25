const Commando = require("discord.js-commando");
const { convertToEmbed } = require("../../utils/helper");
const Reddit = require("../../utils/reddit");
// const Discord = require("discord.js");
const { WebhookClient, MessageEmbed } = require("discord.js");
module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "test",
      group: "owner",
      memberName: "test",
      description: "test command",
      ownerOnly: true,
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
    //https://discord.com/api/webhooks/835793747600998410/k8X8o7gFJB9Afnlgme1yLN01zAaClc8E3-xY9DS3P35HOiiFICPZpW7gCf1fDTrJ14l5
    // const wc = new WebhookClient(
    //   "835793747600998410",
    //   "k8X8o7gFJB9Afnlgme1yLN01zAaClc8E3-xY9DS3P35HOiiFICPZpW7gCf1fDTrJ14l5"
    // );
    // const embed = new MessageEmbed({
    //   type: "image",
    //   description: "image",
    //   video: {
    //     url: "https://v.redd.it/lnrt9fu6c5v61/DASH_720.mp4",
    //     proxyURL: "https://v.redd.it/lnrt9fu6c5v61/DASH_720.mp4",
    //     height: 200,
    //     width: 300,
    //   },
    // });
    // wc.send("hello", {
    //   username: message.author.tag,
    //   avatarURL: message.author.displayAvatarURL({ dynamic: true }),
    //   embeds: [embed],
    // });
    // const subreddit = new Reddit("meme", "hot");
    // const posts = await subreddit.getPosts();
    // const post = posts[0];
    // const embed = convertToEmbed(post);
    // message.channel.send({ embed });
    // message.channel.send(
    //   "/[THIS](https://v.redd.it/lnrt9fu6c5v61/DASH_720.mp4)"
    // );
    // const { channel } = message;
    // console.log(channel.nsfw);
  }
};
