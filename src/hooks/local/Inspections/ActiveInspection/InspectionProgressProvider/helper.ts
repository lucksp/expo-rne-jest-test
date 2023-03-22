import produce from 'immer';

import { StepStatus, UpdateStatus, WithStatus } from './types';

export function handleCheckStatus(
  formFieldsWithStatus: WithStatus[] | undefined,
  newStatus: UpdateStatus
) {
  return produce(formFieldsWithStatus, draft => {
    if (!draft) return draft;
    let stepIndex = -1;
    const sectionIndex = draft.findIndex(form =>
      form.formFields.some((field, i) => {
        if (field.uuid === newStatus.stepUuid) {
          stepIndex = i;
          return true;
        }
      })
    );
    if (stepIndex < 0 || sectionIndex < 0) {
      throw new Error(`Unable to locate item to track: ${newStatus.stepUuid}`);
    }

    draft[sectionIndex].formFields[stepIndex].status = newStatus.status;

    const allRequiredStepsComplete = draft[sectionIndex].formFields
      .filter(fields => fields.isRequired)
      .every(step => step.status === StepStatus.COMPLETE);
    if (allRequiredStepsComplete) {
      draft[sectionIndex].status = StepStatus.COMPLETE;
    } else {
      return draft;
    }
  });
}
