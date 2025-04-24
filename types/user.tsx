export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}
export interface LogInDto {
  email: string;
  password: string;
}
export interface IUser {
  id?: string;
  name: string;
  email: string;
}
