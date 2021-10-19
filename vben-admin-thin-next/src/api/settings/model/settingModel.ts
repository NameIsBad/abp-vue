export class SettingGroup {
  groupName!: string | undefined;
  groupDisplayName!: string | undefined;
  settingInfos!: SettingInfo[] | undefined;
  permission!: string | undefined;
}

export class SettingInfo {
  name!: string | undefined;
  displayName!: string | undefined;
  description!: string | undefined;
  value!: string | undefined;
  properties!: { [key: string]: any } | undefined;
  permission!: string | undefined;
}

export class UpdateSettingInput {
  values!: { [key: string]: string } | undefined;
}
