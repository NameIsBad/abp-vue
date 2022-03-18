import type { ExtensibleEntityDto, PagedAndSortedResultRequestDto } from '/@/utils/models/dtos';

export interface SecurityLogDto extends ExtensibleEntityDto<string> {
  applicationName?: string;
  identity?: string;
  action?: string;
  userId?: string;
  userName?: string;
  tenantName?: string;
  clientId?: string;
  correlationId?: string;
  clientIpAddress?: string;
  browserInfo?: string;
  creationTime?: string;
}

export interface SecurityLogGetByPagedDto extends PagedAndSortedResultRequestDto {
  startTime?: string;
  endTime?: string;
  applicationName?: string;
  identity?: string;
  actionName?: string;
  userId?: string;
  userName?: string;
  clientId?: string;
  correlationId?: string;
}
