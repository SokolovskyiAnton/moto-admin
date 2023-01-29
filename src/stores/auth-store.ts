import { defineStore } from 'pinia';
import {AuthState, LoginPayload, AuthDto} from 'stores/dto/auth.dto';
import {api} from 'boot/axios';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
  }),
  getters: {
    getUserInfo: (state): AuthDto | null => state.user,
  },
  actions: {
    async login(payload: LoginPayload) {
      const response = await api.post('/admin/login', payload)
      localStorage.setItem('token', response.data.token)
      this.user = (await api.get('/user')).data as AuthDto
    },
    async logout() {
      await api.post('/logout')
      localStorage.removeItem('token')
    }
  },
});
