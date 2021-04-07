import { Location } from "../location/location";
import { GisPoint } from "../location/gis";
import { OpenHours } from "../open-hours/open.hours";
import { EntityId } from "../entity/entity";
import { File } from "../file/file";

export enum VenueStatus {
  DRAFT = "draft",
  ACTIVE = "active",
}

export interface Venue {
  autoNumber: number|null;
  id: EntityId;
  venuId?: EntityId;
  name: string;
  description: string;
  termsAndGuidelines: string;
  location?: Location;
  gisPoint?: GisPoint;
  facilityCount?: string;
  bookingCount?: string;
  email?: string;
  mobilePhoneNumber?: {
    value: string;
  };

  openHoursList: OpenHours[];
  amenityIdList: EntityId[];

  profilePicture?: File;

  active: boolean;
  createdAt: string;
  totalPrice?: number;
  uploadError?: any;
  distance?: number;
  facilityProviderName?: string;
  facilityProviderId?: string;
}
