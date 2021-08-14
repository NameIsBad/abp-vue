using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc.UI.MultiTenancy;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Shared;
using Volo.Abp.AspNetCore.Serilog;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Autofac;
using Volo.Abp.Caching;
using Volo.Abp.Caching.StackExchangeRedis;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.MySQL;
using Volo.Abp.FeatureManagement;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.PermissionManagement;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.HttpApi;
using Volo.Abp.PermissionManagement.Identity;
using Volo.Abp.SettingManagement;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.Swashbuckle;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;
using Volo.Abp.VirtualFileSystem;
using YZ.PrintStore.Account;
using YZ.PrintStore.AdministrationService;
using YZ.PrintStore.AdministrationService.EntityFrameworkCore;
using YZ.PrintStore.Identity;
using YZ.PrintStore.Identity.EntityFrameworkCore;

namespace YZ.PrintStore
{
    [DependsOn(
        typeof(AbpAspNetCoreMvcUiMultiTenancyModule),
        typeof(AbpAutofacModule),
        typeof(AbpCachingStackExchangeRedisModule),
        typeof(AbpEntityFrameworkCoreMySQLModule),

        typeof(IdentityEntityFrameworkCoreModule),
        typeof(IdentityApplicationModule),
        typeof(IdentityHttpApiModule),


        typeof(AdministrationServiceEntityFrameworkCoreModule),
        typeof(AdministrationServiceApplicationModule),
        typeof(AdministrationServiceHttpApiModule),

        typeof(AccountApplicationModule),
        typeof(AccountHttpApiModule),

        typeof(AbpAuditLoggingEntityFrameworkCoreModule),

        typeof(AbpTenantManagementEntityFrameworkCoreModule),
        typeof(AbpTenantManagementApplicationModule),
        typeof(AbpTenantManagementHttpApiModule),

        typeof(AbpPermissionManagementDomainIdentityModule),
        typeof(AbpPermissionManagementEntityFrameworkCoreModule),
        typeof(AbpPermissionManagementApplicationModule),
        typeof(AbpPermissionManagementHttpApiModule),

        typeof(AbpSettingManagementEntityFrameworkCoreModule),
        typeof(AbpSettingManagementApplicationModule),
        typeof(AbpSettingManagementHttpApiModule),

        typeof(AbpFeatureManagementEntityFrameworkCoreModule),
        typeof(AbpFeatureManagementApplicationModule),
        typeof(AbpFeatureManagementHttpApiModule),

        typeof(AbpAspNetCoreSerilogModule),
        typeof(AbpSwashbuckleModule)
        )]
    public class PrintStoreHttpApiHostModule : AbpModule
    {

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var configuration = context.Services.GetConfiguration();

            ConfigureAuthentication(context, configuration);
            ConfigureLocalization();
            ConfigureVirtualFileSystem(context);
            ConfigureCors(context, configuration);
            ConfigureSwaggerServices(context, configuration);
        }
        private void ConfigureVirtualFileSystem(ServiceConfigurationContext context)
        {
            var hostingEnvironment = context.Services.GetHostingEnvironment();

            if (hostingEnvironment.IsDevelopment())
            {
                Configure<AbpVirtualFileSystemOptions>(options =>
                {
                    options.FileSets.AddEmbedded<PrintStoreHttpApiHostModule>("YZ.PrintStore");
                });
            }
        }

