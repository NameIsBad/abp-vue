import type {
  EntityDto,
  ExtensibleAuditedEntityDto,
  ExtensibleEntityDto,
  ExtensibleFullAuditedEntityDto,
  ExtensibleObject,
  PagedAndSortedResultRequestDto,
} from '/@/utils/models/dtos';
import type { IdentityClaimValueType } from './identity-claim-value-type.enum';

export interface ChangePasswordDto {
  currentPassword?: string;
  newPassword: string;
}

export interface GetIdentityRolesInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface GetIdentityUsersInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface IdentityClaimDto extends EntityDto<string> {
  claimType?: string;
  claimValue?: string;
}

export interface IdentityClaimTypeCreateDto extends IdentityClaimTypeCreateOrUpdateBaseDto {
  name: string;
  isStatic: boolean;
  valueType: IdentityClaimValueType;
}

export interface IdentityClaimTypeCreateOrUpdateBaseDto extends ExtensibleObject {
  required: boolean;
  regex?: string;
  regexDescription?: string;
  description?: string;
}

export interface IdentityClaimTypeDto extends ExtensibleEntityDto<string> {
  name?: string;
  required: boolean;
  isStatic: boolean;
  regex?: string;
  regexDescription?: string;
  description?: string;
  valueType: IdentityClaimValueType;
}

export interface IdentityClaimTypeGetByPagedDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export type IdentityClaimTypeUpdateDto = IdentityClaimTypeCreateOrUpdateBaseDto;

export interface IdentityRoleAddOrRemoveOrganizationUnitDto {
  organizationUnitIds: string[];
}

export interface IdentityRoleClaimCreateDto {
  claimType: string;
  claimValue: string;
}

export type IdentityRoleClaimDeleteDto = IdentityRoleClaimCreateDto;

export interface IdentityRoleClaimUpdateDto extends IdentityRoleClaimCreateDto {
  newClaimValue: string;
}

export type IdentityRoleCreateDto = IdentityRoleCreateOrUpdateDtoBase;

export interface IdentityRoleCreateOrUpdateDtoBase extends ExtensibleObject {
  name: string;
  isDefault: boolean;
  isPublic: boolean;
}

export interface IdentityRoleDto extends ExtensibleEntityDto<string> {
  name?: string;
  isDefault: boolean;
  isStatic: boolean;
  isPublic: boolean;
  concurrencyStamp?: string;
}

export interface IdentityRoleUpdateDto extends IdentityRoleCreateOrUpdateDtoBase {
  concurrencyStamp?: string;
}

export interface IdentityUserClaimCreateDto {
  claimType: string;
  claimValue: string;
}

export type IdentityUserClaimDeleteDto = IdentityUserClaimCreateDto;

export interface IdentityUserClaimUpdateDto extends IdentityUserClaimCreateDto {
  newClaimValue: string;
}

export interface IdentityUserCreateDto extends IdentityUserCreateOrUpdateDtoBase {
  password: string;
}

export interface IdentityUserCreateOrUpdateDtoBase extends ExtensibleObject {
  userName: string;
  name?: string;
  surname?: string;
  email: string;
  phoneNumber?: string;
  isActive: boolean;
  lockoutEnabled: boolean;
  roleNames: string[];
}

export interface IdentityUserDto extends ExtensibleFullAuditedEntityDto<string> {
  tenantId?: string;
  userName?: string;
  name?: string;
  surname?: string;
  email?: string;
  emailConfirmed: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  isActive: boolean;
  lockoutEnabled: boolean;
  lockoutEnd?: string;
  concurrencyStamp?: string;
}

export interface IdentityUserOrganizationUnitUpdateDto {
  organizationUnitIds: string[];
}

export interface IdentityUserUpdateDto extends IdentityUserCreateOrUpdateDtoBase {
  password?: string;
  concurrencyStamp?: string;
}

export interface IdentityUserUpdateRolesDto {
  roleNames: string[];
}

export interface OrganizationUnitAddRoleDto {
  roleIds: string[];
}

export interface OrganizationUnitAddUserDto {
  userIds: string[];
}

export interface OrganizationUnitCreateDto extends ExtensibleObject {
  displayName: string;
  parentId?: string;
}

export interface OrganizationUnitDto extends ExtensibleAuditedEntityDto<string> {
  parentId?: string;
  code?: string;
  displayName?: string;
}

export interface OrganizationUnitGetByPagedDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface OrganizationUnitGetChildrenDto {
  id: string;
  recursive: boolean;
}

export interface OrganizationUnitGetUnaddedRoleByPagedDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface OrganizationUnitGetUnaddedUserByPagedDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface OrganizationUnitMoveDto {
  parentId?: string;
}

export interface OrganizationUnitUpdateDto extends ExtensibleObject {
  displayName?: string;
}

export interface UpdateSettingInput {
  values: Record<string, string>;
}

export interface UserLookupCountInputDto {
  filter?: string;
}

export interface UserLookupSearchInputDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}
