const { redisCache } = require("../config/cache");
const { promisify } = require("util");
const getCacheAsync = promisify(redisCache.get).bind(redisCache);
const { RedditImageEmbed, RedditVideoEmbed } = require("./embed");
const Reddit = require("./reddit");
const { flattenArray, shuffleArray } = require("./helper");

module.exports = async (subredditArray, channel) => {
  let posts = await getCacheAsync(`${channel.id}`);
  if (!posts) {
    const Promises = subredditArray.map((subreddit) => {
      const subreddit = new Reddit(subreddit, "hot");
      return subreddit.getPosts();
    });
    const postsArray = await Promise.all(Promises);
    if (postsArray.length > 0) {
      const flattenPosts = flattenArray(postsArray);
      posts = shuffleArray(flattenPosts);
    }
    if (posts) redisCache.set(`${channel.id}`, JSON.stringify(posts));
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
    redisCache.set(`${channel.id}`, JSON.stringify(posts));
  } else {
    redisCache.del(`${channel.id}`);
  }

  let Embed;
  if (post.is_video === true) {
    Embed = RedditVideoEmbed(post);
    if (!Embed) {
      console.log(post);
      return channel.send("Something went wrong.");
    }
    channel.send(Embed);
    channel.send(post.media);
  } else if (post.post_hint === "link" || post.post_hint === "rich:video") {
    Embed = RedditVideoEmbed(post);
    if (!Embed) {
      console.log(post);
      return channel.send("Something went wrong.");
    }
    channel.send(Embed);
    channel.send(post.url);
  } else {
    Embed = RedditImageEmbed(post);
    if (!Embed) {
      console.log(post);
      return channel.send("Something went wrong.");
    }
    channel.send(Embed);
  }
};
