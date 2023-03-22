import { AVPlaybackSourceObject } from 'expo-av';
import { CameraCapturedPicture } from 'expo-camera';
import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormField, FormGroup, IssueGroup } from '../InspectionsDataProvider/types';

export interface ActiveContextShape {
  formSection?: FormGroup;
  field?: FormField;
  handleSkipPress: (aggId?: string) => void;
  handleNextPress: (
    data: FormInputShape,
    enableSkip?: boolean,
    isCompleteStep?: boolean
  ) => Promise<void>;
  isLoading: boolean;
  error: string;
  setMediaInfo: (data: MediaShape) => void;
  photoArray: CameraCapturedPicture[];
  setPhotoArray: Dispatch<SetStateAction<CameraCapturedPicture[]>>;
  recordedVideo?: AVPlaybackSourceObject;
  setRecordedVideo: Dispatch<SetStateAction<AVPlaybackSourceObject | undefined>>;
  isPreviewingImages: boolean;
  setIsPreviewingImages: Dispatch<SetStateAction<boolean>>;
}

export interface IssueContextShape {
  formSection?: IssueGroup;
  field?: FormField;
  handleNextPress: () => void;
  isLoading: boolean;
  error: string;
  RHFMethods: UseFormReturn<FormInputShape, any>;
  setMediaInfo: (data: MediaShape) => void;
}

export interface PostShape {
  readonly formUUID: string;
  readonly formValues: {
    formFieldUUID: string;
    value: string;
  }[];
}

export interface PostResponse {
  readonly aggregateUuid: string;
}

export interface FormInputShape {
  [x: string]: string | string[];
}

export interface MediaShape {
  assetCount: number;
  contentType: string;
  mediaType: CameraCapturedPicture['base64'][];
  onComplete: (ids: FormInputShape) => void;
  readyToFetchUrls: boolean;
}

export interface UrlData {
  filename: string;
  signedUrl: string;
  uuid: string;
}
