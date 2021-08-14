namespace YZ.PrintStore.Identity.Features
{
    public static class AuditingFeatureNames
    {
        public const string GroupName = "AbpSecurityAuditing";
        public class Logging
        {
            public const string Default = GroupName + ".Logging";

            public const string SecurityLog = Default + ".SecurityLog";
        }
    }
}
