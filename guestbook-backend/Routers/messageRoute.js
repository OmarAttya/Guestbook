require('dotenv').config();
const express = require('express');
const userModel = require('../Models/userSchema');
const ObjectId = require('mongodb').ObjectID
const jwt = require('jsonwebtoken')
const router = new express.Router();


function authenticationToken(req, res, next) {
  const authHeader = req.headers['authorization']
  // console.log(req.headers)
  const token = authHeader && authHeader.split(' ')[1]
  // console.log(token)
  if(token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // console.log(user)
    if(err) return res.sendStatus(403)
    req.user = user
    req.token = token
    next();
  })
}

//Get Messages
router.get('/',authenticationToken, (req, res) => {
    const userId = req.user.userId;
    const token = req.token;
    userModel
      .find({
        _id: ObjectId(userId),
        token: token
      })
      .then(doc => {
        res.json(doc[0].messages)
      })
      .catch(err => {
        res.json(err)
      })
  })

//Insert Messages
router.post('/', authenticationToken, (req, res) => {
    const userId = req.user.userId;
    const token = req.token;
    const message = req.body
    userModel.findOneAndUpdate(
      {
        _id: ObjectId(userId)  // search query
      },
      {
        $push: {messages: message}   // field:values to update
      },
      {
        new: true,                       // return updated doc
        runValidators: true              // validate before update
      })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      console.error(err)
    })
  })
  
  //Update Messages
router.put('/', authenticationToken, (req, res) => {
    const userId = req.user.userId;
    const messageId = req.headers.messageid;
    const message = req.body.content
    console.log('USER ID',userId)
    console.log('MESSAGE ID',messageId)
    console.log('MESSAGE', message)
    userModel.findOne(
      {_id: userId, 'messages._id': messageId})
      .then(doc => {
          const {messages}=doc
          messages.map((element)=>{
            if(element._id==messageId){
              element.content=message
            }
            return element
          })
          doc.save()
          .then(doc => {
            res.status(200).json(doc)
          })
          .catch(err => {
            console.log(err)
            res.status(400).json(err)
          })
          
        }).catch(err => {
          console.log(err)
          return res.status(400).json(err)
        })
  
  })
  


  //Delete Message
  router.delete('/', authenticationToken, (req,res) => {
    const userId = req.user.userId;
    const token = req.token;
    const messageId = req.headers.messageindex
    console.log(messageId)
    userModel.updateOne(
      {'messages._id': messageId},
      {$pull: {messages: {_id: messageId}}}
    )
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  })
  

  module.exports = router;