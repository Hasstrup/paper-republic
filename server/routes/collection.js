var express = require('express')
var Router = express.Router();
var Post = require('../models/post')
var Collection = require('../models/collection')


Router.get('/collections', function(req, res){
  Collection.find({}, function(err, collections){
    if(err){
      console.log(err)
    } else {
        var postarray = [];
        if(collections.posts !== undefined) {
        collections.posts.forEach(function(post){
          Post.findById(post.id, function(err, post){
            if(err){
              console.log(err)
            } else {
                postarray.push(post)
            }})})
        res.json({ collections:collections, postarray:postarray})
      } else {
        res.json({collections:collections})
      }
    }})})


Router.get('/collections/:id', function(req, res){
Collection.findById(req.params.id, function(err, collections){
  if(err){
        console.log(err)
        } else {
        var postarray = [];
        if(collections.posts !== undefined){
          collections.posts.forEach(function(post){
          Post.findById(post.id, function(err, post){
          if(err){
                  console.log(err)
                } else {
                    postarray.push(post)
                }})})
            res.json({ collections:collections, postarray:postarray})

        } else {
          res.json({collections:collections, postarray:postarray})
        }}})})


Router.get('/collections/new', function(req, res){
  //creating a new collection will only allow you attach uncategorized posts
  Collection.find({name: 'Uncategorized'}, function(err, collection){
    if(err){
      console.log(err)
    } else {
      if(collection !== null && collection.posts.length !== 0){
        var renderedposts = []
        collection.posts.forEach(function(post){
          Posts.find(post.id,function(err, posts){
            if(err){
              console.log(err)
            } else {
              renderedposts.push(posts)
            }})
        })
        res.json({posts:renderedposts})
      } else {
        res.json({posts:renderedposts})
      }
    }})})


Router.post('/collections', function(req, res){
  var newcollection = {name: req.body.name}
  Collection.create(newcollection, function(err, collection){
    if(err){
      console.log(err)
    } else {
      if(req.body.posts == true && req.body.posts.length !== 0) {
        req.body.posts.forEach(function (post){
          Post.findById(post, function(err, post){
            if(err) {
              console.log(err)
            } else {
              post.collectionn.id = collection._id
              post.collectionn.name = collection.name
              collection.posts.push(post)
              post.save()
              collection.save();
            }})})
            res.json({})
          }
            else {
              res.json({})
            }}})})


Router.get('/collections/:id/edit', function(req, res){
  Collection.findById(req.params.id, function(err, collection){
    if(err) {
        console.log(err)
    } else {
      res.json({collectionl:collection})
    }})})


Router.put('/collections/:id/edit', function(req, res){
  Collection.findByIdAndUpdate(req.params.id, {$set: {name: req.body.name}}, function(err, collection){
    if(err) {
      console.log(err)
    } else {
      if(collection.posts.length !== 0) {
        collection.posts.forEach(function(post){
          Posts.findById(post.id, function(err, post){
            if(err){
              console.log(err)
            } else {
              post.collectionn.name = collection.name
              post.collectionn.id = collection._id
              post.save()
              if (collection.posts.indexOf(post) === -1){
                collection.posts.push(post)
                collection.save()
              } else { return null }
            }})})
            res.json({})}
      else {
        res.json({})
      }}})})

Router.delete('/collections/:id', function(req, res){
    Collection.findById(req.params.id, function(err, i_collection){
      if(err) {
        console.log(err)
      } else {
        if(i_collection.posts == true && i_collection.posts.length !== 0 ) {
          i_collection.posts.forEach(function (post) {
          Post.findById(post.id, function(err, post){
          post.collectionn.name = 'General'
          post.save();
          Collection.find({name: 'General'}, function(err, ucollection){
          ucollection.posts.push(post)
          ucollection.save();
        })})})
            i_collection.remove();
            res.json({})
        } else {
          i_collection.remove();
          res.json({})
        }}})})

        module.exports = Router;
