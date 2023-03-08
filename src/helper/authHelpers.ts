import USER from '../models/User'

export const foundUser = async (email: string) => {
    const findUser = await USER.findOne({
        where: { email: email },
        attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "roleId",
            "password",
        ],
    });
    if (!findUser) {
        return { error: 'User not found' }
    } else {
        return findUser
    }
}

