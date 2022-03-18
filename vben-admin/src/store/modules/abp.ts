import { defineStore } from 'pinia';
import { store } from '/@/store';

import { ABP_APP_KEY } from '/@/enums/cacheEnum';
import { createLocalStorage } from '/@/utils/cache';

import { i18n } from '/@/locales/setupI18n';

import {
  AbpApplicationConfigurationService,
  ApplicationConfigurationDto,
  ApplicationAuthConfigurationDto,
  CurrentUserDto,
  ApplicationLocalizationConfigurationDto,
  ApplicationSettingConfigurationDto,
} from '/@/api/proxy/application-configurations';

const ls = createLocalStorage();
const defaultApp = {} as ApplicationConfigurationDto;

const lsApplication = (ls.get(ABP_APP_KEY) || defaultApp) as ApplicationConfigurationDto;

interface AbpState {
  application: ApplicationConfigurationDto;
}

export const useAbpStore = defineStore({
  id: 'abp',
  state: (): AbpState => ({
    application: lsApplication,
  }),
  getters: {
    getApplication(): ApplicationConfigurationDto {
      return this.application ?? defaultApp;
    },
  },
  actions: {
    resetSession() {
      // 清除与用户相关的信息
      this.application.auth = {} as ApplicationAuthConfigurationDto;
      this.application.currentUser = {} as CurrentUserDto;
      this.application.setting = {} as ApplicationSettingConfigurationDto;
    },
    setApplication(application: ApplicationConfigurationDto) {
      this.application = application;
      ls.set(ABP_APP_KEY, application);
    },
    mergeLocaleMessage(localization: ApplicationLocalizationConfigurationDto) {
      if (localization.languagesMap['vben-admin-ui']) {
        const transferCulture = localization.languagesMap['vben-admin-ui'].filter(
          (x) => x.value === localization.currentCulture.cultureName,
        );
        if (transferCulture && transferCulture.length > 0) {
          i18n.global.mergeLocaleMessage(transferCulture[0].name || '', localization.values);
        } else {
          i18n.global.mergeLocaleMessage(
            localization.currentCulture.cultureName || '',
            localization.values,
          );
        }
      }
    },
    async initlizeAbpApplication() {
      const application = await new AbpApplicationConfigurationService().get();
      this.setApplication(application);

      const { localization } = application;
      this.mergeLocaleMessage(localization);
    },
  },
});

export function useAbpStoreWithOut() {
  return useAbpStore(store);
}
