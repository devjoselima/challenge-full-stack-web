import { api } from "./axios"

interface AuthenticateBody {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  name: string;
  token: string;
}

export const authenticate = async ({ email, password }: AuthenticateBody) => {
  const response = await api.post<AuthenticateResponse>('/authenticate', { email, password });

  return response.data
}