/**
 * @swagger
 * /orders/change/{orderid}:
 *   patch:
 *     summary: Update the status of an order
 *     description: Update the status of an order by its ID
 *     tags: [Order Status]
 *     parameters:
 *       - in: path
 *         name: orderid
 *         required: true
 *         description: ID of the order to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status of the order
 *                 example: delivered
 *     responses:
 *       '200':
 *         description: Order status updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized request, user does not have admin role
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /orders/getall:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve all orders from the database
 *     tags: [Order Status] 
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number to retrieve
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Maximum number of orders to retrieve per page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       '200':
 *         description: List of orders retrieved successfully
 *       '401':
 *         description: Unauthorized request, user does not have admin role
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /orders/userorders:
 *   get:
 *     summary: Get personal orders
 *     description: Retrieve all orders belonging to the authenticated user
 *     tags: [Order Status]
 *     responses:
 *       '200':
 *         description: List of orders retrieved successfully
 *       '401':
 *         description: Unauthorized request, user is not authenticated or does not have the Buyer or User role
 *       '500':
 *         description: Internal server error
 */
