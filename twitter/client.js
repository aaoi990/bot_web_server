const Twitter = require('twitter-lite');

const client = new Twitter({
  subdomain: "api",
  consumer_key: process.env.CONSUMER_KEY, 
  consumer_secret: process.env.CONSUMER_SECRET, 
  access_token_key:process.env.ACCESS_TOKEN, 
  access_token_secret:process.env.ACCESS_TOKEN_SECRET 
});

module.exports = client;