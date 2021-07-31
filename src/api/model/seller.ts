import {Media} from "./media";
import {Service} from "./service";

export interface Seller{
    id: string;
    description: string;
    profilePicture: Media;
    name: string;
    services: Service[];
    isFeatured?: boolean;
    featuredTill?: string;
}