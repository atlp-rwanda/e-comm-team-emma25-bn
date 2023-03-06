import bcrypt from 'bcrypt'

export const comparePassword = async (password: string, dbPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, dbPassword)
}