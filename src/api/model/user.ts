import {Buyer} from "./buyer";
import {Seller} from "./seller";
import {Media} from "./media";

export interface User{
    id: string;
    buyer?: Buyer;
    seller?: Seller;
    status: string;
    currentType: "buyer"|"seller";
    gender?: string;
    dateOfBirth: string;
    email: string;
    displayName: string;
    lastName: string;
    firstName: string;
    profilePicture?: Media;
    onlineStatus?: boolean;
}