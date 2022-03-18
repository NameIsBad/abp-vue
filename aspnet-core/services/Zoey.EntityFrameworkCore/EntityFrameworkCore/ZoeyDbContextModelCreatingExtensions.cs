using Microsoft.EntityFrameworkCore;
using System;
using Volo.Abp;

namespace Zoey.EntityFrameworkCore;

public static class ZoeyDbContextModelCreatingExtensions
{
    public static void ConfigureZoey(
        this ModelBuilder builder,
        Action<ZoeyModelBuilderConfigurationOptions> optionsAction = null)
    {
        Check.NotNull(builder, nameof(builder));

        var options = new ZoeyModelBuilderConfigurationOptions(
            ZoeyDbProperties.DbTablePrefix,
            ZoeyDbProperties.DbSchema
        );

        optionsAction?.Invoke(options);
    }
}