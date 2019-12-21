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

  router.get('/', authenticationToken, (req, res) => {
    const userId = req.user.userId;
    const messageId = req.headers.messageid
    const Token = req.token
    console.log('USER ID', userId)
    console.log('MESSAGE ID', messageId)
    userModel.findOne({
      _id: userId,
      token: Token,
      'messages._id': messageId
    })
    .then(response => {
      const data = response.messages.filter((item) => {
        return item._id == messageId
      })
      res.json(data[0].reply);
    })
  })

//Insert Reply
router.post('/', authenticationToken, (req,res) => {
    const messageId = req.headers.messageid;
    const userId = req.user.userId;
    const Reply = req.body.content;
    const replyBody = {
        _id: new ObjectId(),
        content: Reply,
        user: userId
    }
    userModel.findOne(
        {_id: userId, 'messages._id': messageId})
        .then(doc => {
            const {messages} = doc;
            messages.map((element) => {
                if(element._id==messageId){
                    element.reply.push(replyBody);
                }
                return element;
            })
            doc.save()
            .then(doc => {
                return res.status(200).json(doc);
            })
            .catch(err => {
                return res.status(400).json(err);
            })
        })
        .catch(err => {return res.json(err)}) 
})


  module.exports = router