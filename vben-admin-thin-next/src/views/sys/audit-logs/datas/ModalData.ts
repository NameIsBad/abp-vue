import { FormProps, FormSchema } from '/@/components/Form';

export function getSearchFormSchemas(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [{}],
  };
}
