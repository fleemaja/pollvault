const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

require('./models/Vote');
require('./models/Choice');
require('./models/Comment');
require('./models/CommentVote');
require('./models/Poll');
require('./models/User');
require('./models/Reply');
require('./models/ReplyVote');


// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 5001);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
