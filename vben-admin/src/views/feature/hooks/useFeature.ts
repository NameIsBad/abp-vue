import type { Ref } from 'vue';

import { watch, ref, unref } from 'vue';
import { message } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n';
import {
  FeatureGroupDto,
  UpdateFeatureDto,
  FeaturesService,
  UpdateFeaturesDto,
} from '/@/api/proxy/feature-management';
import { StringValues } from '/@/api/proxy/validation';
import { ReturnInnerMethods } from '/@/components/Modal';

interface UseFeature {
  providerName: Ref<string>;
  providerKey: Ref<string | null>;
  formRel: Ref<any>;
  modalMethods: ReturnInnerMethods;
}

export function useFeature({ providerName, providerKey, formRel, modalMethods }: UseFeature) {
  const { t } = useI18n();
  const featureGroup = ref<{ groups: FeatureGroupDto[] }>({
    groups: [],
  });
  const featureGroupKey = ref(0);
  const service = new FeaturesService();

  watch(
    () => unref(providerKey),
    (key) => {
      if (key !== undefined) {
        const form = unref(formRel);
        form.resetFields();
        onGroupChange(0);
        service.get(unref(providerName), key!).then((res) => {
          featureGroup.value.groups = mapFeatures(res.groups);
        });
      }
    },
  );

  function getFeatures(groups: UpdateFeaturesDto[]) {
    const features: UpdateFeatureDto[] = [];
    groups.forEach((g) => {
      g.features.forEach((f) => {
        if (f.value !== null) {
          features.push({
            name: f.name!,
            value: String(f.value),
          });
        }
      });
    });
    return {
      features,
    } as UpdateFeaturesDto;
  }

  function mapFeatures(groups: FeatureGroupDto[]) {
    groups.forEach((g) => {
      g.features.forEach((f) => {
        switch (f.valueType?.validator.name) {
          case 'BOOLEAN':
            f.value = String(f.value);
            break;
          case 'NUMERIC':
            f.value = String(f.value);
            break;
        }
      });
    });
    return groups;
  }

  function numericValidator(validator: StringValues.IValueValidator) {
    return {
      validator: (_, value) => {
        if (value < validator.properties.MinValue || value > validator.properties.MaxValue) {
          return Promise.reject(
            t('AbpFeatureManagement.ThisFieldMustBeBetween{0}And{1}', [
              validator.properties.MinValue,
              validator.properties.MaxValue,
            ] as Recordable),
          );
        } else {
          return Promise.resolve();
        }
      },
      type: 'number',
      trigger: 'change',
    };
  }

  function validator(validator: StringValues.IValueValidator) {
    const featureRules: { [key: string]: any }[] = new Array<{ [key: string]: any }>();
    if (validator.name === 'NUMERIC' && validator.properties) {
      featureRules.push({
        type: 'number',
        required: true,
        trigger: 'blur',
      });
      featureRules.push(numericValidator(validator));
    } else if (validator.name === 'STRING' && validator.properties) {
      if (
        validator.properties.AllowNull &&
        String(validator.properties.AllowNull).toLowerCase() === 'true'
      ) {
        const ruleRequired: { [key: string]: any } = {};
        ruleRequired.required = true;
        ruleRequired.trigger = 'blur';
        ruleRequired.messahe = t('AbpFeatureManagement.ThisFieldIsRequired');
        featureRules.push(ruleRequired);
      }
      const ruleString: { [key: string]: any } = {};
      ruleString.min = validator.properties.MinLength;
      ruleString.max = validator.properties.MaxLength;
      ruleString.trigger = 'blur';
      ruleString.message = t('AbpFeatureManagement.ThisFieldMustBeBetween{0}And{1}', [
        validator.properties.MinValue,
        validator.properties.MaxValue,
      ] as Recordable);
      featureRules.push(ruleString);
    }
    return featureRules;
  }

  function onGroupChange(activeKey) {
    featureGroupKey.value = activeKey;
  }

  function handleSubmit() {
    const form = unref(formRel);
    form.validate().then(() => {
      service
        .update(unref(providerName), unref(providerKey)!, getFeatures(unref(featureGroup).groups))
        .then(() => {
          modalMethods.closeModal();
          message.success(t('成功'));
        });
    });
  }

  return {
    featureGroup,
    featureGroupKey,
    validator,
    handleSubmit,
    onGroupChange,
  };
}
