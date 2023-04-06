import { NavigationProp, useNavigation, useRoute } from '@react-navigation/core';
import React, { createContext, ReactElement, ReactNode, useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { flatResponseGet, put,SignedURLs } from '@/src/helpers/api';
import { useAPIErrors } from '@/src/hooks/global/APIErrors';
import { useAuthorization } from '@/src/hooks/global/Authorization';
import { ApiPath } from '@/src/hooks/routes';
import { useDeltaSwr as getImageBucketUrls } from '@/src/hooks/useDeltaSwr';
import { InspectionRouteProps, InspectionStackParams } from '@/src/router/Home/Inspections/types';

import { issueData } from './__fixtures__/issueFixture';
import { getField, getIssue, getNextStep } from './helper';
// import { mapOptionsFieldsToSubmit } from './helper';
import { FormInputShape, IssueContextShape, MediaShape, UrlData } from './types';

export const ActiveIssueContext = createContext<IssueContextShape | undefined>(undefined);

type Shape = ({ children }: { children: ReactNode }) => ReactElement;

const ActiveIssueProvider: Shape = ({ children }) => {
  const { authState } = useAuthorization();
  const { pushError } = useAPIErrors();
  const navigation = useNavigation<NavigationProp<InspectionStackParams>>();
  const { params } = useRoute<InspectionRouteProps<'VehicleInspectionIssue'>>();

  // TODO - use reducer instead of multiple useState
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mediaInfo, setMediaInfo] = useState<MediaShape>({
    assetCount: 0,
    contentType: '',
    mediaType: [''],
    onComplete: () => null,
    readyToFetchUrls: false,
  });

  // const saveKey = `${ApiPath.SAVE_ISSUE}?aggregateUUID=`;
  // const getKey = `${ApiPath.GET_ISSUE}?systemName=${params.issue}`;

  // TODO: eventually get issue from BE

  // const { data } = useDeltaSwr({
  //   key: getKey,
  //   fetcher: () => flatResponseGet({ path: getKey, authState, pushError }),
  //   options: {
  //     onSuccess: resp => {
  //       console.log('Success issue get: ', resp);
  //     },
  //   },
  // });

  /** DERIVED FROM STATE */
  const formSection = getIssue(issueData?.formGroups, params.issue);
  const issueStep = params.issueStep || formSection?.formFields[0].uuid;
  const field = getField(formSection?.formFields || [], issueStep || '');
  const nextIssueStep = getNextStep({
    formGroup: formSection,
    currentStep: issueStep || '',
  });

  // get defaultValues differently
  const defaultValues = {
    '1c2e692e-3d24-4cc3-a856-33b375725750': '',
    '2c2e692e-3d24-4cc3-a856-33b375725750': [],
  };
  const methods = useForm<FormInputShape>({
    defaultValues,
    shouldUnregister: false,
  });
  // const { watch, handleSubmit } = methods;
  // const values = watch();

  const handleNextPress = useCallback(() => {
    // TODO: setError will also be used with SWR
    setError('');
    if (!nextIssueStep) {
      navigation.navigate('VehicleInspectionStep', {
        ...params,
        section: params.section,
        step: params.step,
      });
    } else {
      navigation.navigate('VehicleInspectionIssue', {
        ...params,
        issueStep: nextIssueStep,
      });
    }
  }, [navigation, nextIssueStep, params]);

  const clearMediaInfo = () => {
    setMediaInfo({
      assetCount: 0,
      contentType: '',
      mediaType: [''],
      onComplete: () => null,
      readyToFetchUrls: false,
    });
  };

  const handleMediaUpload = async (urlData: UrlData[]) => {
    await Promise.all(
      urlData.map(async (data, i) => {
        try {
          await put({
            authState,
            body: `${mediaInfo.mediaType[i]}`,
            headerAdjustments: {
              'Content-Type': mediaInfo.contentType,
            },
            path: data.signedUrl,
            pushError,
            useApiUrl: false,
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

  return (
    <ActiveIssueContext.Provider
      value={{
        formSection,
        field,
        handleNextPress,
        isLoading,
        error,
        setMediaInfo,
        RHFMethods: methods,
      }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </ActiveIssueContext.Provider>
  );
};

export { ActiveIssueProvider };
