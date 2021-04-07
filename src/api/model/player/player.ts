import { Location } from '../location/location';
import { File } from '../file/file';
import { EntityId } from '../entity/entity';

export enum PlayerStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING_CONFIRM_EMAIL = 'pending_confirm_email',
  BANNED = 'banned',
}

export interface Player {
  autoNumber?: number|null;
  id: EntityId;
  firstName: string;
  lastName: string;
  nickname?: string;
  displayName?: string;
  email?: string
  personalId?: string;
  description?: string;
  dateOfBirth?: string;
  mobilePhoneNumber?: {
    value: string;
  }
  location?: Location;
  profilePicture?: File;
  sportSkillList?: { sportId: EntityId, skillLevel: number, name?: string }[]
  favoriteVenueIdList?: EntityId[];
  signUpDate?: string;
  status?: PlayerStatus[];
  wallet?: number;
  onlineStatus?: string;
  lastSeen?: string;
}

export interface Sports {
  sportSkillList?: { sportId: EntityId, skillLevel: number, name?: string }[]
}