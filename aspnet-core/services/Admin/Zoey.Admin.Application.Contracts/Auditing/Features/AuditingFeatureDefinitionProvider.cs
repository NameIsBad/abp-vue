﻿using Volo.Abp.AuditLogging.Localization;
using Volo.Abp.Features;
using Volo.Abp.Localization;
using Volo.Abp.Validation.StringValues;

namespace Zoey.Admin.Auditing.Features;

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
            name: AuditingFeatureNames.Logging.AuditLog,
            defaultValue: true.ToString(),
            displayName: L("Features:DisplayName:AuditLog"),
            description: L("Features:Description:AuditLog"),
            valueType: new ToggleStringValueType(new BooleanValueValidator())
        );
    }

    protected LocalizableString L(string name)
    {
        return LocalizableString.Create<AuditLoggingResource>(name);
    }
}