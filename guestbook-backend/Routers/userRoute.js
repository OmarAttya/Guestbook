require('dotenv').config()
const express = require('express');
const userModel = require('../Models/userSchema')
const router = new express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID


router.use(express.json());

function authenticationToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403)
    req.user = user
    req.token = token
    next();
  })
}

//sign in
router.post('/signin', (req, res) => {
  const {email, password} = req.body;
  userModel
    .findOne({
       email:email
      })
      .then(doc => {
        const user = {userId: doc._id};
        const isValid = bcrypt.compareSync(password, doc.password);
        if(isValid) {
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
          doc.token = accessToken;
          doc.save();
          const response = {
            data: 'success',
            token: accessToken
          }
          res.status(200).json(response)
        } else {
          res.status(400).json("Sign in Failed")
        }
    })
    .catch(err => {
      res.json("Sign in Failed")
    })
})

//Register
router.post('/register', (req,res) => {
  const {email, name, password} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  let user = new userModel({
    name: name,
    email: email,
    password: hash,
    messages: []
  })
  user.save()
    .then(doc => {
      console.log(doc)
      res.status(200).json(doc)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
})

router.delete('/logout', authenticationToken, (req, res) => {
  const userId = req.user.userId;
  const token = req.token;
  // console.log(token)
  userModel.findOne(
    {
      _id: ObjectId(userId),
      token: token
    })
    .then(doc => {
      doc.token='';
      console.log(doc)
      doc.save();
      res.status(200).json('Logged Out Successfully');
    })
    .catch(err => {
      res.status(400).json('Logging Out Failed');
    })
})

module.exports = router;