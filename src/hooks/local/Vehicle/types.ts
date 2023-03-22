import { Dispatch, SetStateAction } from 'react';
import type { SWRResponse } from 'swr';

export interface VehicleDetailResponse {
  id: number;
  fleetNumber: string;
  make: string;
  model: string;
  categories: string[];
  coordinates: {lat: number; lng: number};
  isElectric: boolean;
  year: number;
  streetAddress: string;
  lastInspection: string;
  ismi: number;
  inspectionTemplates: string[];
}

export interface VehicleDetailShape extends Omit<VehicleDetailResponse, 'categories'> {
  vehicleType: string;
}

export interface Context extends Omit<SWRResponse<VehicleDetailShape>, 'data' | 'mutate'> {
  vehicle?: VehicleDetailShape;
  vehicleId?: string | number;
  setVehicleId: Dispatch<SetStateAction<string | number | undefined>>;
}
