import { InspectionData } from "../InspectionsDataProvider/__fixtures__/inspection.fixture";

export const initialSave = [
  {
    formUUID: InspectionData.formGroups[1].uuid,
    formValues: [
      {
        formFieldUUID: InspectionData.formGroups[1].formFields[0].uuid,
        value: InspectionData.formGroups[1].formFields[0].formFieldOptions?.[1].value,
      },
    ],
  },
  {
    formUUID: InspectionData.formGroups[0].uuid, // Vehicle MetaData
    formValues: [
      {
        formFieldUUID: InspectionData.formGroups[0].formFields[0].uuid,
        value: '26284', // vehicleID
      },
    ],
  },
];

export const followupSave1 = [
  {
    formUUID: InspectionData.formGroups[2].uuid,
    formValues: [
      {
        formFieldUUID: InspectionData.formGroups[2].formFields[0].uuid,
        value: InspectionData.formGroups[2].formFields[0].formFieldOptions?.[0].value,
      },
    ],
  },
];

export const completeSave = [
  {
    formUUID: InspectionData.formGroups[3].uuid,
    formValues: [
      {
        formFieldUUID: InspectionData.formGroups[3].formFields[0].uuid,
        value: '2023-03-21T13:44:48.359Z', // timestamp of completion
      },
    ],
  },
];

export const saveInspectionSuccessResponse = {
  aggregateUuid: 'c4161879-0f53-46da-8a8c-c7dc98af1ca8',
};
