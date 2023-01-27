import {SubcategoryDto} from 'stores/dto/subcategory.dto';

export interface CategoryDto {
  id: number;
  title: string;
  description: string
  subcategories: Omit<SubcategoryDto, 'products'>
}

export interface CategoryState {
  categories: CategoryDto[]
}
