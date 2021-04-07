import { EntityId } from "../entity/entity";
import { BookablePrice } from "../booking/bookable.price";
import { File } from "../file/file";
import { Location } from "../location/location";
import {Taxonomy} from "../taxonomy/taxonomy";

export enum CoachStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

export interface Coach {
  autoNumber: number|null;
  id: EntityId;
  playerId: string;
  description?: string;
  termsAndGuidelines?: string
  sportSkillList?: { sportId: EntityId, skillLevel: number }[];
  priceList: CoachPrice[];
  firstName: string;
  lastName: string;
  nickname?: string;
  displayName?: string;
  fullName?: string;
  profilePicture?: File;
  mobilePhoneNumber?: {
    value: string;
  }
  location: Location;
  totalPrice?: number;
  coachSince: string;
  status?: CoachStatus[];
  sportList?: Taxonomy[];
  onlineStatus?: string;
  lastSeen?:string;
}

export interface CoachPrice extends BookablePrice {
  id: EntityId;
}