var express = require('express');
var router = express.Router();
var Promise = require('promise');

var client = require('../twitter/client');
var dbpool = require('../db');
var since_id = getSince();


/**
 * Get the since id
 */
function getSince() {
  dbpool.query("SELECT since_id FROM since ORDER BY dtoi DESC LIMIT 1", function (err, result, fields) {
    if (err) throw err;      
    return result[0].since_id;
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

function parseUser(tweet) {
  console.log('tweet!')
  if(tweet.entities.user_mentions[0].screen_name != undefined) {
    console.log('tuser present', tweet.entities.user_mentions)

  }
}
async function getMentions(next) {
  let result = await client.get("statuses/mentions_timeline", {count: 10, since_id: since_id}).catch(next);
  return result;
}


function two() {
  return new Promise(resolve => {
    console.log("two");
    resolve();
  });
}

function three(){
   console.log("three")
}

//getMentions((e) => { console.log(e)}).then(() => two()).then(() => three());

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /twitter/:
 *    get:
 *      summary: Get a user by id
 *      tags: [Users]
 *      
 *      responses:
 *        "200":
 *          description: An users object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
/* GET users listing. */
router.get('/end', function(req, res, next) {
  getMentions().then((data) => res.send(data)).catch((err) => res.status(500).send(err));
});

router.get('/since', function(req, res, next) {
  res.send(since_id)
  
});


module.exports = router;
