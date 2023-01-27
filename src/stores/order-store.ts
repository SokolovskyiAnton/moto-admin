import { defineStore } from 'pinia';
import {api} from 'boot/axios';
import {ResponseDto} from 'stores/dto/response.dto';
import {OrderDto, OrderState} from 'stores/dto/order.dto';

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    orders: [],
  }),
  getters: {
    getOrders: (state): OrderDto[] => state.orders,
  },
  actions: {
    async getAllOrders() {
      this.orders = (await api.get('/admin/orders')).data;
    },

    async get(id: number): Promise<ResponseDto<OrderDto>> {
      return await api.get(`/admin/orders/${id}`)
    },

  },
});
