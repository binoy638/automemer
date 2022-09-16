const { redisCache } = require("../config/cache");
const { promisify } = require("util");
const getCacheAsync = promisify(redisCache.get).bind(redisCache);
const { RedditImageEmbed, RedditVideoEmbed } = require("./embed");
const Reddit = require("./reddit");
const { shuffleArray } = require("./helper");

const getPost = async (postList) => {
  const post = postList.shift();

  let postHashMap = await getCacheAsync("postHashMap");
  // if postHashMap doesn't exists then create it
  if (!postHashMap) {
    postHashMap = {
      [post.id]: 1,
    };

    redisCache.set("postHashMap", JSON.stringify(postHashMap));
    return post;
  }

  try {
    const parsedJson = JSON.parse(postHashMap);
    postHashMap = parsedJson;
  } catch (e) {
    console.log(e);
  }

  if (postHashMap[post.id]) {
    return getPost(postList);
  }
  // add the post id to the hashmap and return it
  postHashMap = { ...postHashMap, [post.id]: 1 };
  console.log(postHashMap);
  redisCache.set("postHashMap", JSON.stringify(postHashMap));
  return post;
};

module.exports = async (subredditArray, channel) => {
  let posts = await getCacheAsync(`${channel.id}`);
  if (!posts) {
    console.log("no posts found, fetching new posts");
    const Promises = subredditArray.map((subreddit) => {
      const _subreddit = new Reddit(subreddit, "hot");
      return _subreddit.getPosts();
    });
    const postsArray = await Promise.all(Promises);
    if (postsArray.length > 0) {
      const flattenPosts = postsArray.flat();
      posts = shuffleArray(flattenPosts);
    }
    if (posts) redisCache.set(`${channel.id}`, JSON.stringify(posts));
  }

  if (!posts) return channel.send(`could not fetch posts .`);

  if (typeof posts === "string") {
    posts = JSON.parse(posts);
  }

  //getting the first post from the list of posts and removing it from the rest
  const post = await getPost(posts);

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
