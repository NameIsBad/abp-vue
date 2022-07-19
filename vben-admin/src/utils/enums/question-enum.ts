import { QuestionForm } from '/@/api/proxy/questions';

export const questionForm: Record<QuestionForm, string> = {
  [QuestionForm.Common]: '通用',
  [QuestionForm.New]: '新训',
  [QuestionForm.Change]: '换证',
  [QuestionForm.Repeat]: '复训',
};
