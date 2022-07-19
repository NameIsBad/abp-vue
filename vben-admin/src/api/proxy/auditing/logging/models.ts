import type {
  EntityDto,
  ExtensibleEntityDto,
  PagedAndSortedResultRequestDto,
} from '/@/utils/models/dtos';
import type { EntityChangeType } from '../entity-change-type.enum';

export interface AuditLogActionDto extends ExtensibleEntityDto<string> {
  serviceName?: string;
  methodName?: string;
  parameters?: string;
  executionTime?: string;
  executionDuration: number;
}

export interface AuditLogDto extends ExtensibleEntityDto<string> {
  applicationName?: string;
  userId?: string;
  userName?: string;
  tenantId?: string;
  tenantName?: string;
  impersonatorUserId?: string;
  impersonatorTenantId?: string;
  executionTime?: string;
  executionDuration: number;
  clientIpAddress?: string;
  clientName?: string;
  clientId?: string;
  correlationId?: string;
  browserInfo?: string;
  httpMethod?: string;
  url?: string;
  exceptions?: string;
  comments?: string;
  httpStatusCode?: number;
  entityChanges: EntityChangeDto[];
  actions: AuditLogActionDto[];
}

export interface AuditLogGetByPagedDto extends PagedAndSortedResultRequestDto {
  startTime?: string;
  endTime?: string;
  httpMethod?: string;
  url?: string;
  userId?: string;
  userName?: string;
  applicationName?: string;
  correlationId?: string;
  maxExecutionDuration?: number;
  minExecutionDuration?: number;
  hasException?: boolean;
  httpStatusCode?: number;
  clientIpAddress?: string;
}

export interface EntityChangeDto extends ExtensibleEntityDto<string> {
  changeTime?: string;
  changeType: EntityChangeType;
  entityTenantId?: string;
  entityId?: string;
  entityTypeFullName?: string;
  propertyChanges: EntityPropertyChangeDto[];
}

export interface EntityPropertyChangeDto extends EntityDto<string> {
  newValue?: string;
  originalValue?: string;
  propertyName?: string;
  propertyTypeFullName?: string;
}
