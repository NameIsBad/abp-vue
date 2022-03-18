namespace Zoey;

public static class ZoeyDbProperties
{
    public static string DbTablePrefix { get; set; } = "Zoey";

    public static string DbSchema { get; set; } = null;

    public const string ConnectionStringName = "Zoey";
}