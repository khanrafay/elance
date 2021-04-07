import { Admin } from '../admin/admin';
import { Player } from '../player/player';
import { FacilityProviderManager } from '../facility-provider-manager/facility.provider.manager';
import { EntityId } from '../entity/entity';
import { Coach } from "../coach/coach";

export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_PLAYER = 'ROLE_PLAYER',
  ROLE_COACH = 'ROLE_COACH',
  ROLE_FACILITY_PROVIDER_MANAGER = 'ROLE_FACILITY_PROVIDER_MANAGER'
}

export enum UserAccountType {
  ADMIN = 'ADMIN',
  PLAYER = 'PLAYER',
  FACILITY_PROVIDER_MANAGER = 'FACILITY_PROVIDER_MANAGER'
}

export interface UserAccount {
  id: EntityId;
  roles: Role[];
  type: UserAccountType;
  email: string;
  locale: string|null;
  onlineStatus: string;
  lastSeen: string|null;
}

export interface AdminUserAccount extends UserAccount {
  type: UserAccountType.ADMIN;
  admin: Admin;
}

export interface PlayerUserAccount extends UserAccount {
  type: UserAccountType.PLAYER;
  player: Player;
  coach?: Coach;
}

export interface FacilityProviderManagerUserAccount extends UserAccount {
  type: UserAccountType.FACILITY_PROVIDER_MANAGER;
  facilityProviderManager: FacilityProviderManager;
}