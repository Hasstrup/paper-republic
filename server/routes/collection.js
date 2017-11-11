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
      collections.posts.forEach(function(post){
        Post.findById(post.id, function(err, post){
          if(err){
            console.log(err)
          } else {
              postarray.push(post)
          }})})
      res.json({ collections:collections, postarray:postarray})
    }})})


Router.get('/collections/:id', function(req, res){
Collection.findById(req.params.id, function(err, collections){
  if(err){
        console.log(err)
        } else {
        var postarray = [];
        collections.posts.forEach(function(post){
        Post.findById(post.id, function(err, post){
        if(err){
                console.log(err)
              } else {
                  postarray.push(post)
              }})})
          res.json({ collections:collections, postarray:postarray})
        }})})


Router.get('/collections/new', function(req, res){
  Posts.find({}, function(err, posts){
    if(err){
      console.log(err)
    } else {
      res.json({posts:posts})
    }})})


Router.post('/collections', function(req, res){
  Collection.create(newcollection, function(err, collection){
    if(err){
      console.log(err)
    } else {
      if(req.body.posts == true) {
        req.body.posts.forEach(function (post){
          Post.findById(post, function(err, post){
            if(err) {
              console.log(err)
            } else {
              post.collectionn.id = collection._id
              collection.posts.push(post)
              post.save
              collection.save();
            }})})}}})})


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
      if(collection.posts == true) {
        collection.posts.forEach(function(post){
          Posts.findById(post.id, function(err, post){
            if(err){
              console.log(err)
            } else {
              post.collectionn.name = collection.name
              post.save
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
        if(i_collection == true) {
          i_collection.posts.forEach(function (post) {
          Post.findById(post.id, function(err, post){
          post.collectionn.name = 'uncategorized'
          post.save();
          Collection.find({name: 'uncategorized'}, function(err, ucollection){
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