        private void ConfigureAuthentication(ServiceConfigurationContext context, IConfiguration configuration)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["JwtBearer:SecurityKey"]));
            context.Services.Configure<JwtOptions>(option =>
            {
                option.SecurityKey = securityKey;
                option.Issuer = configuration["JwtBearer:Issuer"];
                option.Audience = configuration["JwtBearer:Audience"];
                option.SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                option.Expiration = TimeSpan.FromMinutes(int.Parse(configuration["JwtBearer:Expiration"]));
            });

            context.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.Audience = configuration["JwtBearer:Audience"];

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    // The signing key must match!
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey =
                        new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["JwtBearer:SecurityKey"])),

                    // Validate the JWT Issuer (iss) claim
                    ValidateIssuer = true,
                    ValidIssuer = configuration["JwtBearer:Issuer"],

                    // Validate the JWT Audience (aud) claim
                    ValidateAudience = true,
                    ValidAudience = configuration["JwtBearer:Audience"],

                    // Validate the token expiry
                    ValidateLifetime = true,

                    // If you want to allow a certain amount of clock drift, set that here
                    ClockSkew = TimeSpan.Zero
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = QueryStringTokenResolver
                };
            });

            /* This method is needed to authorize SignalR javascript client.
             * SignalR can not send authorization header. So, we are getting it from query string as an encrypted text. */
            Task QueryStringTokenResolver(MessageReceivedContext context)
            {
                // if (!context.HttpContext.Request.Path.HasValue ||
                //     !context.HttpContext.Request.Path.Value.StartsWith("/signalr"))
                // {
                //   // We are just looking for signalr clients
                //   return Task.CompletedTask;
                // }

                // var qsAuthToken = context.HttpContext.Request.Query["enc_auth_token"].FirstOrDefault();
                // if (qsAuthToken == null)
                // {
                //   // Cookie value does not matches to querystring value
                //   return Task.CompletedTask;
                // }

                // // Set auth token from cookie
                // context.Token = SimpleStringCipher.Instance.Decrypt(qsAuthToken, KSConsts.DefaultPassPhrase);
                return Task.CompletedTask;
            }
        }

        private static void ConfigureSwaggerServices(ServiceConfigurationContext context, IConfiguration configuration)
        {
            context.Services.AddAbpSwaggerGen(
                options =>
                {
                    options.SwaggerDoc("v1", new OpenApiInfo()
                    {
                        Title = "YZ - PrintStore HTTP API",
                        Version = "v1",
                        Description = "The PrintStore HTTP API.",
                    });
                    options.DocInclusionPredicate((docName, description) => true);
                    options.CustomSchemaIds(type => type.FullName);
                    // Define the BearerAuth scheme that's in use
                    options.AddSecurityDefinition("bearerAuth", new OpenApiSecurityScheme()
                    {
                        Description =
                            "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                        Name = "Authorization",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.ApiKey
                    });
                    // var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    // var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                    // options.IncludeXmlComments(xmlPath);
                });
        }

        private void ConfigureLocalization()
        {
            Configure<AbpLocalizationOptions>(options =>
            {
                options.Languages.Add(new LanguageInfo("en", "en", "English"));
                options.Languages.Add(new LanguageInfo("zh-Hans", "zh-Hans", "简体中文"));

                options
                    .AddLanguagesMapOrUpdate(
                        "vben-admin-ui",
                        new NameValue("zh_CN", "zh-Hans"));
            });
        }

        private void ConfigureCors(ServiceConfigurationContext context, IConfiguration configuration)
        {
            context.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(
                            configuration["App:CorsOrigins"]
                                .Split(",", StringSplitOptions.RemoveEmptyEntries)
                                .Select(o => o.RemovePostFix("/"))
                                .ToArray()
                        )
                        .WithAbpExposedHeaders()
                        .SetIsOriginAllowedToAllowWildcardSubdomains()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });
        }


        public override void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            var app = context.GetApplicationBuilder();
            var env = context.GetEnvironment();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseErrorPage();
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseCorrelationId();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors();
            app.UseAuthentication();
            app.UseJwtTokenMiddleware();
            app.UseMultiTenancy();
            app.UseAbpRequestLocalization();
            app.UseAuthorization();
            app.UseSwagger();
            app.UseAbpSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "PrintStore API");
            });
            app.UseAuditing();
            app.UseAbpSerilogEnrichers();
            app.UseConfiguredEndpoints();
        }
    }
}
