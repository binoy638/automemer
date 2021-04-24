const { Agenda } = require("agenda");

let configureMongoDBObj = {
  db: {
    address: process.env.DB_URL_NAME,
    collection: "agenda",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  processEvery: "1 minutes",
};
const agenda = new Agenda(configureMongoDBObj);

agenda.on("ready", async () => {
  await agenda.start();
  console.log("agenda is ready");
});

let graceful = () => {
  agenda.stop(() => process.exit(0));
};

process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);

module.exports = { agenda };
