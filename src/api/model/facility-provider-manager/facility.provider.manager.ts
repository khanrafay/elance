import { Location } from '../location/location';
import { File } from '../file/file';
import { EntityId } from '../entity/entity';
import { FacilityProvider } from '../facility-provider/facility.provider';

export interface FacilityProviderManagerProfile {
  firstName: string;
  lastName: string;
  address?: Location;
  email?: string;
  personalId?: string;
  mobilePhoneNumber?: { value?: string };
  dateOfBirth?: string;
  description?: string;
  locale?: string;
  onlineStatus?: string;
  lastSeen?: string|null;
  location?: Location
}

export interface FacilityProviderManager extends FacilityProviderManagerProfile {
  id: EntityId;
  profilePicture?: File;
  facilityProvider: FacilityProvider
}