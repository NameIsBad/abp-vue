using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YZ.PrintStore.CodeGenerator.Enums;

namespace YZ.PrintStore.CodeGenerator.Models
{
    public class GeneratorRequestDto
    {
        public FontTypeEnum Type { get; set; }
    }

    public class GeneratorInfoDto
    {
        /// <summary>
        /// 模块名称
        /// </summary>
        public string ModuleName { get; set; }
        /// <summary>
        /// 功能名称
        /// </summary>
        public string FunctionName { get; set; }
        /// <summary>
        /// 组件类型
        /// </summary>
        public ComponentTypeEnum ComponentType { get; set; }

    }
}
