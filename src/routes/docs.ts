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
 * /login:
 *   post:
 *     summary: Log in  into your account to get more prevalleges
 *     tags: [Authantication routes]
 *     requestBody:
 *       description: Please fill all required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                 type: object
 *                 required:                    
 *                    - email
 *                    - password                   
 *                 properties:                 
 *                    email:
 *                      type: string
 *                    password: 
 *                       type : string 
 *     responses:
 *       '200':
 *         description: user log in succesfully
 *       400:
 *         description: Bad request
 */

//user login



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

/**
 * @swagger
 * /profile/edit:
 *   patch:
 *     summary: Update user profile details
 *     description: Update the user's profile details and billing and shipping addresses
 *     tags:
 *       - Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileDetails:
 *                 type: object
 *                 properties:
 *                   phoneNumber:
 *                     type: string
 *                     example: "+250788000000"
 *                   gender:
 *                     type: string
 *                     example: "Female"
 *                   birthday:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-02-19T11:55:10.439Z"
 *                   language:
 *                     type: string
 *                     example: "kinyarwanda"
 *               billingAddress:
 *                 type: object
 *                 properties:
 *                   streetAddress:
 *                     type: string
 *                     example: "kk509"
 *                   city:
 *                     type: string
 *                     example: "kigali"
 *                   stateOrProvince:
 *                     type: string
 *                     example: "kigali"
 *                   zipOrPostalCode:
 *                     type: string
 *                     example: "00000"
 *                   country:
 *                     type: string
 *                     example: "Rwanda"
 *               address:
 *                 type: object
 *                 properties:
 *                   streetAddress:
 *                     type: string
 *                     example: "kk509"
 *                   city:
 *                     type: string
 *                     example: "kigali"
 *                   stateOrProvince:
 *                     type: string
 *                     example: "kigali"
 *                   zipOrPostalCode:
 *                     type: string
 *                     example: "00000"
 *                   country:
 *                     type: string
 *                     example: "Rwanda"
 *     responses:
 *       200:
 *         description: Successfully updated profile details
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized - missing or invalid authentication token
 *       403:
 *         description: Forbidden - user is not authorized to access this resource
 *       500:
 *         description: Internal server error
 */


/**
 * Get user profile by ID
 * @swagger
 * /profile/{userId}:
 *   get:
 *     summary: Get user profile by ID
 *     description: Retrieve user profile by ID
 *     tags:
 *       - Profile
 *     security: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user profile
 *     responses:
 *       '200':
 *         description: A user profile object
 *       '404':
 *         description: User profile not found
 *       '500':
 *         description: Internal server error
 */

/**
 * Get all user profiles
 * @swagger
 * /profiles:
 *   get:
 *     summary: Get all user profiles
 *     description: Retrieve all user profiles
 *     tags:
 *       - Profile
 *     security: []
 *     responses:
 *       '200':
 *         description: An array of user profile objects
 *       '500':
 *         description: Internal server error
 */