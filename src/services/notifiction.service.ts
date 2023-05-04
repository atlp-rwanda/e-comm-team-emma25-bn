import sendEmail from "../controllers/resetpassword";
import { Notification } from "../db/models/notifications";
import USER from "../models/User";
import { io } from "../app";
import { decode } from "../helper/jwtTokenize";

let clientsocket: any = undefined

export function notificationserver(server){


    server.on("connection", async  (socket) =>{
        console.log("connected notifications")
        const token = socket.handshake.query.token;   
        const userData: any = decode(token);
        const notifications = await Notification.findAll({where: {userId: userData.id}})
        socket.in(`${userData.id}`).emit('allnotifications',notifications);
        socket.join(`${userData.id}`)
        socket.on("disconnect", ()=>{
            console.log("someone has disconnected");
            
        } )
        clientsocket = socket
    })

   

}
  
async function sendNotitfictation(buyerid: number| null, sellerid: string,subject: string,Adminmessage: string ,sellerMessage: string,BuyerMessage: string | null){    
    try {
        
        const seller :any =  await USER.findByPk(parseInt(sellerid))
        const buyer :any =  await USER.findOne({where:{id:buyerid}})             
        const admins: any = await USER.findAll({where : {roleId: 1}})
         admins.forEach(async (element: any) => {
            const note =
        {
            userId: element.id,
            subject,
            message: Adminmessage,
            status: "sent",
        }
        const notification = await Notification.create(note)    

            await sendEmail(element.email, subject,Adminmessage)             
            if(clientsocket){
            clientsocket.in(`${element.id}`).emit("notification", notification)  
                    }
            
         });   
                
         if(buyer){
            const note =
            {
                userId: buyer.id,
                subject,
                message: BuyerMessage,
                status: "sent",
            }
            const notification = await Notification.create(note)    
         await sendEmail(buyer.email,subject, BuyerMessage)
         if(clientsocket){
         clientsocket.in(`${buyer.id}`).emit("notification", notification)
         }
        }
         if(seller){
            const note =
            {
                userId: seller.id,
                subject,
                message: sellerMessage,
                status: "sent",
            }
            const notification = await Notification.create(note)    
         await sendEmail(seller.email,subject,sellerMessage)
         if(clientsocket){
         clientsocket.in(`${seller.id}`).emit("notification", notification)
         }
         }
         
        } catch (error: any ) {
     throw new Error(`${error.message}`);     
    }
} 

export default sendNotitfictation