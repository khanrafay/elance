import {Category} from "./category";
import {Package} from "./package";

export interface Service{
    title: string;
    description: string;
    id: number;
    minPrice: number;
    maxPrice: number;
    category: Category;
    packages: Package[];
}