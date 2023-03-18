/**
 * Update the quantity of an item in the user's shopping cart.
 *
 * @swagger
 * /cart/{cartItemId}:
 *   patch:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     description: Update the quantity of an item in the user's shopping cart
 *     parameters:
 *       - name: cartItemId
 *         in: path
 *         description: ID of the cart item to be updated
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Cart item quantity to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemQuantity:
 *                 type: number
 *                 description: New quantity of the cart item
 *                 example: 2
 *             required:
 *               - itemQuantity
 *           example:
 *             itemQuantity: 2
 *     responses:
 *       '200':
 *         description: Cart item updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Cart item not found
 *       '500':
 *         description: Internal server error
 */