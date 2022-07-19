import { questionForm } from './enums/question-enum';

export const getProjectName = (record: {
  defaultAreaName?: string;
  defaultSubjectName?: string;
  defaultJobName?: string;
  defaultProjectName?: string;
  defaultQuestionForm?: number;
}) => {
  if (!record) return '';
  return `${record.defaultAreaName} - ${record.defaultSubjectName} - ${record.defaultJobName} - ${
    record.defaultProjectName
  } - ${record.defaultQuestionForm == null ? '无' : questionForm[record.defaultQuestionForm!]}`;
};
