import {ProductDto} from 'stores/dto/product.dto';
import {CategoryDto} from 'stores/dto/category.dto';

export interface SubcategoryDto {
  id: number;
  title: string;
  description: string;
  category: null | CategoryDto
  products?: ProductDto[]
}


export interface SubcategoryState {
  subcategories: SubcategoryDto[]
}
