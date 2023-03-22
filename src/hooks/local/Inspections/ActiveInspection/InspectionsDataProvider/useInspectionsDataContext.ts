import { useContext } from 'react';

import { InspectionsDataContext } from './InspectionsDataProvider';

function useInspectionsDataContext() {
  const context = useContext(InspectionsDataContext);

  if (!context) {
    throw new Error('useInspectionsDataContext needs to be used within a InspectionsDataProvider');
  }

  return context;
}

export { useInspectionsDataContext };
