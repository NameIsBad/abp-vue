using AutoMapper;
using Zoey.Admin.Auditing.Logging;
using Volo.Abp.AuditLogging;

namespace Zoey.Admin.Auditing;

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