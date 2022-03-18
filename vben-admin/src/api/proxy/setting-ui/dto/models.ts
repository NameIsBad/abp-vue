
export interface SettingGroup {
  groupName?: string;
  groupDisplayName?: string;
  settingInfos: SettingInfo[];
  permission?: string;
}

export interface SettingInfo {
  name?: string;
  displayName?: string;
  description?: string;
  value?: string;
  properties: Record<string, object>;
  permission?: string;
}
