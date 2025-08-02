import User from '@models/User';
import UserRequest from '@requests/UserRequest';
import { UserModel } from '../types';
import BaseService from './BaseService';

class UserService extends BaseService {
  async getAllUsers(): Promise<UserModel[]> {
    return this.execute(async () => {
      const users = await User.query().get();
      return users.toArray() as UserModel[];
    });
  }

  async createUser(userData: Partial<UserModel>): Promise<UserModel> {
    return this.execute(async () => {
      // Validate input data
      const validatedData = this.validateData<UserModel>(
        userData,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        UserRequest as any
      );

      // Check if user already exists
      const existingUser = await User.query()
        .where('name', validatedData.name)
        .first();

      if (existingUser) {
        throw new Error('User with this name already exists');
      }

      // Create new user
      const user = new User(validatedData);
      const savedUser = await user.save();
      return savedUser as unknown as UserModel;
    });
  }

  async getUserById(id: number): Promise<UserModel> {
    return this.execute(async () => {
      const user = await User.query().findById(id);

      if (!user) {
        this.handleNotFound('User not found');
      }

      return user as UserModel;
    });
  }

  async updateUser(
    id: number,
    userData: Partial<UserModel>
  ): Promise<UserModel> {
    return this.execute(async () => {
      const validatedData = this.validateData<UserModel>(
        userData,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        UserRequest as any
      );

      const user = await User.query().findById(id);

      if (!user) {
        this.handleNotFound('User not found');
      }

      // Update user
      Object.assign(user, validatedData);
      const savedUser = await user.save();
      return savedUser as unknown as UserModel;
    });
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    return this.execute(async () => {
      const user = await User.query().findById(id);

      if (!user) {
        this.handleNotFound('User not found');
      }

      await user.delete();
      return { message: 'User deleted successfully' };
    });
  }
}

export default UserService;
