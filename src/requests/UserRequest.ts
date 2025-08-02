import Joi, { ObjectSchema } from 'joi';

export interface IUserRequest {
  name: string;
}

const UserRequest: ObjectSchema<IUserRequest> = Joi.object<IUserRequest>({
  name: Joi.string().alphanum().min(3).max(30).required(),
});

export default UserRequest;
