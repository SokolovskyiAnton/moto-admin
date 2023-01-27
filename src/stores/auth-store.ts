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
      await api.post('/admin/login', payload)

      this.user = (await api.get('/user')).data as AuthDto
    },
    async logout() {
      await api.post('/logout')
    }
  },
});
