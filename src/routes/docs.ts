/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - users
 *     summary: all Users
 *     security: []
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 required:                    
 *                    - email
 *                    - firstName
 *                    - lastName
 *                    - password                   
 *                 properties:                 
 *                    email:
 *                      type: string
 *                    firstname:
 *                      type: string
 *                    lastName:
 *                       type: string
 *                    password: 
 *                       type : string                   
 *     responses:
 *       201:
 *             description: successfully logged in;
 *       
 * */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - users
 *     name: users
 *     summary: Retrieve all users
 *     security: []
 *     consumes:
 *        - application/json
 *     responses:
 *       200:
 *             description:  successfully Retrieved.
 * */

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     tags:
 *       - users
 *     summary: Delete a user
 *     security: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: Successfully Deleted.
 *       400:
 *             description: Bad request.
 * */
   