import { NavigationContainer } from '@react-navigation/native';
import React, { PropsWithChildren,  } from 'react';

import { APIErrorProvider } from '../hooks/global/APIErrors';
import { AuthContextProvider,State } from '../hooks/global/Authorization';
import { HomeNavigator } from '../router/Home';


// export const Wrapper: ComponentShape = ({ children }) => {
//   const { authActions } = useAuthorization();

//   // try to generate an action
//   useEffect(() => {
//     authActions?.signIn({ email: 'test@test.com', password: 'password', remember: true });
//   }, [authActions]);

//   return (
//     <ForgotPasswordContextProvider>
//       <UserGlobalProvider>
//         <AppSettingsProvider>
//           <UserLocationContextProvider>
//             <CellConnectionGlobalContextProvider>
//               <CameraPermsProvider>
//                 <PreferredMapProvider> {children}</PreferredMapProvider>
//               </CameraPermsProvider>
//             </CellConnectionGlobalContextProvider>
//           </UserLocationContextProvider>
//         </AppSettingsProvider>
//       </UserGlobalProvider>
//     </ForgotPasswordContextProvider>
//   );
// };

export const AuthWrapper = ({
  children,
  ...rest
}: PropsWithChildren<{
  user: State['user'];
  userToken: State['userToken'];
}>) => {
  return (
    <NavigationContainer>
      <AuthContextProvider {...rest}>
        <APIErrorProvider>
          <AuthContextProvider>
            <HomeNavigator />
            {children}
          </AuthContextProvider>
        </APIErrorProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
};
