import { mapEnumToOptions } from '/@/utils/form-utils';

export enum EntityChangeType {
  Created = 0,
  Updated = 1,
  Deleted = 2,
}

export const entityChangeTypeOptions = mapEnumToOptions(EntityChangeType);
