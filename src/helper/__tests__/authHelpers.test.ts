import { foundUser } from '../authHelpers';
import USER from '../../models/User';

describe('foundUser function', () => {
    it('should return the user when it exists', async () => {
        const fakeUser = {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            role: 'user',
            password: 'password'
        };

        jest.spyOn(USER, 'findOne').mockResolvedValue(fakeUser as any);

        const result = await foundUser('john.doe@example.com');

        expect(result).toEqual(fakeUser);
    });

    it('should return an error message when user is not found', async () => {
        jest.spyOn(USER, 'findOne').mockResolvedValue(null);

        const result = await foundUser('non-existing-user@example.com');

        expect(result).toEqual({ error: 'User not found' });
    });
});
