import PROFILE from '../models/profilemodels/profile'
import ADDRESS from '../models/profilemodels/Address'
import BILLINGADRESS from '../models/profilemodels/BillingAdress'
import {Request, Response} from 'express'
import {CustomRequest} from '../middlewares/verifyToken'
/* eslint-disable @typescript-eslint/no-explicit-any */


class Profiles{
static async getprofile(req: Request , res: Response){
       try {
        const profilepage: any = await PROFILE.findOne({where:{userId: req.params.userId},
         include: [{ model: BILLINGADRESS , as: 'billingAddress' },{ model: ADDRESS , as: 'Address' }]
         
    })       
    if(!profilepage){   
    throw new Error("profile not found")
    }
    
        res.status(200).json({
            statusCode: 200,
            message: "succesfully retrieved profile data",
            data: profilepage
        })
    } catch (error: any) {
        res.status(400).json({
            statusCode: 400,
            message: error.message

        })     
    }
}
    
static async edit(req: CustomRequest , res: Response){      
    const loggedinuser:any = req.user     
    const profile:any = await PROFILE.findOne({where: {userId : loggedinuser.id}})
    const profileId = profile.id    
   
try {
    
const foundProfile: any = await PROFILE.findOne({where:{id: profileId}})
if(foundProfile){
    const bAddress= req.body.billingAddress
    const profileDetails= req.body.profileDetails
    const Address = req.body.address
    if(profileDetails){
        await PROFILE.update(profileDetails,{where:{id: profileId}})
    }   
    if(bAddress){
        await BILLINGADRESS.upsert({ ...bAddress, profileId });
    }
    if(Address){
        await ADDRESS.upsert({ ...Address, profileId });
            }    
    res.status(200).json({
        statusCode: 200,
        message: `updated profile for ${foundProfile.firstName}`,
        
    })
}    
} catch (error: any) {
    res.status(400).json({
        StatusCode: 400,
        message: error.message,
      })
    }
  }
  static async getall(req: Request, res: Response) {
    try {
      const profiles = await PROFILE.findAll({
        attributes: ['id', 'email', 'firstName', 'lastName', 'userId'],
      })
      res.status(200).json({
        statusCode: 200,
        message: 'sucessfully retreived the profiles',
        data: profiles,
      })
    } catch (error: any) {
      res.status(200).json({
        statusCode: 400,
        message: error.message,
      })
    }
  }
}
export default Profiles
