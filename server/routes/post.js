var express = require('express')
var Router = express.Router();
var Post = require('../models/post')
var Collection = require('../models/collection')

Router.get('/post', function(req, res){
  Post.find({}, function(err, posts){
    if(err){
      console.log('there is an error here' + err)
    } else {
      res.json({posts:posts})
    }})})


Router.get('/post/:id', function(req, res){
  Post.findById(req.params.id, function(err, post){
    if(err) {
      console.log('problem fetching the post' + err)
    } else {
      res.json({post:post})
    }})})


Router.get('/post/new', function(req, res){
  Collection.find({}, function(err, collections){ //doing this so that you can assign it a collection on creation
    if(err) {
      console.log('oops another error here' + err)
    } else {
      res.json({collections: collections})
}})})


Router.post('/post', function(req, res){
  var newpost = {link: req.body.link}
  Post.create(newpost, function(err, post){
    if(err) {
      console.log(err)
    } else {
      newpost.creator.name = req.body.creatorname
      newpost.creator.link = req.body.creatorlink
      newpost.save();
      if(req.body.collection == true){
        Collection.findById(req.body.collection, function(err, collection){
          if(err){
            console.log(err)
          } else {
            post.collectionn.name = collection.name
            post.collectionn.id = collection._id
            post.save();
            collection.posts.push(post)
            collection.save()
            res.json({status: 200})
          }
        })}
        else {
        res.json({})
      }}})})


Router.delete('/post/:id', function(req, res){
  Post.findById(req.params.id, function(err, post) {
    if(err){
      console.log(err)
    } else {
      Collection.findById(post.collectionn.id, function(err, collection){
        if(err){
          console.log(err)
        } else {
          var index = collection.indexOf(post)
          collection.splice(index, 1)
          collection.save()
          post.remove();
          res.json({})
        }})}})})

module.exports = Router;
