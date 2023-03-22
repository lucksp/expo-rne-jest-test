import type { FormInputShape } from '@/src/hooks/local/Inspections/ActiveInspection';

import { PostShape } from './types';

export const mapOptionsFieldsToSubmit = ({
  data,
  formUUID,
  formFieldUUID,
  metaDataUUID,
  vehicleID,
}: {
  data: FormInputShape;
  formUUID: string;
  formFieldUUID: string;
  metaDataUUID?: string;
  vehicleID?: string;
}): PostShape => {
  const formBody = Object.keys(data).reduce((prev, curr) => {
    const currentEntry = data[curr];

    // multi save items save to a single array.
    // BE cannot accept this shape, so we have to send each item from array
    // as its own entry.
    const newEntry: PostShape['formValues'] = [];
    if (Array.isArray(currentEntry)) {
      currentEntry.map(entry => {
        newEntry.push({ formFieldUUID, value: entry });
      });
    } else {
      newEntry.push({ formFieldUUID, value: currentEntry });
    }

    if (metaDataUUID && vehicleID) {
      newEntry.push({ formFieldUUID: metaDataUUID, value: vehicleID });
    }

    return [...prev, ...newEntry];
  }, [] as PostShape['formValues']);

  return {
    formUUID,
    formValues: formBody,
  };
};

export const generatePhotoFormat = (
  photoArray: {uri: string}[],
  handleNextPress: (
    data: FormInputShape,
    enableSkip?: boolean,
    isCompleteStep?: boolean
  ) => Promise<void> | void,
  contentType = 'image/jpeg'
) => {
  return {
    assetCount: photoArray.length,
    contentType: contentType,
    mediaType: photoArray.map(photo => photo.uri),
    onComplete: async (stringArr: FormInputShape) => {
      await handleNextPress(stringArr);
    },
    readyToFetchUrls: true,
  };
};
