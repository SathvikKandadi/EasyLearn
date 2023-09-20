const express = require('express');
const jwt=require('jsonwebtoken'); 
const fs=require('fs');
const app = express();
const cors=require('cors');
const secret="i_love_anime";
const superSecret="i_hate_girls";

app.use(cors());

app.use(express.json());

const http=require("http");
const socketIO=require("socket.io");


const server=http.createServer(app);
const io=socketIO(server);

io.on('connection',()=> {
  console.log("A user is connected");
})



// const allowedOrigins = ['http://localhost:5173'];

// // const server = createServer(app);
// const server = require('http').createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(server);
// const { createServer } = require('node:http');

// const socket = require('socket.io');

// // const io = new Server(server, {
// //   cors: {
// //     origin: 'http://localhost:5173/chat', // Replace with your React app's URL
// //     methods: ['GET', 'POST'], // Add the HTTP methods you need
// //   },
// // });

// io.use(cors({
//   origin: allowedOrigins,
// }));



let ADMINS = [];
let USERS = [];
let COURSES = [];
let purchasedCourses=[];
let doubts=[];
let user_purchases={};

try {
  console.log("reading data");
  ADMINS = JSON.parse(fs.readFileSync('admins.json', 'utf8'));
  USERS = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  COURSES = JSON.parse(fs.readFileSync('courses.json', 'utf8'));
  purchasedCourses=JSON.parse(fs.readFileSync('purchases.json','utf8'));
  doubts=JSON.parse(fs.readFileSync('doubts.json','utf8'));
} 
catch {
  ADMINS = [];
  USERS = [];
  COURSES = [];
  doubts=[];
}

const authenticateAdmin=(req,res,next)=>
{
  let authorization=req.headers.authorization;
  console.log("In authorization "+authorization);
 
  if(authorization)
  {
    const token = authorization.split(' ')[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(404).send({message :"Invalid Admin credentials"});
      }
      else
      {
        req.user = user;
        console.log(req.user);
        next();
      }
      
    });
  }
  else
  {
    console.log("Error");
    res.status(400).send({message :"No Admin is logged In"});
  }
}
const authenticateUser=(req,res,next)=>{
  let authorization=req.headers.authorization;
  if(authorization)
  {
    const token = authorization.split(' ')[1];
    jwt.verify(token, superSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      else
      {
        req.user = user;
        next();
      }
      
    });
  }
  else
  {
    res.status(404);
  }
}

app.get('/',(req,res) => {
  res.send(`<h1> Hello World </h1>`);
})
// Admin routes
app.get('/admin/verify',authenticateAdmin,(req,res) => {
  // console.log(res.user);
  res.json({
    message:"Admin verified",
    username:req.user.username
  })
});


app.post('/admin/signup',(req, res) => {
  // logic to sign up admin
  let username=req.body.username;
  let password=req.body.password;
  let found=false;
  for(let i=0;i<ADMINS.length;i++)
  {
    let admin=ADMINS[i];
    // console.log(admin);
    if(username == admin.username)
    {
      found=true;
      break;
    }
  }
  if(found)
  {
    res.status(404).send("Admin already exists");
  }
  else
  {
    let admin={
      username:username,
      password:password
    };
    let token=jwt.sign(admin,secret, { expiresIn: '1h' });
    console.log(admin);
    ADMINS.push(admin);
    let data=JSON.stringify(ADMINS);
    fs.writeFile('admins.json',data,(err)=>{
      if(err)
        throw err;
      else
        console.log("Data written successfully");
    })
    let obj={
      message:"Admin successfully created",
      token:token
    }
    res.send(obj);
  }
});

app.post('/admin/login',(req, res) => {
  // logic to log in admin
  console.log(req.headers);
  console.log(ADMINS);
  let username=req.headers.username;
  let password=req.headers.password;
  let found=false;
  let admin;
  for(let i=0;i<ADMINS.length;i++)
  {
    // console.log(admin);
    if(username == ADMINS[i].username)
    {
      admin=ADMINS[i];
      found=true;
      break;
    }
  }
  if(found)
  {
    if(admin.password == password)
    {
      let token=jwt.sign(admin,secret, { expiresIn: '1h' });
      res.send({message :"Login is Successfull" , token:token});
    }
    else
    {
      res.status(400).send({message :"Invalid Credential's"});
    }
  }
  else
  {
    res.status(400).send({message :"No Such Admin exists"});
  }
});

app.post('/admin/courses',authenticateAdmin,(req, res) => {
  // logic to create a course
  let title=req.body.title;
  let description=req.body.description;
  let price=req.body.price;
  let imageLink=req.body.imageLink;
  let published=req.body.published;
  let courseId=COURSES.length;
  let course={
    title:title,
    description:description,
    price:price,
    imageLink:imageLink,
    published:published,
    courseId:courseId+1
  }
  COURSES.push(course);
  let data=JSON.stringify(COURSES);
  fs.writeFile('courses.json',data,(err)=>{
    if(err)
      throw err;
    else
      console.log("Data written successfully");
  })
  res.send({message: "Course Created Successfully",courseId: courseId+1});
});

