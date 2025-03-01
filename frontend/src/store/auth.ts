import { defineStore } from 'pinia'
import { authenticate } from '@/services/authenticate'
import { toast } from 'vue3-toastify'
import { register } from '@/services/register'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.token
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const { token } = await authenticate({ email, password })

        if (token) {
          this.token = token
          localStorage.setItem('token', token)
        }
      } catch (error) {
        toast.error('Credenciais inválidas')
        throw new Error()
      }
    },
    async register(name: string, email: string, password: string) {
      try {
        await register({ name, email, password })
        await this.login(email, password)
      } catch (error) {
        throw new Error()
      }
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
