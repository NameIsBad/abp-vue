using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using YZ.PrintStore.EntityFrameworkCore;
using YZ.PrintStore.MultiTenancy;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Basic;
using Microsoft.OpenApi.Models;
using Volo.Abp;
using Volo.Abp.Account;
using Volo.Abp.AspNetCore.Authentication.JwtBearer;
using Volo.Abp.AspNetCore.MultiTenancy;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Basic.Bundling;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Shared;
using Volo.Abp.AspNetCore.Serilog;
using Volo.Abp.Autofac;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.Swashbuckle;
using Volo.Abp.VirtualFileSystem;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;
using System.Text;
using System.Reflection;
using System.Security.Claims;
using YZ.PrintStore.Models.Login;
using Volo.Abp.Authorization.Permissions;

namespace YZ.PrintStore
{
    [DependsOn(
        typeof(PrintStoreHttpApiModule),
        typeof(AbpAutofacModule),
        typeof(AbpAspNetCoreMultiTenancyModule),
        typeof(PrintStoreApplicationModule),
        typeof(PrintStoreEntityFrameworkCoreModule),
        typeof(AbpAspNetCoreMvcUiBasicThemeModule),
        typeof(AbpAspNetCoreAuthenticationJwtBearerModule),
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

            Configure<AbpPermissionOptions>(options =>
            {
                options.ValueProviders.Add<SystemAdminPermissionValueProvider>();
            });

        }

        private void ConfigureVirtualFileSystem(ServiceConfigurationContext context)
        {
            var hostingEnvironment = context.Services.GetHostingEnvironment();

            if (hostingEnvironment.IsDevelopment())
            {
                Configure<AbpVirtualFileSystemOptions>(options =>
                {
                    options.FileSets.ReplaceEmbeddedByPhysical<PrintStoreDomainSharedModule>(
                        Path.Combine(hostingEnvironment.ContentRootPath,
                            $"..{Path.DirectorySeparatorChar}YZ.PrintStore.Domain.Shared"));
                    options.FileSets.ReplaceEmbeddedByPhysical<PrintStoreDomainModule>(
                        Path.Combine(hostingEnvironment.ContentRootPath,
                            $"..{Path.DirectorySeparatorChar}YZ.PrintStore.Domain"));
                    options.FileSets.ReplaceEmbeddedByPhysical<PrintStoreApplicationContractsModule>(
                        Path.Combine(hostingEnvironment.ContentRootPath,
                            $"..{Path.DirectorySeparatorChar}YZ.PrintStore.Application.Contracts"));
                    options.FileSets.ReplaceEmbeddedByPhysical<PrintStoreApplicationModule>(
                        Path.Combine(hostingEnvironment.ContentRootPath,
                            $"..{Path.DirectorySeparatorChar}YZ.PrintStore.Application"));
                });
            }
        }

        private void ConfigureAuthentication(ServiceConfigurationContext context, IConfiguration configuration)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["JwtBearer:SecurityKey"]));
            context.Services.Configure<TokenAuthConfiguration>(option =>
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

            app.UseAbpRequestLocalization();

            if (!env.IsDevelopment())
            {
                app.UseErrorPage();
            }

            app.UseCorrelationId();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors();
            app.UseAuthentication();
            app.UseJwtTokenMiddleware();

            if (MultiTenancyConsts.IsEnabled)
            {
                app.UseMultiTenancy();
            }

            app.UseUnitOfWork();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseSwagger();
            app.UseAbpSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "PrintStore API");

                var configuration = context.ServiceProvider.GetRequiredService<IConfiguration>();
                c.OAuthClientId(configuration["AuthServer:SwaggerClientId"]);
                c.OAuthClientSecret(configuration["AuthServer:SwaggerClientSecret"]);
                c.OAuthScopes("PrintStore");
            });

            app.UseAuditing();
            app.UseAbpSerilogEnrichers();
            app.UseConfiguredEndpoints();
        }
    }
}