using System.Collections.Generic;
using System.ComponentModel;

namespace System
{
    public static class EnumExtensions
    {
        /// <summary>
        /// 根据Enum值，比如Sex.Male,返回描述
        /// </summary>
        /// <param name="value">Enum值，比如Sex.Male</param>
        /// <returns></returns>
        public static string GetDescription(this Enum value)
        {
            if (value == null) return null;
            var fi = value.GetType().GetField(value.ToString());
            if (fi != null)
            {
                var des = (DescriptionAttribute[])fi.GetCustomAttributes(typeof(DescriptionAttribute), false);
                if (des.Length > 0)
                    return des[0].Description;
            }
            return value.ToString();
        }

        public static List<KeyValuePair<string, string>> GetEnumSelectList(this Type enumType, string toBeSelectedText = "")
        {
            var data = GetEnumList(enumType, null, toBeSelectedText);
            return data;
            //return new SelectList(data, "Key", "Value", selectedvalue);
        }

        public static List<KeyValuePair<string, string>> GetEnumList(this Type enumType, string toBeSelectedText)
        {
            return GetEnumList(enumType, null, toBeSelectedText);
        }

        /// <summary>
        /// 根据Enum类型获取其项目列表,并在起始位置增加键值
        /// </summary>
        /// <param name="enumType">使用typeof获取的Enum类型信息，比如typeof(Sex)</param>
        /// <param name="firstKey">默认在起始位置增加键值</param>
        /// <param name="firstValue">默认在起始位置增加键值对应的值</param>
        /// <returns></returns>
        public static List<KeyValuePair<string, string>> GetEnumList(this Type enumType, string firstKey, string firstValue)
        {
            var list = GetEnumList(enumType);
            var firstKeyValue = new KeyValuePair<string, string>(firstKey, firstValue);
            list.Insert(0, firstKeyValue);
            return list;
        }

        /// <summary>
        /// 根据Enum类型获取其项目列表
        /// </summary>
        /// <param name="enumType">使用typeof获取的Enum类型信息，比如typeof(Sex)</param>
        /// <returns></returns>
        public static List<KeyValuePair<string, string>> GetEnumList(this Type enumType)
        {
            var fields = enumType.GetFields();
            var result = new List<KeyValuePair<string, string>>();
            foreach (var item in fields)
            {
                var des = (DescriptionAttribute[])item.GetCustomAttributes(typeof(DescriptionAttribute), false);
                if (des.Length > 0)
                {
                    var underlyingType = Enum.GetUnderlyingType(enumType);
                    var value = item.GetValue(item.Name);
                    var underlyingTypeValue = Convert.ChangeType(value, underlyingType);
                    var keyValue = new KeyValuePair<string, string>(underlyingTypeValue.ToString(), des[0].Description);
                    result.Add(keyValue);
                }
            }

            return result;
        }
    }
}