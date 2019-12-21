const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const userModel = require('./Models/userSchema');
const database = require('./database.js');
const userRoute = require('./Routers/userRoute');
const messageRoute = require('./Routers/messageRoute');
const replyRoute = require('./Routers/replyRoute')
const ObjectId = require('mongodb').ObjectID
const cors = require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoute);
app.use('/messages', messageRoute);
app.use('/reply', replyRoute);

app.get('/', (req,res) => {
  userModel.find({})
  .then(doc => res.json(doc))
})

app.listen(3000, () => console.log("App is listening on port 3000"));
