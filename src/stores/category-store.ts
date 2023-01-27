import { defineStore } from 'pinia';
import {api} from 'boot/axios';
import {CategoryDto, CategoryState} from 'stores/dto/category.dto';
import {ResponseDto} from 'stores/dto/response.dto';

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    categories: [],
  }),
  getters: {
    getCategories: (state): CategoryDto[] => state.categories,
  },
  actions: {
    async getAllCategories() {
      this.categories = (await api.get('/category')).data as CategoryDto[];
    },

    async create(payload: Omit<CategoryDto, 'id' | 'subcategories'>) {
      await api.post('/admin/category', payload)
      await this.getAllCategories()
    },

    async delete(id: number) {
      await api.delete(`/admin/category/${id}`)
      await this.getAllCategories()
    },

    async get(id: number): Promise<ResponseDto<CategoryDto>> {
      return await api.get(`/category/${id}`)
    },

    async update(payload: Omit<CategoryDto, 'id' | 'subcategories'>, id: number) {
      await api.put(`/admin/category/${id}`, payload);
      await this.getAllCategories()
    }
  },
});
