import { ComponentTypes, Inspection } from '../types';

export const InspectionData: Inspection = {
  name: 'Dev 1',
  uuid: '13f2e83f-626b-48cb-a5dd-a3172bf7cd21',
  systemName: 'dev_1_a3172bf7cd21',
  parentFormUUID: '00000000-0000-0000-0000-000000000000',
  version: '1.0.0',
  order: 0,
  formGroups: [
    {
      name: 'Vehicle Metadata',
      uuid: '074a87d4-8399-4b0d-b90f-22dd22d67600',
      systemName: 'dev_1_a3172bf7cd21_vehicle_metadata',
      parentFormUUID: '13f2e83f-626b-48cb-a5dd-a3172bf7cd21',
      version: '1.0.0',
      order: 0,
      isHidden: true,
      formFields: [
        {
          uuid: '3f546f41-1134-4b43-a543-8a4d9ccccfee',
          defaultValue: '',
          helperText: '',
          isRequired: true,
          kind: ComponentTypes.TEXT,
          label: 'vehicle_id',
          placeholderValue: '',
          inputValue: '',
          order: 0,
          formFieldOptions: [],
        },
      ],
    },
    {
      name: 'Dev 1',
      uuid: '0eafdffc-8ba5-45b6-ada8-9372dabe81c2',
      systemName: 'dev_1_a3172bf7cd21_dev_1',
      parentFormUUID: '13f2e83f-626b-48cb-a5dd-a3172bf7cd21',
      version: '1.0.0',
      order: 2,
      isHidden: false,
      formFields: [
        {
          uuid: '1e46bdf9-a30a-4d41-bc61-a39b0a86d2f3',
          defaultValue: '',
          helperText: 'Input the fuel level reading.',
          isRequired: true,
          kind: ComponentTypes.RADIO,
          label: 'Fuel Level',
          placeholderValue: '',
          inputValue: '',
          order: 0,
          formFieldOptions: [
            {
              isSelected: false,
              label: 'Empty',
              value: 'empty',
              uuid: '1d587bef-e4bc-47c9-a55f-5a1a35e121cf',
              order: 0,
              linkedForm: '',
            },
            {
              isSelected: false,
              label: '1/8',
              value: '1/8',
              uuid: '13c44904-aa65-45c8-bff2-9472c3efb122',
              order: 1,
              linkedForm: '',
            },
            {
              isSelected: false,
              label: '1/4',
              value: '1/4',
              uuid: '32842766-85da-46f0-bd72-c079c4e35c6a',
              order: 2,
              linkedForm: '',
            },
            {
              isSelected: false,
              label: '3/8',
              value: '3/8',
              uuid: '0ea85e58-ae57-4ff1-a0ae-bf68566dcf02',
              order: 3,
              linkedForm: '',
            },
            {
              isSelected: false,
              label: '1/2',
              value: '1/2',
              uuid: '7a044564-d9f6-4220-9fce-ba2ac94209bc',
              order: 4,
              linkedForm: '',
            },
            {
              isSelected: false,
              label: '5/8',
              value: '5/8',
              uuid: 'd50b203c-4dfb-44ad-bd20-668b5eb90f38',
              order: 5,
              linkedForm: '',
            },
            {
              isSelected: false,
              label: '3/4',
              value: '3/4',
              uuid: 'ae9ef966-f66d-4a03-ab3a-fa2a5cf2f64c',
              order: 6,
              linkedForm: '',
            },
            {
              isSelected: false,
              label: '7/8',
              value: '7/8',
              uuid: 'f1950c1d-c036-4bbf-b074-b598fe046cfc',
              order: 7,
              linkedForm: '',
            },
            {
              isSelected: false,
              label: 'Full',
              value: 'full',
              uuid: '576b1de9-5fd2-4f10-8096-a727f1b6159c',
              order: 8,
              linkedForm: '',
            },
          ],
        },
      ],
    },
    {
      name: 'dev 2',
      uuid: '71b65eb3-17e1-43d2-abc0-1cd9a30e399d',
      systemName: 'dev_1_a3172bf7cd21_dev_2',
      parentFormUUID: '13f2e83f-626b-48cb-a5dd-a3172bf7cd21',
      version: '1.0.0',
      order: 3,
      isHidden: false,
      formFields: [
        {
          uuid: '36aad902-b9bd-4f80-b672-423a17cb9019',
          defaultValue: '',
          helperText: 'Check the horn works.',
          isRequired: true,
          kind: ComponentTypes.RADIO,
          label: 'Check Horn Works',
          placeholderValue: '',
          inputValue: '',
          order: 0,
          formFieldOptions: [
            {
              isSelected: false,
              label: 'Pass',
              value: 'pass',
              uuid: 'ed8091fe-d681-4ec4-8f10-93cef3e64db7',
              order: 0,
              linkedForm: '',
            },
            {
              isSelected: false,
              label: 'Fail',
              value: 'fail',
              uuid: '2d64f2e1-c6c7-46c4-9552-670543b0ca15',
              order: 1,
              linkedForm: '',
            },
          ],
        },
      ],
    },
    {
      name: 'Complete Inspection',
      uuid: '68b35c50-b2cf-453a-a743-cfadee41a9e7',
      systemName: 'dev_1_a3172bf7cd21_complete_inspection',
      parentFormUUID: '13f2e83f-626b-48cb-a5dd-a3172bf7cd21',
      version: '1.0.0',
      order: 6,
      isHidden: true,
      formFields: [
        {
          uuid: 'a4db6df7-b387-4858-bc51-bcde736fa45e',
          defaultValue: '',
          helperText:
            'Have you completed all required steps? There is no going back once submitted',
          isRequired: true,
          kind: ComponentTypes.DATE_PICKER,
          label: 'Complete Inspection',
          placeholderValue: '',
          inputValue: '',
          order: 0,
          formFieldOptions: [],
        },
      ],
    },
  ],
};
