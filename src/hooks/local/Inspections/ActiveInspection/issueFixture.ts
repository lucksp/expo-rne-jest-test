import { ComponentTypes } from '../../InspectionsDataProvider/types';
export const issueData = {
  formGroups: [
    {
      formFields: [
        {
          defaultValue: '',
          formFieldOptions: [
            {
              isSelected: false,
              label: '',
              order: 0,
              uuid: '92928b1e-1d53-4243-b305-1c2ff6b56c55',
              value: '',
            },
          ],
          helperText: '',
          inputValue: '',
          isRequired: true,
          kind: ComponentTypes.TEXTAREA,
          label: 'Enter a description of the issue here.',
          order: 0,
          placeholderValue: '',
          uuid: '1c2e692e-3d24-4cc3-a856-33b375725750',
        },
        {
          defaultValue: '',
          formFieldOptions: [
            {
              isSelected: false,
              label: 'Yes',
              order: 0,
              uuid: '92928b1e-1d53-4243-b305-1c2ff6b56c55',
              value: 'yes',
            },
            {
              isSelected: false,
              label: 'No',
              order: 1,
              uuid: '82928b1e-1d53-4243-b305-1c2ff6b56c55',
              value: 'no',
            },
          ],
          helperText: 'Does this involve damage or missing parts?',
          inputValue: '',
          isRequired: true,
          kind: ComponentTypes.RADIO,
          label: 'Does this involve damage or missing parts?',
          order: 1,
          placeholderValue: '',
          uuid: '2c2e692e-3d24-4cc3-a856-33b375725750',
        },
        {
          defaultValue: '',
          formFieldOptions: [
            {
              isSelected: false,
              label: 'Yes',
              order: 0,
              uuid: '92928b1e-1d53-4243-b305-1c2ff6b56c55',
              value: 'yes',
            },
          ],
          helperText: 'Take a picture for proof.',
          inputValue: '',
          isRequired: true,
          kind: ComponentTypes.MULTI_IMAGE,
          label: 'Take photos.',
          order: 1,
          placeholderValue: '',
          uuid: '3c2e692e-3d24-4cc3-a856-33b375725750',
        },
      ],
      helperText: 'Please provide details for this issue below.',
      label: 'Damaged Sliding Door',
      name: 'Damaged Sliding Door',
      subText: 'Please provide details for this issue below.',
      uuid: 'f8dbeab4-1b67-43e0-9719-b9ff461739d2',
    },
  ],
  name: 'Damaged Sliding Door',
  uuid: '08eed68b-c7c9-4a33-9297-dc6aafbfedb4',
};
