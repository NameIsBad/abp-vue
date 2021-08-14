using AutoMapper;
using YZ.PrintStore.AdministrationService.Auditing.Logging;
using Volo.Abp.AuditLogging;

namespace YZ.PrintStore.AdministrationService.Auditing
{
    public class AbpAuditingMapperProfile : Profile
    {
        public AbpAuditingMapperProfile()
        {
            CreateMap<AuditLogAction, AuditLogActionDto>()
                .MapExtraProperties();
            CreateMap<EntityPropertyChange, EntityPropertyChangeDto>();
            CreateMap<EntityChange, EntityChangeDto>()
                .MapExtraProperties();
            CreateMap<AuditLog, AuditLogDto>()
                .MapExtraProperties();
        }
    }
}
