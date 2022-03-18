using JetBrains.Annotations;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Zoey.EntityFrameworkCore;

public class ZoeyModelBuilderConfigurationOptions : AbpModelBuilderConfigurationOptions
{
    public ZoeyModelBuilderConfigurationOptions(
        [NotNull] string tablePrefix = "",
        [CanBeNull] string schema = null)
        : base(
            tablePrefix,
            schema)
    {

    }
}