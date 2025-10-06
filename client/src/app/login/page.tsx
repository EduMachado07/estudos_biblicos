import { useLoginModel } from "./login.model";
import { LoginView } from "./login.view";

export const LoginPage = () => {
  const methods = useLoginModel()
  return <LoginView {...methods} />;
};