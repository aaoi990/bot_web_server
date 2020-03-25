var express = require('express');
var router = express.Router();
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
 *                $ref: '#/components/schemas/user'
 */
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a twitter resource');
});

module.exports = router;
