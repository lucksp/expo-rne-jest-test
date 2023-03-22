import { useContext } from 'react';

import { InspectionProgressContext } from './InspectionProgressProvider';

export function useInspectionProgressProvider() {
  const context = useContext(InspectionProgressContext);

  if (context) {
    return context;
  }
  throw new Error(
    'useInspectionProgressProvider must be used within an InspectionProgressProvider'
  );
}
