// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ABP {
  export interface Child {
    localizations?: Localization[];
  }

  export interface Localization {
    culture: string;
    resources: LocalizationResource[];
  }

  export interface LocalizationResource {
    resourceName: string;
    texts: Record<string, string>;
  }

  export interface HasPolicy {
    requiredPolicy?: string;
  }

  export type PagedResponse<T> = {
    totalCount: number;
  } & PagedItemsResponse<T>;

  export interface PagedItemsResponse<T> {
    items: T[];
  }

  export interface PageQueryParams {
    filter?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
  }

  export interface Lookup {
    id: string;
    displayName: string;
  }

  export interface BasicItem {
    id: string;
    name: string;
  }

  export interface Option<T> {
    key: Extract<keyof T, string>;
    value: T[Extract<keyof T, string>];
  }

  export interface Dictionary<T = any> {
    [key: string]: T;
  }
}
