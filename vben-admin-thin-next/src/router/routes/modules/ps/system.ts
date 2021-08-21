import type { AppRouteModule } from '/@/router/types';

import { LAYOUT, getParentLayout } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/organization-units',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: t('routes.system.moduleName'),
  },
  children: [
    {
      path: '/organization-units',
      name: 'OrganizationUnits',
      component: getParentLayout('OrganizationUnits'),
      meta: {
        title: t('routes.system.identity'),
      },
      redirect: '/system/organization-units',
      children: [
        {
          path: 'organization-units',
          name: 'organizationManagement',
          meta: {
            title: t('routes.system.organization'),
            ignoreKeepAlive: false,
            roles: ['AbpIdentity.Users'],
          },
          component: () => import('/@/views/identity/organization-units/index.vue'),
        },
        {
          path: 'account',
          name: 'AccountManagement',
          meta: {
            title: t('routes.system.account'),
            ignoreKeepAlive: false,
            roles: ['AbpIdentity.Users'],
          },
          component: () => import('/@/views/identity/user/index.vue'),
        },
        {
          path: 'role',
          name: 'RoleManagement',
          meta: {
            title: t('routes.system.role'),
            ignoreKeepAlive: true,
            roles: ['AbpIdentity.Roles'],
          },
          component: () => import('/@/views/identity/role/index.vue'),
        },
        {
          path: 'claim-types',
          name: 'ClaimTypes',
          meta: {
            title: t('routes.system.claimTypes'),
            ignoreKeepAlive: true,
            roles: ['AbpIdentity.IdentityClaimTypes'],
          },
          component: () => import('/@/views/identity/claim-types/index.vue'),
        },
        {
          path: 'security-logs',
          name: 'securityLogsManagement',
          meta: {
            title: t('routes.system.securityLogs'),
            ignoreKeepAlive: false,
            roles: ['AbpIdentity.Users'],
          },
          component: () => import('/@/views/identity/security-logs/index.vue'),
        },
      ],
    },
  ],
};

export default system;
