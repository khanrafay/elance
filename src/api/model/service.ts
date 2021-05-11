import {Category} from "./category";
import {Package} from "./package";
import {Seller} from "./seller";
import {Media} from "./media";

export interface Service{
    title: string;
    description: string;
    id: number;
    minPrice: number;
    maxPrice: number;
    category: Category;
    packages: Package[];
    seller: Seller;
    images: Media[];
}