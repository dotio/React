const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const {
  truncate,
  tags,
  formatDate,
  select,
  editIcon
} = require('./helpers/hbs');
const methodOverride = require('method-override');

// Load users model
require('./model/User');
// Load story model
require('./model/Story');

// load routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

// req passport
require('./config/passport')(passport);

mongoose.Promise = global.Promise;
// connect to db
mongoose
  .connect(db.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('connect'))
  .catch(err => console.log(err));

const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// method override middleware
app.use(methodOverride('_method'));

// Handlebars middleware
app.engine(
  'handlebars',
  exphbs({
    helpers: {
      truncate,
      tags,
      formatDate,
      select,
      editIcon
    },
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

// session middleware
app.use(cookieParser());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// folder middleware
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
