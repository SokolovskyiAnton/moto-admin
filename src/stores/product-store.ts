import {api} from 'boot/axios';
import {defineStore} from 'pinia';
import {ProductDto, ProductPhoto, ProductState} from 'stores/dto/product.dto';
import {ResponseDto} from 'stores/dto/response.dto';

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
  }),
  getters: {
    getProductsList: (state): ProductDto[]  => state.products,
  },
  actions: {
    async getAll() {
      this.products = (await api.get('/products')).data
    },
    async create(payload: Omit<ProductDto, 'id'>) {
      await api.post('/admin/products', payload)
      await this.getAll()
    },

    async delete(id: number) {
      await api.delete(`/admin/products/${id}`)
      await this.getAll()
    },

    async get(id: number): Promise<ResponseDto<ProductDto>> {
      return await api.get(`/products/${id}`)
    },

    async update(payload: Omit<ProductDto, 'id'>, id: number) {
      await api.put(`/admin/products/${id}`, payload);
      await this.getAll()
    },
    async upload(file: Blob): Promise<ProductPhoto> {
      const data = new FormData()
      data.append('file', file)
      return (await api.post('/files', data)).data
    },
    async deleteFile(key: string) {
      return await api.post(`/files/${key}`)
    }
  },
});
