import USER from '../models/User'

export const foundUser = async (email) => {
    const findUser = await USER.findOne({
        where: { email: email },
        attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'password'],
    })
    if(!findUser){
        return {error: 'User not found'}
    } else {
        return findUser
    }

}

