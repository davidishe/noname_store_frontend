export interface IProduct {
  id?: number;
  name: string;
  description?: string;
  price: number;
  pictureUrl: string;
  quantity?: number;
  type?: string;
  region?: string;
  enrolledDate?: Date;
  guId?: number;
  isSelected?: boolean;
  isSale?: boolean;

}

export interface IProductToCreate {
  name: string;
  description?: string;
  price: number;
  pictureUrl: string;
  quantity: number;
  guId?: number;
  productTypeId: number;
  productRegionId: number;
}


