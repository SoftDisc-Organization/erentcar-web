import { Role } from "./Role.enum";

export default interface UserRegister {
  username: string;
  email: string;
  password: string;
  roles: Role[];
}