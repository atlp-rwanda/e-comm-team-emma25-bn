import PROFILE from '../models/profilemodels/profile'
import ADDRESS from '../models/profilemodels/Address'
import BILLINGADRESS from '../models/profilemodels/BillingAdress'
import {Request, Response} from 'express'
import {CustomRequest} from '../middlewares/verifyToken'
import USER from '../models/User'
/* eslint-disable @typescript-eslint/no-explicit-any */
async function createProfile(userid: string){
  try {
    const user: any |undefined= await USER.findByPk(userid)
    if(user){
      const profiledata = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user.id,
      };
      const profile = await PROFILE.create({ ...profiledata});
      return profile      
    }
  } catch (error: any) {
  throw new Error(error.message);
  }
}

class Profiles{
static async getprofile(req: Request , res: Response){
  const userId = req.params.userId 
       try {
        const user: any |undefined= await USER.findByPk(userId)
        if(!user){
          throw new Error("user not found");
        }
        let profilepage: any = await PROFILE.findOne({where:{userId: req.params.userId},
         include: [{ model: BILLINGADRESS , as: 'billingAddress' },{ model: ADDRESS , as: 'Address' }]
         
    })       
    if(!profilepage){   
     profilepage = createProfile(userId)
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
    let profile:any = await PROFILE.findOne({where: {userId : loggedinuser.id}})
    let profileId = profile.id    
   
try {      
  if(!profile){
      profile = createProfile(profileId)
      profileId = profile.id    
  }
const foundProfile: any = await PROFILE.findOne({where:{id: profileId}})
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
