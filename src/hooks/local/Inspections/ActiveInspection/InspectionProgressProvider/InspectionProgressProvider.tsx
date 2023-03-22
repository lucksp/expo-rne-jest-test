import { NavigationProp, useNavigation } from '@react-navigation/core';
import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

import { usePrevious } from '@/src/hooks/global/usePrevious';
import { InspectionStackParams } from '@/src/router/Home/Inspections/types';

import { useInspectionsDataContext } from '../InspectionsDataProvider/useInspectionsDataContext';
import { handleCheckStatus } from './helper';
import { ProgressShape, StepStatus, UpdateStatus, WithStatus } from './types';

export const InspectionProgressContext = createContext<ProgressShape | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const InspectionProgressProvider = ({ children }: Props) => {
  const navigation = useNavigation<NavigationProp<InspectionStackParams>>() || {};
  const { index, routes } = navigation.getState() || {};
  const { name, params: { vehicleId = null } = {} } = routes?.[index] || {};

  const prevName = usePrevious(name);
  const prevVeh = usePrevious(vehicleId);

  const { inspectionData } = useInspectionsDataContext();
  const dataWithStatus = useMemo(
    () =>
      inspectionData?.formGroups
        .filter(group => !group.isHidden)
        .map(group => ({
          uuid: group.uuid,
          formFields: group.formFields.map(field => ({
            uuid: field.uuid,
            status: StepStatus.OPEN,
            isRequired: field.isRequired,
          })),
          status: StepStatus.OPEN,
        })),
    [inspectionData?.formGroups]
  );

  const [formFieldsWithStatus, setFormFieldsWithStatus] = useState<WithStatus[] | undefined>(
    dataWithStatus
  );

  useEffect(
    function loadDataToTrack() {
      setFormFieldsWithStatus(dataWithStatus);
    },
    [dataWithStatus]
  );

  useEffect(
    function resetIfNameOrVehicleChanges() {
      if (prevName === name || prevVeh === vehicleId) return;
      setFormFieldsWithStatus(dataWithStatus);
    },
    [name, dataWithStatus, vehicleId, prevName, prevVeh]
  );

  const updateStatus = (newStatus: UpdateStatus) => {
    const statuses = handleCheckStatus(formFieldsWithStatus, newStatus);
    setFormFieldsWithStatus(statuses);
  };

  const reset = () => {
    setFormFieldsWithStatus(undefined);
  };

  return (
    <InspectionProgressContext.Provider value={{ formFieldsWithStatus, updateStatus, reset }}>
      {children}
    </InspectionProgressContext.Provider>
  );
};

export { InspectionProgressProvider };
