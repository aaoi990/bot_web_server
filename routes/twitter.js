var express = require('express');
var router = express.Router();
var Promise = require('promise');

var client = require('../twitter/client');
var dbpool = require('../db');
var since_id;

getSince();

/**
 * Get the since id
 */
function getSince() {
  dbpool.query("SELECT since_id FROM since ORDER BY dtoi DESC LIMIT 1", function (err, result, fields) {
    if (err) throw err;  
    since_id = result[0].since_id;
  });  
}

const parameters = {
  track: "#dcbot"
};

const stream = client.stream("statuses/filter", parameters)
  .on("start", response => console.log("Hello. DC BOT is now listening!"))
  .on("data", tweet => console.log("data", tweet.entities.hashtags))
  .on("ping", () => console.log("ping"))
  .on("error", error => process.nextTick(() => stream.destroy()))
  .on("end", response => process.nextTick(() => stream.destroy())); 


async function getMentions(next) {
  let result = await client.get("statuses/mentions_timeline", {count: 10, since_id: since_id}).catch(next);
  return result;
}

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
