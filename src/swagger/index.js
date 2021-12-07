/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     description: Enter a valid **username** and **password** to generate a JWT and authenticate acess all routes.
 *     parameters:
 *      - name: body
 *        in: body
 *        required: 
 *          - username
 *          - password
 *        properties:
 *           username:
 *               type: string
 *           password:
 *               type: string                           
 *     responses:
 *       200:
 *         description: Returns a acessToken string to use all resources.
 *       401:
 *         description: Return a statusCode and message error
 * 
 */


/**
 * @swagger
 * /api/v1/games:
 *   get:
 *     description: Inform all registered games in the database.
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */


/**
 * @swagger
 * /api/v1/games/:_id:
 *   get:
 *     description: Inform a specific game registered in the database
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

/**
 * @swagger
 * /api/v1/games/:_id:
 *   put:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

/**
 * @swagger
 * /api/v1/games/:_id:
 *   delete:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */


/**
 * @swagger
 * /api/v1/games:
 *   post:
 *     description: Enter a valid value (**name** and **year**) to register a new item. You need to be authenticated to access this route. 
*     parameters:
 *      - name: body
 *        in: body       
 *        required: 
 *          - name
 *          - year
 *        properties:
 *           name:
 *               type: string
 *           year:
 *               type: number                                   
 *     responses:
 *       200:
 *         description: Create a new item and save it to the database.
 *       401:
 *         description: You need a valid JWT (Authenticate route) to acess this endpoint.
 */
