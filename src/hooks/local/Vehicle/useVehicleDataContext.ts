import { useContext } from 'react';

import { VehicleContext } from './VehicleDataProvider';

export function useVehicleDataContext() {
  const context = useContext(VehicleContext);

  if (!context) {
    throw new Error('useVehicleDataContext must be used within VehicleDataProvider');
  }

  return context;
}
