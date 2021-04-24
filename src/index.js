require("dotenv").config();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const MongoDBProvider = require("commando-provider-mongo").MongoDBProvider;
const Commando = require("discord.js-commando");
const { agenda } = require("./config/agenda");
const sendMeme = require("./utils/sendMeme");
const { redisCache } = require("./config/cache");

const client = new Commando.Client({
  owner: "312265605715722240",
  commandPrefix: "#",
});

client
  .setProvider(
    MongoClient.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((client) => new MongoDBProvider(client, process.env.DB_NAME))
  )
  .catch(console.error);

client.once("ready", async () => {
  console.log(`${client.user.username} is ready!`);
  client.registry
    .registerGroups([["memes", "Meme commands"]])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, "commands"));
  agenda.define("flush", () => {
    redisCache.flushall();
  });

  agenda.define("autoposts", async (job) => {
    const { channel, subreddit } = job.attrs.data;
    const Guildchannel = client.channels.cache.get(channel);
    sendMeme(subreddit, Guildchannel);
  });
  // agenda.every("24 hours", "flush");
});

client.login(process.env.DISCORD_TOKEN);
