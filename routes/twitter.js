"use strict";

var express = require('express');
var router = express.Router();
var Promise = require('promise');

var client = require('../twitter/client');
var dbpool = require('../db');
var Tweet = require('../models/tweet');

var since_id;
getSince();
/**
 * Get the since id
 */
function getSince() {
  dbpool.query("SELECT since_id FROM since ORDER BY dtoi DESC LIMIT 1", function (err, result, fields) {
    if (err) throw err;         
    since_id = (result[0].since_id).toString();
  });  
}

const parameters = {
  track: "#dcbot"
};

const stream = client.stream("statuses/filter", parameters)
  .on("start", response => console.log("Hello. DC BOT is now listening!"))
  .on("data", tweet => parseUser(tweet))
  .on("ping", () => console.log("ping"))
  .on("error", error => { process.nextTick(() => stream.destroy()), console.log(error)} )
  .on("end", response => process.nextTick(() => stream.destroy())); 

async function getMentions(next) {
  let result = await client.get("statuses/mentions_timeline", {count: 10, since_id: since_id}).catch(next);
  return result;
}

async function getUserTweets(tweet) {
  let result = await client.get("statuses/user_timeline", {
    screen_name: tweet.screen_name,
    trim_user: true,
    count: 2000
  }).catch((e) => console.log("get user tweets failed", e.message));
  console.log(result)
  return result;
}

async function getQueryUser(screen_name) {
  let result = await client.get("users/show", {   
    screen_name: screen_name
  }).catch((e) => console.log("query user failed", e.message));
  let tweet = new Tweet(result.screen_name, result.id_str, result.created_at, result.followers_count, result.friends_count, result.verified, result.statuses_count);
  getUserTweets(tweet);
}

function parseUser(tweet) {
  return new Promise(resolve => {
    if(tweet.entities.user_mentions[0].screen_name != undefined) {
      let user = getQueryUser(tweet.entities.user_mentions[0].screen_name);
      resolve(user);    
    } 
  });    
}

router.get('/end', function(req, res, next) {
  getMentions().then((data) => res.send(data)).catch((err) => res.status(500).send(err));
});

router.get('/since', function(req, res, next) {  
  let test = new Tweet('a', '333333');
  console.log(test)
  res.send(since_id);  
});

module.exports = router;
