import { useContext } from 'react';

import { ActiveInspectionContext } from './ActiveInspectionProvider';

export function useActiveInspectionContext() {
  const context = useContext(ActiveInspectionContext);

  if (context === undefined) {
    throw new Error(
      'useActiveInspectionContext needs to be used within a ActiveInspectionProvider'
    );
  }
  return context;
}
