export enum StepStatus {
  COMPLETE = 'complete',
  FAIL = 'failed',
  OPEN = 'open',
}

export type WithStatus = {
  uuid: string;
  formFields: {
    uuid: string;
    status: StepStatus;
    isRequired: boolean;
  }[];
  status: StepStatus;
};

export type UpdateStatus = {
  status: StepStatus;
  stepUuid: string;
};

export interface ProgressShape {
  formFieldsWithStatus?: WithStatus[];
  reset: () => void;
  updateStatus: (newStatus: UpdateStatus) => void;
}
