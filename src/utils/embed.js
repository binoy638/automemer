const { MessageEmbed } = require("discord.js");

const convertToEmbed = (post, type = "image") => {
  if (!post) return null;
  let Embed;
  if (type === "image") {
    Embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(post.title)
      .setURL(post.permalink)
      .setImage(post.url);
  } else {
    Embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(post.title)
      .setURL(post.permalink);
  }

  return Embed;
};

const statsEmbed = (appMem, sysMem, sysFreeMem) => {
  const Embed = new MessageEmbed()
    .setColor("black")
    .setTitle("System stats")
    .setDescription(
      `System Total Memory:\`${sysMem} mb\`\n
      Bot Usage:\`${appMem} mb\`\n
      System Free:\`${sysFreeMem} mb\``
    );
  return Embed;
};

const subEmbed = (subreddit, interval) => {
  const Embed = new MessageEmbed().setColor("black").setTitle("✅ Subscribed")
    .setDescription(`Subreddit: \`${subreddit}\`\n
    Interval: \`${interval} minutes\`
    `);
  return Embed;
};

const subNSFWEmbed = (subreddit) => {
  const Embed = new MessageEmbed()
    .setColor("black")
    .setTitle("🔞 NSFW Subreddit Detected")
    .setDescription(
      `\`r/${subreddit}\` is NSFW.\nEnable NSFW in the channel's settings and try again.`
    );
  return Embed;
};

const subMediaEmbed = (subreddit) => {
  const Embed = new MessageEmbed()
    .setColor("black")
    .setTitle("❌ Not enough media content.")
    .setDescription(`It seems that \`r/${subreddit}\` doesn't have enough media submissions please select a subreddit with enough media contents.
    `);
  return Embed;
};

const subNotAccessEmbed = (subreddit) => {
  const Embed = new MessageEmbed()
    .setColor("black")
    .setTitle("❌ Subreddit unavailable.")
    .setDescription(
      `unable to access \`r/${subreddit}\` make sure it is spelled correctly and try again.`
    );
  return Embed;
};

const unSubEmbed = () => {
  const Embed = new MessageEmbed()
    .setColor("black")
    .setTitle("✅ Unsubscribed");
  return Embed;
};

const unSubNAEmbed = (prefix) => {
  const Embed = new MessageEmbed()
    .setColor("black")
    .setTitle("❌ Not Found.")
    .setDescription(
      `No subscription found in this channel.\nUse \`${prefix}sub\` command to subscribe automemes.`
    );
  return Embed;
};

module.exports = {
  statsEmbed,
  subEmbed,
  subNSFWEmbed,
  subMediaEmbed,
  subNotAccessEmbed,
  unSubEmbed,
  unSubNAEmbed,
};
