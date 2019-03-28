const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: 'tobsbot',
    password: 'oauth:6y7b7tzxsn0htom8z1flshv62456ej'
  },
  channels: ['#tobs_irl']
};

// const addr = irc-ws.chat.twitch.tv;
// const port = 80;

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

client.on('connected', () => {
  // Do your stuff.
  client
    .say('channel', 'tobsbot connected')
    .then(data => {
      // data returns [channel]
    })
    .catch(err => {
      //
    });
});

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }

  // Add another chat command
  if (commandName === '!hello') {
    const name = opts.identity.username;
    client.say(target, `Hi, ${name}. Hope you are having a nice day!`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  client.say('#tobs_irl', `tobsbot connected...`);
}
