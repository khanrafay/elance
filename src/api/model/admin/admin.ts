import { Location } from '../location/location';
import { File } from '../file/file';
import { EntityId } from '../entity/entity';

export interface AdminProfile {
  firstName: string;
  lastName: string;
  address?: Location;
}

export interface Admin extends AdminProfile {
  id: EntityId;
  profilePicture?: File;
}