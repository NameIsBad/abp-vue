using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using Volo.Abp;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace YZ.PrintStore.EntityFrameworkCore
{
    public static class PrintStoreDbContextModelBuilderExtensions
    {
        public static void ConfigurePlatform(
           this ModelBuilder builder,
           Action<PrintStoreModelBuilderConfigurationOptions> optionsAction = null)
        {
            Check.NotNull(builder, nameof(builder));

            var options = new PrintStoreModelBuilderConfigurationOptions(
                PrintStoreDbProperties.DbTablePrefix,
                PrintStoreDbProperties.DbSchema
            );

            optionsAction?.Invoke(options);

        }
    }
}
