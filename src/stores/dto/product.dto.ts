import {SubcategoryDto} from 'stores/dto/subcategory.dto';

export interface ProductDto {
  id: number,
  title: string,
  description: string,
  desktopImages: ProductPhoto[],
  mobileImages: ProductPhoto[],
  color: string;
  optionsTitle: string;
  options: string[];
  price: number,
  oldPrice: number,
  isAvailable: boolean,
  weight?: number;
  speed?: number;
  motor?: string;
  battery?: string;
  mileRange?: number;
  subcategory: Omit<SubcategoryDto, 'products'> | null
}

export interface ProductState {
  products: ProductDto[];
}

export interface ProductPhoto {
  url: string;
  key: string;
}
