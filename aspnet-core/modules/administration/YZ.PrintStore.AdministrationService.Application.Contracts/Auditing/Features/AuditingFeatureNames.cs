namespace YZ.PrintStore.AdministrationService.Auditing.Features
{
    public static class AuditingFeatureNames
    {
        public const string GroupName = "AbpAuditing";
        public class Logging
        {
            public const string Default = GroupName + ".Logging";

            public const string AuditLog = Default + ".AuditLog";
        }
    }
}
