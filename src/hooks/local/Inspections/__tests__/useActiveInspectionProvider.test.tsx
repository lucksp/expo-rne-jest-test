import { act, renderHook } from '@testing-library/react-native';
import React, { ReactNode } from 'react';

import { AuthContextProvider } from '@/src/hooks/global/Authorization';
import * as MockAuth from '@/src/hooks/global/Authorization/__mocks__/Authorization';
import { AuthWrapper } from '@/src/test-utils/wrapper';

import { VehicleDataProvider } from '../../../Vehicle';
import { InspectionData } from '../../InspectionsDataProvider/__fixtures__/inspection.fixture';
import { InspectionsDataProvider } from '../../InspectionsDataProvider/InspectionsDataProvider';
import { ActiveInspectionProvider } from '../ActiveInspectionProvider';
import { useActiveInspectionContext } from '../useActiveInspectionContext';

// const mockUser = {
//   id: 123456,
//   'first-name': 'Test',
//   'last-name': 'User',
//   email: 'test@jest.com',
//   'email-verified': true,
//   'phone-number': '',
//   'phone-number-verified': true,
//   'avatar-url': '',
//   'average-rating': 0,
//   'identification-status': 'verified',
//   'credit-balance': 0,
//   'unread-message-count': 0,
//   'app-login': true,
//   'driver-cup-opt-in': false,
//   'suspended-at': null,
// };

// jest.mock('@/src/hooks/global/Authorization', () => ({
//   AuthContextProvider: ({ children, ...rest }) => {
//     console.log({ children, ...rest });
//     return (
//       <MockAuth.MockAuthContextProvider {...rest}>{children}</MockAuth.MockAuthContextProvider>
//     );
//   },
//   useAuthorization: () => MockAuth.useAuthorization(),
// }));

describe('useActiveInspectionProvider', () => {
  test('#handleNextPress sends expected payload', async () => {
    // jest.mock('@react-navigation/native', () => {
    //   return {
    //     ...jest.requireActual('@react-navigation/native'),
    //     useNavigation: jest.fn(() => ({})),
    //     useRoute: () => ({
    //       params: {
    //         aggId: '',
    //         section: '0eafdffc-8ba5-45b6-ada8-9372dabe81c2',
    //         step: '1e46bdf9-a30a-4d41-bc61-a39b0a86d2f3',
    //         name: 'Dev 1',
    //         vehicleId: '26284',
    //       },
    //     }),
    //   };
    // });

    const wrapper = ({ children }: { children: ReactNode }) => {
      console.log({ children });

      return (
        <AuthWrapper user={mockUser} userToken="user-token">
          <VehicleDataProvider>
            <InspectionsDataProvider>
              <ActiveInspectionProvider>{children}</ActiveInspectionProvider>
            </InspectionsDataProvider>
          </VehicleDataProvider>
        </AuthWrapper>
      );
    };

    const { result } = renderHook(() => useActiveInspectionContext(), {
      wrapper,
    });

    act(() => {
      if (!InspectionData.formGroups[1].formFields[0].formFieldOptions) {
        throw new Error('Missing FormField options data');
      }
      console.log(result.current);

      result.current.handleNextPress({
        [InspectionData.formGroups[1].formFields[0].uuid]:
          InspectionData.formGroups[1].formFields[0].formFieldOptions[1].value,
      });
    });
    expect(true).toBe(false);
    // await waitForNextUpdate();

    // expect(fetch as jest.Mock).toHaveBeenLastCalledWith();
  });
});
