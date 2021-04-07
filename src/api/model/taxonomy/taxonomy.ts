import { EntityId } from '../entity/entity';

export enum TaxonomyType {
  SPORT = 'sport',
  AMENITY = 'amenity',
  FACILITY_TYPE = 'facility_type',
  GENDER = 'gender',
  SPORT_CATEGORY = 'sport_category',
  EQUIPMENT = 'equipment_type',
}

export interface Taxonomy {
  autoNumber: number|null;
  id: EntityId;
  icon: any;
  taxonomy: {
    type: TaxonomyType;
    name: string;
  };
  term: {
    name: string;
    slug?: string;
  },
  parentList: Taxonomy[]
}