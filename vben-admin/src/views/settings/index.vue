<template>
  <PageWrapper v-loading="loading">
    <div ref="wrapperRef" :class="prefixCls">
      <Tabs tab-position="left" :tabBarStyle="tabBarStyle">
        <template v-for="item in settingList" :key="item.groupName">
          <TabPane :tab="item.groupDisplayName">
            <CollapseContainer :title="item.groupDisplayName" :canExpan="false">
              <Form :label-col="labelCol" :wrapper-col="wrapperCol">
                <FormItem
                  v-for="setting in item.settingInfos"
                  :key="setting.name"
                  :label="setting.displayName"
                >
                  <div v-if="setting.properties.Type.toString() === 'text'">
                    <Input v-model:value="setting.value" style="width: 80%" />
                  </div>
                  <div v-if="setting.properties.Type.toString() === 'number'">
                    <InputNumber v-model:value="setting.value" style="width: 80%" />
                  </div>
                  <div v-if="setting.properties.Type.toString() === 'checkbox'">
                    <Checkbox
                      :checked="!(setting.value == 'false')"
                      @update:checked="(val) => (setting.value = val.toString())"
                    >
                      {{ setting.description }}
                    </Checkbox>
                    <!-- <Checkbox v-model:checked="setting.value" size="small">
                      {{ setting.description }}
                    </Checkbox> -->
                  </div>

                  <div v-if="setting.properties.Type.toString() === 'select'">
                    <Select default-value="setting.value" style="width: 120px" size="small">
                      <SelectOption
                        v-for="itemOption in setting.properties.Options.toString().split('|')"
                        :value="itemOption"
                        :key="itemOption"
                      >
                        {{ itemOption }}
                      </SelectOption>
                    </Select>
                  </div>
                </FormItem>

                <a-button
                  style="margin-left: 65%"
                  type="primary"
                  @click="updateSettingValues(item.settingInfos)"
                  >{{ t('common.saveText') }}</a-button
                >
              </Form>
            </CollapseContainer>
          </TabPane>
        </template>
      </Tabs>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onMounted } from 'vue';
  import { Checkbox, Tabs, Form, Input, Select, InputNumber } from 'ant-design-vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { ScrollContainer } from '/@/components/Container/index';
  import { SettingService } from '/@/api/proxy/identity';
  import { Dto } from '/@/api/proxy/setting-ui';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { PageWrapper } from '/@/components/Page';
  import { message } from 'ant-design-vue';
  export default defineComponent({
    components: {
      // eslint-disable-next-line vue/no-unused-components
      ScrollContainer,
      CollapseContainer,
      Tabs,
      TabPane: Tabs.TabPane,
      PageWrapper,
      Checkbox,
      Form: Form,
      FormItem: Form.Item,
      Input,
      Select,
      SelectOption: Select.Option,
      // eslint-disable-next-line vue/no-unused-components
      Password: Input.Password,
      InputNumber,
    },
    setup() {
      let settingList: Dto.SettingGroup[] = [];
      const { t } = useI18n();
      const state = reactive({
        settingList,
        loading: true,
      });
      const { get: getAllSettingsAsync, update: updateSettingsAsync } = new SettingService();
      onMounted(async () => {
        state.loading = true;
        const result = await getAllSettingsAsync();
        state.settingList = result.items || [];
        state.loading = false;
      });

      const updateSettingValues = async (item: any) => {
        try {
          const prefix = 'setting_';
          let items: { [key: string]: string } = {};
          item.forEach((e) => {
            items[prefix + e.name] = String(e.value);
          });
          await updateSettingsAsync({
            values: items,
          });
          message.success(t('common.operationSuccess'));
        } catch (error) {
          message.success(t('common.operationFail'));
        }
      };
      return {
        prefixCls: 'account-setting',
        tabBarStyle: {
          width: '220px',
        },
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        ...toRefs(state),
        t,
        updateSettingValues,
      };
    },
  });
</script>
<style lang="less">
  .account-setting {
    margin: 12px;
    background-color: @component-background;

    .base-title {
      padding-left: 0;
    }

    .ant-tabs-tab-active {
      background-color: @item-active-bg;
    }
  }
</style>
