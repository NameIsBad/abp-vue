// Used to configure the general configuration of some components without modifying the components

import type { SorterResult } from '../components/Table';
import { formatPagedRequest } from '/@/utils/http/abp/helper';

export default {
  // basic-table setting
  table: {
    // Form interface request general configuration
    // support xxx.xxx.xxx
    fetchSetting: {
      // The field name of the current page passed to the background
      pageField: 'skipCount',
      // The number field name of each page displayed in the background
      sizeField: 'maxResultCount',
      // Field name of the form data returned by the interface
      listField: 'items',
      // Total number of tables returned by the interface field name
      totalField: 'totalCount',
    },
    // Number of pages that can be selected
    pageSizeOptions: ['10', '25', '50', '100'],
    // Default display quantity on one page
    defaultPageSize: 10,
    // Custom general sort function
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo;
      // ¸ñÊ½»¯ÅÅÐò¶ÔÏó
      let sorting = field;
      // fix: sorting¿ÉÄÜÎª¿Õ
      if (sorting) {
        switch (order) {
          case 'descend':
            sorting = field.concat(' DESC');
            break;
          case 'ascend':
            sorting = field.concat(' ASC');
            break;
          // fix: È¡ÏûÅÅÐò
          default:
            sorting = '';
            break;
        }
      }
      return {
        sorting,
      };
    },
    // Custom general filter function
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data;
    },
    defaultBeforeFetchFn: (request: any) => {
      console.log(request);
      formatPagedRequest(request);
    },
    defaultSize: null,
  },
  // scrollbar setting
  scrollbar: {
    // Whether to use native scroll bar
    // After opening, the menu, modal, drawer will change the pop-up scroll bar to native
    native: false,
  },
};
