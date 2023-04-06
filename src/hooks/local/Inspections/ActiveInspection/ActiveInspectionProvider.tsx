import { NavigationProp, useNavigation, useRoute } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native';
import { SpeedDial } from '@rneui/themed';
import { AVPlaybackSourceObject } from 'expo-av';
import { CameraCapturedPicture } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import Constants from 'expo-constants';
import React, { createContext, useCallback, useState } from 'react';

import { flatPost, flatResponseGet, SignedURLs } from '@/src/helpers/api';
import { useAPIErrors } from '@/src/hooks/global/APIErrors';
import { useAuthorization } from '@/src/hooks/global/Authorization';
import { usePrevious } from '@/src/hooks/global/usePrevious';
import { ApiPath } from '@/src/hooks/routes';
import { useDeltaSwr as getImageBucketUrls } from '@/src/hooks/useDeltaSwr';
import { InspectionRouteProps, InspectionStackParams } from '@/src/router/Home/Inspections/types';

import { useVehicleDataContext } from '../../Vehicle';
import { getField, getNextStep, getSection, mapOptionsFieldsToSubmit } from './helper';
import { StepStatus,useInspectionProgressProvider } from './InspectionProgressProvider';
import { useInspectionsDataContext } from './InspectionsDataProvider/useInspectionsDataContext';
import { ActiveContextShape, FormInputShape, MediaShape, PostResponse, UrlData } from './types';

export const ActiveInspectionContext = createContext<ActiveContextShape | undefined>(undefined);

const showCopyAggIdBtn = Constants.expoConfig?.extra?.ENABLE_DEV_FEATURES;

