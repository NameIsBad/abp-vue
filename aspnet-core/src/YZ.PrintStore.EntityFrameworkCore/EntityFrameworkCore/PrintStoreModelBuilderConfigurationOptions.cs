using JetBrains.Annotations;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace YZ.PrintStore.EntityFrameworkCore
{
    public class PrintStoreModelBuilderConfigurationOptions : AbpModelBuilderConfigurationOptions
    {
        public PrintStoreModelBuilderConfigurationOptions(
           [NotNull] string tablePrefix = "",
           [CanBeNull] string schema = null)
           : base(
               tablePrefix,
               schema)
        {

        }
    }
}
