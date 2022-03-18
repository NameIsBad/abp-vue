using System;
using Volo.Abp.Application.Dtos;

namespace Zoey.Admin.Auditing.Logging;

public class EntityPropertyChangeDto : EntityDto<Guid>
{
    public string NewValue { get; set; }

    public string OriginalValue { get; set; }

    public string PropertyName { get; set; }

    public string PropertyTypeFullName { get; set; }
}