const ActiveInspectionProvider: ComponentShape = ({ children }) => {
  console.log('ActiveInspectionProvider');

  const { authState } = useAuthorization();
  const { pushError } = useAPIErrors();
  const { inspectionData } = useInspectionsDataContext();
  const { vehicle } = useVehicleDataContext();
  const navigation = useNavigation<NavigationProp<InspectionStackParams>>();
  const route = useRoute<InspectionRouteProps<'VehicleInspectionStep'>>();
  console.log({ route });

  const { params: issueParams } = useRoute<InspectionRouteProps<'VehicleInspectionIssue'>>();
  const { updateStatus } = useInspectionProgressProvider();
  // const { manipulateImage } = useImageManipulator();
  // const { compressMedia } = useCompressor();

  // TODO - use reducer instead of multiple useState
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [photoArray, setPhotoArray] = useState<CameraCapturedPicture[]>([]);
  const [recordedVideo, setRecordedVideo] = useState<AVPlaybackSourceObject>();
  const [isPreviewingImages, setIsPreviewingImages] = useState(false);
  const [mediaInfo, setMediaInfo] = useState<MediaShape>({
    assetCount: 0,
    contentType: '',
    mediaType: [],
    onComplete: () => null,
    readyToFetchUrls: false,
  });
  const { params } = route;
  const prevAggId = usePrevious<string | undefined>(params.aggId);

  /** HIDDEN FORM STEPS */
  const metaData = inspectionData?.formGroups.find(group => group.name === 'Vehicle Metadata');

  /** DERIVED FROM STATE */
  const formSection = getSection(inspectionData?.formGroups || [], params.section);
  const field = getField(formSection?.formFields || [], params.step);
  const nextStep = getNextStep({
    formGroup: formSection,
    currentStep: params.step,
  });
  const { aggId: aggregateUuid } = route.params;
  if (!aggregateUuid && prevAggId !== aggregateUuid) {
    throw new Error(`missing Aggregate ID, was ${prevAggId}, but now undefined`);
  }
  const key = `${ApiPath.SAVE_INSPECTION}${aggregateUuid ? `?aggregateUUID=${aggregateUuid}` : ''}`;

  /** CONSTS */
  const handleSkipPress = useCallback(
    (aggId = params.aggId) => {
      if (!nextStep) {
        const pushAction = StackActions.push('VehicleInspectionSection', {
          ...params,
          aggId,
          section: 'Overview',
          name: params.name,
        });
        navigation.dispatch(pushAction);
      } else {
        const pushAction = StackActions.push('VehicleInspectionStep', {
          ...params,
          aggId,
          step: nextStep,
        });
        navigation.dispatch(pushAction);
      }
    },
    [navigation, nextStep, params]
  );

  const handleShowIssue = useCallback(
    (linkedFormName: string) => {
      // get form from API
      // set a state var when we're done with the issue so we can go back to handle next?
      navigation.navigate('VehicleInspectionIssue', {
        ...issueParams,
        issue: linkedFormName,
        issueStep: '',
      });
    },
    [issueParams, navigation]
  );

  const handleNextPress = useCallback(
    async (data: FormInputShape, enableSkip = true, isCompleteStep = false) => {
      const linkedFormName = field?.formFieldOptions?.reduce((prev, cur) => {
        if (cur.value === data[field.uuid] || data[field.uuid]?.includes(cur.value)) {
          prev = cur.linkedForm || '';
        }
        return prev;
      }, '');

      if (linkedFormName) {
        handleShowIssue(linkedFormName);
        return;
      }

      if (!data || !inspectionData) {
        throw new Error('Submitting without any data');
      }
      const { uuid, isRequired } = field || {};
      setIsLoading(true);
      setError('');

      let completeUUID = '';
      let completeGroupUUID = '';
      if (isCompleteStep) {
        const completeInspection = inspectionData?.formGroups.find(
          group => group.name === 'Complete Inspection'
        );
        completeGroupUUID = completeInspection?.uuid || '';
        completeUUID = completeInspection?.formFields[0].uuid || '';
      }

      // TODO: Coordinate with BE to rename "formUUID" to "groupUUID" or something
      try {
        const formValues = mapOptionsFieldsToSubmit({
          data: data,
          formUUID: !isCompleteStep ? params.section : completeGroupUUID,
          formFieldUUID: !isCompleteStep ? params.step : completeUUID,
        });

        // Only send metadata value once
        let metadataValues = {};
        const includeMetadata = !aggregateUuid;
        if (includeMetadata) {
          const metaUUID = metaData?.formFields[0].uuid || '';
          const vehicleID = vehicle?.id.toString() || '';
          const meta = {
            [metaUUID]: vehicleID,
          };

          metadataValues = mapOptionsFieldsToSubmit({
            data: meta,
            formUUID: metaData?.uuid || '',
            formFieldUUID: metaUUID,
          });
        }
        const forms = !includeMetadata ? [formValues] : [formValues, metadataValues];

        const resp = await flatPost<PostResponse>({
          path: key,
          authState,
          pushError,
          body: { forms },
        });

        if (resp?.aggregateUuid) {
          if (isRequired && uuid) {
            updateStatus({
              status: StepStatus.COMPLETE,
              stepUuid: uuid,
            });
          }

          // router methods to update `params` or dispatch stack actions are not updating route state
          enableSkip && handleSkipPress(resp.aggregateUuid);
        } else {
          if (isRequired && uuid) {
            updateStatus({ status: StepStatus.FAIL, stepUuid: uuid });
          }
          throw new Error(resp?.message);
        }
      } catch (e) {
        setError((e as Error).message);
        console.error(`Something wrong with response: ${(e as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    },
    [
      aggregateUuid,
      authState,
      field,
      handleShowIssue,
      handleSkipPress,
      inspectionData,
      key,
      metaData?.formFields,
      metaData?.uuid,
      params.section,
      params.step,
      pushError,
      updateStatus,
      vehicle?.id,
    ]
  );

  const clearMediaInfo = () => {
    setMediaInfo({
      assetCount: 0,
      contentType: '',
      mediaType: [],
      onComplete: () => null,
      readyToFetchUrls: false,
    });
  };

  const handleMediaUpload = async (urlData: UrlData[]) => {
    await Promise.all(
      urlData.map(async (data, i) => {
        try {
          if (!mediaInfo?.mediaType[i]) {
            throw new Error('Unable to find media to upload');
          }
          // The result body is different depending on media type
          let result;
          // if (mediaInfo.contentType === 'image/jpeg') {
          //   // returns a base64 string
          //   result = await manipulateImage({
          //     imageUri: mediaInfo?.mediaType[i] || '',
          //   });
          // } else {
          //   // returns a file path string
          //   result = {
          //     uri: await compressMedia(mediaInfo?.mediaType[i] || ''),
          //   };
          // }

          // All we need to use is a bare bones fetch
          await fetch(`${data.signedUrl}`, {
            method: 'PUT',
            headers: {
              'Content-Type': mediaInfo.contentType,
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            body: result as any,
          });
        } catch (e) {
          // TODO unsure what we want to do with errors
          console.error('Media Upload Error: ', e);
        }
      })
    )
      .then(() => {
        const ids = urlData.reduce<FormInputShape>((prev, curr) => {
          if (!field) {
            return prev;
          }
          return {
            ...prev,
            [field.uuid]: curr.uuid,
          };
        }, {});
        mediaInfo.onComplete(ids);
      })
      .finally(() => {
        clearMediaInfo();
      });
  };

  getImageBucketUrls({
    key: `${ApiPath.OPERATIONS_INSPECTIONS_SIGNEDURLS}/default_monthly_inspection?assetCount=${mediaInfo.assetCount}`,
    fetcher: (url: string) => flatResponseGet<SignedURLs[]>({ path: url, authState, pushError }),
    isReadyToFetch: mediaInfo.readyToFetchUrls,
    options: {
      onSuccess: resp => {
        // save the signed url UUID
        setIsLoading(true);
        handleMediaUpload(resp);
      },
      onError: err => {
        console.error('SWR Error: ', err);
      },
    },
  });

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(route.params.aggId || 'no aggId');
  };

  return (
    <ActiveInspectionContext.Provider
      value={{
        formSection,
        field,
        handleSkipPress,
        handleNextPress,
        isLoading,
        error,
        setMediaInfo,
        photoArray,
        setPhotoArray,
        recordedVideo,
        setRecordedVideo,
        isPreviewingImages,
        setIsPreviewingImages,
      }}
    >
      {children}
      {showCopyAggIdBtn && route.params.aggId && (
        <SpeedDial
          size="small"
          isOpen={speedDialOpen}
          icon={{ name: 'info', color: '#fff' }}
          openIcon={{ name: 'close', color: '#fff' }}
          onOpen={() => setSpeedDialOpen(prev => !prev)}
          onClose={() => setSpeedDialOpen(prev => !prev)}
        >
          {/** there is a TS error below from RNE */}
          {/** eslint-disable-next-line @typescript-eslint/ban-ts-comment
           * @ts-ignore */}
          <SpeedDial.Action
            icon={{ name: 'content-copy', color: '#fff' }}
            title="Copy AggregateID"
            onPress={copyToClipboard}
          />
        </SpeedDial>
      )}
    </ActiveInspectionContext.Provider>
  );
};

export { ActiveInspectionProvider };
