﻿using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Identity.Localization;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace Zoey.Admin.Identity;

public class IdentityPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var identityGroup = context.GetGroupOrNull(Volo.Abp.Identity.IdentityPermissions.GroupName);
        if (identityGroup != null)
        {
            var userPermission = identityGroup.GetPermissionOrNull(Volo.Abp.Identity.IdentityPermissions.Users.Default);
            if (userPermission != null)
            {
                userPermission.AddChild(IdentityPermissions.Users.ManageClaims, L("Permission:ManageClaims"));
                userPermission.AddChild(IdentityPermissions.Users.ManageOrganizationUnits, L("Permission:ManageOrganizationUnits"));
            }

            var rolePermission = identityGroup.GetPermissionOrNull(Volo.Abp.Identity.IdentityPermissions.Roles.Default);
            if (rolePermission != null)
            {
                rolePermission.AddChild(IdentityPermissions.Roles.ManageClaims, L("Permission:ManageClaims"));
                rolePermission.AddChild(IdentityPermissions.Roles.ManageOrganizationUnits, L("Permission:ManageOrganizationUnits"));
            }

            var origanizationUnitPermission = identityGroup.AddPermission(IdentityPermissions.OrganizationUnits.Default, L("Permission:OrganizationUnitManagement"));
            origanizationUnitPermission.AddChild(IdentityPermissions.OrganizationUnits.Create, L("Permission:Create"));
            origanizationUnitPermission.AddChild(IdentityPermissions.OrganizationUnits.Update, L("Permission:Edit"));
            origanizationUnitPermission.AddChild(IdentityPermissions.OrganizationUnits.Delete, L("Permission:Delete"));
            origanizationUnitPermission.AddChild(IdentityPermissions.OrganizationUnits.ManageRoles, L("Permission:ManageRoles"));
            origanizationUnitPermission.AddChild(IdentityPermissions.OrganizationUnits.ManageUsers, L("Permission:ManageUsers"));

            var identityClaimType = identityGroup.AddPermission(IdentityPermissions.IdentityClaimType.Default, L("Permission:IdentityClaimTypeManagement"));
            identityClaimType.AddChild(IdentityPermissions.IdentityClaimType.Create, L("Permission:Create"), MultiTenancySides.Host);
            identityClaimType.AddChild(IdentityPermissions.IdentityClaimType.Update, L("Permission:Edit"), MultiTenancySides.Host);
            identityClaimType.AddChild(IdentityPermissions.IdentityClaimType.Delete, L("Permission:Delete"), MultiTenancySides.Host);


            var securityLogPermission = identityGroup.AddPermission(IdentityPermissions.SecurityLog.Default, L("Permissions:SecurityLog"));
            securityLogPermission.AddChild(IdentityPermissions.SecurityLog.Delete, L("Permissions:SecurityLog.DeleteLog"));
        }
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<IdentityResource>(name);
    }
}