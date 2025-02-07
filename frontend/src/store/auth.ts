import { defineStore } from 'pinia'
import { authenticate } from '@/api/authenticate'
import { toast } from 'vue3-toastify'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null
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
    logout() {
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
