import { defineStore } from 'pinia';
import {api} from 'boot/axios';
import {ResponseDto} from 'stores/dto/response.dto';
import {SubcategoryDto, SubcategoryState} from 'stores/dto/subcategory.dto';

export const useSubcategoryStore = defineStore('subcategory', {
  state: (): SubcategoryState => ({
    subcategories: [],
  }),
  getters: {
    getSubcategories: (state): SubcategoryDto[] => state.subcategories,
  },
  actions: {
    async getAllSubcategories() {
      this.subcategories = (await api.get('/subcategory')).data;
    },

    async create(payload: Omit<SubcategoryDto, 'id' | 'products'>) {
      await api.post('/admin/subcategory', payload)
      await this.getAllSubcategories()
    },

    async delete(id: number) {
      await api.delete(`/admin/subcategory/${id}`)
      await this.getAllSubcategories()
    },

    async get(id: number): Promise<ResponseDto<SubcategoryDto>> {
      return await api.get(`/subcategory/${id}`)
    },

    async update(payload: Omit<SubcategoryDto, 'id' | 'products'>, id: number) {
      await api.put(`/admin/subcategory/${id}`, payload);
      await this.getAllSubcategories()
    }
  },
});
