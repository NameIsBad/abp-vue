export interface GenerateProxySchema {
  /**
   * Backend module name
   */
  module: string;

  /**
   * url
   */
  sourceUrl: string;

  /**
   * 根命名空间名称
   */
  rootNamespace?: string;
}
