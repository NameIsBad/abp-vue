using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RazorLight;
using Volo.Abp.AspNetCore.Mvc;
using YZ.PrintStore.CodeGenerator.Models;

namespace YZ.PrintStore.CodeGenerator
{
    public class CodeGeneratorController : AbpController
    {
        private readonly IRazorLightEngine _razorLightEngine;

        public CodeGeneratorController(IRazorLightEngine razorLightEngine)
        {
            _razorLightEngine = razorLightEngine;
        }

        public async Task Generator(GeneratorRequestDto request)
        {
            var result = await _razorLightEngine.CompileRenderAsync<object>($"/Templates/{request.Type}/template1.cshtml", null);

            await Task.CompletedTask;
        }
    }
}
