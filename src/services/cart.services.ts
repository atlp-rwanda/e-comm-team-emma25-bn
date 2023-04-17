import Cart from "../db/models/cart";


export async function createCart(buyerId: number, Total :number){
    try {
        const cart = await Cart.create({buyerId, Total})
        return(
            cart
        )
    } catch (error: any) {
        throw new Error(error.message);
        
    }
}