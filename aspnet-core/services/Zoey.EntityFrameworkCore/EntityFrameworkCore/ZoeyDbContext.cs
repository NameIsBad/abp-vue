using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.FeatureManagement;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.PermissionManagement;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace Zoey.EntityFrameworkCore;

[ConnectionStringName(ZoeyDbProperties.ConnectionStringName)]
public class ZoeyDbContext : AbpDbContext<ZoeyDbContext>,
    ISettingManagementDbContext,
    IFeatureManagementDbContext,
    IAuditLoggingDbContext,
    IPermissionManagementDbContext,
    IIdentityDbContext,
    ITenantManagementDbContext
{
    /* Add DbSet for each Aggregate Root here. Example:
     * public DbSet<Question> Questions { get; set; }
     */

    #region Entities from the modules

    public virtual DbSet<Setting> Settings { get; }
    public virtual DbSet<FeatureValue> FeatureValues { get; }
    public virtual DbSet<AuditLog> AuditLogs { get; }
    public virtual DbSet<PermissionGrant> PermissionGrants { get; }
    public virtual DbSet<IdentityUser> Users { get; }
    public virtual DbSet<IdentityRole> Roles { get; }
    public virtual DbSet<IdentityClaimType> ClaimTypes { get; }
    public virtual DbSet<OrganizationUnit> OrganizationUnits { get; }
    public virtual DbSet<IdentitySecurityLog> SecurityLogs { get; }
    public virtual DbSet<IdentityLinkUser> LinkUsers { get; }
    public virtual DbSet<Tenant> Tenants { get; }
    public virtual DbSet<TenantConnectionString> TenantConnectionStrings { get; }

    #endregion

    public ZoeyDbContext(DbContextOptions<ZoeyDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ConfigureIdentity();
        builder.ConfigureTenantManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureFeatureManagement();
        builder.ConfigureAuditLogging();
        builder.ConfigurePermissionManagement();
    }
}