namespace YZ.PrintStore.AdministrationService.Auditing.Permissions
{
    public class AuditingPermissionNames
    {
        public const string GroupName = "AbpAuditing";
        public class AuditLog
        {
            public const string Default = GroupName + ".AuditLog";
            public const string Delete = Default + ".Delete";
        }
    }
}
