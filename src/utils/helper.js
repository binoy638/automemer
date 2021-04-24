const Discord = require("discord.js");

const extractVideoUrl = (obj) => {
  if (!obj) return null;
  if (obj.reddit_video) {
    return obj.reddit_video.fallback_url;
  } else return null;
};

const shuffleArray = (arr = []) => {
  let length = arr.length;
  if (!length) return null;
  let i;
  while (length) {
    i = Math.floor(Math.random() * length--);
    [arr[length], arr[i]] = [arr[i], arr[length]];
  }
  return arr;
};

const convertToEmbed = (post, type = "image") => {
  if (!post) return null;
  let Embed;
  if (type === "image") {
    Embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(post.title)
      .setURL(post.permalink)
      .setImage(post.url);
  } else {
    Embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(post.title)
      .setURL(post.permalink);
  }

  return Embed;
};

module.exports = {
  extractVideoUrl,
  shuffleArray,
  convertToEmbed,
};
