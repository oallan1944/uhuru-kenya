import { Seller } from "./sellerType";

export interface Product {
    id?: number;
    title: string;
    description: string;
    mrpPrice: number;
    sellingPrice: number;
    discountPercent: number;
    quantity: number;
    color: string;
    images: any[];
    numRatings?: number;
    category?: Category;
    seller?: Seller;
    createdAt?: Date;
    sizes: string;
    in_stock?: boolean;
}

export interface Category {
    id?: number;
    name: string;
    categoryId: string;
    parentCategory?: Category;
    level: number;
}