import { AxiosInstance } from "../AxiosInstance";
import type { ILoginUserService } from "../IAuthService";

export class LoginUserService implements ILoginUserService {
  async exec( email: string, password: string ): Promise<string> {
    const { data } = await AxiosInstance.post("/login", {email, password});

    return data.token;
  }
}
