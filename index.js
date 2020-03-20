const
  express = require('express'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config'),
  users = require('./routes/users'),
  posts = require('./routes/posts'),
  comments = require('./routes/comments'),
  app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const run = async () => {
  await mongoose.connect('mongodb://localhost:27017/myForum',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

  app.use('/users', users);
  app.use('/posts', posts);
  app.use('/comments', comments);

  app.listen(config.port, () => {
    console.log(`HTTP server start on ${config.port} port!`);
  })
};

run().catch(e => {
  console.log(e);
});