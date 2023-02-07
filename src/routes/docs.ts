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
   
/**
 * @swagger
 * /resetpassword/link:
 *   post:
 *     tags:
 *       - users
 *     summary: send token to email
 *     security: []
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:

 *              schema:
 *                 type: object
 *                 required:                    
 *                    - email
 *                 properties:                 
 *                    email:
 *                      type: string          
 *     responses:
 *       201:
 *             description: check your email for the verification token;
 *       
 * */

/**
 * @swagger
 * /changepassword/{useremail}/{token}:
 *   patch:
 *     tags:
 *       - users
 *     summary: Change the user's password using a token
 *     security: []
 *     parameters:
 *       - name: useremail
 *         in: path
 *         description: The email of the user whose password is being changed
 *         required: true
 *         schema:
 *           type: string
 *       - name: token
 *         in: path
 *         description: The token required to change the user's password
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newpassword:
 *                 type: string
 *                 description: The user's new password
 *               confirmpass:
 *                 type: string
 *                 description: The user's new password confirmation
 *     responses:
 *       200:
 *         description: The user's password has been changed successfully
 */
