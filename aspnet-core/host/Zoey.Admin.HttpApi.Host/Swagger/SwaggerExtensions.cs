using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Zoey.Admin.Auditing;
using Zoey.Admin.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Volo.Abp.Identity;

namespace Zoey.Admin.Swagger;

public static class SwaggerExtensions
{
    private static readonly List<SwaggerApiInfo> ApiInfos = new()
    {
        new SwaggerApiInfo()
        {
            OpenApiInfo = new OpenApiInfo()
            {
                Title = "默认模块",
                Description = "<code>默认模块</code>",
                Version = "v1"
            },
            Endpoint = "default",
            XmlComments = new List<string>()
            {
                Path.Combine(AppContext.BaseDirectory, "Zoey.Admin.Application.xml"),
                Path.Combine(AppContext.BaseDirectory, "Zoey.Admin.Application.Contracts.xml"),
                Path.Combine(AppContext.BaseDirectory, "Zoey.Domain.xml"),
                Path.Combine(AppContext.BaseDirectory, "Zoey.Domain.Shared.xml"),
                Path.Combine(AppContext.BaseDirectory, "Zoey.Admin.HttpApi.xml"),
                Path.Combine(AppContext.BaseDirectory, "Zoey.Admin.HttpApi.Host.xml"),
            }
        },
        new SwaggerApiInfo()
        {
            OpenApiInfo = new OpenApiInfo()
            {
                Title = "认证模块",
                Description = "<code>认证模块</code>",
                Version = "v1"
            },
            Endpoint = IdentityRemoteServiceConsts.ModuleName,
            XmlComments = new List<string>()
        },
        new SwaggerApiInfo()
        {
            OpenApiInfo = new OpenApiInfo()
            {
                Title = "日志模块",
                Description = "<code>日志模块</code>",
                Version = "v1"
            },
            Endpoint = AuditingRemoteServiceConsts.RemoteServiceName,
            XmlComments = new List<string>()
        },
    };

    /// <summary>
    /// AddSwagger
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddSwagger(this IServiceCollection services)
    {
        return services.AddAbpSwaggerGen(
            options =>
            {
                foreach (var module in ApiInfos)
                {
                    options.SwaggerDoc(module.Endpoint, module.OpenApiInfo);
                    foreach (var xmlComment in module.XmlComments)
                    {
                        options.IncludeXmlComments(xmlComment);
                    }
                }

                options.DocInclusionPredicate((documentName, apiDescription) =>
                {
                    if (documentName == "default")
                        return ApiInfos.Select(t => t.Endpoint).All(t => t != apiDescription.GroupName);
                    return apiDescription.GroupName == null || apiDescription.GroupName == documentName;
                });

                // Define the BearerAuth scheme that's in use
                options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
                {
                    Description =
                        "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = JwtBearerDefaults.AuthenticationScheme
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme, Id = JwtBearerDefaults.AuthenticationScheme
                            }
                        },
                        new List<string>()
                    }
                });
                options.OperationFilter<AppendAuthorizeToSummaryOperationFilter>();
                options.DocumentFilter<SwaggerDocumentFilter>();
            });
    }

    /// <summary>
    /// UseSwaggerUI
    /// </summary>
    /// <param name="app"></param>
    public static void UseSwaggerUi(this IApplicationBuilder app)
    {
        app.UseSwaggerUI(options =>
        {
            options.HeadContent += @"<style>.opblock-summary-description{font-weight: bold;text-align: right;}</style>";

            // 遍历分组信息，生成Json
            ApiInfos.ForEach(x =>
            {
                options.SwaggerEndpoint($"/swagger/{x.Endpoint}/swagger.json", x.OpenApiInfo.Title);
            });
        });
    }

    private class SwaggerApiInfo
    {
        public string Endpoint { get; set; }

        /// <summary>
        /// <see cref="Microsoft.OpenApi.Models.OpenApiInfo"/>
        /// </summary>
        public OpenApiInfo OpenApiInfo { get; set; }

        public List<string> XmlComments { get; set; }
    }
}