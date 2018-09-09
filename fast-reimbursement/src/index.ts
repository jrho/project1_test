// this will be the entry point for our application
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import {userRouter} from '../src/routers/user-router'
import { reimbRouter } from '../src/routers/reimb-router';
import swal from 'sweetalert2';

console.log('here');

// create the app object from express
const app = express();

// set the port
const port = process.env.PORT || 9001; // will use port from computers environment variables or 3000 if there is none
app.set('port', port);

const sess = {
  secret: 'keyboard cat',
  cookie: {secure: false},
  resave: false,
  saveUninitialized: false
};

console.log('gothere');
if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

// register session middleware
app.use(session(sess));



// log the request being made
app.use((req, res, next) => {
  console.log(`request made with path: ${req.path} \nand type: ${req.method}`);
  next();
});

// allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(
  express.static(path.join(__dirname, 'public'))
);

// //allows cors headers
// app.use((req,resp,next)=>{
  
//   resp.header("Access-Control-Allow-Origin", "*");
//   // resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// })  

// use the body parser to convert request json
app.use(bodyParser.json());

/*********************************************************************************************
 * API Routers
 ********************************************************************************************/

app.use('/reimb',reimbRouter);
app.use('/users',userRouter);


const server = app.listen(port, () => {
  console.log(`App is running at http://localhost:${app.get('port')}/home/home.html in ${app.get('env')} mode`);
});
