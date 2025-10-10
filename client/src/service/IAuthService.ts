export interface IRegisterUserService {
exec: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
}
export interface ILoginUserService {
  exec: (email: string, password: string) => Promise<string>;
}
