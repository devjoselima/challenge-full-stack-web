import { api } from "./axios"

interface AuthenticateBody {
  email: string;
  password: string;
}

export const authenticate = async ({ email, password }: AuthenticateBody) => {
  
  const response = await api.post('/authenticate', { email, password });

  return response.data
}