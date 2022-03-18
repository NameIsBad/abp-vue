using Zoey.Localization;
using Volo.Abp.Features;
using Volo.Abp.Localization;
using Volo.Abp.Validation.StringValues;

namespace Zoey.Admin.Features;

public class TenancyFeaturesDefinitionProvider : FeatureDefinitionProvider
{
    public override void Define(IFeatureDefinitionContext context)
    {
        var group = context.AddGroup(TenancyFeatures.GroupName);

        group.AddFeature(TenancyFeatures.SocialLogins, "true", L("社交登录")
            , valueType: new ToggleStringValueType());
        group.AddFeature(TenancyFeatures.UserCount, "10", L("用户数量")
            , valueType: new FreeTextStringValueType(new NumericValueValidator(1, 1000)));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<ZoeyResource>(name);
    }
}