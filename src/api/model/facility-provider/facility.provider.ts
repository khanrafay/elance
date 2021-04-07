import { Location } from '../location/location';
import { File } from '../file/file';
import { EntityId } from '../entity/entity';

export enum FacilityProviderStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface FacilityProviderProfile {
  name: string;
  address?: Location;
  description?: string;
  termsAndGuidelines?: string;
}

export interface FacilityProvider extends FacilityProviderProfile {
  autoNumber: number|null;
  id: EntityId;
  status: FacilityProviderStatus[];
  profilePicture?: File;
  numberOfBookings?: string;
  numberOfVenues?: string;
  numberOfFacilities?: string;
  memberSince?: string;
  email?: string;
}