export interface BaseModel {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserModel extends BaseModel {
  name: string;
  email?: string;
}
