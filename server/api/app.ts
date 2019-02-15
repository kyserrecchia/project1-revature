import express from 'express';
// import { userRouter } from './routers/user.router';
// import { pokemonRouter } from './routers/pokemon.router';
import session from 'express-session';
import { authRouter } from './src/routers/auth.router';
import { reimRouter } from './src/routers/reim.router';
import { userRouter } from './src/routers/user.router';
import bodyParser from 'body-parser';
import { request } from 'http';
import { authMiddleware } from './src/middleware/auth.middleware';

const methodOverride = require('method-override');

const app = express();
export const srcDir = __dirname;

// set up body parser to convert json body to js object and attach to req
app.use(bodyParser.json());
// set up body parser to expose body to server on post requests
app.use(bodyParser.urlencoded({extended: true}));

// allow cross origins
app.use((req, resp, next) => {
    console.log(req.get('host'));
    (process.env.ENVIRONMENT === 'produdction')
      ? resp.header('Access-Control-Allow-Origin', process.env.DEMO_APP_URL)
      : resp.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    resp.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

// create logging middleware
app.use((req, res, next) => {
  console.log(`request was made with url: ${req.path}
  and method: ${req.method}`);
  next(); // will pass the request on to search for the next piece of middleware
});

// set up express to attach sessions
const sess = {
  secret: 'potato',
  cookie: { secure: false },
  resave: false,
  saveUnitialized: false
};
// prior to this req.sesssion is nothing
// after this req.session is an object we can store
// any user data we want on
app.use(session(sess));

app.use(express.static(`${__dirname}/views`));

app.use('/', authRouter);
app.use('/reimbursements', reimRouter);
app.use('/users', userRouter);

app.listen(3001);
console.log('application started on port: 3001');




