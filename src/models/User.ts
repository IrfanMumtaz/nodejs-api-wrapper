import { Model } from 'sutando';
import { UserModel } from '../types';

class User extends Model implements UserModel {
  id?: number;
  name!: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
}

export default User;
