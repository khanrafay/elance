import { Location } from '../location/location';
import { GisPoint } from '../location/gis';
import { OpenHours } from '../open-hours/open.hours';
import { EntityId } from '../entity/entity';
import { File } from "../file/file";


export interface Statistics {
  venueCount: number;
  coachesCount: number;
  sportGearCount: number;
  usersCount: number;
 
}