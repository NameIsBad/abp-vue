using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace Zoey.Shared.Application;

public static class PageLinqExtensions
{
    public static async Task<PagedResultDto<T>> ToPageListAnync<T>(this IQueryable<T> source, int pageIndex,
        int pageSize) where T : class
    {
        var data = await source.PageBy((pageIndex - 1) * pageSize, pageSize).ToListAsync();
        var count = await source.CountAsync();
        var result = new PagedResultDto<T>
        {
            Items = data,
            TotalCount = count
        };
        return result;
    }


    public static async Task<PagedResultDto<T>> ToPageListAnync<T>(this IQueryable<T> source,
        PagedAndSortedResultRequestDto pageQueryFilter) where T : class
    {
        var data = await source.PageBy(pageQueryFilter).ToListAsync();
        var count = await source.CountAsync();
        var result = new PagedResultDto<T>
        {
            Items = data,
            TotalCount = count
        };
        return result;
    }
}