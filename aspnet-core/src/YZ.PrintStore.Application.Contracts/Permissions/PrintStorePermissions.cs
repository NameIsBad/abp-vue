namespace YZ.PrintStore.Permissions
{
    public static class PrintStorePermissions
    {
        public const string GroupName = "PrintStore";

        //Add your own permission names. Example:
        //public const string MyPermission1 = GroupName + ".MyPermission1";

        public class DataDictionary
        {
            public const string Default = GroupName + ".DataDictionary";

            public const string Create = Default + ".Create";

            public const string Update = Default + ".Update";

            public const string Delete = Default + ".Delete";

            public const string ManageItems = Default + ".ManageItems";
        }

        public class Layout
        {
            public const string Default = GroupName + ".Layout";

            public const string Create = Default + ".Create";

            public const string Update = Default + ".Update";

            public const string Delete = Default + ".Delete";
        }

        public class Menu
        {
            public const string Default = GroupName + ".Menu";

            public const string Create = Default + ".Create";

            public const string Update = Default + ".Update";

            public const string Delete = Default + ".Delete";

            public const string ManageRoles = Default + ".ManageRoles";

            public const string ManageUsers = Default + ".ManageUsers";
        }

    }
}