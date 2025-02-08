import { api } from "./axios"

interface RegisterBody {
  name: string
  email: string;
  password: string;
}

export const register = async ({ name, email, password }: RegisterBody) => {
  const response = await api.post('/register', { name, email, password });

  return response.data
}