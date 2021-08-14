﻿using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace YZ.PrintStore.AdministrationService.Auditing.Security
{
    public interface ISecurityLogAppService : IApplicationService
    {
        Task<PagedResultDto<SecurityLogDto>> GetListAsync(SecurityLogGetByPagedDto input);

        Task<SecurityLogDto> GetAsync(Guid id);

        Task DeleteAsync(Guid id);
    }
}
