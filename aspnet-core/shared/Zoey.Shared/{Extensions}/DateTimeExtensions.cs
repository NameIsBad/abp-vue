using System.Linq;

namespace System;

/// <summary>
/// 时间扩展操作类
/// </summary>
public static class DateTimeExtensions
{
    /// <summary>
    /// 当前时间是否周末
    /// </summary>
    /// <param name="dateTime">时间点</param>
    /// <returns></returns>
    public static bool IsWeekend(this DateTime dateTime)
    {
        DayOfWeek[] weeks = { DayOfWeek.Saturday, DayOfWeek.Sunday };
        return weeks.Contains(dateTime.DayOfWeek);
    }

    /// <summary>
    /// 当前时间是否工作日
    /// </summary>
    /// <param name="dateTime">时间点</param>
    /// <returns></returns>
    public static bool IsWeekday(this DateTime dateTime)
    {
        DayOfWeek[] weeks = { DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday };
        return weeks.Contains(dateTime.DayOfWeek);
    }

    /// <summary>
    /// 获取时间相对唯一字符串
    /// </summary>
    /// <param name="dateTime"></param>
    /// <param name="milsec">是否使用毫秒</param>
    /// <returns></returns>
    public static string ToUniqueString(this DateTime dateTime, bool milsec = false)
    {
        int sedonds = dateTime.Hour * 3600 + dateTime.Minute * 60 + dateTime.Second;
        string value = string.Format("{0}{1}{2}", dateTime.ToString("yy"), dateTime.DayOfYear, sedonds);
        return milsec ? value + dateTime.ToString("fff") : value;
    }

    /// <summary>
    /// 一天结束时间
    /// </summary>
    /// <param name="dt"></param>
    /// <returns></returns>
    public static DateTime ToEndTime(this DateTime dt)
    {
        return new DateTime(dt.Year, dt.Month, dt.Day, 23, 59, 59);
    }
    /// <summary>
    /// 一天开始时间
    /// </summary>
    /// <param name="dt"></param>
    /// <returns></returns>
    public static DateTime ToStartTime(this DateTime dt)
    {
        return new DateTime(dt.Year, dt.Month, dt.Day, 00, 00, 00);
    }
}