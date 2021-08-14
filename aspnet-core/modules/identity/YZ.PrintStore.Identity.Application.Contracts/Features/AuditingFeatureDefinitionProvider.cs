using Volo.Abp.Features;
using Volo.Abp.Identity.Localization;
using Volo.Abp.Localization;
using Volo.Abp.Validation.StringValues;

namespace YZ.PrintStore.Identity.Features
{
    public class AuditingFeatureDefinitionProvider : FeatureDefinitionProvider
    {
        public override void Define(IFeatureDefinitionContext context)
        {
            var auditingGroup = context.AddGroup(
                   name: AuditingFeatureNames.GroupName,
                   displayName: L("Features:Auditing"));

            var loggingFeature = auditingGroup.AddFeature(
                name: AuditingFeatureNames.Logging.Default,
                displayName: L("Features:Auditing"),
                description: L("Features:Auditing")
                );

            loggingFeature.CreateChild(
                name: AuditingFeatureNames.Logging.SecurityLog,
                defaultValue: true.ToString(),
                displayName: L("Features:DisplayName:SecurityLog"),
                description: L("Features:Description:SecurityLog"),
                valueType: new ToggleStringValueType(new BooleanValueValidator())
                );
        }

        protected LocalizableString L(string name)
        {
            return LocalizableString.Create<IdentityResource>(name);
        }
    }
}
