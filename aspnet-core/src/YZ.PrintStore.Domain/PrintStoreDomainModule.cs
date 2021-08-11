﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using YZ.PrintStore.MultiTenancy;
using Volo.Abp.AuditLogging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Emailing;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Localization.ExceptionHandling;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.PermissionManagement.Identity;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace YZ.PrintStore
{
  [DependsOn(
      typeof(PrintStoreDomainSharedModule),
      typeof(AbpAuditLoggingDomainModule),
      typeof(AbpBackgroundJobsDomainModule),
      typeof(AbpFeatureManagementDomainModule),
      typeof(AbpIdentityDomainModule),
      typeof(AbpPermissionManagementDomainIdentityModule),
      typeof(AbpSettingManagementDomainModule),
      typeof(AbpTenantManagementDomainModule),
      typeof(AbpEmailingModule)
  )]
  public class PrintStoreDomainModule : AbpModule
  {
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
      Configure<AbpMultiTenancyOptions>(options =>
      {
        options.IsEnabled = MultiTenancyConsts.IsEnabled;
      });

#if DEBUG
            context.Services.Replace(ServiceDescriptor.Singleton<IEmailSender, NullEmailSender>());
#endif
    }
  }
}
