const { redisCache } = require("../config/cache");
const { promisify } = require("util");
const getCacheAsync = promisify(redisCache.get).bind(redisCache);
const { convertToEmbed: RedditEmbed } = require("./helper");
const Reddit = require("./reddit");

module.exports = async (subredditTitle, channel) => {
  let posts = await getCacheAsync(`${channel.id}-${subredditTitle}`);
  if (!posts) {
    const subreddit = new Reddit(subredditTitle, "hot");
    posts = await subreddit.getPosts(50);
    if (posts)
      redisCache.set(`${channel.id}-${subredditTitle}`, JSON.stringify(posts));
  }

  if (!posts)
    return channel.send(`could not fetch posts from \`r/${subredditTitle}\`.`);

  if (typeof posts === "string") {
    posts = JSON.parse(posts);
  }

  //getting the first post from the list of posts and removing it from the rest
  const post = posts.shift();

  //checking there are more posts left
  if (posts.length > 0) {
    redisCache.set(`${channel.id}-${subredditTitle}`, JSON.stringify(posts));
  } else {
    redisCache.del(`${channel.id}-${subredditTitle}`);
  }

  let Embed;
  if (post.is_video) {
    Embed = RedditEmbed(post, "video");
    if (!Embed)
      return channel.send("Something went wrong.Please try again later.");
    channel.send(Embed);
    channel.send(post.media);
  } else {
    Embed = RedditEmbed(post);
    if (!Embed)
      return channel.send("Something went wrong.Please try again later.");
    channel.send(Embed);
  }
};
