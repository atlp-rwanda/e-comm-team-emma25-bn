// import USER from "../models/User";
// import {Request , Response} from "express"

// /* this class hold functions for authentication */
// class auth {
//     static async signup(req: Request ,res:Response){
//         //defined the type of user to be created 
//         type newuser ={
//             firstName: string,
//             lastName : string,
//             email: string,
//             password: string,
//         }
// const userReq: newuser={
//     firstName: req.body.firstName ,
//     lastName: req.body.lastName ,
//     email:req.body.email ,
//     password:req.body.password,
// }
//         try {
//             const user = await USER.create(userReq)
//             if(user){
//                 res.status(200).json({
//                     statusCode: 200,
//                     message: "created account succesfully"
//                 })              
//             }
//             // else{
//             //     res.status(400).json({
//             //         statusCode: 200,
//             //         message: "Failed to create user",                  
//             //     })                    
//             // }
//         } 
//         catch (error: any) {
//             res.status(400).json({
//                 statusCode: 400,
//                 message: "Failed to create user",
//                 error: error.message                  
//             })            
//         }      

//     }
//     static async getAlluser(req: Request ,res: Response){
//         try {           
//             const users : object = await USER.findAll({attributes: { exclude: ['password'] }})
//             res.status(200).json({
//                 statuscode: 200,
//                 users
//             })            
//         } catch (error: any) {
//             res.status(400).json({
//                 statusCode: 400,
//                 "message" : error.message
//             })
//         }
//     }
//     /*this delete user function is not protected it is created just for the project setup and testing*/
//     static async deleteUser(req: Request,res:Response){
//         const userid: string = req.params.id 
//         try {
//             await USER.destroy({where : {id : userid}})          
//             res.status(200).json({
//                 statusCode: 200,
//                 "message" : `deleted user with id ${userid}`
//             })
              
//         } catch (error: any) {
//             res.status(400).json({
//                 statusCode: 400,
//                 "message" : error.message
//             })

            
//         }
//     }
// }
// export default auth