app.put('/admin/courses/:courseId',authenticateAdmin, (req, res) => {
  // logic to edit a course
  let courseId=req.params.courseId;
  let found=false;
  for(let i=0;i<COURSES.length;i++)
  {
    if(COURSES[i].courseId == courseId)
    {
      let course=COURSES[i];
      course.title=req.body.title;
      course.description=req.body.description;
      course.price=req.body.price;
      course.imageLink=req.body.imageLink;
      course.published=req.body.published;
      res.send("Course updated successfully");
      found=true;
      let data=JSON.stringify(COURSES);
      fs.writeFile('courses.json',data,(err)=>{
        if(err)
          throw err;
        else
          console.log("Data written successfully");
      })
      break;
    }
  }
  if(!found)
  {
    res.status(404).send("No such Course Exists");
  }
});



app.get('/admin/courses',authenticateAdmin, (req, res) => {
  // logic to get all courses
  res.send(JSON.stringify(COURSES));

});

app.post('/admin/createDoubt',authenticateAdmin,(req,res) => {
  let title=req.body.title;
  let text=req.body.doubt;
  let username=req.body.username;
  let doubtId=doubts.length;
  let status=req.body.status;
  let doubt={
    title:title,
    text:text,
    username:username,
    status:status,
    doubtId:doubtId+1,
  }
  doubts.push(doubt);
  let data=JSON.stringify(doubts);
  fs.writeFile('doubts.json',data,(err)=>{
    if(err)
      throw err;
    else
      console.log("Data written successfully");
  })
  res.send({message: "Doubt Created Successfully",doubtId: doubtId+1});
})

app.get('/admin/doubts',authenticateAdmin,(req,res) => {
  res.send(JSON.stringify(doubts));
})

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  let username=req.body.username;
  let password=req.body.password;
  let found=false;
  for(let i=0;i<USERS.length;i++)
  {
    let user=USERS[i];
    if(username == user.username)
    {
      found=true;
      break;
    }
  }
  if(found)
  {
    res.status(404).send({message:"User already exists"});
  }
  else
  {
    let user={
      username:username,
      password:password
    }
    let token=jwt.sign(user,superSecret,{ expiresIn: '1h' });
    USERS.push(user);
    let data=JSON.stringify(USERS);
      fs.writeFile('users.json',data,(err)=>{
        if(err)
          throw err;
        else
          console.log("Data written successfully");
      })
    let obj={
      message:"User successfully created",
      token:token
    }
    res.send(obj);
  }
});

app.post('/users/login',(req, res) => {
  // logic to log in user
  let username=req.headers.username;
  let password=req.headers.password;
  let found=false;
  if(USERS.length == 0)
  {
    return res.status(404).json({message: "No such User Exists"});
  }
  for(let i=0;i<USERS.length;i++)
  {
    let user=USERS[i];
    if(username == user.username && password==user.password)
    {
      found=true;
      let token=jwt.sign(user,superSecret, { expiresIn: '1h' });
      res.send({ message: 'Login is Successfull', token: token });
    }
    else if(username == user.username && password!=user.password)
    {
      found=true;
      res.status(404).json({message: "Invalid login Credentials"});
    }
  }
  if(!found)
  {
    res.status(404).json({message: "No such User Exists"});
  }
});

app.get('/users/courses',authenticateUser,(req, res) => {
  // logic to list all courses
  res.send(JSON.stringify(COURSES));
});

app.post('/users/courses/:courseId',authenticateUser, (req, res) => {
  // logic to purchase a course
  let courseId=req.params.courseId;
  let found=false;
  for(let i=0;i<COURSES.length;i++)
  {
    if(COURSES[i].courseId == courseId)
    {
      let course=COURSES[i];
      // user_purchases[course]=req.user.username;
      let purchase={
        course:course,
        user:req.user.username
      }
      purchasedCourses.push(purchase);
      let data=JSON.stringify(purchasedCourses);
      fs.writeFile('purchases.json',data,(err)=>{
        if(err)
          throw err;
        else
          console.log("Data written successfully");
      })
      res.send("Course purchased successfully");
      found=true;
      break;
    }
  }
  if(!found)
  {
    res.status(404).send("No such course exists");
  }
});

app.get('/users/purchasedCourses',authenticateUser, (req, res) => {
  // logic to view purchased courses
  let ans=[];
  for(let i=0;i<purchasedCourses.length;i++)
  {
    let username=req.user.username;
    if(username == purchasedCourses[i].user)
    {
      ans.push(purchasedCourses[i]);
    }
  }
  res.send(JSON.stringify(ans));
});



// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// io.on('disconnect', () => {
//   console.log('A user disconnected');
//   // Perform any cleanup or additional logic here
// });

// io.on('disconnect', (socket) => {
//   console.log('a user disconnected');
// });

// io.on('message', (newMessage) => {
//   console.log('Message received:', newMessage);
//   // Broadcast the message to all connected clients
//   io.emit('message', newMessage);
// });

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
